# glmark2

glmark2 是基于 OpenGL 2.0 以及 ES 2.0 的一个性能测试.

此处我们只使用 glmark2-es2 ，软件包已经预装在RevyOS中，用于 x11-glesv2 的测试. 


`th1520` 只支持 glmark-es2.

## 准备步骤

开始之前我们需要调整芯片进入高性能模式，在终端中执行下述命令即可，需要使用 `sudo` 或者root账户.


```bash
echo performance >  /sys/devices/system/cpu/cpufreq/policy0/scaling_governor 

cat /sys/devices/system/cpu/cpufreq/policy0/cpuinfo_cur_freq
```

如果在执行之后看到 "1848000" 数字，则表明已经调整至性能模式，可以继续向下操作.


## 开始运行


使用任意账户登陆系统，打开终端输入 `glmark2-es2`，需要将HDMI连接到显示器，请勿通过SSH连接执行. 

输入命令后，桌面上会出现一个有图形活动的新窗口。

测试完成后，额外窗口会消失，分数会以 `glmark2 Score: xxx` 的形式输出在终端中。

测试示例:

```
debian@lpi4a:~/Desktop$ glmark2-es2
=======================================================
    glmark2 2021.12
=======================================================
    OpenGL Information
    GL_VENDOR:      Imagination Technologies
    GL_RENDERER:    PowerVR B-Series BXM-4-64
    GL_VERSION:     OpenGL ES 3.2 build 1.17@6210866
    Surface Config: buf=32 r=8 g=8 b=8 a=8 depth=24 stencil=8
    Surface Size:   800x600 windowed
=======================================================
[build] use-vbo=false: FPS: 513 FrameTime: 1.949 ms
[build] use-vbo=true: FPS: 1367 FrameTime: 0.732 ms
[texture] texture-filter=nearest: FPS: 1449 FrameTime: 0.690 ms
[texture] texture-filter=linear: FPS: 1454 FrameTime: 0.688 ms
[texture] texture-filter=mipmap: FPS: 1453 FrameTime: 0.688 ms
[shading] shading=gouraud: FPS: 1172 FrameTime: 0.853 ms
[shading] shading=blinn-phong-inf: FPS: 1180 FrameTime: 0.847 ms
[shading] shading=phong: FPS: 1002 FrameTime: 0.998 ms
[shading] shading=cel: FPS: 979 FrameTime: 1.021 ms
[bump] bump-render=high-poly: FPS: 700 FrameTime: 1.429 ms
[bump] bump-render=normals: FPS: 1354 FrameTime: 0.739 ms
[bump] bump-render=height: FPS: 1320 FrameTime: 0.758 ms
[effect2d] kernel=0,1,0;1,-4,1;0,1,0;: FPS: 1059 FrameTime: 0.944 ms
[effect2d] kernel=1,1,1,1,1;1,1,1,1,1;1,1,1,1,1;: FPS: 381 FrameTime: 2.625 ms
[pulsar] light=false:quads=5:texture=false: FPS: 1484 FrameTime: 0.674 ms
[desktop] blur-radius=5:effect=blur:passes=1:separable=true:windows=4: FPS: 349 FrameTime: 2.865 ms
[desktop] effect=shadow:windows=4: FPS: 736 FrameTime: 1.359 ms
[buffer] columns=200:interleave=false:update-dispersion=0.9:update-fraction=0.5:update-method=map: FPS: 161 FrameTime: 6.211 ms
[buffer] columns=200:interleave=false:update-dispersion=0.9:update-fraction=0.5:update-method=subdata: FPS: 173 FrameTime: 5.780 ms
[buffer] columns=200:interleave=true:update-dispersion=0.9:update-fraction=0.5:update-method=map: FPS: 242 FrameTime: 4.132 ms
[ideas] speed=duration: FPS: 593 FrameTime: 1.686 ms
[jellyfish] <default>: FPS: 572 FrameTime: 1.748 ms
[terrain] <default>: FPS: 42 FrameTime: 23.810 ms
[shadow] <default>: FPS: 619 FrameTime: 1.616 ms
[refract] <default>: FPS: 82 FrameTime: 12.195 ms
[conditionals] fragment-steps=0:vertex-steps=0: FPS: 1539 FrameTime: 0.650 ms
[conditionals] fragment-steps=5:vertex-steps=0: FPS: 1238 FrameTime: 0.808 ms
[conditionals] fragment-steps=0:vertex-steps=5: FPS: 1535 FrameTime: 0.651 ms
[function] fragment-complexity=low:fragment-steps=5: FPS: 1411 FrameTime: 0.709 ms
[function] fragment-complexity=medium:fragment-steps=5: FPS: 1050 FrameTime: 0.952 ms
[loop] fragment-loop=false:fragment-steps=5:vertex-steps=5: FPS: 1376 FrameTime: 0.727 ms
[loop] fragment-steps=5:fragment-uniform=false:vertex-steps=5: FPS: 1394 FrameTime: 0.717 ms
[loop] fragment-steps=5:fragment-uniform=true:vertex-steps=5: FPS: 1379 FrameTime: 0.725 ms
=======================================================
                                  glmark2 Score: 950 
=======================================================

```
