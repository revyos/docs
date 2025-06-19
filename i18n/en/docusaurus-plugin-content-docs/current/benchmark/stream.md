# Stream

## Instructions

The STREAM benchmark is a simple synthetic benchmark program that measures sustainable memory bandwidth (in MB/s) and the corresponding computation rate for simple vector kernels.

STREAM consists of a single file. To run the test, simply compile `stream.c`:

```
curl -OL http://www.cs.virginia.edu/stream/FTP/Code/stream.c
cd STREAM
gcc -O3 -fopenmp -DSTREAM_ARRAY_SIZE=10000000 -DNTIMES=10 stream.c -o stream
export OMP_NUM_THREADS=8
./stream
```

Parameter descriptions:

- -O3: Specifies the highest compilation optimization level, i.e., 3.
- fopenmp: Enables OpenMP, suitable for multi-processor environments, and helps achieve the actual maximum memory bandwidth. When enabled, the program defaults to running with the number of CPU threads.
- DSTREAM_ARRAY_SIZE=10000000: Specifies the size of the test arrays a[], b[], and c[] (Array size). This value significantly affects the test results. Note: The test array size must be set much larger than the highest-level CPU cache (usually L3 Cache); otherwise, the test will measure CPU cache throughput rather than memory throughput.
- -DNTIMES=10: Number of repetitions, with the best value selected from the results.
- OMP_NUM_THREADS=8: Number of threads.

Sample results:

```
debian@revyos-lpi4a:~/stream.c$ ./stream
-------------------------------------------------------------
STREAM version $Revision: 5.10 $
-------------------------------------------------------------
This system uses 8 bytes per array element.
-------------------------------------------------------------
Array size = 10000000 (elements), Offset = 0 (elements)
Memory per array = 76.3 MiB (= 0.1 GiB).
Total memory required = 228.9 MiB (= 0.2 GiB).
Each kernel will be executed 10 times.
 The *best* time for each kernel (excluding the first iteration)
 will be used to compute the reported bandwidth.
-------------------------------------------------------------
Number of Threads requested = 4
Number of Threads counted = 4
-------------------------------------------------------------
Your clock granularity/precision appears to be 1 microseconds.
Each test below will take on the order of 20082 microseconds.
   (= 20082 clock ticks)
Increase the size of the arrays if this shows that
you are not getting at least 20 clock ticks per test.
-------------------------------------------------------------
WARNING -- The above is only a rough guideline.
For best results, please be sure you know the
precision of your system timer.
-------------------------------------------------------------
Function    Best Rate MB/s  Avg time     Min time     Max time
Copy:            8296.5     0.019458     0.019285     0.019863
Scale:           8225.3     0.019492     0.019452     0.019564
Add:             6135.3     0.039321     0.039118     0.039920
Triad:           6155.0     0.039501     0.038993     0.040612
-------------------------------------------------------------
Solution Validates: avg error less than 1.000000e-13 on all three arrays
-------------------------------------------------------------
```
