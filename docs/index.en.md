# RevyOS

## Introduction

[RevyOS](https://github.com/revyos) is a Debian based custom distribution developed and maintained by the RevyOS team under RuyiSDK, specificity optimized for the XuanTie chip ecosystem.

RevyOS is part of [RuyiSDK](https://github.com/ruyisdk), a open-source project initiated by PLCT Lab, aimed at providing a convenient and comprehensive development environment for RISC-V developers. It offers the latest hardware information and software support, such as details about supported hardware devices and software components like OS images (e.g., RevyOS), toolchains, and package managers.

__RevyOS__ provides complete and thorough support for XuanTie chips including XuanTie C906, C910, C920, C908, with default integration of the XuanTie extended instruction sets and the GCC toolchain supporting RVV 1.0. It also features Glibc and Kernel optimized with RVV 1.0 instruction set.

Currently, __RevyOS__ meets basic user needs in office work, web browsing, and video watching.

Based on these customizations and optimizations, __RevyOS__ delivers excellent performance and a great experience on hardware platforms like Lichee Pi 4A, BeagleV-Ahead, and Milk-V Pioneer.

## Image Download and Flashing

The user version images of __RevyOS__ are currently updated on the [ISCAS (Institute of Software, Chinese Academy of Sciences)](https://mirror.iscas.ac.cn/revyos) / [Felix Finland Source](https://mirrors.felixc.at/revyos/) open-source mirror sites.

If you want to obtain the latest version of __RevyOS__, please select the corresponding device to get the appropriate U-Boot, boot partition, and root partition files:

| Supported Devices | Image Download (Latest Version)                                                  | Flashing Tutorial                                      | SD Card Support |
| ----------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------- |
| Lichee Pi 4A      | [20241229](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20241229/)       | [Flashing Tutorial](./Installation/licheepi4a.md)      | Supported       |
| Lichee Cluster 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/)                | [Flashing Tutorial](./Installation/licheepi4a.md)      |                 |
| Lichee Console 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lcon4a/20240720/)      | [Flashing Tutorial](./Installation/licheeconsole4a.md) |                 |
| Lichee Book 4A    | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/laptop4a/)             | [Flashing Tutorial](./Installation/licheebook.md)      |                 |
| Milk-V Pioneer    | [20241025](https://mirror.iscas.ac.cn/revyos/extra/images/sg2042/20241025/)      | [Flashing Tutorial](./Installation/milkv-pioneer.md)   | Supported       |
| Milk-V Meles      | [20241229](https://mirror.iscas.ac.cn/revyos/extra/images/meles/20241229/)       |                                                        | Supported       |
| Beagle-Ahead      | [20231210](https://mirror.iscas.ac.cn/revyos/extra/images/beagle/20231210/)      |                                                        |                 |
| Huiwei Book       | [20240617](https://mirror.iscas.ac.cn/revyos/extra/images/huiwei/test/20240617/) |                                                        |                 |

### How to Enable T-Head Optimized GCC

For more details, see this document: [How to Enable Optimized GCC](build/debian/enable_optimization_gcc.md).

## Changelog

After each update to the image version, we will publish the supported features for the current version. To view the changelog, please click [RevyOS Version Change Log](./changelog/) and select the version you want to check.

## Issues

If you encounter any issues during use, you can report them by creating an [issue](https://github.com/revyos/revyos/issues).

## User Documentation

In this documentation, we provide guides for reference on building, adapting, and also system testing. This would help users get onboard easier with RevyOS.

## User Group

RevyOS has its own Telegram group: [Invitation Link](https://t.me/+Pi6px22-OsUxM2M1)

## Internship Rectuitment

We are currently recruiting test interns. For more information, visit: [RevyOS Team Test Intern Recruitment](https://github.com/plctlab/weloveinterns/blob/master/open-internships.md#j143-revyos%E5%B0%8F%E9%98%9F%E6%B5%8B%E8%AF%95%E5%AE%9E%E4%B9%A0%E7%94%9F20241111%E5%BC%80%E6%94%BE100%E5%90%8D) (Chinese only)