# Debian Package Build Process

## Host Debian

```bash
# Compiling under qemu-user
sudo apt update
sudo apt install -y \
	sbuild buildd qemu-system-misc qemu-user-static binfmt-support \
	ca-certificates apt-transport-https devscripts mmdebstrap

# Native
sudo apt install -y \
	sbuild buildd ca-certificates apt-transport-https devscripts mmdebstrap

# Fix debian-ports certificate issues on the host (may not be necessary at this stage)
wget https://mirror.sjtu.edu.cn/debian/pool/main/d/debian-ports-archive-keyring/debian-ports-archive-keyring_2023.02.01_all.deb
sudo dpkg -i ./debian-ports-archive-keyring_2023.02.01_all.deb

# Add current user to sbuild without root
sudo sbuild-adduser $USER
```

## Creating the Packaging Environment


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

# Fix environment-related issues
sudo sed -i 's/deb http/deb [trusted=yes] http/g' /srv/chroot/sid-riscv64-$SUFFIX/etc/apt/sources.list
sudo rm -rf /srv/chroot/sid-riscv64-$SUFFIX/var/lib/apt/lists/*
echo "command-prefix=eatmydata" | sudo tee -a /etc/schroot/chroot.d/sid-riscv64-$SUFFIX-*

# Adjust source order - to use the addons repository for the same version
# Edit sources.list to ensure the following order
deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-addons/ revyos-addons main
deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-base/ sid main contrib non-free non-free-firmware
```

## Build Command


```bash
sbuild --arch=riscv64 -d sid -c sid-riscv64-revyos-sbuild xxx.dsc
```

# Manual Kernel Compilation

Supported architectures: `x86_64` `riscv64`

`x86_64` supported toolchains:
* `6.6.0` Xuantie-900 Linux 6.6.0 (Currently not compilable)
* `5.10.0` Xuantie-900 Linux 5.10.0 (Currently not compilable)
* `13` Mainline RISC-V GCC 13 cross-compiler
* `14` Mainline RISC-V GCC 14 cross-compiler (Default)

`riscv64` supported toolchains:
* `rv` Mainline GCC compiler

Select the compiler to use through the `TOOLCHAIN_VERSION` variable.

## Usage

```bash
git clone https://github.com/KamijoToma/xuantie-kernel-docker
cd xuantie-kernel-docker
docker build --build-arg TOOLCHAIN_VERSION=14 -t xuantie900:linux14 . # Choose TOOLCHAIN_VERSION based on supported architecture
docker run -it --rm -v LOCAL_PATH:/output xuantie900:linux14 bash # LOCAL_PATH is the directory to store the compiled kernel
./mkkernel_x64.sh # Choose mkkernel_xuantie.sh or mkkernel_riscv64.sh based on TOOLCHAIN_VERSION configuration
```

After the entire process is completed, the built kernel deb packages will be copied to the directory specified by `LOCAL_PATH`, which can then be installed using `dpkg`.

```bash
sudo dpkg -i [DEB PACKAGE]
```

The compilation process will generate several results:
* linux-headers.deb (install when compiling kernel modules or for kernel development)
* linux-image-dbg.deb (debug symbols, install when debugging the kernel)
* linux-image.deb (kernel, required)
* linux-libc-dev.deb (libc interface, generally not installed, using the generic version is sufficient)

## Notes

1. If you need to change the version being compiled, you can freely modify it after entering the docker environment (by typing `bash`)
2. The `linux-header` package cross-compiled in an `x86_64` environment may contain `x86_64` header files. If you need to perform kernel development or use DKMS modules like `zfs`, please compile using `TOOLCHAIN_VERSION=rv` in a RISC-V environment.