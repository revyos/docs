# Adaptation Documentation for GStreamer Player Supporting PTG omxil Library

Applicable SDK v1.1.2

## Overview

PTG's OpenMAX IL library (`vpu-omxil`) enables the LicheePi 4A to smoothly perform hardware decoding for 4K 60fps video playback. This document details the integration and usage of the Parole player on the LicheePi 4A development board, providing a guide to the adaptation process on this platform. The workflow for hardware decoding, using H.264 as an example, is shown below.

```plain
                +-------------------------------------------+
                |    +------------+       +------------+    |   +--------+
video stream----+--->| omxh264dec +------>| video-sink +----+-->| player |
                |    +------+-----+       +------------+    |   +--------+
                |           |     GStreamer                 |
                +-----------+-------------------------------+
                            |
                      +-----v-----+
                      | vpu-omxil |
                      +-----+-----+
                            |
                            |
                    +-------v-------+
                    | kernel module |
                    |    (driver)   |
                    +-------+-------+
                            |
                            v
                        hardware
```

1. The video stream is read into GStreamer, processed, and sent to the `omxh264dec` decoder in GStreamer.
2. `omxh264dec` invokes PTG's `vpu-omxil` library, which accesses the hardware through the driver (kernel module) for hardware decoding.
3. The decoded stream is then passed to GStreamer's video sink and rendered by the player.

## A. GStreamer omxh264dec Decoding Test

To isolate the `omxh264dec` decoding component, the general structure is as follows:

```plain
  +---+------------+----+
  |   +------------+    |
  |   | omxh264dec |    |
  |   +------------+    |
  |      GStreamer      |
  +----------+----------+
             |
  +----+-----v-----+----+
  |    +-----------+    |
  |    | vpu-omxil |    |
  |    +-----------+    |
  |  libomxil-bellagio  |
  +----------+----------+
             |
+------------v------------+
|  - memalloc   - vc8000  |
|  - hantrodec  - vidmem  |
|      kernel modules     |
+------------+------------+
             |
             v
          hardware
```

This section focuses on enabling the `omxh264dec` decoder, without involving screen output.

### 1. Driver Compilation, Installation, and Hardware Access Permissions

To enable hardware decoding, drivers must be compiled and installed to access the hardware.

#### 1.1 Compile Drivers

PTG-provided driver sources:

