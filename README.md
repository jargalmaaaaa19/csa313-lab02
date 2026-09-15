# Lab 02: Performance Measurement with k6

## 1. Environment & k6 Version
Энэхүү лабораторийн ажлыг WSL2 (Ubuntu) орчинд гүйцэтгэж, k6 хэрэгслийг албан ёсны сангаас амжилттай суулгасан.
```bash
k6 v2.2.0 (commit/00a9a1b7f5, go1.26.5, linux/amd64)

user@DESKTOP-9HU6DH7:~$ sudo gpg -k
[sudo] password for user:
gpg: directory '/root/.gnupg' created
gpg: keybox '/root/.gnupg/pubring.kbx' created
gpg: /root/.gnupg/trustdb.gpg: trustdb created
user@DESKTOP-9HU6DH7:~$ sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
  --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
gpg: keybox '/usr/share/keyrings/k6-archive-keyring.gpg' created
gpg: key 77C6C491D6AC1D69: public key "k6.io (key for signing binaries) <security@k6.io>" imported
gpg: Total number processed: 1
gpg:               imported: 1
user@DESKTOP-9HU6DH7:~$ echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" \
  | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt update && sudo apt install k6
k6 version
deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main
Get:1 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
Hit:2 http://archive.ubuntu.com/ubuntu noble InRelease
Hit:3 https://deb.nodesource.com/node_20.x nodistro InRelease
Get:4 http://archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]
Get:5 http://security.ubuntu.com/ubuntu noble-security/main amd64 Packages [1007 kB]
Get:6 http://archive.ubuntu.com/ubuntu noble-backports InRelease [126 kB]
Get:7 https://dl.k6.io/deb stable InRelease [4149 B]
Get:8 https://dl.k6.io/deb stable/main amd64 Packages [7199 B]
Get:9 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 Packages [1263 kB]
Get:10 http://security.ubuntu.com/ubuntu noble-security/main Translation-en [213 kB]
Get:11 http://security.ubuntu.com/ubuntu noble-security/main amd64 Components [46.4 kB]
Get:12 http://security.ubuntu.com/ubuntu noble-security/universe amd64 Packages [1207 kB]
Get:13 http://security.ubuntu.com/ubuntu noble-security/universe Translation-en [242 kB]
Get:14 http://security.ubuntu.com/ubuntu noble-security/universe amd64 Components [76.3 kB]
Get:15 http://security.ubuntu.com/ubuntu noble-security/restricted amd64 Packages [1445 kB]
Get:16 http://archive.ubuntu.com/ubuntu noble-updates/main Translation-en [292 kB]
Get:17 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 Components [181 kB]
Get:18 http://security.ubuntu.com/ubuntu noble-security/restricted Translation-en [336 kB]
Get:19 http://archive.ubuntu.com/ubuntu noble-updates/universe amd64 Packages [1686 kB]
Get:20 http://archive.ubuntu.com/ubuntu noble-updates/universe Translation-en [337 kB]
Get:21 http://archive.ubuntu.com/ubuntu noble-updates/universe amd64 Components [388 kB]
Get:22 http://archive.ubuntu.com/ubuntu noble-updates/restricted amd64 Packages [1550 kB]
Get:23 http://archive.ubuntu.com/ubuntu noble-updates/restricted Translation-en [355 kB]
Get:24 http://archive.ubuntu.com/ubuntu noble-updates/multiverse amd64 Packages [45.7 kB]
Get:25 http://archive.ubuntu.com/ubuntu noble-updates/multiverse Translation-en [12.8 kB]
Get:26 http://archive.ubuntu.com/ubuntu noble-updates/multiverse amd64 Components [940 B]
Get:27 http://archive.ubuntu.com/ubuntu noble-backports/main amd64 Components [5772 B]
Get:28 http://archive.ubuntu.com/ubuntu noble-backports/universe amd64 Components [12.6 kB]
Fetched 11.1 MB in 5s (2459 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
109 packages can be upgraded. Run 'apt list --upgradable' to see them.
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  k6
0 upgraded, 1 newly installed, 0 to remove and 109 not upgraded.
Need to get 28.9 MB of archives.
After this operation, 65.2 MB of additional disk space will be used.
Get:1 https://dl.k6.io/deb stable/main amd64 k6 amd64 2.2.0 [28.9 MB]
Fetched 28.9 MB in 8s (3760 kB/s)
Selecting previously unselected package k6.
(Reading database ... 68827 files and directories currently installed.)
Preparing to unpack .../archives/k6_2.2.0_amd64.deb ...
Unpacking k6 (2.2.0) ...
Setting up k6 (2.2.0) ...
k6 v2.2.0 (commit/00a9a1b7f5, go1.26.5, linux/amd64)


p(95)=481.31ms анхны бүгдийн туршисан туршилт

p(95)=530.37ms 5vu

p(95)=495.64ms 30vu

p(95)=509.1ms 100vu
