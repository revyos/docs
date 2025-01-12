# Robot Operating System (ROS)
> 本页的 ROS 指 ROS 2

状态：可以运行

官方资料页：[https://ros.org/](https://ros.org/)

官方文档: [https://docs.ros.org/](https://docs.ros.org/)

## 软件说明
ROS (Robot Operating System, 机器人操作系统) 提供一系列程序库和工具以帮助软件开发者创建机器人应用软件。它提供了硬件抽象、设备驱动、函数库、可视化工具、消息传递和软件包管理等诸多功能。ROS遵循BSD开源许可协议。

## 安装
### 添加源

```bash
sudo sh -c "echo 'deb https://mirror.iscas.ac.cn/revyos/revyos-ros2/ revyos-ros2 main\ndeb-src https://mirror.iscas.ac.cn/revyos/revyos-ros2/ revyos-ros2 main' > /etc/apt/sources.list.d/ros.list"
sudo apt update
sudo apt upgrade
```

### 安装 ROS
目前已经测试 ROS [Jazzy](https://docs.ros.org/en/jazzy/) 和 [Humble](https://docs.ros.org/en/humble/) 版本可用

**注意**：两个版本可能会存在依赖冲突，请不要尝试同时安装两个版本

Jazzy:
```bash
apt install ros-jazzy-desktop-full
```

Humble:
```bash
apt install ros-humble-desktop-full
```

### 安装 rosdep
```bash
sudo apt install python3-rosdep2
```

然后删除 `/etc/ros/rosdep/sources.list.d/10-debian.list`,
并修改 `etc/ros/rosdep/sources.list.d/20-default.list` 为下面的内容

```
yaml https://raw.githubusercontent.com/revyos-ros/rosdistro/master/rosdep/base.yaml
yaml https://raw.githubusercontent.com/revyos-ros/rosdistro/master/rosdep/python.yaml
yaml https://raw.githubusercontent.com/revyos-ros/rosdistro/master/rosdep/ruby.yaml
```

### 获取 ROS 环境
根据安装的 ROS 版本，选择相应的命令

Jazzy:
```bash
source /opt/ros/jazzy/setup.sh
```

Humble:
```bash
source /opt/ros/humble/setup.sh
```

可以将上面的内容加入 `.bashrc` 或者您使用的 shell profile 中。

## 功能使用
### rosdep
```bash
rosdep update
```
使用 rosdep 安装外部依赖（以 `micro_ros_setup`）为例

1.设置环境变量
请根据您安装的版本选择对应的命令

Jazzy:
```bash
AMENT_PACKAGE_PATH=/opt/ros/jazzy
```

Humble:
```bash
AMENT_PACKAGE_PATH=/opt/ros/humble
```

2.下载源代码
```bash
git clone https://github.com/micro-ROS/micro_ros_setup && cd micro_ros_setup
```
3.安装依赖
```bash
rosdep install --from-paths . -y --ignore-src
```

### colon
colon 是一款现代的 ROS 编译工具

```bash
sudo apt install colcon
```
测试编译（依然以 `micro_ros_setup`）为例
```bash
git clone https://github.com/micro-ROS/micro_ros_setup && cd micro_ros_setup
colcon build
```

### ros2 command
- `ros2 pkg` 命令用于管理 ROS 2 包。
- `ros2 run` 命令用于运行 ROS 2 包中的特定节点。
- `ros2 topic` 命令用于与 ROS 2 的话题交互。
- `ros2 param` 命令用于管理 ROS 2 参数。
- `ros2 service` 命令用于与 ROS 2 服务交互。
- `ros2 node` 命令用于与 ROS 2 节点交互。
- `ros2 bag` 命令用于记录和回放 ROS 2 数据。
- `ros2 launch` 命令用于启动 ROS 2 启动文件。

### 已测试的 ROS 2 功能

- Node（C++）  
  运行 C++ 节点：  
  ```bash
  ros2 run demo_nodes_cpp talker
  ros2 run demo_nodes_cpp listener  
  ```

- Node（Python）  
  运行 Python 节点：  
  ```bash
  ros2 run demo_nodes_py talker  
  ros2 run demo_nodes_py listener  
  ```

- Add Two Ints Server  
  测试服务端和客户端：  
  ```bash
  ros2 run demo_nodes_cpp add_two_ints_server  
  ros2 run demo_nodes_cpp add_two_ints_client  
  ```

- TF2  
  测试静态变换、监听和监控功能：  
   发布静态变换并监听：  
    ```bash
    ros2 run tf2_ros static_transform_publisher 1 1 1 0 0 0 /base_link /odom  
    ros2 run tf2_ros tf2_echo base_link odom  
    ```  
   监控变换：  
    ```bash
    ros2 run tf2_ros static_transform_publisher 1 1 1 0 0 0 /base_link /odom  
    ros2 run tf2_ros tf2_monitor  
    ```  
   查看变换框架图（需生成 PDF 文件）：  
    ```bash
    ros2 run tf2_ros static_transform_publisher 1 1 1 0 0 0 /base_link /odom  
    ros2 run tf2_tools view_frames  
    ```

- TurtleSim  
  需要图形界面支持：  
   启动 turtlesim 节点：  
    ```bash
    ros2 run turtlesim turtlesim_node  
    ```  
   图形界面会弹出一个窗口。  
   使用键盘控制小乌龟：  
    ```bash
    ros2 run turtlesim turtle_teleop_key  
    ```
    
  ![TurtleSim 使用截图](./Images/ROS2_TurtleSim.png)

- RQT  
  需要图形界面支持：  
   启动 RQT 图形工具：  
    ```bash
    ros2 run rqt_gui rqt_gui  
    ```

  ![rqt 使用截图](./Images/ROS2_rqt.png)

### rviz2
需要使用 `sudo switch-gl gl4es` 再重启后使用 `LIBGL_ALWAYS_SOFTWARE=true rviz2 here` 启动，效果如下

![RViz2 使用截图](./Images/ROS2_RViz.png)

### gazebo
使用 `sudo apt install gazebo11` 安装

需要使用 `sudo switch-gl gl4es` 再重启后使用 `LIBGL_ALWAYS_SOFTWARE=true gazebo` 启动，效果如下

![Gazebo 使用截图](./Images/ROS2_Gazebo.png)