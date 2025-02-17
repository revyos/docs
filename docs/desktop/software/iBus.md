---
title: iBus 输入法
sidebar_position: 2
---

# iBus 输入法

状态：可以运行

资料：https://wiki.debian.org/I18n/ibus

### 步骤（没有使用im-config）

```
sudo apt install ibus ibus-libpinyin
sudo reboot
```
重启后需要手动将中文输入法添加到输入选项中：

托盘图标->右击->Preference
![iBus 设置界面](images/ibus_1.png)

点击选项卡Input Method->Add，打开下图窗口
![iBus 添加输入法界面](images/ibus_2.png)

点击Chinese->Pinyin->Add
![iBus 添加中文输入法操作](images/ibus_3.png)
