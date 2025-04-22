## 🐍 Python Alətləri və Onların İstifadə Sahələri

Python CTF yarışlarında ən çox istifadə edilən dillərdən biridir. Aşağıda real CTF ssenarilərində istifadə olunan əsas Python kitabxanaları və onların nə işə yaradığı geniş izah olunub.

### 🔹 1. `paramiko` – SSH ilə uzaq sistemə qoşulmaq
**Niyə istifadə olunur:**
- Uzaq serverlərə avtomatik qoşulmaq
- SSH üzərindən komanda göndərmək və nəticəni almaq

**İstifadə yeri:** Reverse shell tapşırıqları, uzaqdan `flag.txt` oxumaq

```python
import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect("ip", username="user", password="pass")
stdin, stdout, stderr = ssh.exec_command("cat flag.txt")
print(stdout.read().decode())
```

---

### 🔹 2. `pwntools` – Exploit yazmaq və BOF təhlili
**Niyə istifadə olunur:**
- TCP bağlantı, exploit göndərmək, cavab almaq
- Binary exploitation və automatisasiya

**İstifadə yeri:** buffer overflow, ROP chain ssenariləri

```python
from pwn import *
conn = remote("ctf.site", 1234)
conn.sendline(b"A" * 64 + p32(0xdeadbeef))
print(conn.recvline())
```

---

### 🔹 3. `requests` – HTTP istəkləri ilə işləmək
**Niyə istifadə olunur:**
- Web formaları POST/GET ilə test etmək
- SSRF, XSS, SQLi ssenarilərində istək göndərmək və cavab oxumaq

```python
import requests
r = requests.post("http://site.com", data={"user": "admin", "pass": "' OR 1=1 --"})
print(r.text)
```

---

### 🔹 4. `bs4` (BeautifulSoup) – HTML parsing
**Niyə istifadə olunur:**
- Saytdakı gizli inputlar, flaq, token və s. tapmaq üçün HTML oxumaq

```python
from bs4 import BeautifulSoup
soup = BeautifulSoup(r.text, "html.parser")
print(soup.find("input", {"name": "csrf_token"}))
```

---

### 🔹 5. `scapy` – Paket yaratmaq və analiz etmək
**Niyə istifadə olunur:**
- ICMP, DNS, TCP paketləri göndərmək və cavab almaq
- Trafiki dinləmək (sniffing), paketləri dəyişmək

```python
from scapy.all import *
packet = IP(dst="8.8.8.8")/ICMP()
response = sr1(packet, timeout=1)
print(response.summary())
```

---

### 🔹 6. `socket` – Aşağı səviyyəli TCP/UDP əlaqələr
**Niyə istifadə olunur:**
- TCP client/server yazmaq
- Custom protokolları test etmək

```python
import socket
s = socket.socket()
s.connect(("127.0.0.1", 1234))
s.send(b"hello\n")
print(s.recv(1024))
s.close()
```

---

### 🔹 7. `Socket.IO`, `HTTPx`, `PyCurl` – HTTP və real-time əlaqələr
- **`socket.io`** – real-time bağlantılar (chat sistemləri və CTF botları üçün)
- **`httpx`** – `requests` alternativi, HTTP/2 və async dəstəyi ilə
- **`pycurl`** – Curl əsaslı HTTP istəkləri üçün daha dərindən nəzarət (proxy, SSL, headers)

```python
import httpx
r = httpx.get("http://example.com")
print(r.text)
```

---

## 🔐 Kriptografiya Kitabxanaları

### 🔸 1. `hashlib`, `ssl`, `cryptography`, `pycryptodome`, `PyNaCl`
**Niyə istifadə olunur:**
- Hash almaq (MD5, SHA256, SHA1)
- AES, RSA kimi şifrələmə və deşifrələmə
- MAC, HMAC, digital signature-lar üçün

```python
import hashlib
print(hashlib.sha256(b"hello").hexdigest())
```

**`PyNaCl`** – NaCl kriptografiyası üçün; secret box, public key crypto
**`pycryptodome`** – RSA decryption, modular arithmetic (e, d, n, c)

---

## 🛠️ Penetration Test üçün Kitabxanalar

### 🔸 1. `impacket` – SMB, NTLM, Kerberos protokolları ilə işləmək
**İstifadə yeri:** Windows Active Directory, lateral movement, hashdump, `secretsdump.py`

### 🔸 2. `python-nmap` – `nmap` əmrlərini Python-dan idarə etmək
```python
import nmap
scanner = nmap.PortScanner()
scanner.scan("127.0.0.1", "22-80")
print(scanner["127.0.0.1"].all_protocols())
```

### 🔸 3. `pwntools`, `bs4`, `requests`, `scapy` və digərləri
- exploit yazmaq (pwntools)
- HTML parsinq (bs4)
- HTTP və Web əsaslı istəklər (requests)
- Şəbəkə analiz (scapy)

