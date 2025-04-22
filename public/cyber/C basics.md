## 🧠 C Proqramlaşdırma Dili – Dərin və Təhlilli İzahlı Bölmə

C dili CTF tapşırıqlarında, xüsusilə **Binary Exploitation**, **Reverse Engineering**, **Buffer Overflow**, və **Low-Level Debugging** üçün əvəzolunmazdır.

### 📌 1. Sintaksis və Quruluş
- `main()` funksiyası, `#include` direktivləri
- `int`, `char`, `float`, `double` kimi əsas data tipləri
- `if`, `else`, `switch`, `while`, `for`, `do...while` kimi nəzarət strukturları

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

---

### 📌 2. Pointers və Arrays
- C-nin ən kritik konseptlərindən biridir
- `char *ptr = "flag{...}";` → flaq string pointer ilə göstərilə bilər
- Stack overflow exploit-lərdə `char buffer[64]` → buffer overflow üçün tipik hədəf

```c
char str[10] = "hello";
char *p = str;
printf("%s\n", p);
```

---

### 📌 3. Memory Management
- `malloc()`, `calloc()`, `free()` – dinamik yaddaş ayrılması və idarəsi
- Use-after-free, double-free, heap overflow kimi hücumlar bura daxildir

```c
int *a = malloc(sizeof(int));
*a = 10;
free(a);
```

---

### 📌 4. Buffer Overflows
- `gets()`, `strcpy()`, `sprintf()` kimi funksiyalar ilə bağlıdır
- Stackdə yerləşən buffer-ə limitdən artıq data yazaraq RIP-i dəyişmək mümkündür

```c
void vulnerable() {
    char buffer[64];
    gets(buffer); // ⚠️ təhlükəli funksiyadır
}
```

CTF-də səndən istənilə bilər:
- Offset tap
- Return address dəyişdir
- Shellcode inject et

---

### 📌 5. Structs və Typedefs
- Binary data struktur analizində vacibdir
- Reverse engineering üçün Ghidra-da struct-ları görmək kömək edir

```c
typedef struct {
    int id;
    char name[20];
} user;
```

---

### 📌 6. Bitwise Operations
- `^`, `|`, `&`, `~`, `<<`, `>>` əməliyyatları
- Kriptoloji CTF tapşırıqlarında və xüsusi encode/decode mexanizmlərdə istifadə olunur

```c
int x = 5 ^ 3; // XOR → 6
```

---

### 📌 7. Assembly və System Calls
- C kodu aşağı səviyyəyə (ASM) çevrilir: `objdump`, `gdb`, `radare2`, `ghidra` ilə təhlil edilə bilər
- Syscall istifadə edilən BOF exploit-lərdə `int 0x80`, `syscall` təhlil olunur

---

### 📌 8. Fayl I/O əməliyyatları
- `fopen()`, `fread()`, `fwrite()`, `fgets()` – fayllardan oxumaq/yazmaq
- CTF-də gizli `flag.txt` faylını oxumağa çalışmaq üçün istifadə olunur

```c
FILE *f = fopen("flag.txt", "r");
char buf[100];
fgets(buf, 100, f);
printf("%s", buf);
```

---

### 📌 9. Debugging Tools (GDB, ltrace, strace, objdump)
- `gdb` ilə breakpoint, memory inspection
- `objdump -d binary` → Assembly kodun disassembly-si
- `ltrace`, `strace` ilə syscall və lib funksiyalarını izləmək
