# p7zip

p7zip test is used to evaluate the decompression performance of the system, visually assess performance through data. The following are the steps to run the 7zip test.

## Install 7zip

First, you need to install p7zip in RevyOS.

```
debian@lpi4a:~/Desktop$ sudo apt update
debian@lpi4a:~/Desktop$ sudo apt install p7zip-full
```

## Execute Performance Test

To conduct the p7zip test, enter the following command in the terminal to execute:

```
debian@lpi4a:~/Desktop$ 7z b
```

The system will begin testing and then output performance data.

By following these steps, you can install and test the performance of 7zip on RevyOS.

The following are reference test results, using the image version [RevyOS20231210](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20231210/) 16g version.

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
