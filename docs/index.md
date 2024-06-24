# RevyOS

## 简介

[RevyOS](https://github.com/revyos)是由[RuyiSDK](https://github.com/ruyisdk)团队的RevyOS小队支持开发的一款针对XuanTie芯片生态的Debian优化定制发行版。

__RevyOS__ 围绕 c910v/c920/c906fdv/c908 等芯片提供了完整而全面的适配和优化支持，默认集成支持 RVV0.7.1 和 XThead 的 GCC 工具链，并搭载使用 RVV0.7.1 指令集优化过的 glibc 和 thead-kernel。

目前，__RevyOS__ 在办公、网页浏览、观看视频等方面已经能满足用户的基本使用需求。

基于上述定制和优化的 __RevyOS__，在 Lichee Pi 4A，beaglev-ahead，milkv-pioneer 等硬件平台上，能够提供优秀的性能和极佳的体验。

## 镜像下载及刷写

__RevyOS__ 的用户版镜像目前在 [ISCAS(中国科学院软件研究所)](https://mirror.iscas.ac.cn/revyos) / [felix 芬兰源](https://mirrors.felixc.at/revyos/) 开源镜像站进行更新。

如您想获取 __RevyOS__ 最新版镜像请选择对应板子获取对应的U-Boot/boo分区/root分区文件：

| 支持设备 | LicheePi 4A/vala(荔枝派4a/评估板a) | LicheePi Cluster 4A | ahead(beaglev-ahead) | Milk-V Pioneer | Milk-V Meles |
| :--: | :--: | :--: | :--: | :--: | :--: |
| 最新镜像 | [lpi4a 20240601](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240601/) | [LicheePi Cluster 4A 20240601](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240601/) | [ahead 20240529](https://   github.com/revyos/mkimg-th1520/releases/tag/20240529) | [pioneer20240327](https://mirror.iscas.ac.cn/revyos/extra/images/sg2042/20240327/) | [meles20240601](https://mirror.iscas.ac.cn/revyos/extra/images/meles/20240601/) |
| 更新日志 | lpi4a 20240529 | lc4a 20240529 | ahead 20240529 | pioneer20240327 | Meles20240601 |

RevyOS 0529版本U-boot文件下载：[链接](https://github.com/revyos/thead-u-boot/actions/runs/9326868005)

镜像刷写请参考：[镜像刷写教程](https://wiki.sipeed.com/hardware/zh/lichee/th1520/lpi4a/4_burn_image.html#%E6%89%B9%E9%87%8F%E7%83%A7%E5%BD%95)

在完成镜像刷写后用户在登录界面，输入用户名 `debian`，密码 `debian` 就可以登录进入系统了。

### 如何启用 T-Head 优化 GCC

详见这篇文档[如何启用优化GCC](build/debian/enable_optimization_gcc.md)

## 更新日志

镜像版本更新后我们会公布当前版本镜像支持内容，如您想查看镜像支持内容请点击[RevyOS版本更新日志](./changelog/)后选择您所需要的版本进行查看。

## issue相关

如果您在使用过程中遇到问题，可以进行[issue申报](https://github.com/revyos/revyos/issues)。

## 用户文档

在本DOCS中，我们拥有相关的使用构建与适配文档以及测试文档方便让用户对部分内容进行参考，完善的文档支持加快了用户对于系统的上手时间。
