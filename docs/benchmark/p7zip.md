# p7zip

p7zip 测试是用于测试系统解压性能，通过数据直观评估性能，以下是运行 7pzip 测试的操作步骤

## 安装 7zip

首先需要在 RevyOS 中 安装 p7zip

```
debian@lpi4a:~/Desktop$ sudo apt update
debian@lpi4a:~/Desktop$ sudo apt install p7zip-full
```

## 执行性能测试

进行 p7zip 测试需要在终端中输入以下命令来执行：

```
debian@lpi4a:~/Desktop$ 7z b
```

系统会开始进行测试然后输出性能数据。

通过以上步骤，可以在 RevyOS 上安装并测试 7zip 的性能。

以下是测试结果参考，使用镜像版本为[RevyOS20231210](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20231210/)16g版本

```
debian@lpi4a:~/Desktop$ 7z b

7-Zip 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=C.UTF-8,Utf16=on,HugeFiles=on,64 bits,4 CPUs LE)

LE
CPU Freq: - 64000000 64000000 - - - - - -

RAM size:   15739 MB,  # CPU hardware threads:   4
RAM usage:    882 MB,  # Benchmark threads:      4

                       Compressing  |                  Decompressing
Dict     Speed Usage    R/U Rating  |      Speed Usage    R/U Rating
         KiB/s     %   MIPS   MIPS  |      KiB/s     %   MIPS   MIPS

22:       3252   303   1045   3164  |      75268   394   1628   6422
23:       3092   307   1025   3151  |      74514   399   1617   6447
24:       3021   318   1022   3249  |      72017   398   1588   6322
25:       2945   320   1050   3363  |      67801   395   1529   6034
----------------------------------  | ------------------------------
Avr:             312   1036   3232  |              396   1591   6306
Tot:             354   1313   4769
```
