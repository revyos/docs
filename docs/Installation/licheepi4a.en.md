# LicheePi 4A Image Flashing Guide

The LicheePi 4A board supports booting from both SD card and eMMC. Below are instructions for flashing RevyOS images for each method.

**Environment**: Ubuntu 22.04

---

## Booting from SD Card

> **Note:** Ensure the dip switch is set for eMMC boot, even when booting from an SD card.

### Preparation

#### Hardware

- A MicroSD card reader
- A MicroSD card

#### Required Tools

Install `zstd` for decompressing the image:

```bash
apt install zstd
```

#### Downloading the Image

Download the system image starting with `sdcard-` for LicheePi4A from the [RevyOS mirror site](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240720/).

Decompress the downloaded image file:

```bash
unzstd sdcard-lpi4a-20240720_171951.img.zst
```

### Writing the Image to the MicroSD Card with BalenaEtcher

Install BalenaEtcher from official website [https://etcher.balena.io/](https://etcher.balena.io/).

1. Insert the SD card into the reader and connect it to the computer.
2. Open BalenaEtcher, click "Flash from file," and select the `.img` file.
   ![Select image file](./image%20for%20flash/lpi4a1.png)
3. In the second field, select the target SD card.
   ![Select target device](./image%20for%20flash/lpi4a2.png)
4. Click "Flash" to begin the write process.
   ![Flash process](./image%20for%20flash/lpi4a3.png)
5. Wait for the flashing to complete. A success message will appear.
   ![Flash complete](./image%20for%20flash/lpi4a4.png)

### Writing the Image with dd

You **must** the device after `of=` is correct.
```bash
# sudo dd if=./sdcard-lpi4a-20240720_171951.img of=<Target Device> status=progress
# sync
```
After completed, you can boot from that SD card.

### System Boot

After flashing, insert the SD card into the slot on the board, as shown below.
   ![SD card slot](./image%20for%20flash/lpi4a5.png)

Connect the HDMI and power cables to start the system.

---

## Booting from eMMC

When booting from eMMC, RevyOS images are flashed to the eMMC storage using `fastboot`. There are two options: connecting with or without a serial interface. This guide provides instructions for both methods.\
You must eject SD card when booting from eMMC.

### Preparation

Flashing the image to eMMC requires U-Boot, boot, and root files to be flashed via `fastboot`. Ensure `fastboot` is installed:

```bash
apt install fastboot
```

If using a serial connection, install `minicom` to monitor the console:

```bash
apt install minicom
```

#### Downloading the Image

Download the necessary image files for LicheePi4A from the [RevyOS mirror site](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240720/). 

Make sure to choose the U-Boot file that matches your board model.

After downloading, decompress root and boot image with `unzstd`.

```bash
unzstd boot-lpi4a-20240720_171951.ext4.zst
unzstd root-lpi4a-20240720_171951.ext4.zst
```

### Flashing the Image to eMMC (Without Serial Connection)

1. Hold down the BOOT button on the board and connect it to the computer via USB. The board will enter flashing mode.

### Flashing the Image to eMMC (With Serial Connection)

1. Open `minicom` in a terminal to access the serial console:

   ```bash
   sudo minicom
   ```

2. Connect the USB end to the computer, and connect the Type-C interface on the board to the computer with a USB-Type-C cable.\
Connect the serial port like following image. In the red circle is GND, in the yellow circle is TX and in the green circle is RX. You have to connect TX to RX, RX to TX and GND to GND when connecting to your host device.

![](./image%20for%20flash/lpi4a6.png)


3. In the serial console, press any key to interrupt the boot process. Then, enter the following command:

   ```bash
   fastboot usb 0
   ```

4. In a new terminal window, navigate to the folder where the image files are stored, and execute the following flash commands:

   ```bash
   fastboot flash ram u-boot-with-spl-lpi4a-16g.bin # Replace with your device's uboot image
   fastboot reboot
   sleep 1
   fastboot flash uboot u-boot-with-spl-lpi4a-16g.bin
   fastboot flash boot boot-lpi4a-20240720_171951.ext4
   fastboot flash root root-lpi4a-20240720_171951.ext4
   ```

5. Monitor the flashing progress in the serial console.\
In serial you can see the image size and the being flashing partition in `cmd_parameter: boot, imagesize: 92886476` (In this guide we are flashing the boot image which has a size of 92886476 Bytes)
![](./image%20for%20flash/lpi4a7.png)

6. After flashing is complete, disconnect the USB-Type-C cable, connect the power cable, and boot into the system.

#### Some possible problems
If you can see download device in `lsusb`, but`fastboot` stuck at `< waiting for any device >`you can try run `fastboot` with root privilege.

---

### User Login

Default credentials for RevyOS:

- **Username**: debian
- **Password**: debian
