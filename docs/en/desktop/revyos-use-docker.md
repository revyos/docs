# Installing Go and RISC-V Docker

### Installing Go

To install Go, use the following command:

```bash
sudo apt install golang-go
```

Verify the installation:

```bash
debian@lpi4a:~$ go version
go version go1.19.8 linux/riscv64
```

### Installing Docker for RISC-V64

A RISC-V64-compatible Docker package is available as `docker.io`, and can be installed with:

```bash
sudo apt install docker.io
```

### Testing Docker

To test the installation, try pulling the RISC-V64 Debian image:

```bash
sudo docker pull riscv64/debian:unstable
```

### Troubleshooting

If the following error occurs when using the `docker pull` command:

```bash
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/images/create?fromImage=riscv64%2Fdebian&tag=unstable": dial unix /var/run/docker.sock: connect: permission denied
```

resolve it with these commands:

```bash
# Allow access to the Docker socket
sudo chmod 666 /var/run/docker.sock

# Start the Docker service
sudo systemctl start docker

# Run a test container
sudo docker run hello-world
```

This should enable Docker to run with the necessary permissions.