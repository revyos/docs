---
title: 荔枝派4A 模型推理指南
sidebar_position: 1
---

# 荔枝派4A 模型推理指南

:::note
source: [yuque](https://www.yuque.com/za4k4z/yp3bry/bumk462lyzkunh4y)
:::

## 示例列表

| 示例功能   | 使用的模型         | 编程接口   | 硬件单元       | 执行方式               |
|------------|--------------------|------------|----------------|------------------------|
| 图像分类   | alexnet            | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | resnet50           | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | mobilenetv1        | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | mobilenetv2        | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | inceptionv1        | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | inceptionv3        | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | inceptionv4        | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | xception           | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | vgg16              | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | squeezenet v1      | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | densenet121        | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | shufflenet         | c/c++      | C910v           | 离线编译               |
| 图像分类   | efficientnet       | c/c++      | C910v + NPU     | 离线编译               |
| 图像分类   | swin-transformer   | python     | C910v           | 离线编译               |
| 图像分类   | mobileVit          | python     | C910v           | 离线编译               |
| 目标检测   | YOLOv5             | python     | C910v + NPU     | 离线编译               |
| 目标检测   | YOLOX              | python     | C910v           | onnxruntime            |
| 阅读理解   | bert               | python     | C910v           | 离线编译               |
| 姿态估计   | RTMPose            | python     | C910v           | onnxruntime            |
| 姿态估计   | RTMPose            | python     | C910v + NPU     | 离线编译 + onnxruntime |
| 姿态估计   | RTMPose            | python     | C910v + NPU     | 离线编译 + onnxruntime |
