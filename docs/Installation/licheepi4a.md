# LicheePi4A镜像刷写教程

此页面是 LicheePi4A 镜像刷写教程，如想获取其它镜像刷写教程请从下面的表格中点击链接进行查看。

| 支持设备 |                |
| ------- | -------------- |
| Milk-V pioneer | [刷写教程](https://docs.revyos.dev/Installation/milkv-pioneer/) |

## 注意！

在查看此教程前，请对照下面的图片确认手中板卡是否和图片一致，请在确认一致后再继续按照教程操作。

![LicheePi4A 示例图](./image%20for%20flash/lpi4a.png)

## 演示环境介绍

此教程中所有镜像刷写的相关操作都使用以下环境:

- 系统及版本: Ubuntu 22.04.5 LTS
- 内核版本: 6.8.0-49-generic
- 架构: x86_64

在此环境中，本教程中的所有操作都是可复现的。在下面我们提供了一些未经官方验证，但可以进行刷写的环境，在下面环境中进行镜像刷写遇到问题请参考[此页](../issue.md)提交issue。

## 启动方式介绍

LicheePi4A 目前支持两种启动方式，分别是[从SD card 启动](#sd-card)和[从 eMMC 启动](#emmc)，对于两种不同的启动方式，此教程中都有进行说明，请根据自己所需的刷写方式点击进行跳转查看。

## 从SD card 启动

注意！从sd卡启动不需要改变拨码开关！按照eMMC拨码开关进行设置！

![拨码开关示例图](./image%20for%20flash/拨码开关.jpg)

拨码开关存在于板卡下方，需要取出板卡后才能看到，正确设置应为两个按钮全部对准下方。

**注意！** 部分早期版本的 LicheePi4A 板卡没有拨码开关。

### 准备工作

#### 获取镜像

从以下链接下载 LicheePi4A 以 `sdcard-` 为前缀的 SD card 启动系统镜像：

- [RevyOS20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240720/)

- [RevyOS20250110](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250110/)

其中，20240720镜像使用的是5.10内核，20250110镜像使用的是6.6内核。目前5.10内核处于成熟可用的状态，6.6内核可能会出现一些未知的问题，请根据需求选择相应的镜像。

以下以20250110镜像为例进行演示：

**请注意，下载后的zst文件压缩包约为1.4GB，请在下载时确认本地最少留有12GB的剩余空间，以保证后续的下载和解压不会出现空间不足的情况。**

如果是通过网页浏览，点击链接下载，浏览器会自动拉起文件下载，请进行确认，保证文件下载到本地。

如果想通过命令行进行下载，有许多种方式例如：wget、curl等，在这里我们选择 wget 作为下载工具。

在[演示环境](#_2)中，wget通常会预装，如果没有安装 wget 的情况下请使用以下命令进行安装

```bash
sudo apt install wget 
```

请注意，sudo命令执行时需要用户输入密码进行确认才可执行，请确保自己知道密码后再执行此命令，后续不再赘述。

在安装成功后可以在命令行中执行以下命令进行镜像压缩包下载

```bash
wget https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250110/sdcard-lpi4a-20250110_151339.img.zst
```

下载完成后会得到名为 [sdcard-lpi4a-20250110_151339.img.zst](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250110/sdcard-lpi4a-20250110_151339.img.zst) 的文件，此文件并不是最终镜像文件，而是一个压缩包，需要解压镜像压缩包 sdcard-lpi4a-20250110_151339.img.zst 才可得到最终的镜像文件 sdcard-lpi4a-20250110_151339.img。

在上述的[演示环境](#_2)中，zst文件压缩包有多种方式进行解压，例如zstd、tar、7z。此教程只列举其中一种。通过命令行使用 zstd 工具进行解压，此方式需要我们先在系统中安装 zstd 软件包，再进行解压。

如果不知道系统中是否已经安装 ztsd，请执行下面的命令，此命令是通过查看 zstd 版本的命令，通过回显可以判断系统是否已经预装 ztsd 软件包。

```bash
zstd --version
```

如果正常回显版本号证明已安装成功,例如下面的回显表示 zstd 已安装：

```bash
*** zstd command line interface 64-bits v1.4.8, by Yann Collet ***
```

如果回显没有版本号的情况下，请通过命令行安装zstd，
```bash
sudo apt update
sudo apt install zstd
```

在安装完 zstd 后，我们便可对镜像文件进行解压。请注意，注意解压后的文件大小约为**9.49GB**，解压时请注意本地存储空间是否足够！

```bash
sudo unzstd sdcard-lpi4a-20250110_151339.img.zst
```

最后会得到 sdcard-lpi4a-20250110_151339.img 文件。至此，演示环境下镜像文件获取成功。

#### 硬件准备

准备MicroSD 读卡器和一张MicroSD 卡,目前 MicroSD 卡存在兼容性问题，RevyOS 提供了目前已测试过的 [MicroSD 卡列表](https://github.com/revyos/revyos/blob/main/Installation/card%20list.md)。如果您使用的 MicroSD 卡不在已知可用的列表上，出现无法正确刷写镜像和刷写后无法启动镜像的问题，请参考[此页](../issue.md)提交issue，并尝试参考[从 eMMC 启动](#emmc)镜像的刷写教程进行镜像刷写。

#### 烧录方式介绍

如果您选择从SD card 启动，可以选择使用两种不同的方式将镜像烧录到 MicroSD 卡中。一种是通过[图形界面软件烧录](#balenaetcher-microsd)，一种是通过命令行使用dd命令[在命令行进行烧录](#dd)。

### 使用BalenaEtcher写入镜像到 MicroSD 卡

从官网获取烧录工具 BalenaEtcher [https://etcher.balena.io/](https://etcher.balena.io/)，下载时请根据本机情况选择文件进行下载。根据[演示环境](#_2)中的说明，选择[Etcher for Linux x64 (64-bit) (zip)](https://github.com/balena-io/etcher/releases/download/v1.19.25/balenaEtcher-linux-x64-1.19.25.zip)进行下载并解压安装。

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

dd 是 Linux 和类 Unix 系统中的一个功能强大的命令行工具，主要用于按指定大小和格式复制文件或数据，一般会预装在系统中。

使用 dd 命令写入镜像需要根据以下步骤进行

首先需要查看设备列表，在插入 SD 卡前后分别运行以下命令，找到 SD 卡对应的设备名：

```bash
lsblk
```

SD 卡的设备名可能是 /dev/sda 或 /dev/mmcblk0，在演示环境中，在执行`lsblk`后确认sd卡分区为`/dev/sda`。

在写入镜像前，需要卸载 SD 卡的挂载分区，如果有多个分区请逐一卸载：

```bash
sudo umount /dev/sda1
```

如果没有分区被挂载，umount 命令会显示`not mounted`，这时无需进一步操作。

在卸载分区后，建议运行`sync`命令，确保所有数据已同步。

在执行完上述步骤后即可进行刷写，在刷写前请保证您在 `of=` 设置了正确的设备，在演示环境中，sd卡识别为sda，`of=`后请根据自身设备分区进行填写。

```bash
sudo dd if=./sdcard-lpi4a-20250110_151339.img of=/dev/sda bs=4M status=progress
```

在刷写完成后，请执行`sudo sync`命令，保证数据已同步，然后需要确认sd卡是未挂载状态下，这两点执行完成后才可拔出sd卡，插入到开发板中。

### 通过SD卡启动系统

在写入镜像完成后将SD 卡插入如图所示卡槽中。
![](./image%20for%20flash/lpi4a5.png)
需要先将hdmi线（如果有外接显示器需求）进行连接，然后将随箱附赠的USB-A接口到USB-C接口的数据线中的C口一端接入到开发板上，另一端接入至少5V2A 输出的 USB 电源上，即可启动。

## 从 eMMC 启动

从eMMC启动镜像时，刷写镜像的途径分为连接串口与不连接串口两种情况，其中进行的操作有些许区别，在此将两种方式一起进行介绍。
**从eMMC启动应当先取出 SD Card**

### 准备工作

从eMMC启动需要将u-boot文件、boot文件以及root文件通过fastboot刷入eMMC中，所以需要保证已安装fastboot。

Ubuntu可直接通过apt安装

```bash
sudo apt install fastboot 
```

通过串口连接时需要串口控制台进行监控，在Ubuntu下可以选择使用 `minicom`, `screen` 等软件。

```bash
sudo apt install minicom
sudo apt install screen
```

#### 获取镜像

从以下链接下载 LicheePi4A 的系统镜像：

- [RevyOS20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240720/)

- [RevyOS20250110](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250110/)

其中，20240720镜像使用的是5.10内核，20250110镜像使用的是6.6内核。目前5.10内核处于成熟可用的状态，6.6内核可能会出现一些未知的问题，请根据需求选择相应的镜像。

## 注意
LicheePi4A 不同的内存版本 uboot 镜像不通用，请根据您的板卡版本选择对应镜像

|内存大小|对应的uboot镜像|
|---|---|
|8G|u-boot-with-spl-lpi4a-main_8gemmc.bin|
|16G|u-boot-with-spl-lpi4a-16g-main.bin|

下载后使用 `unzstd` 解压 root 和 boot 镜像

```bash
unzstd boot-lpi4a-20240720_171951.ext4.zst
unzstd root-lpi4a-20240720_171951.ext4.zst
```

### 写入镜像到eMMC(不接入串口)

按住板卡上的BOOT键后，接入电脑。板卡会进入刷写模式

### 写入镜像到eMMC(接入串口)

#### 使用 minicom
首先从终端打开 minicom，进入串口控制台。

```bash
sudo minicom
```

如果需要指定使用的串口设备（例如常见的 USB 转串口设备使用的 `ttyUSB0`），可以使用

```bash
sudo minicom -D /dev/ttyUSB0
```

#### 使用 screen
从终端打开 `screen`, `/dev/ttyUSB0` 为您使用的设备， `115200` 为波特率

```bash
sudo screen /dev/ttyUSB0 115200
```

如图所示将串口与板卡进行连接，usb端接入电脑。板卡上的Type-C接口通过USB-Type-C线连接到电脑。

连接串口，红色圈内（从左往右第一排第二个）为 GND，黄色圈内（第一排第五个）为 TX，绿色圈内（第二排第五个）为 RX。与主机应遵循TX到RX,RX到TX,GND到GND的接线。

![](./image%20for%20flash/lpi4a6.png)

接入后在串口控制台中按任意按键打断自动启动，出现下面的 uboot 命令行 （见最后一行）

![](./image%20for%20flash/lpi4a-uboot-command-line.png)

在串口控制台窗口中输入

```bash
fastboot usb 0
```

会显示
```bash
Light LPI4A 16G# fastboot usb 0
dwc3_gadget_start maximum_speed:5 revision:0x5533330b
dwc3_gadget_start DWC3_DCFG:0x80804
```

即表示可以使用 fastboot 刷写，随后另起一个窗口进行镜像刷写。

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