- [vpu-vc8000e-kernel](https://github.com/revyos/vpu-vc8000e-kernel)
- [vpu-vc8000d-kernel](https://github.com/revyos/vpu-vc8000d-kernel)
- [video_memory](https://github.com/revyos/video_memory)

##### 1.1.1 Alternative Solution

The [revyos/thead-kernel](https://github.com/revyos/thead-kernel) has merged the above modules, so you may avoid compiling these if using `revyos_defconfig`.

#### 1.2 Install Drivers

```shell
# Use depmod to analyze dependencies and create modules.dep in /lib/modules/<kernel-version>.
sudo depmod -a
sudo modprobe vidmem vc8000 hantrodec memalloc

# If modprobe fails, try using insmod
# cd /usr/lib/modules/$(uname -r)
# sudo insmod $(find . -name *vidmem.ko*)
# sudo insmod $(find . -name *vc8000.ko*)
# sudo insmod $(find . -name *hantrodec.ko*)
# sudo insmod $(find . -name *memalloc.ko*)

# Optional: Load modules at boot
echo -e "\nvidmem\nhantrodec\nmemalloc\nvc8000\n" | sudo tee -a /etc/modules > /dev/null
```

#### 1.3 Set Hardware Access Permissions

After installing kernel modules, device files for `hantrodec`, `vidmem`, and `vc8000` will appear in `/dev`. By default, users lack access permissions, so non-root users will encounter errors when opening the omxil library.

```shell
# For one-time effect
cd /dev
sudo chmod 666 hantrodec vidmem vc8000

# For persistent effect
cat << EOF | sudo tee /lib/udev/rules.d/70-hantro.rules > /dev/null
KERNEL=="vidmem", MODE="0666"
KERNEL=="hantrodec", MODE="0666"
KERNEL=="vc8000", MODE="0666"
EOF
```

#### RevyOS Adaptation Record

For RevyOS-specific kernel modules, go to [revyos/thead-kernel](https://github.com/revyos/thead-kernel) and download artifacts from GitHub CI.

### 2. Install `vpu-omxil` and Adjust Configuration

First, download and extract `vpu-omxil` to `/usr/lib/omxil/`.
[Download vpu-omxil_1.2.1.tar.gz](https://drive.google.com/file/d/1pYgCVI7WltfpskltJ-RqzVUCEC21FS56)

As illustrated below, the following steps are required:

1. Register the OpenMax components in `vpu-omxil` with `libomxil-bellagio`.
2. Configure `gst-omx` (which provides the `omxh264dec` decoder) to recognize the component names when calling `libomxil-bellagio`.

```plain
+---------+   +-------------------+   +-----------+
| gst-omx +-->| libomxil-bellagio +-->| vpu-omxil |
+---------+   +-------------------+   +-----------+
```

#### 2.1 Register Components in `vpu-omxil` with `libomxil-bellagio`

```shell
sudo apt install libomxil-bellagio-bin libomxil-bellagio0
# Register components
omxregister-bellagio -v /usr/lib/omxil/
```

The registration file is generated by `omxregister-bellagio` and, by default, is located at `~/.omxregister`.

##### 2.1.1 RevyOS/Debian Component Registration

[th1520-vpu](https://github.com/revyos/th1520-vpu) utilizes Debian’s automatic registration process in `/usr/lib/riscv64-linux-gnu/libomxil-bellagio0` upon installation. The resulting registry appears as follows:

```bash
cat /var/lib/libomxil-bellagio0/registry
/usr/lib/riscv64-linux-gnu/libomxil-bellagio0/libOMX.hantro.H2.video.encoder.so
 ==> OMX.hantro.H2.video.encoder ==> OMX.hantro.H2.video.encoder.avc:OMX.hantro.H2.video.encoder.hevc:
/usr/lib/riscv64-linux-gnu/libomxil-bellagio0/libOMX.hantro.VC8000D.image.decoder.so
 ==> OMX.hantro.VC8000D.image.decoder ==> OMX.hantro.VC8000D.image.decoder.jpeg:
/usr/lib/riscv64-linux-gnu/libomxil-bellagio0/libOMX.hantro.H2.image.encoder.so
 ==> OMX.hantro.H2.image.encoder ==> OMX.hantro.H2.image.encoder.jpeg:
/usr/lib/riscv64-linux-gnu/libomxil-bellagio0/libOMX.hantro.VC8000D.video.decoder.so
 ==> OMX.hantro.VC8000D.video.decoder ==> OMX.hantro.VC8000D.video.decoder.mpeg4:OMX.hantro.VC8000D.video.decoder.avc:OMX.hantro.VC8000D.video.decoder.avs:OMX.hantro.VC8000D.video.decoder.h263:OMX.hantro.VC8000D.video.decoder.wmv:OMX.hantro.VC8000D.video.decoder.vp6:OMX.hantro.VC8000D.video.decoder.vp8:OMX.hantro.VC8000D.video.decoder.jpeg:OMX.hantro.VC8000D.video.decoder.hevc:OMX.hantro.VC8000D.video.decoder.vp9:OMX.hantro.VC8000D.video.decoder.avs2:
```

#### 2.2 Configure `gstomx.conf`

Adjust the `gstomx.conf` settings to ensure the `omxh264dec` decoder calls the correct components. See the following patch for `gst-omx` configuration details:

[gst-omx-01-add-libomxil-config.patch](https://gist.github.com/Sakura286/26777ea8204c1819885e093806a4f7ca#file-gst-omx-01-add-libomxil-config-patch)

### 3. Add `dmabuf` Patch

Please refer to the `dmabuf` patch for `gst-omx` provided by PTG:

[gst-omx-02-set-dec-out-port-dmabuf.patch](https://gist.github.com/Sakura286/26777ea8204c1819885e093806a4f7ca#file-gst-omx-02-set-dec-out-port-dmabuf-patch)

### 4. Initial GStreamer Decoding Test

```shell
sudo apt install gstreamer1.0-omx-generic gstreamer1.0-omx-bellagio-config gstreamer1.0-plugins-bad gstreamer1.0-plugins-base gstreamer1.0-gl gstreamer1.0-plugins-good gstreamer1.0-tools

# 1. Basic decoding
gst-launch-1.0 filesrc location=<test.mp4> ! qtdemux !  h264parse ! omxh264dec  ! videoconvert ! fakesink  sync=false
# 2. Display FPS in the terminal
# Reference: https://stackoverflow.com/questions/73948308
gst-launch-1.0 filesrc location=<test.mp4> ! qtdemux !  h264parse ! omxh264dec  ! videoconvert ! fpsdisplaysink video-sink=fakesink  text-overlay=false sync=false -v 2>&1
```

`fakesink` discards all incoming video frames, bypassing the `video-sink` rendering stage to avoid performance loss, while `fpsdisplaysink` provides decoding speed statistics. Sample log output:

```log
Setting pipeline to PAUSED ...[DBGT]
vc8kdec compiled without trace support (ENABLE_DBGT_TRACE switch not enabled)
Pipeline is PREROLLING ...
Redistribute latency...
OMX  ! decoder_get_parameter OMX_ErrorNoMore (2)
Pipeline is PREROLLED ...
Setting pipeline to PLAYING ...
New clock: GstSystemClockRedistribute latency...
0:01:39.5 / 0:01:49.4 (90.9 %)
```

**Tip:** If encountering errors such as `[omxh264dec-omxh264dec0: Could not initialize supporting library.](https://gist.github.com/Sakura286/015fae6792e160268db7ad8a697dd2df)`, consider installing the debug-symbol packages for `gst-omx`, `libomxil-bellagio`, and `libc6`. Use `gdb` to troubleshoot by running the command above, setting a breakpoint at `DWLInit` and `open` to pinpoint where the issue arises.

#### RevyOS Compatibility Notes

During the RevyOS adaptation process, the following issues were identified as causes for dynamic library initialization failures:

1. Incompatible toolchain used when compiling `vpu-omxil`.
2. Missing `vpu-omxil` registration with `omxregister-bellagio`.
3. Insufficient permissions for `/dev` devices `hantrodec`, `vc8000`, and `vidmem`.

## B. Choosing the Right GStreamer `video-sink`

The `video-sink` is the last step in the [GStreamer pipeline](https://gstreamer.freedesktop.org/documentation/tutorials/basic/concepts.html), handling the final output of the video stream to the screen.
In the tests above, `fakesink` served as a testing `video-sink` to verify decoder functionality. There are, however, many `video-sink` options available ([see list](https://gstreamer.freedesktop.org/documentation/tutorials/basic/platform-specific-elements.html?gi-language=c)), such as `autovideosink`, `ximagesink`, `xvimagesink`, `fbdevsink`, `waylandsink`, `glimagesink`, `gtkglsink`, each requiring specific installation packages as follows:

| **video-sink** | **Package** |
| --- | --- |
| waylandsink | gstreamer1.0-plugins-bad |
| fbdevsink | gstreamer1.0-plugins-bad |
| autovideosink | gstreamer1.0-plugins-good |
| gtkglsink | gstreamer1.0-plugins-good |
| ximagesink &#124; xvimagesink | gstreamer1.0-plugins-base |
| glimagesink | gstreamer1.0-plugins-base &#124; gstreamer1.0-gl |

**Tip:** Use `gst-inspect-1.0 <video-sink-name>` to view available options for each `video-sink`.
**Tip:** Adjust `--gst-debug-level=<lv>` to set the [debug log level](https://gstreamer.freedesktop.org/documentation/tutorials/basic/debugging-tools.html#the-debug-log), where `<lv>` ranges from 1 to 6, with higher levels providing more verbose output. Setting the level below 4 is recommended, as higher levels can result in very long logs.
Experiment with different `video-sink` options, plugin parameters, and environmental variables until you find one that enables smooth H.264 hardware decoding.

### RevyOS Adaptation Notes

- **waylandsink**: As RevyOS is currently (20230720) using the Xfce desktop environment, Wayland support is not feasible, so `waylandsink` is inherently unusable.
- **fbdevsink** and **ximagesink**: Both are unusable.
- **xvimagesink**: From [pipeline graphs](https://gstreamer.freedesktop.org/documentation/tutorials/basic/debugging-tools.html#getting-pipeline-graphs) and logs, we can see that `playbin` or `autovideosink` automatically calls `xvimagesink`. After analyzing with `perf`, it’s evident that `xvimagesink` involves significant `memcpy` operations, severely impacting decoding performance. This issue persists even with the PTG-provided `dmabuf` patch, so it’s not a viable option.
- **gtkglsink**: Due to [GTK3’s lack of support for EGL on X11](https://gitlab.gnome.org/GNOME/gtk/-/issues/738), and as RevyOS is based on X11 and only supports EGL, this option is also unusable.

The only remaining option is `glimagesink`. Based on [Running and debugging GStreamer Applications](https://gstreamer.freedesktop.org/documentation/gstreamer/running.html#environment-variables) and examples that use `glimagesink`, it appears necessary to specify the environment variables `GST_GL_API` and `GST_GL_PLATFORM`. Since RevyOS uses a `gles2` + `egl` setup, the following command enables successful hardware decoding:

```shell
GST_GL_API=gles2 GST_GL_PLATFORM=egl gst-launch-1.0 filesrc location=<test.mp4> ! qtdemux !  h264parse ! omxh264dec  ! videoconvert ! fpsdisplaysink video-sink=glimagesink sync=false
```

However, these parameters cannot be passed as environment variables when GStreamer is invoked by a media player. Therefore, it’s essential to pass additional `meson` build options when compiling `gst-plugins-base`:

```shell
-Dgl_api=[\'gles2\'] -Dgl_platform=[\'egl\']
```

## C. Player Support

Once the GStreamer pipeline functions correctly, the next step is to enable player support. Different players utilize different `video-sink` elements and have varying levels of dependency on GStreamer. The adaptation strategy for players is to either (1) modify the player to support the verified `video-sink` or (2) modify the GStreamer pipeline to support the player’s specified `video-sink`. The RevyOS adaptation process adopts the first approach.

```plain
                +-------------------------------------------+
                |    +------------+       +------------+    |   +--------+
video stream----+--->| omxh264dec +------>| video-sink +----+-->| player |
                |    +------------+       +------------+    |   +--------+
                |                GStreamer                  |
                +-------------------------------------------+
```

### RevyOS Adaptation Notes

Based on the [GStreamer-supported applications list](https://gstreamer.freedesktop.org/apps/):

| Usable | Updated | Application | Notes |
| --- | --- | --- | --- |
| ❌ |  | Gnash | Flash Player |
| ❌ |  | GEntrans | Not in Debian |
| ❓ | 20230226 | Kaffeine | ❌ Requires extensive KDE dependencies |
||||✔️ Present in the [riscv64 repository](https://buildd.debian.org/status/package.php?p=kaffeine&suite=sid) |
||||❌ On Debian amd64 Gnome, the playback and control windows are separated, with VLC as the default player. |
| ❌ |  | Lcdgrilo | Not in Debian |
| ✔️ | 20230218 | Parole | ✔️ For XFCE |
||||❓ No Wayland support, X11 only |
||||✔️ Verified on Debian amd64 Gnome |
||||✔️ Available in the [riscv64 repository](https://buildd.debian.org/status/package.php?p=parole&suite=sid) |
| ❌ |  | Songbird | Not in Debian |
| ❌ |  | Snappy | Not in Debian |
| ❌ |  | Totem | Requires GTK3, which doesn’t support EGL on X11 |

Totem was initially chosen but proved difficult to support due to its inability to specify a `video-sink` other than `gtkglsink`, which RevyOS does not support. After evaluating GStreamer-compatible players, Parole emerged as a suitable choice. Parole, written with GObject, requires modification in the `parole_gst_constructed` method to set `video-sink` to `glimagesink`, as previously validated. The patch can be found here:

[parole-01-add-glimagesink-support.patch](https://gist.github.com/Sakura286/26777ea8204c1819885e093806a4f7ca#file-parole-01-add-glimagesink-support-patch)

With this, the preliminary adaptation work is complete.

## Summary of RevyOS Adaptation Work

1. Compile driver modules into the kernel, enable them at boot, and set device permissions.
2. Package PTG's `omxil` binary dynamic library files as `th1520-vpu`.
   1. Modify `th1520-vpu` dependencies to require `gst-omx`, `libomxil-bellagio`, etc.
   2. Add post-install operations, such as registering components with `omxregister-bellagio`.
3. Modify `gst-omx`:
   1. Add support for the `vpu-omxil` component in the config.
   2. Apply `dmabuf` patches.
   3. Add support for h265 and vp9.
4. Modify `gst-base` to limit GL support to `gles2` + `egl` during compilation.
5. Modify Parole to support `glimagesink`.

## Resources Used

Patch collection:

https://gist.github.com/Sakura286/26777ea8204c1819885e093806a4f7ca

PTG omxil library:

https://drive.google.com/file/d/1pYgCVI7WltfpskltJ-RqzVUCEC21FS56
