# lmbench for Lpi4A

## Software Version

> lmbench for RevyOS

## Test Description

| Bandwidth Measurement Tool | Latency Measurement Tool | Others |
| --- | --- | --- |
| Read Cache File | Context Switching | \\ |
| Copy Memory | Network: Connection Establishment, Pipe, TCP, UDP, and RPC Hot Potato | \\ |
| Read Memory | File System Creation and Deletion | \\ |
| Write Memory | Process Creation | Processor Clock Rate Calculation |
| Pipe | Signal Handling | \\ |
| TCP | Upper-Level System Calls | \\ |
| \\ | Memory Read Latency | \\ |

## Test Preparation

Download the testing tool:

```
git clone https://github.com/revyos/lmbench3.git
```

> This version has been ported for RevyOS.

Before starting the tests, you need to install the dependencies:

```
sudo apt install gcc make libntirpc-dev -y
```

## Test Execution

Execute the commands to compile, configure, and test:

```
cd lmbench3
cd src
make results
```

After compilation, the following options will prompt you to set:

The options that do not require changes can be left blank to automatically set default values.

`MULTIPLE COPIES [default 1]`: Sets the number of concurrent instances of lmbench to run. Running more instances may slow down lmbench. The default is 1, so set it to the default value of 1.

```
=====================================================================

If you are running on an MP machine and you want to try running
multiple copies of lmbench in parallel, you can specify how many here.

Using this option will make the benchmark run 100x slower (sorry).

NOTE:  WARNING! This feature is experimental and many results are 
	known to be incorrect or random!

MULTIPLE COPIES [default 1]: 
=====================================================================
```

`Job placement selection [default 1]`: Controls job scheduling methods. The default is 1, which allows job scheduling, so set it to the default value.

```
=====================================================================

Options to control job placement
1) Allow scheduler to place jobs
2) Assign each benchmark process with any attendant child processes
   to its own processor
3) Assign each benchmark process with any attendant child processes
   to its own processor, except that it will be as far as possible
   from other processes
4) Assign each benchmark and attendant processes to their own
   processors
5) Assign each benchmark and attendant processes to their own
   processors, except that they will be as far as possible from
   each other and other processes
6) Custom placement: you assign each benchmark process with attendant
   child processes to processors
7) Custom placement: you assign each benchmark and attendant
   processes to processors

Note: some benchmarks, such as bw_pipe, create attendant child
processes for each benchmark process.  For example, bw_pipe
needs a second process to send data down the pipe to be read
by the benchmark process.  If you have three copies of the
benchmark process running, then you actually have six processes;
three attendant child processes sending data down the pipes and 
three benchmark processes reading data and doing the measurements.

Job placement selection [default 1]: 
=====================================================================
```

`Memory`: Sets the test memory size. The default is `$MB`, which is the maximum testable memory calculated by the program, or you can manually define the test value. Here, we will use the default value.

```
=====================================================================

Several benchmarks operate on a range of memory.  This memory should be
sized such that it is at least 4 times as big as the external cache[s]
on your system.   It should be no more than 80% of your physical memory.

The bigger the range, the more accurate the results, but larger sizes
take somewhat longer to run the benchmark.

MB [default 686]: 
Checking to see if you have 686 MB; please wait for a moment...
686MB OK
686MB OK
686MB OK
Hang on, we are calculating your cache line size.
OK, it looks like your cache line is 64 bytes.

=====================================================================
```

`SUBSET (ALL|HARDWARE|OS|DEVELOPMENT) [default all]`: Selects the test set, which includes `ALL/HARDWARE/OS/DEVELOPMENT`. The default is `all`, so we will select `all`.

```
=====================================================================

lmbench measures a wide variety of system performance, and the full suite
of benchmarks can take a long time on some platforms.  Consequently, we
offer the capability to run only predefined subsets of benchmarks, one
for operating system-specific benchmarks and one for hardware-specific
benchmarks.  We also offer the option of running only selected benchmarks,
which is useful during operating system development.

Please remember that if you intend to publish the results you either need
to do a full run or one of the predefined OS or hardware subsets.

SUBSET (ALL|HARDWARE|OS|DEVELOPMENT) [default all]: 
=====================================================================
```

`FASTMEM [default no]`: Memory latency test. If you want to skip this test, set it to `yes`. If you do not want to skip it, set it to `no`. The default is `no`, so we will keep the default value.

