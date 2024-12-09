# Flashing RevyOS Image onto LPI4A from macOS

## Step 1: Preparation

1. Install `android-platform-tools` using `brew` or an alternative method.
2. Download the correct U-Boot and RevyOS image files for your hardware model.
3. Connect your LPI4A development board to your Mac using both serial and USB connections.
4. Ensure your board is powered by a 12V power source.

### Download U-Boot and RevyOS Image

Visit the [RevyOS mirror site](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/) and navigate to the latest dated folder (e.g., `20240720`). Download the following files:

> **Note:** Ensure the files match your LPI4A hardware configuration, as the 8GB and 16GB models require different U-Boot files.

### Install Android Platform Tools

Use `brew` to install the tools:

```bash
brew install android-platform-tools
```

Verify `fastboot` is available by running:

```bash
yuiyuuhayashi@MacBook-Air ~ % fastboot usb 0
< waiting for any device >
```

## Step 2: Start Installation

1. Boot your LPI4A into the fastboot mode by entering `fastboot usb 0`. Ensure the board is properly connected via USB Type-C and powered by 12V.
2. On your Mac, execute the following command to flash U-Boot:

   ```bash
   fastboot flash uboot <filename>
   ```

3. After flashing, reboot with:

   ```bash
   fastboot reboot
   ```

   > If the board doesn’t reboot, perform a manual power cycle.

4. Re-enter fastboot mode on the development board and, on macOS, execute:

   ```bash
   fastboot flash root <filename>
   ```

5. Reboot again using:

   ```bash
   fastboot reboot
   ```

## Step 3: Log in to RevyOS

Once booted, log in with the following credentials:

```plaintext
Username: debian
Password: debian
```

After login, you can use `neofetch` or similar tools to verify the system version and other information.
