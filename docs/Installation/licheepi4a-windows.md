# Lichee Pi4A在Windows上的镜像刷写教程

此页面是 LiCheePi 4A 镜像在 Windows 操作系统上的镜像刷写教程，如想在 Linux 系统上进行刷写请点击[LiCheePi4A镜像刷写教程](./licheepi4a.md)，如想获取其他镜像刷写教程请从下面表格点击链接进行查看。

| 支持设备 |                |
| ------- | -------------- |
| Milk-V Pioneer | [刷写教程](https://docs.revyos.dev/Installation/milkv-pioneer/) |

## 注意！

在查看此教程前，请对照下面的图片确认手中板卡是否和图片一致，请在确认一致后再继续按照教程操作。

![LicheePi4A 示例图](./image%20for%20flash/lpi4a.png)

## 演示环境介绍

此教程中所有镜像刷写的相关操作都使用以下环境：

- 操作系统：Windows 11 24H2 OS内部版本26100.3194
- 架构：x86_64
- LiCheePi4A 板卡规格：16G RAM + 128G eMMC

在此环境中，本教程中的所有操作都是可复现的。在本环境中进行镜像刷写遇到问题请参考[此页](../issue.md)提交issue。

## 启动方式介绍

LicheePi4A 目前支持两种启动方式，分别是[从SD card 启动](#sd-card)和[从 eMMC 启动](#emmc)，对于两种不同的启动方式，此教程中都有进行说明，请根据自己所需的刷写方式点击进行跳转查看。

请注意，不论使用哪种刷写方式，原有的用户数据都会丢失，所以在进行刷写前请一定确保做好数据备份的工作！

## 从SD card 启动

注意！从sd卡启动不需要改变拨码开关！按照eMMC拨码开关进行设置！

![拨码开关示例图](./image%20for%20flash/Switch.png)

拨码开关存在于板卡下方，需要取出板卡后才能看到，正确设置应为两个按钮全部对准下方。

**注意！** 部分早期版本的 LicheePi4A 板卡没有拨码开关。

### 准备工作

#### 获取 SD card 镜像

从以下链接下载 LicheePi4A 以 `sdcard-` 为前缀的 SD card 启动系统镜像：

- [RevyOS20240720（5.10内核）](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240720/)

- [RevyOS20250123（6.6内核）](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250123/)

20240720镜像使用的是5.10内核，目前5.10内核处于较为成熟的状态，在视频的编解码以及各种应用上表现都更加稳定。

20250123镜像使用的是6.6内核，6.6内核可能会出现一些未知的问题，已知的有视频方面卡顿以及usb失去供电等问题，目前正在修复当中。

请在看完上述说明后，根据需求选择相应的镜像。

以20250123镜像为例进行演示：

有两种镜像下载方式可供选择：

- 通过网页浏览。直接点击链接下载即可。

![通过网页下载镜像](./image%20for%20flash/web-download-windows.png)

- 通过命令行下载。打开PowerShell，运行以下命令：

```powershell
curl.exe -OL https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250123/sdcard-lpi4a-20250123_195216.img.zst
```

即可下载。等待进度到达100%即表示下载完成。

![通过命令行下载镜像](./image%20for%20flash/download-image-command-line-windows.png)

通过上面两种方式进行下载，完成后都会得到名为`sdcard-lpi4a-20250123_195216.img.zst`的镜像压缩包。由于在下载过程中有概率出现传输错误，推荐进行哈希校验步骤来校验镜像的准确性。

#### 校验镜像（可选，推荐）

打开资源管理器，导航到镜像文件所在的文件夹，右键选择“在终端中打开”

![右键菜单中选择在终端中打开](./image%20for%20flash/context_menu_terminal_open_windows.png)

点击打开Powershell终端。输入下面的命令获取镜像站中的`md5sum.txt`校验和：

```powershell
curl.exe -L https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250123/md5sum.txt
```

应该能够展示出各个镜像文件的理论校验和。运行下面的命令计算本地镜像校验和：

```powershell
Get-FileHash -Algorithm MD5 .\sdcard-lpi4a-20250123_195216.img.zst
```

![检验镜像文件的校验和](./image%20for%20flash/checksum-verification-image.png)

对照两个校验和，应当观察到校验和一致。否则需要重新下载镜像。

#### 解压镜像

镜像带有`zstd`压缩，可使用一些压缩工具进行解压，例如[PeaZip](https://peazip.github.io/)或[7-zip Zstd版](https://github.com/mcmilk/7-Zip-zstd)

![使用Peazip解压镜像](./image%20for%20flash/peazip_extraction_illustration.png)

**注意**：解压镜像后，镜像本身和压缩包会占用约**10.2GB**空间，请保证空间足够！

#### 硬件准备

准备MicroSD 读卡器和一张MicroSD 卡,目前 MicroSD 卡存在兼容性问题，RevyOS 提供了目前已测试过的 [MicroSD 卡列表](https://github.com/revyos/revyos/blob/main/Installation/card%20list.md)。

如果您使用的 MicroSD 卡不在已知可用的列表上，出现无法正确刷写镜像和刷写后无法启动镜像的问题，请参考[此页](../issue.md)提交issue，并尝试参考[从 eMMC 启动](#emmc)镜像的刷写教程进行镜像刷写。

#### 使用BalenaEtcher写入镜像到 MicroSD 卡

从官网获取烧录工具 BalenaEtcher [https://etcher.balena.io/](https://etcher.balena.io/)，下载时请根据本机情况选择文件进行下载。选择[Etcher for Windows](https://github.com/balena-io/etcher/releases/download/v1.19.25/balenaEtcher-1.19.25.Setup.exe)进行下载并解压安装。

![BalenaEtcher版本选择](./image%20for%20flash/balenaetcher-version-selection.png)

1. 把 SD 卡插入读卡器，并将其插入电脑。
2. 运行 BalenaEtcher用于写入镜像到SD 卡。
3. 在 BalenaEtcher 窗口中, 首先点击 "从文件烧录" 来选择镜像文件。
4. 选择完镜像文件后在第二栏选择需要写入的设备。
5. 两项都选择完以后点击"Flash"写入镜像。
6. 在等待一段时间后会显示烧录已完成。

![BalenaEtcher烧录流程](./image%20for%20flash/balenaetcher-flashing-guide.png)

### 通过SD卡启动系统

在写入镜像完成后将SD 卡插入如图所示卡槽中。
![](./image%20for%20flash/lpi4a5.png)

需要先将hdmi线（如果有外接显示器需求）进行连接，然后将随箱附赠的USB-A接口到USB-C接口的数据线中的C口一端接入到开发板上，另一端接入至少5V2A 输出的 USB 电源上，即可启动。

## 从 eMMC 启动

从eMMC启动镜像时，刷写镜像的途径分为连接串口进行刷写与不连接串口进行刷写两种情况。考虑到接入串口进行刷写不是必须行为，所以默认是使用不连接串口的刷写方式，如果手上有串口线的情况下也可以选择查看连接串口刷写的部分。其中进行的操作有些许区别，如您想连接串口线刷机，请参考[Linux刷写教程](./licheepi4a.md)中的相关章节。

请注意！从 eMMC 启动前应当先取出 SD Card！

### 准备工作

#### 安装镜像刷写工具

从 eMMC 启动需要将 u-boot 文件、boot 文件以及 root 文件通过 fastboot 工具刷入eMMC中，所以需要先确认是否已安装 fastboot。

您可以使用类似Everything的索引工具查找您的电脑上是否已安装了`fastboot.exe`，如果没有，请下载[Android SDK平台工具](https://developer.android.google.cn/tools/releases/platform-tools?hl=zh-cn#downloads)并将其解压到合适的位置。

在包含`fastboot.exe`的文件夹中打开Powershell，运行`.\fastboot.exe --version`，判断`fastboot.exe`是否能够正常运行。

![fastboot工具检测](./image%20for%20flash/fastboot_tool_detection.png)

如果如上图所示能够正常回显版本号则证明安装成功。

#### 获取镜像

通过上述链接下载 LicheePi4A 的系统镜像。

**注意**：LicheePi4A 不同的内存版本的 uboot 文件不通用，请根据您的核心板的板卡版本选择对应镜像

|内存存储组合|对应的uboot镜像|
|---|---|
|8G RAM + 8G eMMC|u-boot-with-spl-lpi4a-main_8gemmc.bin|
|8G RAM + 32G eMMC|u-boot-with-spl-lpi4a-main.bin|
|16G RAM|u-boot-with-spl-lpi4a-16g-main.bin|

如果无法确认核心板的规格，可以扫描核心板上的二维码进行查看。LicheePi4A板卡发售时，在核心板与底板上都会有一张二维码贴纸，在扫描核心板的二维码贴纸后会显示核心板的内存+存储配置。

例如在 16G RAM + 128G 板卡上，贴纸在如图所示的部分

![core-card](./image%20for%20flash/core-card.png)

通过扫描二维码后显示如下

![Core board-info](./image%20for%20flash/card-info.png)

扫描后的结果中，第二部分的数字便是核心板的内存+存储配置。

确认好板卡规格后，下载、校验并解压对应的 uboot、boot以及root文件（uboot文件不需要解压）。这部分可参考上面的“从SD卡启动”章节。

![下载得到的镜像文件](./image%20for%20flash/downloaded_image.png)

#### 连接板卡并打入驱动

按住板卡上的BOOT键后，将靠近BOOT键的Type-C口接入电脑，板卡会进入刷写模式。

在Windows徽标右键，打开设备管理器，如果在“其他设备”处看到“USB download gadget”，即表明设备已被正确识别。但是未安装驱动程序。

为了打入fastboot驱动，需要下载[Google USB驱动（需要代理）](https://dl.google.com/android/repository/usb_driver_r13-windows.zip)，下载并解压到某一位置。

1. 右键设备管理器中的“USB download gadget”，点击“更新驱动程序”
2. 选择“浏览我的电脑以查找驱动程序”
![更新驱动程序步骤2](./image%20for%20flash/driver-update-step2.png)
3. 选择“让我从计算机上的可用驱动程序列表中选取”
4. 选中“显示所有设备”，并点击“下一步”
![更新驱动程序步骤4](./image%20for%20flash/driver-update-step-4.png)
5. 点击“从磁盘安装”
6. 点击“浏览”，选中Google USB驱动下的inf文件，点击确定
![更新驱动程序步骤6](./image%20for%20flash/driver-update-step-6.png)
7. 选中“Android ADB Interface”，点击“下一步”，在弹出对话框中点击“是”，在弹出的Windows安全中心对话框中点击“安装”
![更新驱动程序步骤7](./image%20for%20flash/driver-update-step7.png)
8. 成功安装fastboot驱动
![更新驱动程序步骤8](./image%20for%20flash/driver_update_step8.png)

若上述步骤出现问题，请回到设备管理器找到该设备，点击“卸载驱动程序”，然后重新插拔开发板并重试。

回到包含`fastboot.exe`的Powershell终端，输入下面的命令，程序应当输出一行信息代表有一个设备已经连接。

```powershell
.\fastboot.exe devices
```

![fastboot设备检测](./image%20for%20flash/fastboot_device_detection.png)

```powershell
.\fastboot.exe flash ram .\u-boot-with-spl-lpi4a-16g.bin # 替换为您的板卡规格对应的 uboot 文件的路径，可在资源管理器中将文件拖放到终端以快捷输入文件的路径
.\fastboot reboot
```

![刷写uboot进内存](./image%20for%20flash/uboot_memory_flash.png)


然后再进行镜像文件的刷写

**注意**：有少部分的板卡在执行命令后，设备管理器会检测到错误的设备，而不是`Android ADB Interface`。这是由于uboot的USB VID和PID改变所致，常见于从原厂uboot刷入RevyOS uboot时。卸载设备并重新安装驱动程序即可解决。

```powershell
# 以下三行替换为您的板卡规格对应的 uboot boot root 文件的路径，可在资源管理器中将文件拖放到终端以快捷输入文件的路径
.\fastboot.exe flash uboot u-boot-with-spl-lpi4a-16g.bin
.\fastboot.exe flash boot boot-lpi4a-20240720_171951.ext4
.\fastboot.exe flash root root-lpi4a-20240720_171951.ext4
```

![fastboot刷入系统](./image%20for%20flash/fastboot_installation_guide.png)

其中 uboot 文件和 boot 文件刷写较快，root 文件需要大约5分钟才能刷写完成。如果在刷写 root 文件时并非是30+的数据块，而是2000+或是3000+，那么证明前面的刷写操作有误，在此情况下写入完成后也无法启动镜像，请重新进行刷写操作。

至此镜像刷写完成，可以通过重新拔插电源线的方式启动系统。

### 用户登录

下面是默认的系统账户以及密码

- 登录账户：debian
- 账户密码：debian

在初次启动镜像时可使用以上的用户密码进行登录。

出于安全性考虑，请在初次登录后一定修改密码，避免出现问题。