```
=====================================================================

This benchmark measures, by default, memory latency for a number of
different strides.  That can take a long time and is most useful if you
are trying to figure out your cache line size or if your cache line size
is greater than 128 bytes.

If you are planning on sending in these results, please don't do a fast
run.

Answering yes means that we measure memory latency with a 128-byte stride.  

FASTMEM [default no]: 
=====================================================================
```

`SLOWFS [default no]`: File system latency test. If you want to skip this test, set it to `yes`. If you do not want to skip it, set it to `no`. The default is `no`, so we will keep the default value.

```
=====================================================================

This benchmark measures, by default, file system latency.  That can
take a long time on systems with old-style file systems (i.e., UFS,
FFS, etc.).  Linux' ext2fs and Sun's tmpfs are fast enough that this
test is not painful.

If you are planning on sending in these results, please don't do a fast
run.

If you want to skip the file system latency tests, answer "yes" below.

SLOWFS [default no]: 
=====================================================================
```

`DISKS [default none]`: Disk bandwidth and seek time. You need to specify the disk device path, such as `/dev/sda`. By default, it does not test (default is none), so we will keep the default value.

```
=====================================================================

This benchmark can measure disk zone bandwidths and seek times.  These can
be turned into whizzy graphs that pretty much tell you everything you might
need to know about the performance of your disk.  

This takes a while and requires read access to a disk drive.  
Write is not measured, see disk.c to see how if you want to do so.

If you want to skip the disk tests, hit return below.

If you want to include disk tests, then specify the path to the disk
device, such as /dev/sda.  For each disk that is readable, you'll be
prompted for a one-line description of the drive, i.e., 

	Iomega IDE ZIP
or
	HP C3725S 2GB on 10MB/sec NCR SCSI bus

DISKS [default none]: 
=====================================================================
```

`REMOTE [default none]`: Network testing requires two machines and `rsh` access. This tests whether the testing machine can `rsh` into another machine. By default, it does not test (default is none), so we will keep the default value.

```
=====================================================================

If you are running on an idle network and there are other, identically
configured systems, on the same wire (no gateway between you and them),
and you have rsh access to them, then you should run the network part
of the benchmarks to them.  Please specify any such systems as a space
separated list such as: ether-host fddi-host hippi-host.

REMOTE [default none]: 
=====================================================================
```

`Processor mhz [default 999 MHz, 1.0010 nanosec clock]`: Tests the CPU frequency. The default is `$MHZ`, which is the frequency determined by the program. You can also specify it based on your situation, e.g., 3500, in MHz. Here, we will keep the default value.

```
=====================================================================

Calculating mhz, please wait for a moment...
I think your CPU mhz is 

	999 MHz, 1.0010 nanosec clock
	
but I am frequently wrong.  If that is the wrong Mhz, type in your
best guess as to your processor speed.  It doesn't have to be exact,
but if you know it is around 800, say 800.  

Please note that some processors, such as the P4, have a core which
is double-clocked, so on those processors the reported clock speed
will be roughly double the advertised clock rate.  For example, a
1.8GHz P4 may be reported as a 3592MHz processor.

Processor mhz [default 999 MHz, 1.0010 nanosec clock]: 
=====================================================================
```

`FSDIR [default /usr/tmp]`: A temporary directory to store test files. You can set your own value; the default is `/usr

/tmp`, so we will keep the default value.

```
=====================================================================

We need a place to store a 686 Mbyte file as well as create and delete a
large number of small files.  We default to /usr/tmp.  If /usr/tmp is a
memory-resident file system (i.e., tmpfs), pick a different place.
Please specify a directory that has enough space and is a local file
system.

FSDIR [default /usr/tmp]: 
=====================================================================
```

`Status output file [default /dev/tty]`: The directory to store test output information. You can set your own value; the default is `/dev/tty`, so we will keep the default value.

```
=====================================================================

lmbench outputs status information as it runs various benchmarks.
By default, this output is sent to /dev/tty, but you may redirect
it to any file you wish (such as /dev/null...).

Status output file [default /dev/tty]: 
=====================================================================
```

`Mail results [default yes]`: Whether to email the test results. The default is `yes`, so we will set it to `no`.

```
=====================================================================

There is a database of benchmark results that is shipped with new
releases of lmbench.  Your results can be included in the database
if you wish.  The more results the better, especially if they include
remote networking.  If your results are interesting, i.e., for a new
fast box, they may be made available on the lmbench web page, which is

	http://www.bitmover.com/lmbench

Mail results [default yes]: no
OK, no results mailed.
=====================================================================
```

After completing the above settings, the tests will start automatically.

## Test Results


## Test Notes
