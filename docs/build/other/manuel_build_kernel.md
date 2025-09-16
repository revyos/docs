<!-- # 手动编译内核

内核工具链下载地址：

https://occ-oss-prod.oss-cn-hangzhou.aliyuncs.com/resource//1663142514282/Xuantie-900-gcc-linux-5.10.4-glibc-x86_64-V2.6.1-20220906.tar.gz

这里假设编译环境为 `Ubuntu` 或 `Debian`

安装依赖：
```
sudo apt install -y gdisk dosfstools g++-12-riscv64-linux-gnu build-essential libncurses-dev gawk flex bison openssl libssl-dev tree dkms libelf-dev libudev-dev libpci-dev libiberty-dev autoconf device-tree-compiler
```

解压工具链（这里解压到/opt）：
```
tar -xvf Xuantie-900-gcc-linux-5.10.4-glibc-x86_64-V2.6.1-20220906.tar.gz -C /opt
```

设置环境变量，将工具链加入环境变量中（假设工具链放在/opt中）：
```
export PATH="/opt/Xuantie-900-gcc-linux-5.10.4-glibc-x86_64-V2.6.1/bin:$PATH"
export CROSS_COMPILE=riscv64-unknown-linux-gnu-
export ARCH=riscv
```

使用git下载内核代码：
```
# 内核仓库
git clone https://github.com/revyos/thead-kernel.git
```

编译内核：
```
# 创建安装目标目录
mkdir rootfs && mkdir rootfs/boot

# 目录创建完成后，目录结构应该看起来是这样:
# .. << 当前工作路径
# |-- rootfs
#     |-- boot
# |-- thead-kernel
#     |-- ...

# 进入内核代码目录，开始构建
cd thead-kernel
make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv revyos_defconfig
make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv -j$(nproc)
make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv -j$(nproc) dtbs
sudo make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv INSTALL_MOD_PATH=../rootfs/ modules_install -j$(nproc)
sudo make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv INSTALL_PATH=../rootfs/boot zinstall -j$(nproc)
# 构建perf（如果需要的话）
make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv LDFLAGS=-static NO_LIBELF=1 NO_JVMTI=1 VF=1 -C tools/perf/
sudo cp -v tools/perf/perf ../rootfs/sbin/perf-thead
# 安装内核到安装目标目录
sudo cp -v arch/riscv/boot/Image ../rootfs/boot/
# 安装设备树到安装目标目录
sudo cp -v arch/riscv/boot/dts/thead/light-lpi4a.dtb ../rootfs/boot/
sudo cp -v arch/riscv/boot/dts/thead/light-lpi4a-dsi0-hdmi.dtb ../rootfs/boot/
```

之后只需要把rootfs中内容拷贝或覆盖到对应目录即可，注意内核Image和内核module目录一定要对应，不然会因缺失内核模块导致外设功能失效。 -->

# 手动编译内核

支持架构：`x86_64` `riscv64`

`x86_64` 支持工具链：
* `6.6.0` Xuantie-900 Linux 6.6.0 (暂不能编译)
* `5.10.0` Xuantie-900 Linux 5.10.0 (暂不能编译)
* `13` 主线 RISC-V GCC 13交叉编译器
* `14` 主线 RISC-V GCC 14交叉编译器（默认）

`riscv64` 支持工具链：
* `rv` 主线 GCC 编译器

通过`TOOLCHAIN_VERSION`变量选择要使用的编译器

## 使用方法

```bash
git clone https://github.com/KamijoToma/xuantie-kernel-docker
cd xuantie-kernel-docker
docker build --build-arg TOOLCHAIN_VERSION=14 -t xuantie900:linux14 . # 根据支持架构确定 TOOLCHAIN_VERSION 参数
docker run -it --rm -v LOCAL_PATH:/output xuantie900:linux14 bash # LOCAL_PATH 为编译好的内核存放目录
./mkkernel_x64.sh # 根据 TOOLCHAIN_VERSION 配置选择 mkkernel_xuantie.sh 或 mkkernel_riscv64.sh
```

整个过程执行完成后，构建好的内核deb包将会被拷贝到`LOCAL_PATH`指定的目录中，然后使用`dpkg`安装即可。

```bash
sudo dpkg -i [PACKAGE]
```

编译过程会产生多个结果：
* linux-headers.deb(需要编译内核模块或内核开发时安装)
* linux-image-dbg.deb(调试符号，需要调试内核时安装)
* linux-image.deb(内核，必装)
* linux-libc-dev.deb(libc接口，一般不安装，使用通用版即可)

## 注意事项

1. 如需更改编译的版本，可在进入docker环境（输入`bash`）后自由修改
2. `x86_64`环境下交叉编译出的`linux-header`包可能包含`x86_64`的头文件。如需进行内核开发或使用如`zfs`之类的DKMS模块，请在RISC-V环境下使用`TOOLCHAIN_VERSION=rv`编译。