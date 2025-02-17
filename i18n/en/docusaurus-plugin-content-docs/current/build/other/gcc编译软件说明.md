# gcc build programs instructions

## Installing gcc

First, ensure gcc is installed:

```bash
sudo apt update
sudo apt install gcc
```

## Running the program

Here's an example of how to compile and run the simplest 'hello, world' program:

Compile the following content and name it `hello.c`:

```c
#include <stdio.h>

int main()
{
        printf("hello, world\n");
        return 0;
}
```

Compile and execute:

```bash
debian@lpi4a:~/test$ gcc -g hello.c -o hello

debian@lpi4a:~/test$ ./hello
hello, world
```

# g++ build programs instructions

First, ensure g++ is installed:

```bash
sudo apt update
sudo apt install g++
```

## Running the program

Here's an example of how to compile and run the simplest 'hello, world' program:

Compile the following content and name it `hello.cpp`:

```c++
#include <iostream>
using namespace std;

int main()
{
    cout << "Hello, World!\n";
    return 0;
}
```

Compile and execute:

```bash
debian@lpi4a:~/test$ g++ -g hello.cpp -o hello
debian@lpi4a:~/test$ ./hello
Hello, World!
```

These are the simplest examples of compiling and running programs with gcc/g++. For more complex applications, please refer to the corresponding system programming manuals.
