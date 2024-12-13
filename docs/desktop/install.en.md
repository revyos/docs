# Package Installation

In RevyOS, packages can be installed by typing the following command in the terminal:

```bash
sudo apt install <package-name>
```

Here is an example of installing `git`:

```bash
debian@lpi4a:~$ sudo apt install git
[sudo] password for debian: 
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  git-man liberror-perl patch
Suggested packages:
  gettext-base git-daemon-run | git-daemon-sysvinit git-doc git-email git-gui
  gitk gitweb git-cvs git-mediawiki git-svn ed diffutils-doc
The following NEW packages will be installed:
  git git-man liberror-perl patch
0 upgraded, 4 newly installed, 0 to remove and 0 not upgraded.
Need to get 8605 kB of archives.
After this operation, 39.4 MB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 https://mirror.iscas.ac.cn/revyos/revyos-base sid/main riscv64 liberror-perl all 0.17029-2 [29.0 kB]
Get:2 https://mirror.iscas.ac.cn/revyos/revyos-base sid/main riscv64 git-man all 1:2.40.1-1 [2072 kB]
Get:3 https://mirror.iscas.ac.cn/revyos/revyos-base sid/main riscv64 git riscv64 1:2.40.1-1 [6390 kB]
Get:4 https://mirror.iscas.ac.cn/revyos/revyos-base sid/main riscv64 patch riscv64 2.7.6-7+b1 [114 kB]
Fetched 8605 kB in 1s (6656 kB/s)
Selecting previously unselected package liberror-perl.
(Reading database ... 75688 files and directories currently installed.)
Preparing to unpack .../liberror-perl_0.17029-2_all.deb ...
Unpacking liberror-perl (0.17029-2) ...
Selecting previously unselected package git-man.
Preparing to unpack .../git-man_1%3a2.40.1-1_all.deb ...
Unpacking git-man (1:2.40.1-1) ...
Selecting previously unselected package git.
Preparing to unpack .../git_1%3a2.40.1-1_riscv64.deb ...
Unpacking git (1:2.40.1-1) ...
Selecting previously unselected package patch.
Preparing to unpack .../patch_2.7.6-7+b1_riscv64.deb ...
Unpacking patch (2.7.6-7+b1) ...
Setting up liberror-perl (0.17029-2) ...
Setting up patch (2.7.6-7+b1) ...
Setting up git-man (1:2.40.1-1) ...
Setting up git (1:2.40.1-1) ...
Processing triggers for man-db (2.11.2-2) ...
```

After confirming with `Y`, `git` and its dependencies are installed and ready for use.
