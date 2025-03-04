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
