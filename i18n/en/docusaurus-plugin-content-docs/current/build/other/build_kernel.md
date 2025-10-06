# Build Kernel

Supported Architectures: `x86_64` `riscv64`

`x86_64` Supported Toolchains:
* `3.2.0` Xuantie-900 Linux 6.6.0 v3.2.0
* `14` Mainline RISC-V GCC 14 Cross Compiler (default)

`riscv64` Supported Toolchains:
* `rv` Mainline GCC Compiler

Select the compiler to use via the `TOOLCHAIN_VERSION` variable

## Usage

```bash
git clone https://github.com/revyos/xuantie-kernel-docker
cd xuantie-kernel-docker
docker build --build-arg TOOLCHAIN_VERSION=14 -t xuantie900:linux14 .
docker run -it --rm -v LOCAL_PATH:/output xuantie900:linux14 bash
./mkkernel_x64.sh # use mkkernel_xuantie.sh or mkkernel_riscv64.sh depend on your TOOLCHAIN_VERSION
```

The built kernel deb packages will be copied to the directory specified by `LOCAL_PATH`, and then you can install them using `dpkg`.

The compilation process will produce several results:
* linux-headers.deb (Install when compiling kernel modules or for kernel development)
* linux-image-dbg.deb (Debug symbols, install when debugging the kernel)
* linux-image.deb (Kernel, must install)
* linux-libc-dev.deb (libc interface, generally not installed, use the generic version)

## Notes

1. To change the version to be compiled, you can freely modify it after entering the docker environment (input `bash`)
2. The `linux-header` package cross-compiled in the `x86_64` environment may contain `x86_64` header files. If you need to develop the kernel or use DKMS modules such as `zfs`, please compile with `TOOLCHAIN_VERSION=rv` in the RISC-V environment.
