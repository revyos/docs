# CoreMark

## Summary
CoreMark is a comprehensive benchmark for measuring the performance of CPUs used in embedded systems. Developed in 2009 by Shay Gal-On of EEMBC, it aims to become an industry standard, replacing the outdated Dhrystone benchmark. The code is written in C and includes the following algorithms: list processing (insert, delete, search, and sort), matrix operations (common matrix operations), state machine (determining whether an input stream contains valid numbers), and CRC. Users can freely download CoreMark, port it to their own platforms, and view the resulting scores.

## Test Item Introduction

### File Overview

```
├── barebones      -- Directory to modify for bare-metal porting
│   ├── core_portme.c        -- Target platform configuration for porting
│   ├── core_portme.h        -- Timer and board-level initialization implementation
│   ├── core_portme.mak      -- Makefile for this subdirectory
│   ├── cvt.c
│   └── ee_printf.c          -- Print function serial output implementation
├── core_list_join.c    -- List operation program
├── core_main.c         -- Main program
├── coremark.h          -- Header file defining project configuration and data structures
├── coremark.md5
├── core_matrix.c       -- Matrix operation program
├── core_state.c        -- State machine control program
├── core_util.c         -- CRC calculation program
├── cygwin              -- Test code for x86 Cygwin and GCC 3.4 (quad-core, dual-core, and single-core systems)
│   ├── core_portme.c
│   ├── core_portme.h
│   └── core_portme.mak
├── freebsd             -- Similarly, test code for different operating systems
│   ├── ...
├── LICENSE.md
├── linux
│   ├── ...
├── linux64
│   ├── ...
├── macos
│   ├── ...
├── Makefile
├── README.md           -- Readme file, basic introduction to the CoreMark project
├── rtems
│   ├── ...
└── simple
    ├── ...
    └──
```

### Make Targets

- run - Default target, creates run1.log and run2.log
- run1.log - Runs the benchmark with performance parameters and outputs to run1.log
- run2.log - Runs the benchmark with validation parameters and outputs to run2.log
- run3.log - Runs the benchmark with parameters generated from a config file and outputs to run3.log
- compile - Compiles the benchmark executable
- link - Links the benchmark executable
- check - Checks the MD5 of possibly unmodified source files
- clean - Cleans up temporary files

### Compilation/Usage
According to the README, simply run make in the coremark folder to compile and test. The test results will appear in the Results folder, with run1.log containing the results.

## Test Plan
CoreMark tests are generally short. Plan to run 10 tests and take the average value.

## Operation Steps

```
$ git clone https://github.com/eembc/coremark.git
$ cd coremark
$ make
```

### Test Results

```
2K performance run parameters for coremark.
CoreMark Size    : 666
Total ticks      : 12915
Total time (secs): 12.915000
Iterations/Sec   : 8517.228029
Iterations       : 110000
Compiler version : GCC13.1.0
Compiler flags   : -O2 -DPERFORMANCE_RUN=1  -lrt
Memory location  : Please put data memory location here
            (e.g. code in flash, data on heap etc)
seedcrc          : 0xe9f5
[0]crclist       : 0xe714
[0]crcmatrix     : 0x1fd7
[0]crcstate      : 0x8e3a
[0]crcfinal      : 0x33ff
Correct operation validated. See README.md for run and reporting rules.
CoreMark 1.0 : 8517.228029 / GCC13.1.0 -O2 -DPERFORMANCE_RUN=1  -lrt / Heap
```

### GCC 10.4 + xtheadc

:::warning
As the GCC version in RevyOS has been upgraded to 14, the T-Head optimized GCC repository `c910v` has been deprecated. **The content in this section is no longer valid**. Please wait for future updates. ([Tracking link #124](https://github.com/revyos/revyos/issues/124))
:::

```bash
make XCFLAGS="-march=rv64gv0p7_zfh_xtheadc -O3 -funroll-all-loops -finline-limit=500 -fgcse-sm -fno-schedule-insns  -msignedness-cmpiv -fno-code-hoisting -mno-thread-jumps1 -mno-iv-adjust-addr-cost -mno-expand-split-imm"
```

```
2K performance run parameters for coremark.
CoreMark Size    : 666
Total ticks      : 15129
Total time (secs): 15.129000
Iterations/Sec   : 13219.644392
Iterations       : 200000
Compiler version : GCC10.4.0
Compiler flags   : -O2 -march=rv64gv0p7_zfh_xtheadc -O3 -funroll-all-loops -finline-limit=500 -fgcse-sm -fno-schedule-insns  -msignedness-cmpiv -fno-code-hoisting -mno-thread-jumps1 -mno-iv-adjust-addr-cost -mno-expand-split-imm -DPERFORMANCE_RUN=1  -lrt
Memory location  : Please put data memory location here
                        (e.g. code in flash, data on heap etc)
seedcrc          : 0xe9f5
[0]crclist       : 0xe714
[0]crcmatrix     : 0x1fd7
[0]crcstate      : 0x8e3a
[0]crcfinal      : 0x4983
Correct operation validated. See README.md for run and reporting rules.
CoreMark 1.0 : 13219.644392 / GCC10.4.0 -O2 -march=rv64gv0p7_zfh_xtheadc -O3 -funroll-all-loops -finline-limit=500 -fgcse-sm -fno-schedule-insns  -msignedness-cmpiv -fno-code-hoisting -mno-thread-jumps1 -mno-iv-adjust-addr-cost -mno-expand-split-imm -DPERFORMANCE_RUN=1  -lrt / Heap
```

### GCC 14.2 + xthead matrix

```bash
make XCFLAGS="-march=rv64imafd_xtheadba_xtheadbb_xtheadbs_xtheadcmo_xtheadcondmov_xtheadfmemidx_xtheadfmv_xtheadint_xtheadmac_xtheadmemidx_xtheadmempair_xtheadsync -O3 -funroll-all-loops -finline-limit=500 -fgcse-sm -fno-schedule-insns -fno-code-hoisting -fno-thread-jumps"
```

```
2K performance run parameters for coremark.
CoreMark Size    : 666
Total ticks      : 15794
Total time (secs): 15.794000
Iterations/Sec   : 6964.670128
Iterations       : 110000
Compiler version : GCC14.2.0
Compiler flags   : -O2 -march=rv64imafd_xtheadba_xtheadbb_xtheadbs_xtheadcmo_xtheadcondmov_xtheadfmemidx_xtheadfmv_xtheadint_xtheadmac_xtheadmemidx_xtheadmempair_xtheadsync -O3 -funroll-all-loops -finline-limit=500 -fgcse-sm -fno-schedule-insns -fno-code-hoisting -fno-thread-jumps -DPERFORMANCE_RUN=1  -lrt
Memory location  : Please put data memory location here
                        (e.g. code in flash, data on heap etc)
seedcrc          : 0xe9f5
[0]crclist       : 0xe714
[0]crcmatrix     : 0x1fd7
[0]crcstate      : 0x8e3a
[0]crcfinal      : 0x33ff
Correct operation validated. See README.md for run and reporting rules.
CoreMark 1.0 : 6964.670128 / GCC14.2.0 -O2 -march=rv64imafd_xtheadba_xtheadbb_xtheadbs_xtheadcmo_xtheadcondmov_xtheadfmemidx_xtheadfmv_xtheadint_xtheadmac_xtheadmemidx_xtheadmempair_xtheadsync -O3 -funroll-all-loops -finline-limit=500 -fgcse-sm -fno-schedule-insns -fno-code-hoisting -fno-thread-jumps -DPERFORMANCE_RUN=1  -lrt / Heap
```
