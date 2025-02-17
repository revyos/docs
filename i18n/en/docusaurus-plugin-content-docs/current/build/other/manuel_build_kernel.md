# Manuel Build Kernel

Build Toolchain Download link:

https://occ-oss-prod.oss-cn-hangzhou.aliyuncs.com/resource//1663142514282/Xuantie-900-gcc-linux-5.10.4-glibc-x86_64-V2.6.1-20220906.tar.gz

Assuming Build environment is `Ubuntu` or `Debian`

Install dependency:
```
sudo apt install -y gdisk dosfstools g++-12-riscv64-linux-gnu build-essential libncurses-dev gawk flex bison openssl libssl-dev tree dkms libelf-dev libudev-dev libpci-dev libiberty-dev autoconf device-tree-compiler
```

Uncompress Toolchain (Assuming install to /opt):
```
tar -xvf Xuantie-900-gcc-linux-5.10.4-glibc-x86_64-V2.6.1-20220906.tar.gz -C /opt
```

Setup environment variables (Assuming Toolchain is in /opt):
```
export PATH="/opt/Xuantie-900-gcc-linux-5.10.4-glibc-x86_64-V2.6.1/bin:$PATH"
export CROSS_COMPILE=riscv64-unknown-linux-gnu-
export ARCH=riscv
```

Download code using git:
```
# Kernel repo
git clone https://github.com/revyos/thead-kernel.git
```

Build Kernel:
```
# make install target directory
mkdir rootfs && mkdir rootfs/boot

# after mkdir, the directory tree should look like this:
# .. << current workdir
# |-- rootfs
#     |-- boot
# |-- thead-kernel
#     |-- ...

# enter kernel directory and start build
cd thead-kernel
make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv revyos_defconfig
make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv -j$(nproc)
make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv -j$(nproc) dtbs
sudo make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv INSTALL_MOD_PATH=../rootfs/ modules_install -j$(nproc)
sudo make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv INSTALL_PATH=../rootfs/boot zinstall -j$(nproc)
# build perf (if needed)
make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv LDFLAGS=-static NO_LIBELF=1 NO_JVMTI=1 VF=1 -C tools/perf/
sudo cp -v tools/perf/perf ../rootfs/sbin/perf-thead
# Install Kernel
sudo cp -v arch/riscv/boot/Image ../rootfs/boot/
# Install DTB
sudo cp -v arch/riscv/boot/dts/thead/light-lpi4a.dtb ../rootfs/boot/
sudo cp -v arch/riscv/boot/dts/thead/light-lpi4a-dsi0-hdmi.dtb ../rootfs/boot/
```

After all build steps, you can copy or override kernel and module files on your board using files in "rootfs", If you replace kernel with new one please make sure you also replace with corresponding kernel module folder.
