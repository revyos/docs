# OpenTTD

**Status:**  
Running, with software rendering for graphics.

**Resources:**  
- [OpenTTD Compiling Guide](https://github.com/OpenTTD/OpenTTD/blob/master/COMPILING.md)
- [Debian Control File](https://salsa.debian.org/openttd-team/openttd/-/blob/master/debian/control)

### Steps
```bash
# Install dependencies
sudo apt install libsdl2-dev zlib1g-dev libpng-dev libfreetype-dev libfontconfig-dev libicu-dev liblzo2-dev liblzma-dev libfluidsynth-dev libopengl-dev grfcodec openttd-opengfx cmake

# Download the code & compile
git clone https://github.com/OpenTTD/OpenTTD.git
cd OpenTTD
mkdir build
cd build
cmake ..
make

# Run the game
./openttd
```

The graphics and audio resource files can be downloaded through the in-game functionality, and the game supports Chinese.

![OpenTTD Screenshot](images/openttd_1.png)
