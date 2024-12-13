# yquake2

**Status:**  
Running with GLES acceleration support.

**Resources:**  
- [Installation Guide](https://github.com/yquake2/yquake2/blob/master/doc/020_installation.md)
- [Configuration Guide](https://github.com/yquake2/yquake2/blob/master/doc/030_configuration.md)

### Installation Steps

```bash
# Install dependencies
sudo apt install build-essential libgl1-mesa-dev libsdl2-dev libopenal-dev libcurl4-openssl-dev

# Download the code & compile
git clone https://github.com/yquake2/yquake2.git
mkdir build
cd build
cmake ..
make

# Run the game
# (Make sure to have the original game resource folder baseq2 ready)
cd ..
cd release
cp -r ~/baseq2 .
./quake2
```

### Display

You need to place the original game resource folder `baseq2` in the same directory as the `quake2` program (the Steam version works). 

The resolution and graphics acceleration options can be modified in the in-game settings menu. By default, it uses software rendering, so be sure to change it to “OpenGL ES3” for hardware rendering (see the image below).

![yquake2 Screenshot](images/yquake2_1.png)
