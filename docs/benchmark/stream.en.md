# Stream

## Instructions

The STREAM benchmark is a simple synthetic benchmark program that measures sustainable memory bandwidth (in MB/s) and the corresponding computation rate for simple vector kernels.

The stream consists of a single file, and to perform the test, you only need to compile `stream.c`:

```
git clone <https://github.com/microseyuyu/STREAM.git>
cd STREAM
gcc -O3 -fopenmp -DN=2000000 -DNTIMES=10 stream.c -o stream
export OMP_NUM_THREADS=8
./stream
```

Parameter descriptions:

- -O3: Specifies the highest compilation optimization level, that is, 3.
- fopenmp: Enables OpenMP, suitable for multi-processor environments, to better achieve the actual maximum memory bandwidth. When enabled, the program defaults to running the number of threads equal to the number of CPU threads.

DN=2000000: Specifies the size of the test arrays a[], b[], and c[] (Array size). This value has a significant impact on the test results (the default value for version 5.9 is 2000000. If stream.c is version 5.10, the parameter name changes to -DSTREAM_ARRAY_SIZE, with a default value of 10000000). Note: the size of the test array must be set much larger than the size of the CPU's highest-level cache (usually L3 Cache), otherwise it tests the throughput performance of the CPU cache, rather than the memory throughput performance.
- -DNTIMES=10: The number of repetitions, from which the optimal value is selected.
- OMP_NUM_THREADS=8: Number of threads.

Sample results:

```
debian@lpi4a:~/Desktop/STREAM$ ./stream
-------------------------------------------------------------
STREAM version $Revision: 5.10 $
-------------------------------------------------------------
This system uses 8 bytes per array element.
-------------------------------------------------------------
*****  WARNING: ******
      It appears that you set the preprocessor variable N when compiling this code.
      This version of the code uses the preprocesor variable STREAM_ARRAY_SIZE to control the array size
      Reverting to default value of STREAM_ARRAY_SIZE=10000000
*****  WARNING: ******
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
Each test below will take on the order of 21622 microseconds.
   (= 21622 clock ticks)
Increase the size of the arrays if this shows that
you are not getting at least 20 clock ticks per test.
-------------------------------------------------------------
WARNING -- The above is only a rough guideline.
For best results, please be sure you know the
precision of your system timer.
-------------------------------------------------------------
Function    Best Rate MB/s  Avg time     Min time     Max time
Copy:            8364.2     0.019258     0.019129     0.019508
Scale:           8291.0     0.019572     0.019298     0.020162
Add:             6223.6     0.038835     0.038563     0.040011
Triad:           6222.5     0.038776     0.038570     0.039470
-------------------------------------------------------------
Solution Validates: avg error less than 1.000000e-13 on all three arrays
-------------------------------------------------------------
```
