---
title: Run Llama.cpp with Deepseek on Risc-V(Licheepi 4A)
sidebar_position: 4
---

# Run Llama.cpp with Deepseek on Risc-V(Licheepi 4A)

This article explains how to run Llama.cpp on the RISC-V architecture of Licheepi 4A and use Deepseek models for local inference.

## Overview

Llama.cpp is an efficient large language model inference library implemented in C/C++, which can run on resource-constrained devices. Deepseek is a high-performance open-source large language model. This tutorial will guide you on how to deploy these technologies on the RISC-V architecture of Licheepi 4A.

## Environment Preparation

- Licheepi 4A development board
- RevyOS system
- Necessary dependencies

Since the c910 series chips use XTheadVector(RVV0p7), while llama.cpp officially only supports RVV1p0, we must use OpenBLAS as a backend to utilize the RVV0p7 instruction set.

First, install the relevant dependencies:

```bash
sudo apt install pkg-config
```

#### Obtaining the Toolchain

Although the new GCC-14 has support for XTheadVector, some instructions do not correspond to RVV0p7. Forcibly using XTheadVector will result in compilation errors. Therefore, we need to use a toolchain for RVV0p7.

For this, you can download the source code of the T-Head toolchain and compile it yourself, but the overall compilation time on Licheepi 4A is quite long. Alternatively, you can use the xthead toolchain provided by PLCT ruyisdk. The method is as follows:

```bash
cd ~
wget https://mirror.iscas.ac.cn/ruyisdk/dist/RuyiSDK-20240222-T-Head-Sources-T-Head-2.8.0-HOST-riscv64-linux-gnu-riscv64-plctxthead-linux-gnu.tar.xz
tar -xvf RuyiSDK-20240222-T-Head-Sources-T-Head-2.8.0-HOST-riscv64-linux-gnu-riscv64-plctxthead-linux-gnu.tar.xz
cd RuyiSDK-20240222-T-Head-Sources-T-Head-2.8.0-HOST-riscv64-linux-gnu-riscv64-plctxthead-linux-gnu/bin
export PATH=$(pwd):$PATH
```

#### Compiling OpenBLAS

Support for RVV0p7 is currently only provided by OpenBLAS; other backends such as OpenBLIS and Llama.cpp GGUF only support RVV1p0.

```bash
cd ~
git clone https://github.com/OpenMathLib/OpenBLAS
cd OpenBLAS
make HOSTCC=gcc TARGET=C910V CC=riscv64-plctxthead-linux-gnu-gcc FC=riscv64-plctxthead-linux-gnu-gfortran
sudo make install PREFIX=/usr
sudo make install PREFIX=~/RuyiSDK-20240222-T-Head-Sources-T-Head-2.8.0-HOST-riscv64-linux-gnu-riscv64-plctxthead-linux-gnu/riscv64-plctxthead-linux-gnu/sysroot/usr
```

If you compiled the T-Head toolchain yourself, please replace `riscv64-plctxthead-linux-gnu-gcc` and `riscv64-plctxthead-linux-gnu-gfortran` with your own compiled toolchain.

Please note that if you use the toolchain provided by PLCT, the installation path for OpenBLAS must be under the sysroot path of the toolchain, i.e., `RuyiSDK-20240222-T-Head-Sources-T-Head-2.8.0-HOST-riscv64-linux-gnu-riscv64-plctxthead-linux-gnu/riscv64-plctxthead-linux-gnu/sysroot/usr`. If you use a self-compiled toolchain, you can install normally to `/usr/local`.

#### Compiling Llama.cpp

Llama.cpp needs to be defined to use the OpenBLAS backend:

```bash
cd ~
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp
```

Since the original version will default to calling the RVV1p0 instruction set, we need to modify the `llama.cpp/ggml/src/ggml-cpu/CMakeLists.txt` file to change `-march=rv64gcv` to `-march=rv64gcv0p7`.

```bash
diff --git a/ggml/src/ggml-cpu/CMakeLists.txt b/ggml/src/ggml-cpu/CMakeLists.txt
index 98fd18e..0e6f302 100644
--- a/ggml/src/ggml-cpu/CMakeLists.txt
+++ b/ggml/src/ggml-cpu/CMakeLists.txt
@@ -306,7 +306,7 @@ function(ggml_add_cpu_backend_variant_impl tag_name)
     elseif (${CMAKE_SYSTEM_PROCESSOR} MATCHES "riscv64")
         message(STATUS "RISC-V detected")
         if (GGML_RVV)
-            list(APPEND ARCH_FLAGS -march=rv64gcv -mabi=lp64d)
+            list(APPEND ARCH_FLAGS -march=rv64gcv0p7 -mabi=lp64d)
         endif()
     else()
         message(STATUS "Unknown architecture")
```

