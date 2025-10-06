# 部署构建农场

## 总体结构
ROS 包的源码是在 Github 上管理的，使用 gbp 构建出源码包并上传仓库，然后再使用 dpkg-buildpackage 构建出包并上传仓库，大体的构建就完成了。（这里先不讨论测试）

ROS 官方使用 Jenkins 来管理上述任务，Jenkins master 节点（node，有时也叫 agent）会把任务分配给特定的节点，并协调这些任务彼此的上下游关系。

下面展示了一个包是如何在构建农场的各个 node 中流转的：

```plain
                                       +--------------------+                         
                                       | github source code |                         
                                       +-------+------------+                         
                                               |                                      
                                               | gbp pull                             
                                               |                                      
                                               v                                      
                                       +---------------------+                        
                                   +-> |  source build node  |<----------+            
                                   |   +-------+-------------+           |            
                                   |           |                         |            
                                   |           |                         |            
                                   |           | push source             | get depends
                                   |           | tarball & dsc           |            
                     generate &    |           v                         |            
+---------------+   trigger jobs   |     +-------------+            +------------+    
|  master node  +------------------+---->|  repo node  +----------->| repository |    
+---------------+                  |     +-------------+  import    +------------+    
                                   |           ^                         |            
                                   |           |                         |            
                                   |           |                         | get depends
                                   |           | push deb                |            
                                   |           |                         | get source 
                                   |           |                         |            
                                   |           |                         |            
                                   |   +-------+-------------+           |            
                                   +-->|  binary build node  |<----------+            
                                       +---------------------+                        
```

