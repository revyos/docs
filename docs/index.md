# RevyOS

## 简介

[RevyOS](https://github.com/revyos)是由[RuyiSDK](https://github.com/ruyisdk)团队的RevyOS小队支持开发的一款针对XuanTie芯片生态的Debian优化定制发行版。

__RevyOS__ 围绕 c910v/c920/c906fdv/c908 等芯片提供了完整而全面的适配和优化支持，默认集成支持 RVV0.7.1 和 XThead 的 GCC 工具链，并搭载使用 RVV0.7.1 指令集优化过的 glibc 和 thead-kernel。

目前，__RevyOS__ 在办公、网页浏览、观看视频等方面已经能满足用户的基本使用需求。

基于上述定制和优化的 __RevyOS__，在 Lichee Pi 4A，beaglev-ahead，milkv-pioneer 等硬件平台上，能够提供优秀的性能和极佳的体验。

## 镜像下载及刷写

__RevyOS__ 的用户版镜像目前在 [ISCAS(中国科学院软件研究所)](https://mirror.iscas.ac.cn/revyos) / [felix 芬兰源](https://mirrors.felixc.at/revyos/) 开源镜像站进行更新。

如您想获取 __RevyOS__ 最新版镜像请选择对应设备获取对应的U-Boot/boot分区/root分区文件：

| 支持设备 | 镜像下载（最新版本） | 刷写教程 | sd卡支持 | 主线内核支持 |
| --- | --- | --- | --- | --- |
| Lichee Pi 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240720/) | [镜像刷写](./Installation/licheepi4a.md) |  |  |
| LicheePi Cluster 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/) | [镜像刷写](./Installation/licheepi4a.md)  |  |  |
| LicheeConsole 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lcon4a/20240720/) | [镜像刷写](./Installation/licheeconsole4a.md)  |  |  |
| Lichee Book 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/laptop4a/) | [镜像刷写](./Installation/licheebook.md)  |  |  |
| Milk-V Pioneer | [20240716](https://mirror.iscas.ac.cn/revyos/extra/images/meles/20240720/) | [镜像刷写](https://milkv.io/zh/docs/pioneer/getting-started/InstallOS)  |  |  |
| Milk-V Meles | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/meles/20240720/) | [镜像刷写](https://milkv.io/zh/docs/meles/installation)  |  |  |
| Beagle-Ahead | [20231210](https://mirror.iscas.ac.cn/revyos/extra/images/beagle/20231210/) | [镜像刷写]()  |  |  |
| Huiwei book | [20240617](https://mirror.iscas.ac.cn/revyos/extra/images/huiwei/test/20240617/) | [镜像刷写]()  |  |  |

### 如何启用 T-Head 优化 GCC

详见这篇文档[如何启用优化GCC](build/debian/enable_optimization_gcc.md)

## 更新日志

镜像版本更新后我们会公布当前版本镜像支持内容，如您想查看镜像支持内容请点击[RevyOS版本更新日志](./changelog/)后选择您所需要的版本进行查看。

## issue相关

如果您在使用过程中遇到问题，可以进行[issue申报](https://github.com/revyos/revyos/issues)。

## 用户文档

在本DOCS中，我们拥有相关的使用构建与适配文档以及测试文档方便让用户对部分内容进行参考，完善的文档支持加快了用户对于系统的上手时间。
