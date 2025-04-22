# 🖼️ Steganography – Geniş və Real-Case Əsaslı Təhlil

## 📌 Mövzunun İzahı

**Steganography** – məlumatın bir faylın (şəkil, audio, video, sənəd) içində gizli şəkildə yerləşdirilməsidir. Kriptoqrafiyadan fərqli olaraq, steqanografi məlumatın gizlədildiyini belə hiss etdirməməyə çalışır.

🧠 Real-case tətbiqlər:
- CTF tapşırıqlarında flag-lar şəkil və ya audio içində gizlənir.
- Malware-lər gizli komandaları şəkil metadata-sında gizlədə bilər.
- Real forensik analizlərdə cinayətkarlar mesajlarını .jpg və ya .wav fayllarda gizlədiblər.

---

## 🧰 Ən Güclü Alətlər və İstifadə Qaydaları

### 🧪 1. **strings** – Fayl daxilində mətn tapmaq:
```bash
strings image.jpg | grep pico
```

### 📸 2. **exiftool** – Şəkil metadata analiz:
```bash
exiftool image.jpg
```

📝 Ən çox istifadə olunan sahələr: `Author`, `Comment`, `XMP`, `Title`, `Copyright`

### 🔎 3. **zsteg** – PNG fayllarında LSB analiz:
```bash
zsteg image.png
```

⚠️ `zsteg` əsasən PNG üçündür, BMP və ya JPEG üçün işləmir.

### 🧬 4. **steghide** – Fayl içindən parol ilə məlumat çıxarma:
```bash
steghide extract -sf secret.jpg -xf output.txt -p "parol"
```

🗂 Ayrıca faylı əlavə etmək üçün:
```bash
steghide embed -cf img.jpg -ef flag.txt -p "parol"
```

### 🧠 5. **binwalk** – Fayl içindəki gizli hissələri təhlil edir:
```bash
binwalk -e image.jpg
```

📦 `.zip`, `.txt`, və ya digər fayllar bəzən şəkilin sonuna əlavə olunur.

### 🎧 6. **audacity** / **Sonic Visualiser** – Audio fayllarda vizual analiz:
- LSB manipulyasiyalar
- Morse kod səsləri
- Vizual spektral təhlil

### 🖼 7. **stegsolve.jar** – GUI alət: Rəng kanallarının (RGB, RGBA, LSB) təhlili üçün
- Kanal dəyişmələri
- Xəttlərlə yazılmış mesajlar
- XOR səviyyəsində yazılmış layerlər

---

## 🚀 Advanced Texnikalar

- **LSB (Least Significant Bit) manipulation** → şəkil piksellərinin ən son biti dəyişdirilərək məlumat yerləşdirilir.
- **Palette-based stego** – şəkil rənglərində `slight` dəyişiklik
- **Audio LSB** – WAV faylın sample səviyyəsində manipulyasiya
- **Whitespace steganography** – `zero-width space`, `non-breaking space` ilə gizlətmə
- **Zip bomb stego** – şəkil içində zip bomb yerləşdirmək (misal: `zip_bomb_1PT.zip`)
- **Data appended at EOF (End of File)** – JPEG sonunda ZIP əlavə edilir:
```bash
binwalk -e hidden.jpg
```

---

## 📌 Real-case Tapşırıqlar və Ssenarilər

### 🔹 TryHackMe
- **“Stego 101”** – əsas texnikalar
- **“Mr Robot”** – `robot.jpg` içində base64 string
- **“Intro to Forensics”** – metadata və strings əsaslı stego

### 🔹 HackTheBox
- **“Traceback”** – .bash_history-də hint, base64 hidden image
- **“Optimum”** – `image.php.jpg` faylında shell gizlədilmişdi

### 🧠 Real-chain misal:
1. `robot.jpg` tapılır
2. `strings robot.jpg | grep -i pass` → base64 string
3. `base64 -d` ilə decode
4. `steghide extract -sf robot.jpg -p "hint"` → `flag.txt`

---

## 🔁 Addım-addım Stego Workflow

1. Faylı analiz et:
   ```bash
   file image.jpg
   exiftool image.jpg
   strings image.jpg
   ```

2. `binwalk` ilə gizli hissələri çıxart:
   ```bash
   binwalk -e image.jpg
   ```

3. `.zip`, `.txt`, və ya `flag.txt` tapıldıqda unzip, oxu

4. `.png` fayl üçün:
   ```bash
   zsteg image.png
   ```

5. GUI analiz üçün:
   - `stegsolve.jar` ilə RGB layerləri araşdır
   - Audio fayl üçün `Audacity` ilə spectrogram bax

6. Əgər `steghide` varsa:
   ```bash
   steghide extract -sf image.jpg -p "guessme"
   ```

---

## 📚 Ən Yaxşı Resurslar

- 🔗 [Stego Cheatsheet – PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Steganography)
- 🧠 [30+ Stego Techniques](https://0xrick.github.io/lists/stego/)
- 📖 Book: “Hiding Messages in Images” – Neil F. Johnson
- 🧪 Labs: TryHackMe – “Stego 101”, HTB challenges, Forensics CTF Archive

---

## 🎓 Professional Yanaşma

✅ Heç vaxt tək `strings` ilə kifayətlənmə – metadata, zip, audio, RGB layerlərə bax  
✅ Scriptləşdirilmiş stego alətləri istifadə et: `stegseek`, `binwalk`, `stegcracker`  
✅ Mənbə tipini təyin et (PNG, JPEG, WAV) və alət seçimini ona uyğun qur  
✅ Nəticəni `README.md` şəklində sənədləşdir, sənəd adlarını, sınaq parollarını qeyd et  
✅ Real-case scenario qur: `Stego → Base64 → XOR → Zip → Flag`

