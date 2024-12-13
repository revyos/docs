# RevyOS

## 简介

[RevyOS](https://github.com/orgs/revyos/repositories)是由RuyiSDK团队的RevyOS小队支持开发的一款针对XuanTie芯片生态的Debian优化定制发行版。

__RevyOS__ 围绕玄铁C906、C910、C920、C908等芯片提供了完整而全面的适配和优化支持，默认集成支持玄铁扩展指令集和RVV 1.0的GCC工具链，并搭载使用RVV 1.0指令集优化过的Glibc和Kernel。

目前，__RevyOS__ 在办公、网页浏览、观看视频等方面已经能满足用户的基本使用需求。

基于上述定制和优化的 __RevyOS__，在 Lichee RV，Lichee Pi 4A 等硬件平台上，能够提供优秀的性能和极佳的体验。

## 镜像下载及刷写

__RevyOS__ 的用户版镜像目前在 ISCAS（中国科学院软件研究所） 开源镜像站进行更新。如您想获取 __RevyOS__ 最新版镜像请访问[镜像下载](https://mirror.iscas.ac.cn/revyos/extra/images/)目录，根据所使用设备来获取对应镜像。

| 支持设备 | 镜像下载（最新版本） | 刷写教程 | sd卡支持 |
| --- | --- | --- | --- |
| Lichee Pi 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240720/) | [镜像刷写](./Installation/licheepi4a.md) | 支持 |
| LicheePi Cluster 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/) | [镜像刷写](./Installation/licheepi4a.md)  |  |
| LicheeConsole 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lcon4a/20240720/) | [镜像刷写](./Image%20flashing/licheeconsole4a.md)  |  |
| Lichee Book 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/laptop4a/) | [镜像刷写](./Image%20flashing/licheebook.md)  |  |  |
| Milk-V Pioneer | [20241025](https://mirror.iscas.ac.cn/revyos/extra/images/sg2042/20241025/) | [镜像刷写](https://docs.revyos.dev/Installation/milkv-pioneer/)  | 支持 |
| Milk-V Meles | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/meles/20240720/) | [镜像刷写](https://milkv.io/zh/docs/meles/installation)  | 支持 |
| Beagle-Ahead | [20231210](https://mirror.iscas.ac.cn/revyos/extra/images/beagle/20231210/) | [镜像刷写]()  |  |
| Huiwei book | [20240617](https://mirror.iscas.ac.cn/revyos/extra/images/huiwei/test/20240617/) | [镜像刷写]()  |  |

### 如何启用 T-Head 优化 GCC

详见这篇文档[如何启用优化 GCC](build/debian/enable_optimization_gcc.md)

## 更新日志

镜像版本更新后我们会公布当前版本镜像支持内容，如您想查看镜像支持内容请点击[RevyOS 版本更新日志](./changelog/)后选择您所需要的版本进行查看。

## issue 相关

如果您在使用过程中遇到问题，可以进行[issue 申报](https://github.com/revyos/revyos/issues)。

## 用户文档

在本 DOCS 中，我们拥有相关的使用构建与适配文档以及测试文档方便让用户对部分内容进行参考，完善的文档支持加快了用户对于系统的上手时间。

## 用户群组

RevyOS 有自己的 Telegram 群组：[邀请链接](https://t.me/+Pi6px22-OsUxM2M1)

## 实习生招聘

现在正在招聘测试实习生，详情请看: [RevyOS小队测试实习生招聘](https://github.com/plctlab/weloveinterns/blob/master/open-internships.md#j143-revyos%E5%B0%8F%E9%98%9F%E6%B5%8B%E8%AF%95%E5%AE%9E%E4%B9%A0%E7%94%9F20241111%E5%BC%80%E6%94%BE100%E5%90%8D)
