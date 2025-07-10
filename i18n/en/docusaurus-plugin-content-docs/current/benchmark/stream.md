# Stream

## Instructions

The STREAM benchmark is a simple synthetic benchmark program that measures sustainable memory bandwidth (in MB/s) and the corresponding computation rate for simple vector kernels.

STREAM consists of a single file. To run the test, simply compile `stream.c`:

```
git clone https://github.com/jeffhammond/STREAM
cd STREAM
gcc -O3 -fopenmp -DSTREAM_ARRAY_SIZE=10000000 -DNTIMES=10 stream.c -o stream
export OMP_NUM_THREADS=8
./stream
```

:::info[Parameter Descriptions]

- `-O3`: Specifies the highest compilation optimization level, i.e., 3.
- `-fopenmp`: Enables OpenMP, suitable for multi-processor environments, and helps achieve the actual maximum memory bandwidth. When enabled, the program defaults to running with the number of CPU threads.
- `-DSTREAM_ARRAY_SIZE=10000000`: Specifies the size of the test arrays `a[]`, `b[]`, and `c[]` (Array size). This value significantly affects the test results. Note: The test array size must be set much larger than the highest-level CPU cache (usually L3 Cache); otherwise, the test will measure CPU cache throughput rather than memory throughput.
  Note: When this value exceeds `128M` (i.e., `128000000`), you need to add extra compile options `-mcmodel=large -fno-PIC`.
- `-DNTIMES=10`: Number of repetitions, with the best value selected from the results.
- `OMP_NUM_THREADS=8`: Number of threads.
:::

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
Number of Threads requested = 8
Number of Threads counted = 8
-------------------------------------------------------------
Your clock granularity/precision appears to be 1 microseconds.
Each test below will take on the order of 20329 microseconds.
   (= 20329 clock ticks)
Increase the size of the arrays if this shows that
you are not getting at least 20 clock ticks per test.
-------------------------------------------------------------
WARNING -- The above is only a rough guideline.
For best results, please be sure you know the
precision of your system timer.
-------------------------------------------------------------
Function    Best Rate MB/s  Avg time     Min time     Max time
Copy:            8239.8     0.019513     0.019418     0.019651
Scale:           8119.0     0.019823     0.019707     0.020028
Add:             6132.5     0.039332     0.039136     0.039464
Triad:           6125.3     0.039404     0.039182     0.039961
-------------------------------------------------------------
Solution Validates: avg error less than 1.000000e-13 on all three arrays
-------------------------------------------------------------
```
