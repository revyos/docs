# 7zip

7zip 测试是用于测试系统解压性能，通过数据直观评估性能，以下是运行 7zip 测试的操作步骤

## 安装 7zip

首先需要在 RevyOS 中安装 7zip

```bash
debian@lpi4a:~/Desktop$ sudo apt update
debian@lpi4a:~/Desktop$ sudo apt install 7zip
```

## 执行性能测试

进行 7zip 测试需要在终端中输入以下命令来执行：

```bash
debian@lpi4a:~/Desktop$ 7zz b
```

系统会开始进行测试然后输出性能数据。

通过以上步骤，可以在 RevyOS 上安装并测试 7zip 的性能。

以下是测试结果参考，使用镜像版本为[RevyOS 20250729](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250729/)16g版本

```bash
debian@lpi4a:~/Desktop$ 7zz b

7-Zip (z) 22.01 (riscv64) : Copyright (c) 1999-2022 Igor Pavlov : 2022-07-15
 64-bit locale=en_US.UTF-8 Threads:4

Compiler: 12.2.0 GCC 12.2.0
Linux : 6.6.73-th1520 : #2025.01.22.09.36+39bfa82ff SMP Wed Jan 22 09:53:08 UTC 2025 : riscv64
PageSize:4KB THP:always hwcap:112D
LE

1T CPU Freq (MHz):  1805  1806  1806  1808  1811  1812  1823
2T CPU Freq (MHz): 197% 1821   200% 1825

RAM size:   15814 MB,  # CPU hardware threads:   4
RAM usage:    889 MB,  # Benchmark threads:      4

                       Compressing  |                  Decompressing
Dict     Speed Usage    R/U Rating  |      Speed Usage    R/U Rating
         KiB/s     %   MIPS   MIPS  |      KiB/s     %   MIPS   MIPS

22:       3882   285   1325   3777  |      76485   395   1654   6525
23:       3745   289   1318   3816  |      73538   392   1621   6363
24:       3668   292   1349   3945  |      66254   394   1475   5814
25:       3569   290   1403   4075  |      65005   397   1458   5785
----------------------------------  | ------------------------------
Avr:      3716   289   1349   3903  |      70320   394   1552   6122
Tot:             342   1451   5013
```
