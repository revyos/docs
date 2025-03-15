---
title: Deploying MobileNetV2 Model on LicheePi 4A for Image Classification
sidebar_position: 2
---

# Deploying MobileNetV2 Model on LicheePi 4A for Image Classification

This article will introduce how to deploy the MobileNetV2 model on Licheepi 4A for image classification tasks.

## Prerequisites

- Licheepi 4A hardware device
- RevyOS operating system
- Basic machine learning knowledge

## Model Introduction

MobileNetV2 is a lightweight deep learning model designed for mobile and edge devices, offering high efficiency and good performance.

This tutorial demonstrates how to deploy the mobilenetv2 model on the LicheePi4A platform for image classification.

The tutorial includes:

- Using HHB to compile onnx models into binaries usable on LicheePi4A
- Using the C++ version of OpenCV on LicheePi4A for preprocessing the mobilenetv2 model
- Differences between using CPU and NPU on LicheePi4A

### NPU Environment Configuration

First, you need to install a Python virtual environment, then use pip3 to install Python packages.
Use the following commands to install the venv package for creating a Python virtual environment (using the root directory as an example):

```bash
sudo apt install python3.11-venv
python3 -m venv venv
source venv/bin/activate
```

#### SHL Library Installation

Install using pip

```bash
pip3 install shl-python
```

After installation, use --whereis to check the installation location

```bash
python3 -m shl --whereis th1520
# If using pure CPU inference, replace with python3 -m shl --whereis c920
```

Based on the printed location, copy the dynamic libraries in the directory to the /usr/lib directory. For example, if it prints:

```bash
/home/sipeed/ort/lib/python3.11/site-packages/shl/install_nn2/th1520
```

You can use the copy command:

```bash
sudo cp -r /home/sipeed/ort/lib/python3.11/site-packages/shl/install_nn2/th1520/lib/* /usr/lib/
```

#### HHB-onnxruntime Installation

HHB-onnxuruntime is ported with the SHL backend (execution providers), allowing onnxruntime to reuse the high-performance optimization code for T-Head CPU in SHL.

CPU version

```bash
wget https://github.com/zhangwm-pt/onnxruntime/releases/download/riscv_whl_v2.6.0/hhb_onnxruntime_c920-2.6.0-cp311-cp311-linux_riscv64.whl
pip install hhb_onnxruntime_c920-2.6.0-cp311-cp311-linux_riscv64.whl
```

NPU version

```bash
wget https://github.com/zhangwm-pt/onnxruntime/releases/download/riscv_whl_v2.6.0/hhb_onnxruntime_th1520-2.6.0-cp311-cp311-linux_riscv64.whl
pip install hhb_onnxruntime_th1520-2.6.0-cp311-cp311-linux_riscv64.whl
```

#### **x86 Host Configuration**

After installing Docker, open the terminal in the Docker application and enter:

```bash
docker pull hhb4tools/hhb:2.4.5
```

After pulling the image, use the following commands to enter the Docker image:

```bash
docker run -itd --name=your.hhb2.4 -p 22 "hhb4tools/hhb:2.4.5"
docker exec -it your.hhb2.4 /bin/bash
```

After entering the Docker image, you can use the following command to confirm the HHB version:

```bash
hhb --version
```

After entering the Docker image, you also need to configure the cross-compilation environment. Note that you must use the toolchain here, otherwise the compiled binary file will not run on LicheePi4A.

```bash
export PATH=/tools/Xuantie-900-gcc-linux-5.10.4-glibc-x86_64-V2.6.1-light.1/bin/:$PATH
```

