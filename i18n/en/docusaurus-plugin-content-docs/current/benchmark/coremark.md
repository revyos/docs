# CoreMark

## Summary
CoreMark is a comprehensive benchmark designed to measure CPU performance in embedded systems. Developed in 2009 by Shay Gal-On of EEMBC, it aims to be an industry standard, replacing the outdated Dhrystone benchmark. The code, written in C, includes the following algorithms: list processing (insert, delete, find, and sort), matrix operations (common matrix functions), state machines (checking if an input stream contains valid numbers), and CRC. Users can freely download CoreMark, port it to their platform, and obtain performance scores.

## Test Items Overview

### File Structure

```
├── barebones      -- Directory for modifications when porting to a bare-metal environment
│   ├── core_portme.c        -- Target platform configuration information for porting
│   ├── core_portme.h        -- Timer and board initialization implementation
│   ├── core_portme.mak      -- Makefile for this subdirectory
│   ├── cvt.c
│   └── ee_printf.c          -- Serial implementation of print function
├── core_list_join.c    -- List operation program
├── core_main.c         -- Main program
├── coremark.h          -- Header file with project configuration and data structure definitions
├── coremark.md5        
├── core_matrix.c       -- Matrix operations program
├── core_state.c        -- State machine control program
├── core_util.c         -- CRC calculation program
├── cygwin              -- Test code for x86 Cygwin and GCC 3.4 (quad-core, dual-core, and single-core systems)
│   ├── core_portme.c
│   ├── core_portme.h
│   └── core_portme.mak
├── freebsd             -- Similarly, test code for various OS platforms
│   ├── ...
├── LICENSE.md
├── linux
│   ├── ...
├── linux64
│   ├── ...
├── macos
│   ├── ...
├── Makefile            
├── README.md           -- Readme file with basic introduction to the CoreMark project
├── rtems
│   ├── ...
└── simple
    ├── ...
    └──
```

### Make Targets

- `run` - Default target, generates `run1.log` and `run2.log`
- `run1.log` - Runs the benchmark with performance parameters and outputs to `run1.log`
- `run2.log` - Runs the benchmark with validation parameters and outputs to `run2.log`
- `run3.log` - Runs the benchmark with config file-generated parameters and outputs to `run3.log`
- `compile` - Compiles the benchmark executable
- `link` - Links the benchmark executable
- `check` - Tests the MD5 of unmodified source files
- `clean` - Cleans temporary files

### Compilation and Execution
According to the README, simply executing `make` in the coremark folder compiles and runs the tests. The results appear in the Results folder, with `run1.log` containing the performance results.

## Test Plan
CoreMark tests are generally short. Plan to run 10 tests concurrently and take the average score.

## Execution Steps

```bash
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

### GCC 13.1 + xthead matrix

```bash
make XCFLAGS="-march=rv64imafd_xtheadba_xtheadbb_xtheadbs_xtheadcmo_xtheadcondmov_xtheadfmemidx_xtheadfmv_xtheadint_xtheadmac_xtheadmemidx_xtheadmempair_xtheadsync -O3 -funroll-all-loops -finline-limit=500 -fgcse-sm -fno-schedule-insns -fno-code-hoisting -mno-thread-jumps"
```

```
2K performance run parameters for coremark.
CoreMark Size    : 666
Total ticks      : 11897
Total time (secs): 11.897000
Iterations/Sec   : 9246.028411
Iterations       : 110000
Compiler version : GCC13.1.0
Compiler flags   : -O2 -march=rv64imafd_xtheadba_xtheadbb_xtheadbs_xtheadcmo_xtheadcondmov_xtheadfmemidx_xtheadfmv_xtheadint_xtheadmac_xtheadmemidx_xtheadmempair_xtheadsync -O3 -funroll-all-loops -finline-limit=500 -fgcse-sm -fno-schedule-insns -fno-code-hoisting -DPERFORMANCE_RUN=1  -lrt
Memory location  : Please put data memory location here
			(e.g. code in flash, data on heap etc)
seedcrc          : 0xe9f5
[0]crclist       : 0xe714
[0]crcmatrix     : 0x1fd7
[0]crcstate      : 0x8e3a
[0]crcfinal      : 0x33ff
Correct operation validated. See README.md for run and reporting rules.
CoreMark 1.0 : 9246.028411 / GCC13.1.0 -O2 -march=rv64imafd_xtheadba_xtheadbb_xtheadbs_xtheadcmo_xtheadcondmov_xtheadfmemidx_xtheadfmv_xtheadint_xtheadmac_xtheadmemidx_xtheadmempair_xtheadsync -O3 -funroll-all-loops -finline-limit=500 -fgcse-sm -fno-schedule-insns -fno-code-hoisting -DPERFORMANCE_RUN=1  -lrt / Heap
```
