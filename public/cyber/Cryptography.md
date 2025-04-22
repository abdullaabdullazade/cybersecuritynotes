# 🔐 Cryptography: Şifrələmə Alqoritmləri, Hücumlar və Alətlərin İstifadəsi (GENİŞ)

---

## 📌 I. SYMMETRIC ENCRYPTION – Eyni açarla şifrələmə və deşifrə

---

### 1. 🔄 Caesar Cipher

#### ➕ Necə işləyir:
- Hərflər müəyyən sayda sağa/sola sürüşdürülür. Məsələn, `A + 3 = D`
- Shift (açar) məlum olduqda çox asan açılır.

#### 🔓 Necə qırılır:
- Brute-force ilə bütün 26 ehtimal yoxlanılır.

#### 🔧 Tools və istifadə:
- [https://www.dcode.fr/caesar-cipher](https://www.dcode.fr/caesar-cipher) → avtomatik qırır
- `CyberChef` → "Caesar Cipher" aləti
- Python ilə:
```python
for k in range(1, 26):
    print("Key =", k, "→", ''.join([chr((ord(c)-65-k)%26+65) for c in "ENCRYPTED"]))
```

---

### 2. 🔄 Vigenère Cipher

#### ➕ Necə işləyir:
- Şifrələmə üçün söz açar istifadə olunur, hər hərf açardakı simvol qədər sürüşdürülür.
- Məsələn: `KEY = LEMON`, `TEXT = ATTACK`, nəticə = `LXFOPV`

#### 🔓 Necə qırılır:
- Açarın uzunluğunu təyin etmək üçün **Kasiski Analysis** və ya **Friedman Test**
- Sonra hər bir sütunu Caesar kimi açmaq

#### 🔧 Tools:
- [https://www.dcode.fr/vigenere-cipher](https://www.dcode.fr/vigenere-cipher)
- `vigenere.py` Python skriptləri
- `CryptoHack` → praktiki challenge-lar

---

### 3. 🔒 DES (Data Encryption Standard)

#### ➕ Necə işləyir:
- 64-bit input, 56-bit açarla 16 raundlu şifrələmə (Feistel Network)
- Block cipher (8-byte bloklar üzrə)

#### 🔓 Necə qırılır:
- Brute-force (56-bit açar artıq zəif sayılır)
- Differential və Linear cryptanalysis ilə də sındırılır

#### 🔧 Tools:
- `openssl`:
```bash
openssl enc -des -e -in msg.txt -out msg.enc -k yourkey
openssl enc -des -d -in msg.enc -out plain.txt -k yourkey
```
- Python: `pycryptodome` kitabxanası ilə

---

### 4. 🔒 3DES (Triple DES)

#### ➕ Necə işləyir:
- DES-in 3 dəfə tətbiqi: Encrypt-Decrypt-Encrypt
- Daha təhlükəsizdir, amma çox yavaşdır.

#### 🔓 Necə qırılır:
- Meet-in-the-middle attack (bəzi hallarda)

#### 🔧 Tools:
- `openssl`:
```bash
openssl enc -des-ede3 -in file.txt -out file.enc -k secret
```

---

### 5. 🛡️ AES (Advanced Encryption Standard) ✅ Tövsiyə olunur

#### ➕ Necə işləyir:
- 128/192/256-bit açarla 10-14 raundda SubBytes, ShiftRows, MixColumns, AddRoundKey addımlarından keçir.
- Block cipher (16 byte blok)

#### 🔓 Necə qırılır:
- **QEYD:** Təkcə zəif tətbiqlərdə sındırıla bilər (məsələn ECB rejimi).
- **Timing Attack**, **Side-channel**, **Padding Oracle Attack**

#### 🔧 Tools:
- Python ilə:
```python
from Crypto.Cipher import AES
cipher = AES.new(b'16_byte_key_here', AES.MODE_ECB)
plaintext = cipher.decrypt(ciphertext)
```
- `openssl`:
```bash
openssl enc -aes-128-ecb -d -in enc.txt -out dec.txt -K 0123456789abcdef0123456789abcdef
```
- `CyberChef`, `aes_decrypt.py` skriptləri

---

## 🔑 II. ASYMMETRIC ENCRYPTION – Public & Private açarla şifrələmə

---

### 1. 🏛️ RSA (Rivest-Shamir-Adleman)

#### ➕ Necə işləyir:
- `n = p * q`, `e` açıq eksponent, `d` gizli (private) eksponent
- `c = m^e mod n`, `m = c^d mod n`

#### 🔓 Necə qırılır:
- **Low exponent attack (e=3)**
- **Partial p/q ilə factorization** (Fermat, Wiener attack)
- **Common modulus attack**
- **Bleichenbacher attack** (PKCS1 padding)
- **Coppersmith method** (SageMath ilə)

#### 🔧 Tools:
- [`RsaCtfTool`](https://github.com/Ganapati/RsaCtfTool):
```bash
python3 RsaCtfTool.py --publickey key.pub --uncipher ciphertext
```

- **SageMath** ilə xüsusi skriptlər:
```python
n = ...
e = ...
c = ...
# coppersmith və ya fermat skriptləri ilə faktorizasiya
```

- `factordb.com` – böyük `n` üçün faktorizasiya cəhd et

---

## 🔄 III. ENCODING – Təhlükəsizlik məqsədi daşımır!

---

### 🔤 Base64

#### ➕ Necə işləyir:
- 3 byte = 24 bit → 4 x 6-bit → ASCII xarakterlərə çevrilir
- Sadəcə məlumatı transport üçün uyğundur.

#### 🔧 Tools:
- `base64`:
```bash
echo "U29sdmVkIQ==" | base64 -d
```
- `CyberChef`, `dcode.fr`

---

### 🌐 URL Encoding

#### ➕ Necə işləyir:
- Xüsusi simvollar `%xx` ilə əvəzlənir
- `space = %20`, `& = %26`

#### 🔧 Tools:
- `urldecode` Linux utility
- `python -c "import urllib.parse; print(urllib.parse.unquote('%2Fflag'))"`

---

## 🧮 IV. HASHING – Geri açılması mümkün olmayan barmaq izi

---

### 🔐 SHA256, SHA1, MD5 və s.

#### ➕ Necə işləyir:
- Input ölçüsündən asılı olmayaraq çıxış sabit ölçüdədir.
- Eyni məlumat eyni hash verir.

#### 🔓 Necə qırılır:
- Collision (iki fərqli input eyni hash verir)
- Brute-force
- Rainbow table
- Salting ilə müdafiə olunur

#### 🔧 Tools:
- `hashid`, `hash-identifier` – hash növünü tanımaq
- `john`, `hashcat`:
```bash
hashcat -m 0 -a 0 hash.txt rockyou.txt
```

- `CrackStation`, `Hashes.com` – online lookup

---

## 💣 V. HÜCUM NÖVLƏRİ

### 1. 🔨 Brute-force
- Bütün mümkün kombinləri sınayır
```bash
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

### 2. 📚 Dictionary Attack
- Mövcud real şifrə siyahılarından istifadə edir

### 3. 🌈 Rainbow Table
- Əvvəlcədən hash-lənmiş məlumatlarla müqayisə
- Salting varsa işləmir

### 4. 🧠 Social Engineering
- Phishing, email spoofing, manipulyasiya ilə parol əldə etmə

---

## 📌 Tövsiyə edilən PRAKTİK LABLAR:

- **CryptoHack.org** – real praktiki chall-lar
- **TryHackMe** – “Encryption”, “RSA”, “Hash Cracking”
- **HackTheBox Crypto** – `Bankrobber`, `Scrambled`, `Safe`
- **CTFTime** – Crypto archive

---

## 🧠 Peşəkar Yanaşma

- Heç bir şifrə və ya hash təhlil edilmədən qəbul edilməməlidir
- Kripto tətbiqlərində **mode** və **key handling** vacibdir
- Hash varsa: `salt`, `pepper`, `iterative hash` metodlarına bax
- Exploit edərkən: public key varsa → faktorizasiya; e varsa → e=3 check
