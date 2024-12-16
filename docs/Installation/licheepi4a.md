# LicheePi4A镜像刷写教程

LicheePi4A支持从 SD card 启动和从 eMMC 启动。以下分别介绍这两种启动方式下该如何刷写RevyOS镜像。

演示环境：Ubuntu22.04

## 从SD card 启动

注意！从sd卡启动不需要改变拨码开关！按照eMMC拨码开关进行设置！

### 准备工作

#### 硬件准备

准备MicroSD 读卡器和一张MicroSD 卡

#### 烧录相关工具

安装zstd用于解压镜像文件

```bash
apt install zstd
```

#### 获取镜像

从以下链接下载 LicheePi4A 以 `sdcard-` 为前缀的 SD card 启动系统镜像：[RevyOS0720](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240720/)。

解压镜像压缩包得到sdcard-lpi4a-20240720_171951.img文件

```bash
unzstd sdcard-lpi4a-20240720_171951.img.zst
```

### 使用BalenaEtcher写入镜像到 MicroSD 卡
从官网获取烧录工具 BalenaEtcher [https://etcher.balena.io/](https://etcher.balena.io/)


把 SD 卡插入读卡器，并将其插入电脑。

运行 BalenaEtcher用于写入镜像到SD 卡。
在 BalenaEtcher 窗口中, 首先点击 "Flash from file" 来选择镜像文件。
![](./image%20for%20flash/lpi4a1.png)
选择完镜像文件后在第二栏选择需要写入的设备。
![](./image%20for%20flash/lpi4a2.png)
两项都选择完以后点击"Flash"写入镜像。
![](./image%20for%20flash/lpi4a3.png)
在等待一段时间后会显示烧录已完成。
![](./image%20for%20flash/lpi4a4.png)

### 使用dd写入镜像

在刷写前请保证您在 `of=` 设置了正确的设备
```bash
# sudo dd if=./sdcard-lpi4a-20240720_171951.img of=<Target Device> status=progress
# sync
```
等待完成即可使用

### 系统启动

在写入镜像完成后将SD 卡插入如图所示卡槽中。
![](./image%20for%20flash/lpi4a5.png)
连接hdmi线与电源线后可直接启动。

## 从eMMC启动

从eMMC启动镜像时，刷写镜像的途径分为连接串口与不连接串口两种情况，其中进行的操作有些许区别，在此将两种方式一起进行介绍。
**从eMMC启动应当先取出 SD Card**

### 准备工作

从eMMC启动需要将u-boot文件、boot文件以及root文件通过fastboot刷入eMMC中，所以需要保证已安装fastboot。

Ubuntu可直接通过apt安装

```bash
apt install fastboot 
```

通过串口连接时需要串口控制台进行监控，在Ubuntu下选择使用minicom。

```bash
apt install minicom
```

#### 获取镜像

从以下链接下载 LicheePi4A 的系统镜像：[RevyOS0720](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240720/)。

其中u-boot文件需要根据自己的板卡规格进行选择，请注意提前了解自己的板卡规格后进行下载。

下载后使用 `unzstd` 解压 root 和 boot 镜像

```bash
unzstd boot-lpi4a-20240720_171951.ext4.zst
unzstd root-lpi4a-20240720_171951.ext4.zst
```

### 写入镜像到eMMC(不接入串口)

按住板卡上的BOOT键后，接入电脑。板卡会进入刷写模式

### 写入镜像到eMMC(接入串口)

首先从终端打开minicom，进入串口控制台。

```bash
sudo minicom
```

如图所示将串口与板卡进行连接，usb端接入电脑。板卡上的Type-C接口通过USB-Type-C线连接到电脑。

连接串口，红色圈内（从左往右第一排第二个）为 GND，黄色圈内（第一排第五个）为 TX，绿色圈内（第二排第五个）为 RX。与主机应遵循TX到RX,RX到TX,GND到GND的接线。

![](./image%20for%20flash/lpi4a6.png)

在接入后在串口控制台中按任意按键打断，在串口控制台窗口中输入

```bash
fastboot usb 0
```

随后另起一个窗口进行镜像刷写。

### 正式刷写
以下命令均为在镜像文件下载文件夹路径内，注意文件路径和文件名。

#### 使设备进入 u-boot fastboot
如果 `lsusb` 结果不是 `ID 1234:8888 Brain Actuated Technologies USB download gadget`，运行下面的命令
```bash
fastboot flash ram u-boot-with-spl-lpi4a-16g.bin # 替换为您的型号对应的 uboot 镜像
fastboot reboot
sleep 1
```

#### 刷写镜像
```bash
fastboot flash uboot u-boot-with-spl-lpi4a-16g.bin
fastboot flash boot boot-lpi4a-20240720_171951.ext4
fastboot flash root root-lpi4a-20240720_171951.ext4
```
fastboot 会显示刷写进度，如果连接了串口，在串口控制台中可以看到具体进度（下图以刷写
boot，大小为 92886476 Bytes为例，可在 `cmd_parameter: boot, imagesize: 92886476` 处查看刷入的内容）。

![](./image%20for%20flash/lpi4a7.png)

刷写完成后拔掉电脑与板卡连接的USB-Type-C线，接入电源线便可直接启动进入系统。


#### 可能出现的问题
如果 `lsusb` 中存在 download 设备，但`fastboot` 命令仍然卡在 `< waiting for any device >` ，可以尝试使用 `sudo` 运行 `fastboot` 命令。


### 用户登录

- 登录账户：debian
- 账户密码：debian
