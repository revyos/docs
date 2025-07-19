---
title: LicheePi 4A Model Inference Guide
sidebar_position: 1
---

# LicheePi 4A Model Inference Guide

:::note
Source: [yuque](https://www.yuque.com/za4k4z/yp3bry/bumk462lyzkunh4y)
:::

## Example List

| Task            | Model              | Programming Interface | Hardware Unit      | Execution Method                |
|-----------------|--------------------|----------------------|--------------------|---------------------------------|
| Image Classification | alexnet            | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | resnet50           | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | mobilenetv1        | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | mobilenetv2        | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | inceptionv1        | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | inceptionv3        | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | inceptionv4        | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | xception           | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | vgg16              | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | squeezenet v1      | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | densenet121        | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | shufflenet         | C/C++                | C910v              | Offline Compilation             |
| Image Classification | efficientnet       | C/C++                | C910v + NPU        | Offline Compilation             |
| Image Classification | swin-transformer   | Python               | C910v              | Offline Compilation             |
| Image Classification | mobileVit          | Python               | C910v              | Offline Compilation             |
| Object Detection     | YOLOv5             | Python               | C910v + NPU        | Offline Compilation             |
| Object Detection     | YOLOX              | Python               | C910v              | onnxruntime                     |
| Reading Comprehension| bert               | Python               | C910v              | Offline Compilation             |
| Pose Estimation      | RTMPose            | Python               | C910v              | onnxruntime                     |
| Pose Estimation      | RTMPose            | Python               | C910v + NPU        | Offline Compilation + onnxruntime |
| Pose Estimation      | RTMPose            | Python               | C910v + NPU        | Offline Compilation