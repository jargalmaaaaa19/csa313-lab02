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

Туршилтын үр дүн:

анхны бүгдийн туршисан туршилт: p(95)=481.31ms 

5vu: p(95)=530.37ms 

30vu: p(95)=495.64ms 

100vu: p(95)=509.1ms 

SLO (Service Level Objective) & Thresholds

Сонгосон Threshold: http_req_duration: ['p(95)<800'] болон http_req_failed: ['rate<0.01'].  Үндэслэл: Анхны 5 VU үед гарсан baseline p95 (530.37ms) утга дээр суурилан сүлжээний болон сервер талын түр зуурын хэлбэлзлийг тооцож, чанарын босгыг p(95) < 800ms байхаар үндэслэлтэйгээр тогтоов. Энэхүү босго нь k6 тест автоматаар PASS эсвэл FAIL болохыг шалгах quality gate үүрэг гүйцэтгэдэг.  

Load Testing Results (Гүйцэтгэлийн хэмжилтийн хүснэгт)

| VU Түвшин | p90 Latency | p95 Latency | Throughput (Reqs/sec) | Error Rate |
| :--- | :--- | :--- | :--- | :--- |
| **5 VU** | 459.46ms | 530.37ms | 6.10 req/s | 0.00% |
| **30 VU** | 439.25ms | 495.64ms | 36.76 req/s | 0.00% |
| **100 VU** | 450.62ms | 509.10ms | 116.80 req/s | 0.00% |

https://test.k6.io руу 5 VU, 30 VU, 100 VU гэсэн гурван өөр түвшингөөр тус бүр 1 минутын турш ачаалал өгч хэмжсэн үр дүнг доорх хүснэгтэд үзүүлэв:

VU Түвшинp90 Latencyp95 LatencyThroughput (Throughput / reqs)Error Rate (http_req_failed)5 VU~459.46ms530.37ms6.10 req/s0.00%  30 VU~454.12ms495.64ms38.30 req/s0.00%  100 VU(файлаасаа харна уу)509.10ms(файлаасаа харна уу)0.00%  

Дүгнэлт: 

Энэхүү лабораторийн ажиглалтаар ачаалал 5 VU-ээс 100 VU болж эрс өсөхөд test.k6.io олон нийтийн сервер дээрх p95 latency харьцангуй тогтвортой (~480ms - 530ms хооронд) үлдэж, ямар нэгэн уналт гарсангүй. Харин секундэд боловсруулсан хүсэлтийн тоо (Throughput) хэрэглэгчийн тоо өсөхийн хэрээр олон дахин нэмэгдэж байна. Лекцийн онолоор ачаалал ихсэхэд систем удааширч latency өсөх ёстой боловч энэхүү гадаад сервер нь caching болон оновчлол сайтай тул хүлээгдэж байснаас илүү тогтвортой хариу өглөө. Туршилтын явцад error rate 0.00% буюу ямар нэгэн алдаа гараагүй нь системийн бэлэн байдал (availability) өндөр байгааг харуулж байна. Тогтоосон SLO босго маань амжилттай PASS болж, мөн алдаатай босго тавихад тест шууд FAIL болж байсан нь CI/CD pipeline дээр чанарын хяналт хэрхэн хэрэгждэг бодит жишээг харууллаа.
