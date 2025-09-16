# Debian 软件包构建流程

## 宿主 debian

```bash
# qemu-user 下编译
sudo apt update
sudo apt install -y \
	sbuild buildd qemu-system-misc qemu-user-static binfmt-support \
	ca-certificates apt-transport-https devscripts mmdebstrap

# native
sudo apt install -y \
	sbuild buildd ca-certificates apt-transport-https devscripts mmdebstrap

# 修正宿主的debian-ports证书相关问题 现阶段可能不需要了
wget https://mirror.sjtu.edu.cn/debian/pool/main/d/debian-ports-archive-keyring/debian-ports-archive-keyring_2023.02.01_all.deb
sudo dpkg -i ./debian-ports-archive-keyring_2023.02.01_all.deb


# sbuild 增加当前用户免root
sudo sbuild-adduser $USER
```

## 创建打包环境


```bash
export SUFFIX=revyos-sbuild
sudo sbuild-createchroot --debootstrap=debootstrap --arch=riscv64 \
	--chroot-suffix=-$SUFFIX \
	--keyring='' \
	--no-deb-src \
	--include=debian-ports-archive-keyring,ca-certificates,apt-transport-https,eatmydata \
	--extra-repository="deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-addons/ revyos-addons main" \
	--extra-repository="deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-base/ sid main contrib non-free non-firmware" \
	sid /srv/chroot/sid-riscv64-$SUFFIX \
	https://mirror.iscas.ac.cn/revyos/revyos-base/

# 修正环境相关问题
sudo sed -i 's/deb http/deb [trusted=yes] http/g' /srv/chroot/sid-riscv64-$SUFFIX/etc/apt/sources.list
sudo rm -rf /srv/chroot/sid-riscv64-$SUFFIX/var/lib/apt/lists/*
echo "command-prefix=eatmydata" | sudo tee -a /etc/schroot/chroot.d/sid-riscv64-$SUFFIX-*

# 调整source顺序 - 目的是同版本使用addons仓库的
# 编辑sources.list 确保以下顺序
deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-addons/ revyos-addons main
deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-base/ sid main contrib non-free non-free-firmware
```

## 构建命令


```bash
sbuild --arch=riscv64 -d sid -c sid-riscv64-revyos-sbuild xxx.dsc
```

# 手动编译内核

支持架构：`x86_64` `riscv64`

`x86_64` 支持工具链：
* `6.6.0` Xuantie-900 Linux 6.6.0 (暂不能编译)
* `5.10.0` Xuantie-900 Linux 5.10.0 (暂不能编译)
* `13` 主线 RISC-V GCC 13交叉编译器
* `14` 主线 RISC-V GCC 14交叉编译器（默认）

`riscv64` 支持工具链：
* `rv` 主线 GCC 编译器

通过 `TOOLCHAIN_VERSION` 变量选择要使用的编译器

## 使用方法

```bash
git clone https://github.com/KamijoToma/xuantie-kernel-docker
cd xuantie-kernel-docker
docker build --build-arg TOOLCHAIN_VERSION=14 -t xuantie900:linux14 . # 根据支持架构确定 TOOLCHAIN_VERSION 参数
docker run -it --rm -v LOCAL_PATH:/output xuantie900:linux14 bash # LOCAL_PATH 为编译好的内核存放目录
./mkkernel_x64.sh # 根据 TOOLCHAIN_VERSION 配置选择 mkkernel_xuantie.sh 或 mkkernel_riscv64.sh
```

整个过程执行完成后，构建好的内核deb包将会被拷贝到 `LOCAL_PATH` 指定的目录中，然后使用 `dpkg` 安装即可。

```bash
sudo dpkg -i [PACKAGE]
```

编译过程会产生多个结果：
* linux-headers.deb(需要编译内核模块或内核开发时安装)
* linux-image-dbg.deb(调试符号，需要调试内核时安装)
* linux-image.deb(内核，必装)
* linux-libc-dev.deb(libc接口，一般不安装，使用通用版即可)

## 注意事项

1. 如需更改编译的版本，可在进入docker环境（输入 `bash` ）后自由修改
2. `x86_64` 环境下交叉编译出的 `linux-header` 包可能包含 `x86_64` 的头文件。如需进行内核开发或使用如 `zfs` 之类的 DKMS 模块，请在 RISC-V 环境下使用 `TOOLCHAIN_VERSION=rv` 编译。