# Installing RevyOS on the Milk-V Pioneer

## 1. Preparation

### Required Tools

- MicroSD card
- MicroSD card reader
- NVMe SSD reader

### Downloading the Image

RevyOS image directory: [Download Link](https://mirror.iscas.ac.cn/revyos/extra/images/sg2042/)

Latest image version: [20240819](https://mirror.iscas.ac.cn/revyos/extra/images/sg2042/20240819/)

Example directory for the 20240819 image:

![Image Directory](image%20for%20flash/pioneer-image-dir.png)

RevyOS requires flashing both firmware and system files, as listed below:

- **Firmware files**:
  - `firmware_single_sg2042-v6.6-lts-v0p7.bin` (for SPI Flash)
  - `firmware_single_sg2042-v6.6-lts-v0p7.img` (for SD card)

- **System file**:
  - `revyos-pioneer-20240819-154656.img.zst`

---

## 2. Flashing the Firmware

### Flashing Options

Firmware files can be stored on either the SPI Flash or an SD card, so the method will vary accordingly.

### Flashing Firmware to SD Card

**Operating System**: Ubuntu 22.04

#### Using BalenaEtcher

1. Select the file `firmware_single_sg2042-v6.6-lts-v0p7.img`.
2. Choose the target SD card.
3. Click "Flash" to start the process.

#### Using Command Line

Insert the SD card into a reader connected to your computer, then verify the device path.

Navigate to the directory with `firmware_single_sg2042-v6.6-lts-v0p7.img` and flash it with the following command:

```bash
sudo dd if=firmware_single_sg2042-v6.6-lts-v0p7.img of=/dev/sda bs=4M status=progress
```

Replace `of=/dev/sda` with your specific device path if different.

After flashing, use `sync` to ensure data is fully written to the SD card.

### Flashing Firmware to SPI Flash

**Operating System**: RevyOS0819

> **Note**: For first-time installation, using an SD card to store the firmware is recommended.

#### Using Command Line

Flashing to the SPI Flash requires installing utilities and loading the `mtd` module.

1. Install necessary packages:

   ```bash
   sudo apt install mtd-utils
   sudo modprobe mtdblock
   ```

2. Download the firmware file:

   ```bash
   wget https://mirror.iscas.ac.cn/revyos/extra/images/sg2042/20240819/firmware_single_sg2042-v6.6-lts-v0p7.bin
   ```

3. Navigate to the directory where `firmware_single_sg2042-v6.6-lts-v0p7.bin` was downloaded and run:

   ```bash
   sudo flashcp -v firmware_single_sg2042-v6.6-lts-v0p7.bin /dev/mtd1
   ```

Flashing to SPI Flash is now complete.

---

## 3. Flashing the RevyOS Image

**Operating System**: Ubuntu 22.04

### Using Command Line

1. Decompress the `revyos-pioneer-20240819-154656.img.zst` file:

   ```bash
   unzstd revyos-pioneer-20240819-154656.img.zst
   ```

   This produces the `revyos-pioneer-20240819-154656.img` file.

2. Insert the NVMe SSD into the reader and connect it to your computer, then confirm the device path.

3. In the directory containing `revyos-pioneer-20240819-154656.img`, flash the image to the NVMe SSD:

   ```bash
   sudo dd if=revyos-pioneer-20240819-154656.img of=/dev/nvme0n1 bs=4M status=progress
   ```

   Replace `of=/dev/nvme0n1` with the correct device path if different.

4. After flashing, use `sync` to ensure the data is fully written to the NVMe SSD.