我们以[官方构建农场](https://build.ros2.org/)为例（请善用`Ctrl`+`F`在网页中查找）：

+ master agent 执行`Hrel_reconfigure-jobs`任务，产生以`_source`与`_binary`为结尾的、针对单个包的任务，而后执行`Hrel_rhel_trigger-jobs`在 slave agent（即 source build node 与 binary build node）上执行编译打包任务
+ slave agent 执行以`_source`与`_binary`为结尾的任务（见[链接1](https://build.ros2.org/view/Hsrc_uJ/)、[链接2](https://build.ros2.org/view/Hbin_uJ64/)），将制品上传给 repo agent
+ repo agent 执行`Hrel_import-package`任务，将制品上传到软件包仓库

需要注意的是，这里的 node 是逻辑上的概念，并非“一台机器对应一个 node”，实际上可能会有一对多的关系，例如一台机器既可以是 master node 也可以是 binary build node；也可能是多对一的关系，例如有多台构建机器，都可以是 binary build node。

## 一些问题
官方有两套部署脚本，一套基于 [Puppet](https://github.com/ros-infrastructure/buildfarm_deployment)，另一套基于 [Chef](https://github.com/ros-infrastructure/cookbook-ros-buildfarm)。网上的大多数部署教程是基于 Puppet 的，但是该套脚本基于 Puppet 3，目前已严重落后，迁移到新版本的 Puppet 会产生大量的依赖与兼容问题；而 Chef 目前没有 riscv64 版本。所以，只能参考这两套脚本手工搭建。



Hrel_import-package 等任务的 slave agent 需要安装 python3-debian, python3-empy, python3-yaml 包

## 搭建步骤
### 架构设计 & 机器准备
+ 由于 binary build node 的任务是构建二进制，所以只能使用 riscv64 机器
+ master node、repo node、source build node 相对来说承担的任务较轻，所以可以用一台机器；由于这三者对架构并无需求，所以可以使用 amd64 机器

所以**本文**采用如下架构：

```plain
                              +---------------------------+                               
                              |     +---------------+     |                                 
                              |     |  master node  |     |                                 
                              |     +---------------+     |     +---------------------------+
                              |                           |     |                           |
+--------------------+        |  +---------------------+  |     |  +---------------------+  |
| github source code +--------+->|  source build node  |  |     |  |  binary build node  |  |
+--------------------+        |  +---------------------+  |     |  +---------------------+  |
                              |             ^             |     |             ^             |
                              |             |             |     |             |             |
                              |             v             |     |             |             |
                              |      +-------------+      |     |             |             |
                              |      |  repo node  | <----+-----+-------------+             |
                              |      +-------------+      |     |                           |
                              +---------------------------+     +---------------------------+
                              |       amd64 machine       |     |      riscv64 machine      |
                              +---------------------------+     +---------------------------+
```

#### labels
Jenkins 使用`Labels`属性来标注/区分不同的节点

+ `buildagent` 用来标注 source/binary build node
+ `humble_sourcedeb`用来标注 source build node
+ `building_repository` 用来标注 repo node
+ `humble_binarydeb_default`用来标注 binary build node

#### 关于各节点间的沟通方式
有关 SSH 的发起者、接收者、密钥等问题非常容易搞错。

+ master node 作为发起者，（可能）需要通过 ssh 来控制接收者 source build node、binary build node 与 repo node。具体参考“配置 SSH Credential”一节
+ source build node 与 binary build node 作为发起者，需要 ssh 来将 artifact 推送到接受者 repo node。具体参考“添加 ssh-server”一节

### bootstrap 软件包仓库的准备
本文要生成的[desktop系列](https://www.ros.org/reps/rep-2001.html#id34)的包缺乏部分构建 ROS 包的工具（例如部分 colon 插件以及形如`python3-xxxx-modules`的包），所以需要在开始正式的构建之前准备好这个仓库。

#### 分析软件包的依赖情况
[官方Bootstrap仓库](http://repos.ros.org/repos/ros_bootstrap/)下的 `dists/bullseye/main/binary-amd64/Packages` 文件中记录了每个二进制包的安装依赖，而 `dists/bullseye/main/source/Sources` 文件中记录了其中每个二进制包的构建依赖，可以使用 [ depends_analyze](https://github.com/Sakura286/depends_analyze)工具来过滤该仓库的依赖情况。

#### 构建软件包并建立仓库
软件包的数量不多，也没有多少更新需求，关于构建一个临时仓库的办法，可以参照[搭建 apt 仓库](https://sakura286.github.io/2024-04-04/78fee7bbe9bb/)。

### 部署 Jenkins
在进行下一步前，请确保对 Jenkins 有着[基本的认识](https://www.jenkins.io/zh/doc/tutorials/)。

在两台机器上都安装如下依赖：

```shell
sudo apt install git python3-venv openssh-server \
                 docker.io \
                 python3-empy python3-yaml \
                 reprepro \
                 openjdk-17-jre
```

#### amd64 side
在本文中，我们要让这台机器同时是 master node、source build node 与 repo node

##### 设置 Label
Label 指示了该 node 在打包过程中所扮演的角色

在 Jenkins 管理界面中，点击`Manage Jenkins`->`System Configuration`->`Nodes`，修改`Built-In Node`的配置

![](https://cdn.nlark.com/yuque/0/2024/png/21774188/1713409431827-d4f9e917-fcd5-4c92-9808-e629d24469c3.png)

将其 Label 属性设置为`humble_sourcedeb`、`building_repository`**TODO**add a master

##### 依赖安装
```plain
sudo apt install python3-jenkinsapi python3-jenkinsapi python3-empy
```

##### 添加用户至 docker 用户组
因为 Master node 使用的是 built-in node 模式，构建是在 jenkins 用户下执行的，所以要把`jenkins`用户（而非当前登录用户）加入 docker 用户组里

```plain
sudo usermod -aG docker jenkins
```

##### 安装 Jenkins 与 Jenkins 插件
```shell
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian/jenkins.io-2023.key
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install fontconfig
sudo apt-get install jenkins
```

打开浏览器，输入`http://<master::ip>:8080`进入 Jenkins 管理页面，其中`<master::ip>`为 Jenkins 安装机器的 ip。按照网页提示安装推荐的插件，设置网页端管理员的账户（下称`<master::ui::name>`）与密码（下称`<master::ui::passwd>`）

保存[脚本与插件列表文件](https://gist.github.com/Sakura286/c44f274ceaeedb60bbad7cee5159acb1)，在浏览器中打开`https://<master::ip>:8080/script`，粘贴并运行 Groovy 脚本。

参考：

+ [Jenkins Debian Packages - Jenkins](https://pkg.origin.jenkins.io/debian/)
+ [cookbook-ros-buildfarm - GitHub](https://github.com/ros-infrastructure/cookbook-ros-buildfarm/blob/latest/attributes/plugins.rb)

##### 安装其他依赖
```plain
sudo apt install python3-jenkinsapi python3-jenkinsapi python3-empy
```

##### 配置 SSH Credential
本小节所做的内容是将 SSH 公钥添加到远程服务器上，将 SSH 私钥添加到 Jenkins Master 上。

由于不太追求节点的拓展性，所以可以不用 Swarm ，而是直接使用 SSH。因为 Master node 需要 SSH 控制其他节点，所以需要 SSH 密钥来设置免密登录，即需要向 Jenkins 服务器添加凭证（Credential）。

1. 在 Jenkins Master 上生成一对公私钥，由于 Jenkins 运行在名为`jenkins`的 Linux 账户上，所以需要切到该账户下操作

```shell
sudo su jenkins
# RSA 密钥会产生一些奇怪的问题**TODO**
ssh-keygen -t ed25519
```

于是，在`/var/lib/jenkins/.ssh`目录下生成了`id_ed25519`与`id_ed25519.pub`公私钥文件

2. 将公钥添加到目标 node 上

```shell
ssh-copy-id -i ~/.ssh/id_ed25519.pub <target::username>@<target::ip>
```

这样，公钥就添加到目标 node 的`~/.ssh/authorized_keys`了，那么在`jenkins`用户下直接 ssh 到该目标 node，就不需要密码了

3. 在 Jenkins 管理界面中，添加 Credential

`Manage Jenkins`->`Security`->`Credentials`，点击`(global)`，再点击`Add Credentials`按钮

![](https://cdn.nlark.com/yuque/0/2024/png/21774188/1713414666938-0ab85583-827a-4ec8-953e-9c1f8cb83e22.png)

在新页面中，`Kind`选择`SSH Username with private key`,`ID`填写`jenkins-agent`，在`Private Key`处勾选`Enter directly`，将`/var/lib/jenkins/.ssh/id_ed25519`（私钥）中的内容复制进去。这里`Username`留空的话，会自动选择默认用户`jenkins`

![](https://cdn.nlark.com/yuque/0/2024/png/21774188/1713414993872-ea484fd4-1090-4475-a871-f7be8b4dc448.png)

参考：

+ [Jenkins的sshagent/credential設置 - 知乎](https://zhuanlan.zhihu.com/p/110402531)
+ [SSH Agent - Jenkins Plugin](https://plugins.jenkins.io/ssh-agent/)

##### 批准 Groovy 脚本
[https://github.com/ros-infrastructure/buildfarm_deployment/issues/147](https://github.com/ros-infrastructure/buildfarm_deployment/issues/147)

[https://gist.github.com/prclibo/90fc9587f8382c069a3fb525291d2a39#generate-devel--release--doc-jobs](https://gist.github.com/prclibo/90fc9587f8382c069a3fb525291d2a39#generate-devel--release--doc-jobs)

##### 搭建目标空仓库
这一步的目的是建立一个空仓库，用来存放打出来的源码包与 deb 包，另外请参考后文的**import repo**任务

1. 生成签名用的 GPG Key

首先切换到`jenkins`用户下`sudo su jenkins`**TODO**需要切换到图形桌面账户？

运行命令`gpg --full-gen-key`，按照提示操作，**在输入密码阶段留空**，在`~/.gnupg/openpgp-revocs.d/`目录下生成的`.rev`文件即为私钥文件。

2. 生成一个空仓库

```plain
sudo mkdir -p /var/repos/ubuntu/building/conf
sudo chown -R $USER /var/repos/
cd /var/repos/ubuntu/building/conf
```

开始编写仓库配置信息

```plain
vim distributions
```

文件内容如下

```plain
Origin: ROS
Label: ROS jammy
Codename: jammy
Suite: jammy
Architectures: i386 amd64 arm64 armhf source
Components: main
Description: ROS jammy Debian Repository
Update: ros_bootstrap
SignWith: AF0DE2493DF7188DF5A3F684E207DA0636FF26AE
```

`SignWith`后面的 Key ID 可以通过`gpg --list-keys`获得

导入一个无关紧要的 deb 包（例如 [hello](https://mirrors.ustc.edu.cn/debian/pool/main/h/hello/)），生成软件包仓库目录

```shell
# 注意所在目录
cd /var/repos/ubuntu/building/
reprepro includedeb jammy <path_to_deb_file>
```

此时`ls -l`一下，就可以发现自动生成了`db``dists``pool`等文件夹

3. 安装 nginx 服务器，提供远程仓库服务

```shell
sudo apt install -y nginx
```

编辑 nginx 配置文件，使得其默认目录为`/var/repos`，并且自动生成目录

```plain
sudo vim /etc/nginx/sites-enabled/default
```

在`root /var/www/html`处，作以下修改

```plain
root /var/repos;
autoindex on;
```

重新启动 nginx 服务

```plain
sudo systemctl restart nginx.service
```

访问`http://localhost`，查看修改是否生效

参考：

+ [搭建 apt 仓库 - Sakura286](https://sakura286.github.io/2024-04-04/78fee7bbe9bb/)
+ [仓库管理工具 reprepro 的使用方法 - 博客园](https://www.cnblogs.com/longbigbeard/p/14144450.html)

##### 添加 ssh-server
souce build node 生成的源码包，以及 binary build node 生成的二进制包，都会通过 Publish over SSH 插件来推送到远程的 repo node 上。注意区分前文“配置 SSH Credential”一节，配 SSH Credential 是因为 Master 要 SSH 控制其他节点，而配 Publish over SSH 是因为要将制品（artifact）推送到 repo 节点上。

repo node 是接收 artifact 的服务器，在本文中， repo node 和 master node 在同一节点上。

首先要建立 repo node 接收文件的位置，ROS 构建脚本默认使用 `/var/repos/ubuntu/building/queue` 目录。

然后需要在 Jenkins 管理页面里设置别的节点如何通过 ssh 访问 repo node 服务器。`Manage Jenkins`->`System`-> `Publish over SSH`->`SSH Servers`，点击`Add`，进行如下设置

| **选项** | **内容** | **备注** |
| --- | --- | --- |
| `Name` | `jenkins-agent` | 写死的**TODO**实际上在多任务的时候是`repo` |
| `Hostname` | 自定义 | repo node 所在地址 |
| `Username` | 自定义 | 选择 SSH 登录的账户名。由于本文中 repo node 运行在 built-in node 中，所以`import package`任务由`jenkins`用户执行，所以使用`jenkins`用户登录并上传 artifact，以避免权限问题 |
| `Remote Directory` | `/var/repos/ubuntu/building/queue` | 默认位置 |
| `Passphrase / Password` | 自定义 | 由于各个 node 并不在同一台机器上，所以指定使用 key 登录会产生麻烦（具体情况是如果没有找到 key 的话，ssh 会卡柱而非报错），所以这里使用 ssh 密码登录 |


最后，点击右下方的`Test Configuration`可以查看配置是否有效。

![](https://cdn.nlark.com/yuque/0/2024/png/21774188/1713500003604-5ea5e7ed-d9aa-4ce1-83fb-815bd3e75606.png)

##### 添加 riscv64 编译节点
由于要管理的节点并不多，所以我们在此选择使用 SSH 的方式连接 master 与 build binary node，而非 ROS 官方推荐的 Jenkins Swarm

在 Jenkins 管理界面中，点击`Manage Jenkins`->`System Configuration`->`Nodes`->`New Node`，设置`Node name`（具体名称随意），勾选`Permanent Agent`。

![](https://cdn.nlark.com/yuque/0/2024/png/21774188/1713409177933-bd53da08-af77-4b58-9d27-59772ad536e1.png)

然后在新的界面里面做出如下修改

| 选项 | 内容 | 备注 |
| --- | --- | --- |
| Remote root directory | `/opt/build-agent` | 请随意指定 build agent 的工作目录，但请确保目录存在，并且给予**TODO谁的**权限 |
| Labels | `humble_binarydeb_default` | 见前文`Labels`一节 |
| Launch method | `Launch agents via SSH` | |
| Host | | 指定 build agent 的 IP 地址 |
| Credentials | | 新建的 Credentials 的 user name 和 key  |


#### riscv64 side
安装依赖后，调整 docker 用户组

```shell
sudo usermod -aG docker $USER
```

### 设置构建配置文件
即 ros_buildfarm_config

##### 下载 ros_buildfarm 等代码仓库
fork [ros_buildfarm](https://github.com/ros-infrastructure/ros_buildfarm) 与 [ros_buildfarm_config](https://github.com/ros2/ros_buildfarm_config) 仓库，并做出修改**TODO**。

+ 在 index.yaml 里指定`jenkins_url`为`http://<master::ip>:8080` 

参考：[Configuration options - ros_buildfarm - GitHub](https://github.com/ros-infrastructure/ros_buildfarm/blob/master/doc/configuration_options.rst)

### 生成任务
> 你可以先试着生成 `单个包的任务**TODO**` ，看看能不能跑通整个流程
>

#### 创建 credential file
由于 ros_buildfarm 中的脚本要向 Jenkins Master 中添加 Project，所以需要知道`master::ui::id`和`master::ui::passwd`[placeholder::rovide credentials for Jenkins master]，在 master node 上添加`~/.buildfarm/jenkins.ini`，内容如下

```plain
[http://<master::ip>:8080]
username=<master::ui::name>
password=<master::ui::passwd>
```

### import repo 任务
repo 节点需要安装`reprepro`,并添加 `~/.buildfarm/reprepro-updater.ini` 内容如下

```plain
[ubuntu_building]
repository_path=/path/to/repos/building
distros=bullseye
suites=[bullseye]
source_suite=[bullseye]
architectures=riscv64 source
signing_key=gpgkey
[ubuntu_testing]
repository_path=/path/to/repos/testing
distros=bullseye
suites=[bullseye]
source_suite=[bullseye]
architectures=riscv64 source
signing_key=gpgkey
[ubuntu_main]
repository_path=/path/to/repos/main
distros=bullseye
suites=[bullseye]
source_suite=[bullseye]
architectures=riscv64 source
signing_key=gpgkey
```

注意：signing_key 所需 gpg key 不应设置密码

注意：ubuntu_building,ubuntu_testing,ubuntu_main,是上游脚本中硬编码的条目

## tips
### 删除 Jenkins 列表中所有的 Project
确保没有任何任务正在执行的情况下，访问`http://<master::ip>:8080/script`，运行以下脚本

```groovy
for(j in jenkins.model.Jenkins.theInstance.getAllItems()) {
    j.delete()
}
```

参考：[hudson CI: how to delete all jobs? - StackOverflow](https://stackoverflow.com/questions/5076246)

### 关于 Jenkins 构建时所用的 linux 账户
如果是 `built-in` 模式的话，那么使用的是 `jenkins` 账户

如果是远程模式的话，那么**TODO**

## 参考资料
1. https://groups.google.com/g/jenkinsci-users/c/EAG_UmTcb_U/m/MSVa47meCwAJ
2. https://github.com/ros-infrastructure/cookbook-ros-buildfarm/blob/latest/attributes/plugins.rb
3. https://gist.github.com/prclibo/90fc9587f8382c069a3fb525291d2a39
4. https://github.com/ros-infrastructure/ros_buildfarm/blob/master/doc/environment.rst#provide-credentials-for-jenkins-master

+ ROS2 仓库地址
  - [bootstrap 仓库](https://repos.ros.org/repos/ros_bootstrap/)
  - [buildfarm 主机仓库](https://repo.ros2.org/)
  - [新的公众开放仓库](https://packages.ros.org/ros2/ubuntu/)
