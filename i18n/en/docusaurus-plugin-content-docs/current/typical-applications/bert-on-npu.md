---
title: Running BERT Model on LicheePi 4A TH1520 NPU (HHB Quantization & Inference)
sidebar_position: 3
---

# Running BERT Model on LicheePi 4A TH1520 NPU (HHB Quantization & Inference)

This article details how to deploy and run the BERT model on the TH1520 NPU of Licheepi 4A, including the complete process of quantization and inference using the HHB tool.

## BERT Model Introduction

BERT (Bidirectional Encoder Representations from Transformers) is a pre-trained language model widely used in natural language processing.

This tutorial introduces how to use the **HHB (Heterogeneous Hybrid Binary)** toolchain on the **Licheepi 4A TH1520 development board** to compile and run the **BERT model** for reading comprehension inference tasks.

------

## **1. Environment Preparation**

### **1.1. Ensure HHB is Installed**

After setting up the NPU-related environment according to the [documentation](https://github.com/jason-hue/plct/blob/main/%E6%B5%8B%E8%AF%95%E6%96%87%E6%A1%A3/LIcheepi%204A%E9%83%A8%E7%BD%B2%20mobilenetv2%20%E6%A8%A1%E5%9E%8B%E5%AE%8C%E6%88%90%E5%9B%BE%E5%83%8F%E5%88%86%E7%B1%BB%E7%9A%84%E7%A4%BA%E4%BE%8B.md), enter the Docker image of the HHB environment.

### **1.2. Download the BERT Model and Sample Code**

First, obtain the model. The model used in this tutorial is from the Google BERT repository, converted to an ONNX version of the BERT model. It can be downloaded to the `/home/example/c920/bert_small` directory using the following command:

```bash
cd /home/example/c920/bert_small

wget https://github.com/zhangwm-pt/bert/releases/download/onnx/bert_small_int32_input.onnx
```

------

## **2. Compile the BERT Model Using HHB**

To cross-compile the ONNX model into an executable program for NPU, you need to use the hhb command. Note that NPU only supports 8-bit or 16-bit fixed-point operations; this example specifies int8 asymmetric quantization. When compiling, you need to first enter the example directory.

### **2.1. Enter the BERT Directory**

```bash
cd /home/example/c920/bert_small
```

### **2.2. Run HHB Compilation**

Note that you must use the toolchain here, otherwise the compiled binary file will not run on LicheePi4A.

```bash
export PATH=/tools/Xuantie-900-gcc-linux-5.10.4-glibc-x86_64-V2.6.1-light.1/bin/:$PATH
```

```bash
hhb --model-file bert_small_int32_input.onnx --input-name "input_ids;input_mask;segment_ids" --input-shape '1 384;1 384;1 384' --output-name "output_start_logits;output_end_logits" --board c920 --quantization-scheme "float16" --postprocess save_and_top5 -D --without-preprocess
```

### **2.3. Option Descriptions**

| Option                  | Description                        |
| ----------------------- | ---------------------------------- |
| `-D`                    | Generate executable file           |
| `--model-file`          | Specify ONNX BERT model           |
| `--input-name`          | Model input name                  |
| `--output-name`         | Model output name                 |
| `--input-shape`         | Input data shape                  |
| `--board`               | Specify target platform (TH1520)  |
| `--quantization-scheme` | Quantization method (int8/float16) |
| `--postprocess`         | Output results and print top5     |

------

## **3. Generated Files**

After HHB runs, a `hhb_out/` directory is generated in the current directory, containing:

```
hhb_out/
├── hhb.bm               # Quantized model file
├── hhb_runtime          # Executable inference program
├── main.c               # Reference example entry point
├── model.c              # Model structure code
├── model.params         # Quantized weight data
├── io.c / io.h          # File I/O helper code
├── process.c / process.h # Preprocessing functions
```

------

## **4. Transfer to the Development Board**

Copy the compiled model and files to the host machine:

```bash
docker cp  65f872394fa5837ef2c24ade731b152da074ac6091f0766c04ac54092ff32780:/home/example/c920/bert_small C:\Users\knifefire\Downloads\
```

Then upload to the development board, and on the development board:

```bash
cd ~/bert_small
chmod +x hhb_out/hhb_runtime  # Grant execution permission
```

------

## **5. Run Inference**

```bash
python3 inference.py
```

------

## **6. Expected Output**

BERT processing questions from the SQuAD dataset:

The reference input in this example comes from the SQuAD dataset, which is a reading comprehension dataset consisting of questions posed on a set of Wikipedia articles, where the answer to each question is a segment of text from the corresponding reading passage or the question.
The input for this example is as follows, where the article content describes a football game, and the question is about who participated in the game.

```bash
[Context]:  Super Bowl 50 was an American football game...
[Question]:  Which NFL team represented the AFC at Super Bowl 50?
```

**BERT Output Answer**

Based on the reading comprehension result, the expected output will be Denver Broncos

```
[Answer]: Denver Broncos
```

**Execution Time**

```
Run graph execution time: 1713.15491ms, FPS=0.58
```

##### Reference Output:

```bash
# python3 inference.py
 ********** preprocess test **********
[Context]:  Super Bowl 50 was an American football game to determine the champion of the National Football League (N
FL) for the 2015 season. The American Football Conference (AFC) champion Denver Broncos defeated the National Footba
ll Conference (NFC) champion Carolina Panthers 24–10 to earn their third Super Bowl title. The game was played on Fe
bruary 7, 2016, at Levi's Stadium in the San Francisco Bay Area at Santa Clara, California. As this was the 50th Sup
er Bowl, the league emphasized the "golden anniversary" with various gold-themed initiatives, as well as temporarily
 suspending the tradition of naming each Super Bowl game with Roman numerals (under which the game would have been k
nown as "Super Bowl L"), so that the logo could prominently feature the Arabic numerals 50.
[Question]:  Which NFL team represented the AFC at Super Bowl 50?
 ******* run bert *******
Run graph execution time: 1713.15491ms, FPS=0.58

=== tensor info ===
shape: 1 384 
data pointer: 0x183d60

=== tensor info ===
shape: 1 384 
data pointer: 0x185380

=== tensor info ===
shape: 1 384 
data pointer: 0x1869a0

=== tensor info ===
shape: 1 384 
data pointer: 0x2a8610
The max_value of output: 3.826172
The min_value of output: -9.968750
The mean_value of output: -8.412353
The std_value of output: 5.128320
 ============ top5: ===========
 46: 3.826172
 57: 3.142578
 39: 1.303711
 38: 1.179688
 27: 0.624512

=== tensor info ===
shape: 1 384 
data pointer: 0x2a8300
The max_value of output: 3.617188
The min_value of output: -9.625000
The mean_value of output: -7.798176
The std_value of output: 4.820137
 ============ top5: ===========
 47: 3.617188
 58: 3.482422
 32: 2.523438
 29: 1.541992
 41: 1.473633
 ********** postprocess **********
[Answer]:  Denver Broncos
```

With this, you have successfully run **BERT quantized inference** on the **Licheepi4A development board**! 🚀

Reference document: https://wiki.sipeed.com/hardware/zh/lichee/th1520/lpi4a/8_application.html 