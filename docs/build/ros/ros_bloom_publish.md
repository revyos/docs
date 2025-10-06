# 通过 Bloom 进行发布操作

当前使用 [rosdistro](https://github.com/revyos-ros/rosdistro)

# 概念介绍
- rosdistro: `ros` 使用 `rosdistro` 仓库控制 `ros` 发行版的版本,里面包含了各 `ros` 包的版本及外部 `linux` 发行版依赖关系的映射
- bloom: 自动发布工具，仓库中的 `python3-bloom`, 或者 `pypi` 中的 `bloom`
- rosdep: 控制外部依赖关系到 `ros` 的映射

`rosdistro` 中的条目一般如下所示

```yaml
  gazebo_ros_pkgs:
    doc:
      type: git
      url: https://github.com/ros-simulation/gazebo_ros_pkgs.git
      version: ros2
    release:
      packages:
      - gazebo_dev
      - gazebo_msgs
      - gazebo_plugins
      - gazebo_ros
      - gazebo_ros_pkgs
      tags:
        release: release/humble/{package}/{version}
      url: https://github.com/ros2-gbp/gazebo_ros_pkgs-release.git
      version: 3.7.0-1
    source:
      test_pull_requests: true
      type: git
      url: https://github.com/ros-simulation/gazebo_ros_pkgs.git
      version: ros2
    status: maintained
```

当我们需要修改打包，或者对缺失 debian 版本的包进行发布时



fork 对应的 release 仓库到 [revyos-ros](https://github.com/revyos-ros) 下

修改 rosdistro release 的仓库对应 release 条目

对 release 仓库的 tracks.yaml 文件进行修改

条目如下所示

```yaml
  humble:
    actions:
    - bloom-export-upstream :{vcs_local_uri} :{vcs_type} --tag :{release_tag} --display-uri
      :{vcs_uri} --name :{name} --output-dir :{archive_dir_path}
    - git-bloom-import-upstream :{archive_path} :{patches} --release-version :{version}
      --replace
    - git-bloom-generate -y rosrelease :{ros_distro} --source upstream -i :{release_inc}
    - git-bloom-generate -y rosdebian --prefix release/:{ros_distro} :{ros_distro}
      -i :{release_inc} --os-name ubuntu
    - git-bloom-generate -y rosdebian --prefix release/:{ros_distro} :{ros_distro}
      -i :{release_inc} --os-name debian --os-not-required
    - git-bloom-generate -y rosrpm --prefix release/:{ros_distro} :{ros_distro} -i
      :{release_inc} --os-name fedora
    - git-bloom-generate -y rosrpm --prefix release/:{ros_distro} :{ros_distro} -i
      :{release_inc} --os-name rhel
    devel_branch: humble
    last_version: 1.1.14
    name: navigation2
    patches: null
    release_inc: '1'
    release_repo_url: null
    release_tag: :{version}
    ros_distro: humble
    vcs_type: git
    vcs_uri: https://github.com/ros-planning/navigation2.git
    version: :{auto}
```

我们需要把 actions 中的 ubuntu,fedora,rhel 部分删除，因为不需要这些，并且去除 `--os-not-required`, 并且把 release_repo_url 修改为对应 revyos-ros 仓库，推上仓库去。

如果当前系统不是 debian:bullseye ，可以使用 `export ROS_OS_OVERRIDE=debian:bullseye`进行覆盖

再安装 bloom

```bash
python -m venv venv

source venv/bin/activate

pip install bloom
```



使用我们版本的 `rosdep` 数据，在`/etc/ros/rosdep/sources.list.d/20-default.list`文件中写入如下内容

```plain
# os-specific listings first
yaml https://github.com/revyos-ros/rosdistro/raw/master/rosdep/osx-homebrew.yaml osx

# generic
yaml https://github.com/revyos-ros/rosdistro/raw/master/rosdep/base.yaml
yaml https://github.com/revyos-ros/rosdistro/raw/master/rosdep/python.yaml
yaml https://github.com/revyos-ros/rosdistro/raw/master/rosdep/ruby.yaml
```

然后进行发版

```bash
ROSDISTRO_INDEX_URL=https://github.com/revyos-ros/rosdistro/raw/master/index-v4.yaml bloom-release -r humble package_name
```

注意：其中 ROSDISTRO_INDEX_URL 也可设置为本地文件

注意：也可以使用 --edit-track 进行编辑

> Sakura286: 如果不对 bloom-release 指定 --override-release-repository-url 参数，bloom 应该不会自动去找自定义的 release 仓库吧？

当使用这个命令时，bloom 会 clone 仓库，可能会报如下



```plain
Your track's 'actions' configuration is not the same as the default.
Should it be updated to the default setting?
```

选择 n 就行

## 修改外部依赖关系
rosdistro 下有个 rosdep 目录，里面维护了发行版相关包到 ros 的对应关系,形式如下

```yaml
xtensor:
  arch: [xtensor]
  fedora: [xtensor-devel]
  nixos: [xtensor]
  rhel:
    '*': [xtensor-devel]
    '8': null
  ubuntu:
    bionic: [xtensor-dev]
    jammy: [libxtensor-dev]
    noble: [libxtensor-dev]
```

查到 debian 下对应包名, 如 [https://github.com/revyos-ros/rosdistro/commit/fd32eb6a7648a5091711da99fdacd3b1bf40618b](https://github.com/revyos-ros/rosdistro/commit/fd32eb6a7648a5091711da99fdacd3b1bf40618b) 所示，添加或修改对应 debian 条目

注意：更新完外部依赖关系记得再发版一次

## 修改源码
 tracks.yaml 有个 patch 条目，设置这个条目为一个仓库中的一个文件夹，bloom 会使用这个文件夹中的内容来替换 upstream 分支的文件，并生成新的 upstream tag

例如：

[rmw_implementation-release/humble-riscv64/rmw_implementation at master · revyos-ros/rmw_implementation-release](https://github.com/revyos-ros/rmw_implementation-release/tree/master/humble-riscv64/rmw_implementation)

## 修改 debian 打包
以 mimick_vendor 为例

我们需要对 debian humble 的版本进行修改

在 `debian/humble/mimick_vendor`分支下有 debian 目录，其中包含了打包文件的模板，在发版时会从中生成

我们可以进行相应修改

# 资料
[https://wiki.ros.org/cn/bloom/Tutorials/ChangeBuildFlags](https://wiki.ros.org/cn/bloom/Tutorials/ChangeBuildFlags)
