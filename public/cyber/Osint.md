# 🔍 Recon / OSINT – Professional Təhlil və Real-Case Tətbiq

## 📌 Mövzunun İzahı

**OSINT (Open Source Intelligence)** – açıq mənbə məlumatların toplanması və analizidir. CTF-lərdə və real pentest ssenarilərində ilk mərhələ sayılır.

🛠️ Real-case tətbiqlər:
- Subdomain Enumeration → admin panel tapmaq
- Metadata-dan istifadə → istifadəçi adları və sensitive məlumatlar çıxarmaq
- Açıq git reposları, PDF metadata və sosial mühəndislik üçün data toplamaq


## 🧰 Ən Güclü Alətlər və İstifadə Nümunələri

### 🛰 Subdomain Enumeration
- `subfinder` → Passiv enum:
  ```bash
  subfinder -d example.com -o subs.txt
  ```

- `amass` → Aktiv və passiv enum:
  ```bash
  amass enum -d example.com -o subs.txt
  ```

- `crt.sh` → Sertifikat tarixçəsindən subdomain tap:
  ```bash
  curl 'https://crt.sh/?q=%.example.com&output=json' | jq '.[].name_value'
  ```

---

### 🔎 Metadata və sənəd araşdırması
- `exiftool` – Şəkillərdən metadata çıxarmaq:
  ```bash
  exiftool image.jpg
  ```

- `strings` – Fayl içində gizli mətn:
  ```bash
  strings resume.pdf | grep -i "pass\|email"
  ```

- `pdfinfo`, `binwalk`, `zsteg` → PDF və media faylları üçün

---

### 📂 GitHub və sosial OSINT
- GitHub dorking:
  ```text
  org:example filename:.env
  ```

- `gitrob`, `truffleHog`, `gitleaks` – açıq git repo’dakı credential axtarışı

---

### 👤 Email və İP təhlili
- `theHarvester`:
  ```bash
  theHarvester -d example.com -b google
  ```

- `hunter.io`, `emailrep.io`, `haveibeenpwned.com`

---

### 🌐 DNS Araşdırması
- `dnsrecon`, `dig`, `host`:
  ```bash
  dnsrecon -d example.com
  dig ANY example.com
  host admin.example.com
  ```

---

## 🚀 Advanced Texnikalar

- Subdomain Takeover:
  - CNAME DNS qeydi `unclaimed.github.io` kimi boş domain-ə point edirsə takeover mümkündür.

- Metadata chaining:
  - `resume.docx` → author → LinkedIn profili → eyni şifrə ilə digər hücum səviyyəsinə keçid

- Google Dorking:
  ```text
  site:example.com ext:pdf "confidential"
  inurl:admin
  ```

- Linkedin OSINT: Çalışanların adlarını tapıb password list hazırlamaq

---

## 📌 Real CTF və Həyat Nümunələri

- **TryHackMe**: OSINT, Mr. Robot
- **HTB**: “OpenAdmin” – exposed subdomain və admin panel
- Real ssenari: Subdomain `beta.portal.example.com` exposed → login panel → bruteforce → flag

---

## 🔁 Addım-addım Workflow

1. `subfinder` və `amass` ilə subdomain-ləri çıxart
2. `crt.sh` və `dnsrecon` ilə ətraflı DNS təhlili
3. Hər subdomain-i `httpx` ilə yoxla:
   ```bash
   cat subs.txt | httpx -title -status-code -tech-detect
   ```

4. `Google Dorks`, `GitHub Dorks`, `exiftool`, `theHarvester` ilə dərin analiz
5. Faylları metadata üçün `binwalk`, `strings`, `pdfinfo`, `zsteg` ilə analiz et
6. İstifadəçi adı/email tap – sosial mühəndislik + bruteforce üçün istifadə et

---

## 📚 Ən Yaxşı Resurslar

- 🌐 [OSINT Framework](https://osintframework.com/)
- 📘 GitHub: `sherlock`, `Photon`, `Spiderfoot`
- 🛠 Tools Repo: [https://github.com/lockfale/osint-framework](https://github.com/lockfale/osint-framework)
- 🧠 Kurslar:
  - TCM OSINT Professional
  - TryHackMe OSINT
  - HackTheBox Academy

---

## 🧠 Professional Fikirlə Yanaşma

- Yalnız texniki yox, **sosial OSINT**: LinkedIn, Google, GitHub
- Subdomain → directory → exposed config → admin login → credential reuse
- İzlənilən hər addımı sənədləşdir: `targets.md`, `subs.txt`, `emails.txt`
```

