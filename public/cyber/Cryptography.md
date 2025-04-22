# 1. 📦 **Encoding vs Encryption vs Hashing**

### 🔹 Encoding
**Məqsəd:** Məlumatı digər sistemlər tərəfindən oxunaqlı hala gətirmək.

**Base64** – binary datanı ASCII formatında ötürmək üçün istifadə olunur.

```python
import base64

data = "salam"
encoded = base64.b64encode(data.encode())
decoded = base64.b64decode(encoded).decode()

print("Encoded:", encoded)
print("Decoded:", decoded)
```

**Nəticə:**
```
Encoded: b'c2FsYW0='
Decoded: salam
```

**Harada istifadə olunur:**
- E-maillərdə (MIME)
- URL və JWT tokenlərdə
- Binary faylları JSON-da ötürmək üçün

> ❗ **Security zəmanəti YOXDUR!** – Base64-ü hər kəs aça bilər.

---

### 🔹 Encryption
**Məqsəd:** Məlumatı gizlətmək və yalnız "key" ilə oxunaqlı etmək.

İki növ var:
- **Symmetric (Eyni açar)**
- **Asymmetric (İki fərqli açar – Public və Private)**

> 🔐 **Security zəmanəti VAR** – doğru key olmadan oxunmur.

---

### 🔹 Hashing
**Məqsəd:** Məlumatı geri çevrilməz şəkildə “fingerprint”ə çevirmək.

```python
import hashlib

message = "abdulla"
hash_object = hashlib.sha256(message.encode())
print("SHA-256:", hash_object.hexdigest())
```

> 🔁 **Geri açmaq mümkün deyil** – lakin brute-force/dictionary ilə "tapıla" bilər.

**İstifadə sahələri:**
- Parolların saxlanılması
- Fayl bütövlüyü yoxlaması
- Digital imzalar

---

# 2. 🔐 **Symmetric Encryption (AES - CBC Mode)**

### 🔧 Əsas anlayışlar:
- `key`: Məlumatı şifrələmək və açmaq üçün istifadə olunur
- `iv`: **Initialization Vector** – CBC-də təsadüfi başlanğıc vəziyyəti
- `pad`/`unpad`: Blok ölçüsünə uyğunlaşdırma

```python
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad

key = get_random_bytes(16)
data = b"abdullaxows"
cipher = AES.new(key, AES.MODE_CBC)
iv = cipher.iv
ct = cipher.encrypt(pad(data, AES.block_size))

# Decryption
cipher_decrypt = AES.new(key, AES.MODE_CBC, iv)
pt = unpad(cipher_decrypt.decrypt(ct), AES.block_size)
print(pt.decode())
```

### 📌 Təhlükəsizlik tövsiyələri:
- IV hər dəfə TƏZƏ olmalıdır!
- Key-lər gizli saxlanmalıdır (məsələn, `.env`)
- CBC-dən sonra **HMAC** ilə bütövlük yoxlanmalı

---

# 3. 🔓 **Asymmetric Encryption (RSA)**

### 📌 RSA İkili Açar Sistemi:
- `public_key.encrypt`: Məlumatı **gizlətmək**
- `private_key.decrypt`: Məlumatı **açmaq**

```python
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes

private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
public_key = private_key.public_key()

message = b"abdullaxows"

ciphertext = public_key.encrypt(
    message,
    padding.OAEP(
        mgf=padding.MGF1(hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None,
    )
)

plaintext = private_key.decrypt(
    ciphertext,
    padding.OAEP(
        mgf=padding.MGF1(hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None,
    )
)

print("Encrypted:", ciphertext.hex())
print("Decrypted:", plaintext.decode())
```

### 📌 OAEP Padding
RSA açıq-aydın təhlükəlidir əgər `padding` olmasa!
- `OAEP` əlavə təhlükəsizlik qatıdır.
- Replay attack-lardan qoruyur.

---

# 4. 🖊 **RSA Signature**

### İmza nədir?
Məlumatın **dəyişmədiyini və göndəricinin doğruluğunu** yoxlayır.

```python
signature = private_key.sign(
    message,
    padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=padding.PSS.MAX_LENGTH,
    ),
    hashes.SHA256(),
)

public_key.verify(
    signature,
    message,
    padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=padding.PSS.MAX_LENGTH,
    ),
    hashes.SHA256(),
)
```

### ✅ JWT ilə əlaqəsi:
JWT tokenlərində də **RSA-SHA256** kimi imza üsulları var. Server imzanı yoxlayaraq tokenin saxta olub olmadığını müəyyən edir.

---

# 5. 🧮 **Hashing və SHA-256**

### Geri çevrilməzlik nədir?
Hash = `f(x)` → yalnız `x` bilinsə `hash(x)` tapılır. **Əksinə mümkün deyil.**

### Praktikdə:
- SHA256: Hər 64 simvolluq hexdigest verir.
- Həmişə eyni girişə eyni çıxış verir.

**İstifadə sahələri:**
- Git commit ID-ləri
- Parol saxlama (`hash + salt`)
- Virusların identifikasiyası (hash qarşılaşdırması)

---

# 6. 🛠 **Brute-force Hücumları və Tools**

## 🔸 Hydra

**İstifadəsi:**
```bash
hydra -l admin -P rockyou.txt ftp://10.10.10.10
```

- `-l`: istifadəçi adı
- `-P`: parola siyahısı

## 🔸 John the Ripper

**Zip Hash çıxarma:**
```bash
zip2john protected.zip > hash.txt
john --wordlist=rockyou.txt hash.txt
```

## 🔸 Hashcat

```bash
hashcat -m 0 -a 0 hash.txt rockyou.txt
```

- `-m`: hash növü (məsələn `0` → MD5)
- `-a`: attack mode (0 – dictionary)

### 🗂 rockyou.txt vs Rainbow Table

| Xüsusiyyət          | rockyou.txt                     | Rainbow Table                         |
|---------------------|----------------------------------|----------------------------------------|
| Sadə fayldır        | Milyonlarla parol               | Əvvəlcədən hash-lanmış cütlüklər       |
| Real istifadə olunur| Bəli (CTF-lər, pentest-lər)     | Az hallarda (böyük yaddaş tələb edir) |
| Bruteforce edilir   | Bəli                            | Axtarış edilir                         |

---

# 7. 🎭 **Social Engineering**

## 🔹 Phishing
İstifadəçini yalan e-mail və ya saytla aldadaraq parolunu almaq.

**Real tətbiq:** Bank adı ilə e-mail göndərib "hesabınız bloklandı" mesajı yazmaq.

## 🔹 Pretexting
Özünü texniki dəstəkçi, HR işçisi kimi təqdim edərək məlumat almaq.

## 🔹 Digər üsullar:
- **Tailgating:** Fərdin arxasınca bina daxil olmaq
- **Shoulder Surfing:** Şifrə yazılarkən ekranı izləmək

> 🔐 Müdafiə: Təlim, 2FA, URL yoxlaması, e-mail doğrulaması
