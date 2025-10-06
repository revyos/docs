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

# Install revyos keyring
wget https://fast-mirror.isrc.ac.cn/revyos/trixie/revyos-addons/pool/main/r/revyos-keyring/revyos-keyring_2025.03.28_all.deb
sudo dpkg -i ./revyos-keyring_2025.03.28_all.deb

# Add current user to sbuild without root
sudo sbuild-adduser $USER
```

## Creating the Packaging Environment

### revyos v1.0 (only for TH1520)

```bash
cat << EOF | sudo sbuild-createchroot --debootstrap=mmdebstrap --arch=riscv64 \
	--chroot-suffix=-revyos-sbuild \
	--no-deb-src \
	--include=debian-ports-archive-keyring,ca-certificates,apt-transport-https,eatmydata,revyos-keyring \
	sid /srv/chroot/sid-riscv64-revyos-sbuild - 
deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-addons/ revyos-addons main
deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-base/ sid main contrib non-free non-free-firmware
EOF
sudo rm -rf /srv/chroot/sid-riscv64-revyos-sbuild/var/lib/apt/lists/*
echo "command-prefix=eatmydata" | sudo tee -a /etc/schroot/chroot.d/sid-riscv64-revyos-sbuild-*
```

### revyos v2.0 (for others)

```bash
export CODENAME=trixie
#export ARCH=amd64
export ARCH=riscv64
cat << EOF | sudo sbuild-createchroot --debootstrap=mmdebstrap --arch=${ARCH} \
	--chroot-suffix=-revyos-sbuild \
	--no-deb-src \
	--include=debian-archive-keyring,ca-certificates,apt-transport-https,eatmydata \
	${CODENAME} /srv/chroot/${CODENAME}-${ARCH}-revyos-sbuild - 
deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/trixie/dev/revyos-addons ${CODENAME} main
deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/trixie/revyos-base ${CODENAME} main contrib non-free non-free-firmware
EOF
sudo rm -rf /srv/chroot/${CODENAME}-${ARCH}-revyos-sbuild/var/lib/apt/lists/*
echo "command-prefix=eatmydata" | sudo tee -a /etc/schroot/chroot.d/${CODENAME}-${ARCH}-revyos-sbuild-*
```

## Build Command

### revyos v1.0 (only for TH1520)

```bash
sbuild --arch=riscv64 -d sid -c sid-riscv64-revyos-sbuild xxx.dsc
```

### revyos v2.0 (for others)

```bash
sbuild --arch=riscv64 -d trixie -c trixie-riscv64-revyos-sbuild xxx.dsc
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