```bash
CC=riscv64-plctxthead-linux-gnu-gcc FC=riscv64-plctxthead-linux-gnu-gfortran cmake -B build -DGGML_BLAS=ON -DGGML_BLAS_VENDOR=OpenBLAS

cmake --build build --config Release -j4
```

If you encounter the following issues:

- Cannot find libopenblas.so: Please check if the installation path in the previous step is correct
- Cannot find `riscv64-plctxthead-linux-gnu-gcc` and `riscv64-plctxthead-linux-gnu-gfortran`: Please check if the toolchain is correctly added to the PATH
- `Illegal instruction` error during runtime: Please check if you are using the RVV0p7 toolchain and if you have correctly modified the `CMakeLists.txt`

#### Obtaining the Model

Directly download the [DeepSeek-R1-Distill-Qwen-1.5B-GGUF](https://huggingface.co/unsloth/DeepSeek-R1-Distill-Qwen-1.5B-GGUF) Q2_K model, which is smaller and more suitable for Licheepi 4A.

More models can be found on [Hugging Face](https://huggingface.co/collections/unsloth/deepseek-r1-all-versions-678e1c48f5d2fce87892ace5).

*The above are not the original DeepSeek-R1, but rather distilled models. The original DeepSeek has 671B parameters, which is 100-600 times the parameter count of the above models.*

## Running

#### Running Directly in CLI

```bash
cd ~
llama.cpp/build/bin/llama-cli -m DeepSeek-R1-Distill-Qwen-1.5B-Q2_K.gguf -t 4 --prompt '你好！' -no-cnv
```

Please replace `[Your words]` with your input. `-t 4` means using 4 threads, which can be adjusted according to your needs. `-m` represents the model path, please adjust according to your model.

#### Interactive Running

```bash
cd ~
llama.cpp/build/bin/llama-server -m DeepSeek-R1-Distill-Qwen-1.5B-Q2_K.gguf -t 4
```

Please replace `-m` with your model path. `-t 4` means using 4 threads, which can be adjusted according to your needs.

Interactive mode requires a client, with the default API located at `127.0.0.1:8080`. The API uses an OpenAI API compatible format, and you can use any client you find for interaction.

Here's an example client program in Python:

```python
import requests

start_mask = ""
system_mask = ""
user_mask = "你好！"
assistant_mask = ""

class Message:
    
    SYSTEM = 1
    USER = 2
    ASSISTANT = 3

    role: int
    text: str

    def __init__(self, text, role = 2):
        self.text = text
        self.role = role

    def __str__(self):
        res = ""
        if self.role == Message.SYSTEM:
            res += system_mask
        elif self.role == Message.USER:
            res += user_mask
        elif self.role == Message.ASSISTANT:
            res += assistant_mask
        res += self.text
        res += '\n'
        return res
    

class Conversation:
    message: list[Message]
    url: str

    def __init__(self, system_promote = None, url = "http://127.0.0.1:8080/completion"):
        self.message = [] if system_promote is None else [
            Message(system_promote, Message.SYSTEM)
        ]
        self.url = url

    def __post_chat__(self):
        prompt = start_mask + "\n"
        for msg in self.message:
            prompt += str(msg) + "\n"
        prompt += assistant_mask
        res = requests.post(self.url, json={"prompt": prompt})
        msg = res.json()
        self.message.append(Message(msg["content"], Message.SYSTEM))
        return msg["content"]
    
    def chat(self, text):
        if len(text) > 0 :
            self.message.append(Message(text, Message.USER))
        return self.__post_chat__()
    
def main():
    conv = Conversation()
    while True:
        text = input("You: ")
        if text == "exit":
            break
        print("Assistant:", conv.chat(text))

if __name__ == "__main__":
    main()
```

Enter `exit` to quit.

You may notice that the interactive client takes a long time to respond; this is because DeepSeek undergoes extensive thinking processes before outputting all the content at once. Please be patient.

```bash
cd ~
python3 -m venv venv
source venv/bin/activate
python3 client.py
```

Reference document: https://github.com/wychlw/plct/blob/main/memo/deepseek_on_llama.cpp.md 