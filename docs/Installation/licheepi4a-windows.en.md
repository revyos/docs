# LicheePi4A Image Flashing Tutorial for Windows

This page provides a tutorial for flashing the LicheePi 4A image on Windows operating systems. If you want to flash the image on a Linux system, please click [LicheePi4A Image Flashing Tutorial](./licheepi4a.md). For other image flashing tutorials, please click the links in the table below.

| Supported Devices |                |
| ----------------- | -------------- |
| Milk-V Pioneer    | [Flashing Tutorial](https://docs.revyos.dev/Installation/milkv-pioneer/) |

## Attention!

Before following this tutorial, please compare your board with the image below to ensure it matches. Only proceed with the tutorial after confirming the match.

![LicheePi4A Example Image](./image%20for%20flash/lpi4a.png)

## Demonstration Environment

All image flashing operations in this tutorial use the following environment:

- Operating System: Windows 11 24H2 OS Build 26100.3194
- Architecture: x86_64
- LicheePi4A Board Specifications: 16G RAM + 128G eMMC

All operations in this tutorial are reproducible in this environment. If you encounter any issues while flashing the image in this environment, please refer to [this page](../issue.md) to submit an issue.

## Boot Methods Introduction

LicheePi4A currently supports two boot methods: [Booting from SD card](#sd-card) and [Booting from eMMC](#emmc). This tutorial provides instructions for both methods. Please click to jump to the section that matches your desired flashing method.

Please note that regardless of the flashing method used, existing user data will be lost. Make sure to back up your data before proceeding with the flashing process!

## Booting from SD card

Note! Booting from an SD card does not require changing the DIP switch! Set the DIP switch according to the eMMC settings!

![DIP Switch Example](./image%20for%20flash/Switch.png)

The DIP switch is located on the bottom of the board and can only be seen after removing the board. The correct setting should have both buttons aligned with the bottom.

**Note!** Some early versions of LicheePi4A boards do not have a DIP switch.

### Preparation

#### Obtaining the SD card image

Download the LicheePi4A SD card boot system image with the prefix `sdcard-` from the following links:

- [RevyOS20240720 (5.10 kernel)](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240720/)

- [RevyOS20250123 (6.6 kernel)](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250123/)

The 20240720 image uses the 5.10 kernel, which is currently in a more mature state and performs more stably in video encoding/decoding and various applications.

The 20250123 image uses the 6.6 kernel, which may have some unknown issues. Known issues include video stuttering and USB power loss, which are currently being fixed.

Please choose the appropriate image based on your needs after reading the above information.

Using the 20250123 image as an example:

There are two ways to download the image:

- Through web browsing. Simply click the link to download.

![Download image through web](./image%20for%20flash/web-download-windows.png)

- Through command line. Open PowerShell and run the following command:

```powershell
curl.exe -OL https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250123/sdcard-lpi4a-20250123_195216.img.zst
```

Wait for the progress to reach 100% to complete the download.

![Download image through command line](./image%20for%20flash/download-image-command-line-windows.png)

Both methods will result in a compressed image file named `sdcard-lpi4a-20250123_195216.img.zst`. Due to the possibility of transmission errors during download, it is recommended to perform a hash verification step to verify the accuracy of the image.

#### Image Verification (Optional, Recommended)

Open File Explorer, navigate to the folder containing the image file, right-click and select "Open in terminal"

![Select "Open in terminal" from the context menu](./image%20for%20flash/context_menu_terminal_open_windows.png)

Click to open the PowerShell terminal. Enter the following command to get the `md5sum.txt` checksum from the mirror site:

```powershell
curl.exe -L https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250123/md5sum.txt
```

This should display the theoretical checksums for various image files. Run the following command to calculate the local image checksum:

```powershell
Get-FileHash -Algorithm MD5 .\sdcard-lpi4a-20250123_195216.img.zst
```

![Verify image file checksum](./image%20for%20flash/checksum-verification-image.png)

Compare the two checksums, they should match. If not, you need to re-download the image.

#### Extracting the Image

The image is compressed with `zstd`, you can use compression tools like [PeaZip](https://peazip.github.io/) or [7-zip Zstd version](https://github.com/mcmilk/7-Zip-zstd) to extract it.

![Extract image using Peazip](./image%20for%20flash/peazip_extraction_illustration.png)

**Note**: After extraction, the image itself and the compressed file will occupy about **10.2GB** of space, please ensure you have enough space!

#### Hardware Preparation

Prepare a MicroSD card reader and a MicroSD card. There are currently compatibility issues with MicroSD cards. RevyOS provides a [list of tested MicroSD cards](https://github.com/revyos/revyos/blob/main/Installation/card%20list.md).

If your MicroSD card is not on the known working list and you encounter issues with flashing the image or booting after flashing, please refer to [this page](../issue.md) to submit an issue, and try following the [Booting from eMMC](#emmc) image flashing tutorial.

#### Using BalenaEtcher to Write the Image to MicroSD Card

Download the flashing tool BalenaEtcher from the official website [https://etcher.balena.io/](https://etcher.balena.io/). When downloading, please choose the file according to your machine's specifications. Choose [Etcher for Windows](https://github.com/balena-io/etcher/releases/download/v1.19.25/balenaEtcher-1.19.25.Setup.exe) to download and install.

![BalenaEtcher Version Selection](./image%20for%20flash/balenaetcher-version-selection.png)

1. Insert the SD card into the card reader and plug it into your computer.
2. Run BalenaEtcher to write the image to the SD card.
3. In the BalenaEtcher window, first click "Flash from file" to select the image file.
4. After selecting the image file, choose the device to write to in the second column.
5. After selecting both items, click "Flash" to write the image.
6. After waiting for a while, it will show that the flashing is complete.

![BalenaEtcher Flashing Process](./image%20for%20flash/balenaetcher-flashing-guide.png)

### Booting the System from SD Card

After writing the image, insert the SD card into the slot shown in the image.
![](./image%20for%20flash/lpi4a5.png)

First connect the HDMI cable (if you need an external display), then connect the USB-C end of the USB-A to USB-C data cable (included in the box) to the development board, and the other end to a USB power supply with at least 5V2A output to start.

## Booting from eMMC

When booting the image from eMMC, there are two ways to flash the image: with or without connecting to a serial port. Considering that connecting to a serial port is not necessary, the default method is flashing without connecting to a serial port. If you have a serial cable, you can also choose to refer to the section on flashing with a serial connection. There are some differences in the operations involved. If you want to flash with a serial cable connected, please refer to the relevant section in the [Linux Flashing Tutorial](./licheepi4a.md).

Please note! Remove the SD Card before booting from eMMC!

### Preparation

#### Installing the Image Flashing Tool

Booting from eMMC requires flashing u-boot files, boot files, and root files into eMMC using the fastboot tool, so you need to first confirm whether fastboot is installed.

You can use an indexing tool like Everything to search for `fastboot.exe` on your computer. If you don't have it, please download the [Android SDK Platform Tools](https://developer.android.google.cn/tools/releases/platform-tools?hl=zh-cn#downloads) and extract it to an appropriate location.

Open PowerShell in the folder containing `fastboot.exe`, run `.\fastboot.exe --version` to determine if `fastboot.exe` can run normally.

![Fastboot Tool Detection](./image%20for%20flash/fastboot_tool_detection.png)

If it can display the version number normally as shown above, it proves the installation was successful.

#### Obtaining the Image

Download the LicheePi4A system image through the above links.

**Note**: The uboot files for different memory versions of LicheePi4A are not interchangeable. Please choose the corresponding image according to your core board version.

|Memory Storage Combination|Corresponding uboot Image|
|---|---|
|8G RAM + 8G eMMC|u-boot-with-spl-lpi4a-main_8gemmc.bin|
|8G RAM + 32G eMMC|u-boot-with-spl-lpi4a-main.bin|
|16G RAM|u-boot-with-spl-lpi4a-16g-main.bin|

If you can't confirm the specifications of the core board, you can scan the QR code on the core board to check. When LicheePi4A boards are sold, there will be a QR code sticker on both the core board and the base board. After scanning the QR code sticker on the core board, it will display the memory + storage configuration of the core board.

For example, on a 16G RAM + 128G board, the sticker is in the part shown in the image

![core-card](./image%20for%20flash/core-card.png)

The display after scanning the QR code is as follows

![Core board-info](./image%20for%20flash/card-info.png)

In the result after scanning, the second part of the number is the memory + storage configuration of the core board.

After confirming the board specifications, download, verify, and extract the corresponding uboot, boot, and root files (the uboot file does not need to be extracted). This part can refer to the "Booting from SD Card" section above.

![Downloaded image files](./image%20for%20flash/downloaded_image.png)

#### Connecting the Board and Installing the Driver

While holding down the BOOT button on the board, connect the Type-C port near the BOOT button to the computer. The board will enter flashing mode.

Right-click on the Windows logo, open Device Manager. If you see "USB download gadget" under "Other devices", it means the device has been correctly recognized. However, the driver is not installed.

To install the fastboot driver, you need to download the [Google USB Driver (proxy required)](https://dl.google.com/android/repository/usb_driver_r13-windows.zip), download and extract it to a location.

1. Right-click on "USB download gadget" in Device Manager, click "Update driver"
2. Choose "Browse my computer for drivers"
![Driver Update Step 2](./image%20for%20flash/driver-update-step2.png)
3. Select "Let me pick from a list of available drivers on my computer"
4. Select "Show All Devices" and click "Next"
![Driver Update Step 4](./image%20for%20flash/driver-update-step-4.png)
5. Click "Have Disk"
6. Click "Browse", select the inf file under the Google USB Driver, click OK
![Driver Update Step 6](./image%20for%20flash/driver-update-step-6.png)
7. Select "Android ADB Interface", click "Next", click "Yes" in the pop-up dialog, click "Install" in the Windows Security Center dialog that pops up
![Driver Update Step 7](./image%20for%20flash/driver-update-step7.png)
8. Successfully installed the fastboot driver
![Driver Update Step 8](./image%20for%20flash/driver_update_step8.png)

If there are problems with the above steps, please go back to Device Manager, find the device, click "Uninstall driver", then unplug and replug the development board and try again.

Return to the PowerShell terminal containing `fastboot.exe`, enter the following command, the program should output one line of information indicating that one device is connected.

```powershell
.\fastboot.exe devices
```

![Fastboot Device Detection](./image%20for%20flash/fastboot_device_detection.png)

```powershell
.\fastboot.exe flash ram .\u-boot-with-spl-lpi4a-16g.bin # Replace with the path to the uboot file corresponding to your board specifications, you can drag and drop the file in File Explorer to the terminal to quickly input the file path
.\fastboot reboot
```

![Flash uboot into memory](./image%20for%20flash/uboot_memory_flash.png)

Then proceed with flashing the image files

**Note**: For a small number of boards, after executing the command, Device Manager may detect an incorrect device instead of `Android ADB Interface`. This is due to the change in USB VID and PID of uboot, common when flashing from factory uboot to RevyOS uboot. Uninstall the device and reinstall the driver to resolve this.

```powershell
# Replace the following three lines with the paths to the uboot, boot, root files corresponding to your board specifications, you can drag and drop the files in File Explorer to the terminal to quickly input the file paths
.\fastboot.exe flash uboot u-boot-with-spl-lpi4a-16g.bin
.\fastboot.exe flash boot boot-lpi4a-20240720_171951.ext4
.\fastboot.exe flash root root-lpi4a-20240720_171951.ext4
```

![Fastboot System Installation Guide](./image%20for%20flash/fastboot_installation_guide.png)

The uboot file and boot file flash quickly, while the root file takes about 5 minutes to complete. If when flashing the root file, it's not 30+ data blocks but 2000+ or 3000+, it indicates that the previous flashing operation was incorrect. In this case, the image will not boot after writing is complete. Please perform the flashing operation again.

At this point, the image flashing is complete, and you can start the system by unplugging and plugging in the power cord.

### User Login

Below are the default system account and password

- Login account: debian
- Account password: debian

You can use the above user password to log in when first booting the image.

**For security reasons, please be sure to change the password after the first login to avoid problems.**