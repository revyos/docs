# 7zip

The 7zip test is used to evaluate the decompression performance of the system, providing a direct assessment of performance through data. Below are the steps to run the 7zip test.

## Installing 7zip

First, install 7zip in RevyOS:

```
debian@lpi4a:~/Desktop$ sudo apt update
debian@lpi4a:~/Desktop$ sudo apt install 7zip
```

## Running the Performance Test

To run the 7zip test, enter the following command in the terminal:

```
debian@lpi4a:~/Desktop$ 7zz b
```

The system will start the test and output performance data.

By following these steps, you can install and test the performance of 7zip on RevyOS.

Below is a reference test result, using the image version [RevyOS 20250729](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20250729/) 16G version:

```
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
