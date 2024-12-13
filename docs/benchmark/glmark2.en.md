# glmark2

glmark2 is an OpenGL 2.0 and ES 2.0 benchmark.
We will only use glmark2-es2 for relevant tests here . This is a testing tool for x11-glesv2. 

This software package is already pre-installed in the system.

`th1520` only support glmark-es2.

## Pre-steps

If you need perfect performance, put your device into performance mode before you start, here's how to do it.


Please execute the following commands in the terminal. This command requires a root account.

```bash
echo performance >  /sys/devices/system/cpu/cpufreq/policy0/scaling_governor 

cat /sys/devices/system/cpu/cpufreq/policy0/cpuinfo_cur_freq
```

After the execution is completed, you will see a series of numbers, such as "1848000".


## Start operation


Open a terminal and enter glmark2-es2. This test allows the use of non-root accounts.

After entering the command, a new window will appear on your desktop with an active screen.


After the test is completed, the additional activity screen will disappear and the score will be output in the terminal in the form of "glmark2 Score: xxx".


For example:

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