![image-20250227142739955](https://raw.githubusercontent.com/jason-hue/plct/main/image-20250227142739955.png)

At this point, the HHB environment setup is initially complete.

### Deploying MobileNetV2

Enter the docker container

First, get the model for this tutorial, download it to the example directory `/home/example/th1520_npu/onnx_mobilenetv2_c++`:
[mobilenetv2-12.onnx](https://github.com/onnx/models/raw/main/validated/vision/classification/mobilenet/model/mobilenetv2-12.onnx)

And get the library files needed for the optimized version of OpenCV used in this tutorial, go to [github repository download](https://xuantie.t-head.cn/community/download?id=4112956065753141248) and download to the parent directory `/home/example/th1520_npu/`.

```bash
cd /home/example/th1520_npu/
git clone https://github.com/zhangwm-pt/prebuilt_opencv.git
```

#### Compilation

**HHB model compilation:**
To cross-compile the ONNX model into an executable program for NPU, you need to use the hhb command. Note that NPU only supports 8-bit or 16-bit fixed-point operations; this example specifies int8 asymmetric quantization. When compiling, you need to first enter the example directory `/home/example/th1520_npu/onnx_mobilenetv2_c++`:

```bash
cd /home/example/th1520_npu/onnx_mobilenetv2_c++
hhb -D --model-file mobilenetv2-12.onnx --data-scale 0.017 --data-mean "124 117 104"  --board th1520  --postprocess save_and_top5 --input-name "input" --output-name "output" --input-shape "1 3 224 224" --calibrate-dataset persian_cat.jpg  --quantization-scheme "int8_asym"
```

Option descriptions:

- -D: Specify that the HHB process executes until the executable file is generated
- --model-file: Specify the mobilenet model already downloaded in the current directory
- --data-mean: Specify mean values
- --data-scale: Specify scaling value
- --board: Specify the target platform as th1520
- --input-name: Model input name
- --output-name: Model output name
- --input-shape: Model input size
- --postprocess: Save output results and print top5 results
- --calibrate-dataset: Specify the calibration image needed for quantization
- --quantization-scheme: Specify the quantization method as int8 asymmetric

After the command is executed, a hhb_out subdirectory will be generated in the current directory, containing hhb_runtime, model.c, and other files:

- hhb.bm: HHB model file, including quantized weight data and other information
- hhb_runtime: Executable file for the th1520 platform, compiled from C files in the directory
- main.c: Temporary file, reference entry point for the example program
- model.c: Temporary file, model structure file, related to the model structure
- model.params: Temporary file, weight values
- io.c: Temporary file, auxiliary functions for reading and writing files
- io.h: Temporary file, declarations of auxiliary functions for reading and writing files
- process.c: Temporary file, image preprocessing functions
- process.h: Temporary file, declarations of image preprocessing functions

For more detailed HHB option descriptions, refer to the command line option description in the [HHB User Manual](https://www.yuque.com/za4k4z/oxlbxl/keyg70qggt5n3fpa).

**g++ example compilation:**

```bash
riscv64-unknown-linux-gnu-g++ main.cpp -I../prebuilt_opencv/include/opencv4 -L../prebuilt_opencv/lib   -lopencv_imgproc   -lopencv_imgcodecs -L../prebuilt_opencv/lib/opencv4/3rdparty/ -llibjpeg-turbo -llibwebp -llibpng -llibtiff -llibopenjp2    -lopencv_core -ldl  -lpthread -lrt -lzlib -lcsi_cv -latomic -static -o mobilenetv2_example
```

After the compilation command is executed correctly, a mobilenetv2_example file will be generated in the example directory.

#### Execution

After cross-compilation is complete, you can copy the files needed for program execution to the directory on the development board.

Transfer the folder from docker to the host machine:

```bash
docker cp  65f872394fa5837ef2c24ade731b152da074ac6091f0766c04ac54092ff32780:/home/example/th1520_npu/onnx_mobilenetv2_c++ C:\Users\knifefire\Downloads\
```

Then upload it to the development board.

First, check if the driver is loaded on the development board:

```shell
lsmod
```

If the output includes the three modules `img_mem`, `vha`, and `vha_info`, the NPU driver is successfully loaded.

Manually load the NPU driver:

```bash
sudo insmod /lib/modules/5.10.113-th1520/kernel/drivers/nna/img_mem/img_mem.ko

sudo modprobe vha onchipmem_phys_start=0xffe0000000 onchipmem_size=0x100000 freq_khz=792000

sudo insmod /lib/modules/5.10.113-th1520/kernel/drivers/nna/vha/vha_info.ko

sudo chmod a+rw /dev/vha0
```

Refer to the [YOLOX section](https://github.com/jason-hue/plct/blob/main/%E6%B5%8B%E8%AF%95%E6%96%87%E6%A1%A3/%E5%9C%A8%20LicheePi%204A%20%E4%B8%8A%E9%83%A8%E7%BD%B2%20YOLOX%20%E5%B9%B6%E4%BD%BF%E7%94%A8%20HHB-onnxruntime%20%E8%BF%9B%E8%A1%8C%E6%8E%A8%E7%90%86.md) to install and configure the Python virtual environment

Run the compiled example in the corresponding directory on the development board:

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/th1520/lib
./mobilenetv2_example
```

After execution, the terminal will prompt the stages being executed:

1. Preprocessing
2. Model execution
3. Post-processing

Files used by mobilenetv2_example:

- persian_cat.jpg: Input image
- input_img.bin: Intermediate result generated from the input image during the preprocessing stage
- hhb_out/hhb_runtime: File used during model execution, generated by HHB on the x86 host
- hhb_out/hhb.bm: File used during model execution, generated by HHB on the x86 host
- input_img.bin_output0_1_1000.txt: Output file from the model execution stage, including 1000 result values output by the model execution

#### Reference Results:

```bash
(venv) sipeed@revyos-lpi4a:~/onnx_mobilenetv2_c++$ ./mobilenetv2_example 
 ********** preprocess image **********
 ********** run mobilenetv2 **********
INFO: NNA clock:792000 [kHz]
INFO: Heap :ocm (0x18)
INFO: Heap :anonymous (0x2)
INFO: Heap :dmabuf (0x2)
INFO: Heap :unified (0x5)
FATAL: Importing 150528 bytes of CPU memory has failed (wrong memory alignment)
Run graph execution time: 15.03903ms, FPS=66.49

=== tensor info ===
shape: 1 3 224 224 
data pointer: 0x2b4aca0

=== tensor info ===
```
