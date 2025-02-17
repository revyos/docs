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

### revyos-c910v

```bash
export SUFFIX=revyos-c910v-sbuild
sudo sbuild-createchroot --debootstrap=debootstrap --arch=riscv64 \
	--chroot-suffix=-$SUFFIX \
	--keyring='' \
	--no-deb-src \
	--include=debian-ports-archive-keyring,ca-certificates,apt-transport-https,eatmydata \
	--extra-repository="deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-c910v/ revyos-c910v main contrib non-free" \
	--extra-repository="deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-addons/ revyos-addons main" \
	sid /srv/chroot/sid-riscv64-$SUFFIX \
	https://mirror.iscas.ac.cn/revyos/revyos-base/

# Fix environment-related issues
sudo sed -i 's/deb http/deb [trusted=yes] http/g' /srv/chroot/sid-riscv64-$SUFFIX/etc/apt/sources.list
sudo rm -rf /srv/chroot/sid-riscv64-$SUFFIX/var/lib/apt/lists/*
echo "command-prefix=eatmydata" | sudo tee -a /etc/schroot/chroot.d/sid-riscv64-$SUFFIX-*

# Adjust source order - to use the c910v repository for the same version
# Edit sources.list to ensure the following order
deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-c910v/ revyos-c910v main contrib non-free
deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-addons/ revyos-addons main
deb [trusted=yes] https://mirror.iscas.ac.cn/revyos/revyos-base/ sid main contrib non-free non-free-firmware
```

## Build Command

### revyos-c910v

```bash
sbuild --arch=riscv64 -d sid -c sid-riscv64-revyos-c910v-sbuild xxx.dsc
```
