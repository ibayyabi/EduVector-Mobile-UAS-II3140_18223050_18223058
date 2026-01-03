
export const MATERI_LIST = [
    {
        id: "dasar-dasar",
        title: "Dasar-Dasar Vektor",
        description: "Pelajari konsep dasar vektor, magnitudo, dan arah.",
        content: `# Dasar-Dasar Vektor

## Apa itu Vektor?

Vektor adalah objek geometri yang memiliki **magnitudo (nilai/panjang)** dan **arah**. Vektor berbeda dari skalar, yang hanya memiliki magnitudo (seperti suhu atau massa).

Vektor sering digambarkan sebagai panah.
* **Panjang panah** mewakili magnitudo.
* **Arah panah** menunjukkan arahnya.

### Notasi dan Komponen

Dalam notasi, vektor sering ditulis sebagai huruf tebal (misalnya, $\\mathbf{A}$) atau dengan panah di atasnya ($\\vec{A}$).

Vektor dapat dipecah menjadi komponen-komponennya berdasarkan sumbu koordinat.
* Di ruang 2D, vektor $\\mathbf{A}$ dapat ditulis sebagai $\\mathbf{A} = (A_x, A_y)$.
* Di ruang 3D, vektor $\\mathbf{A}$ dapat ditulis sebagai $\\mathbf{A} = (A_x, A_y, A_z)$.

---

## Magnitudo Vektor

Magnitudo (panjang) dari sebuah vektor dilambangkan sebagai $|\\mathbf{A}|$ atau $\\|\\mathbf{A}\\|$. Nilai ini dihitung menggunakan Teorema Pythagoras.

Untuk vektor 2D $\\mathbf{A} = (A_x, A_y)$:
$$
  |\\mathbf{A}| = \\sqrt{A_x^2 + A_y^2}
$$

Untuk vektor 3D $\\mathbf{B} = (B_x, B_y, B_z)$:
$$
  |\\mathbf{B}| = \\sqrt{B_x^2 + B_y^2 + B_z^2}
$$

---

## Operasi Dasar Vektor

Anda dapat melakukan operasi aritmetika pada vektor, seperti penjumlahan, pengurangan, dan perkalian skalar.

### Penjumlahan Vektor

Penjumlahan dua vektor (misalnya $\\mathbf{A} + \\mathbf{B}$) menghasilkan vektor baru yang disebut **vektor resultan ($\\mathbf{R}$)**. Ini dilakukan dengan menjumlahkan komponen-komponen yang sesuai.

Jika $\\mathbf{A} = (A_x, A_y)$ dan $\\mathbf{B} = (B_x, B_y)$, maka:
$$
  \\mathbf{R} = \\mathbf{A} + \\mathbf{B} = (A_x + B_x, A_y + B_y)
$$

### Pengurangan Vektor

Pengurangan vektor bekerja dengan cara yang sama, yaitu mengurangkan komponen yang sesuai. Ini setara dengan menambahkan vektor negatif.

Jika $\\mathbf{A} = (A_x, A_y)$ dan $\\mathbf{B} = (B_x, B_y)$, maka:
$$
  \\mathbf{R} = \\mathbf{A} - \\mathbf{B} = (A_x - B_x, A_y - B_y)
$$

### Perkalian Skalar

Vektor dapat dikalikan dengan **skalar** (angka biasa). Operasi ini akan "menskalakan" magnitudo vektor.
* Jika skalar $c > 1$, vektor menjadi lebih panjang.
* Jika $0 < c < 1$, vektor menjadi lebih pendek.
* Jika $c < 0$, arah vektor akan terbalik (berlawanan 180°).

Jika $c$ adalah skalar dan $\\mathbf{A} = (A_x, A_y)$, maka:
$$
  c\\mathbf{A} = (cA_x, cA_y)
$$

---

## Vektor Khusus

### Vektor Satuan (Unit Vector)

**Vektor satuan** (sering dilambangkan dengan topi, misal $\\hat{u}$) adalah vektor apa pun yang memiliki **magnitudo 1**. Vektor ini sangat berguna untuk mendefinisikan arah.

Anda dapat menemukan vektor satuan $\\hat{a}$ yang searah dengan vektor $\\mathbf{A}$ dengan membagi $\\mathbf{A}$ dengan magnitudonya sendiri:
$$
  \\hat{a} = \\frac{\\mathbf{A}}{|\\mathbf{A}|}
$$

### Vektor Nol (Zero Vector)

Vektor nol, dilambangkan sebagai $\\mathbf{0}$, adalah vektor dengan magnitudo 0. Vektor ini tidak memiliki arah yang spesifik.
$$
  \\mathbf{0} = (0, 0)
$$

---

<p>Cobalah konsep-konsep ini di halaman <strong>Simulasi</strong>!</p>`
    },
    {
        id: "vector-fisika",
        title: "Vektor dalam Fisika",
        description: "Menggambarkan dunia di sekitar kita dengan vektor.",
        content: `# Vektor dalam Fisika: Menggambarkan Dunia di Sekitar Kita

Dalam fisika, **vektor** adalah bahasa yang digunakan untuk mendeskripsikan besaran yang tidak cukup hanya dengan angka, tetapi juga membutuhkan **arah**. Tanpa vektor, kita tidak bisa menjelaskan bagaimana gaya mendorong, benda bergerak, atau medan berinteraksi. Vektor mengubah hukum fisika dari sekadar rumus menjadi representasi dunia nyata yang dinamis.

---

### 1. Kinematika: Ilmu Gerak 🚗

Gerak adalah inti dari fisika, dan hampir semua besaran utamanya adalah vektor.

* **Posisi ($\\vec{r}$):** Lokasi sebuah objek relatif terhadap titik acuan (pusat koordinat).
* **Perpindahan ($\\Delta\\vec{r}$):** Perubahan posisi. Ini adalah panah lurus dari titik awal ke titik akhir, tidak peduli jalan mana yang ditempuh.
* **Kecepatan ($\\vec{v}$):** Seberapa cepat dan ke arah mana benda bergerak. Kecepatan adalah laju perubahan posisi.
* **Percepatan ($\\vec{a}$):** Laju perubahan kecepatan. Benda berbelok (mengubah arah kecepatan) berarti benda itu mengalami percepatan, bahkan jika lajunya konstan.

> **Contoh:** Sebuah mobil yang melaju 60 km/jam di tikungan memiliki kecepatan yang terus berubah karena arahnya berubah, sehingga ia mengalami percepatan.

---

### 2. Dinamika: Gaya dan Interaksi 💪

Gaya adalah dorongan atau tarikan, dan arahnya sangatlah penting. Hukum Kedua Newton adalah hukum vektor yang fundamental.

* **Hukum Kedua Newton:**
    $$
    \\sum \\vec{F} = m\\vec{a}
    $$
    Rumus ini menyatakan bahwa **arah total gaya (resultan)** yang bekerja pada suatu benda sama dengan **arah percepatannya**. Dengan memecah vektor gaya ke komponen x dan y, kita dapat menganalisis gerakan yang kompleks, seperti benda di bidang miring.

---

### 3. Usaha dan Energi: Peran *Dot Product* 🔨

Tidak semua gaya yang diberikan menghasilkan kerja. Konsep **usaha (Work)** dalam fisika didefinisikan oleh *dot product* antara vektor gaya dan vektor perpindahan.

* **Rumus Usaha:**
    $$
    W = \\vec{F} \\cdot \\vec{d} = |\\vec{F}| |\\vec{d}| \\cos(\\theta)
    $$
    Ini secara matematis menjelaskan mengapa hanya komponen gaya yang **searah** dengan perpindahan yang melakukan usaha. Jika Anda membawa tas sambil berjalan lurus, gaya tangan Anda ke atas (90 derajat dari arah gerak) tidak melakukan usaha.

---

### 4. Medan Vektor: Gaya Tak Terlihat ⚡️

Beberapa gaya, seperti gravitasi dan elektromagnetisme, bekerja dari jarak jauh. Fisikawan menggambarkan pengaruh gaya ini menggunakan **medan vektor**, yaitu sebuah konsep di mana setiap titik dalam ruang memiliki sebuah vektor yang terhubung dengannya.

* **Medan Gravitasi ($\\vec{g}$):** Di setiap titik di sekitar Bumi, ada vektor yang menunjuk ke pusat Bumi, menunjukkan arah gaya gravitasi.
* **Medan Listrik ($\\vec{E}$):** Di sekitar muatan listrik, ada vektor yang menunjukkan arah gaya yang akan dialami oleh muatan positif lain jika diletakkan di sana.

---

### Kesimpulan

Dari gerak proyektil hingga orbit planet dan interaksi partikel subatom, vektor adalah alat yang tak tergantikan dalam fisika. Mereka memungkinkan para ilmuwan untuk membangun model matematis yang akurat dari hukum alam, mengubah konsep abstrak menjadi prediksi yang dapat diuji dan dipahami.`
    },
    {
        id: "vector-matematika",
        title: "Vektor dalam Matematika",
        description: "Fondasi Geometri dan Aljabar.",
        content: `# Vektor dalam Matematika: Fondasi Geometri dan Aljabar

Dalam matematika, **vektor** adalah objek fundamental yang memiliki dua properti utama: **besar (*magnitude*)** dan **arah (*direction*)**. Vektor menjadi jembatan antara aljabar dan geometri, memungkinkan kita untuk mendeskripsikan posisi, perpindahan, dan hubungan spasial menggunakan angka.

---

### 1. Representasi Vektor 📍

Vektor dapat direpresentasikan dalam dua cara utama:

* **Geometris:** Sebagai **anak panah** dalam ruang. Panjang panah menunjukkan besarnya, dan arah panah menunjukkan arahnya.
* **Analitis:** Sebagai **kumpulan angka terurut** yang disebut komponen. Dalam ruang 2D, sebuah vektor ditulis sebagai $\\vec{v} = \\langle x, y \\rangle$, dan dalam ruang 3D sebagai $\\vec{v} = \\langle x, y, z \\rangle$.

Sebagai contoh, vektor $\\vec{a} = \\langle 3, 4 \\rangle$ berarti bergerak 3 satuan ke kanan (sumbu-x) dan 4 satuan ke atas (sumbu-y).

---

### 2. Operasi Dasar Vektor ➕➖✖️

Keindahan vektor terletak pada bagaimana kita bisa memanipulasinya secara matematis.

#### Penjumlahan dan Pengurangan

Menjumlahkan dua vektor berarti mengikuti satu vektor lalu dilanjutkan dengan vektor lainnya. Secara geometris, ini dikenal sebagai **aturan segitiga** atau **jajar genjang**. Secara analitis, kita cukup menjumlahkan komponennya.

* Jika $\\vec{a} = \\langle a_1, a_2 \\rangle$ dan $\\vec{b} = \\langle b_1, b_2 \\rangle$, maka:
    $$
    \\vec{a} + \\vec{b} = \\langle a_1 + b_1, a_2 + b_2 \\rangle
    $$

#### Perkalian Skalar

Mengalikan vektor dengan sebuah angka (skalar) akan mengubah besarnya (memperpanjang atau memperpendek). Jika skalarnya negatif, arahnya akan berbalik 180 derajat.

* Jika $k$ adalah skalar dan $\\vec{a} = \\langle a_1, a_2 \\rangle$, maka:
    $$
    k\\vec{a} = \\langle ka_1, ka_2 \\rangle
    $$

---

### 3. Perkalian Antar Vektor

Ada dua jenis perkalian utama antara dua vektor, masing-masing dengan tujuan yang berbeda.

#### Dot Product (Perkalian Titik)

*Dot product* menghasilkan sebuah **angka skalar**, bukan vektor. Fungsinya adalah untuk menemukan sudut antara dua vektor atau panjang proyeksi satu vektor ke vektor lain.

* **Rumus Geometris:**
    $$
    \\vec{a} \\cdot \\vec{b} = |\\vec{a}| |\\vec{b}| \\cos(\\theta)
    $$
* **Rumus Analitis:**
    $$
    \\vec{a} \\cdot \\vec{b} = a_1b_1 + a_2b_2
    $$

> **Fakta Penting:** Jika *dot product* dari dua vektor (yang tidak nol) adalah 0, maka kedua vektor tersebut **tegak lurus**.

#### Cross Product (Perkalian Silang)

*Cross product* (hanya ada di ruang 3D) menghasilkan sebuah **vektor baru** yang tegak lurus terhadap kedua vektor aslinya. Arahnya ditentukan oleh **aturan tangan kanan**.

* **Rumus Besar Vektor:**
    $$
    |\\vec{a} \\times \\vec{b}| = |\\vec{a}| |\\vec{b}| \\sin(\\theta)
    $$
* **Aplikasi:** Sangat penting dalam fisika untuk menghitung torsi, momentum sudut, dan gaya magnet.

---

### Kesimpulan

Vektor adalah alat esensial dalam matematika. Mereka menyediakan bahasa untuk menggambarkan ruang, melakukan transformasi geometris (seperti rotasi dan skala), dan menjadi dasar dari cabang matematika yang lebih tinggi seperti **aljabar linear**. Tanpa vektor, deskripsi matematis dari dunia di sekitar kita akan jauh lebih rumit.`
    },
    {
        id: "vector-ai",
        title: "Vektor dalam AI",
        description: "Bahasa Universal di Dunia Kecerdasan Buatan.",
        content: `# Vektor: Bahasa Universal di Dunia Kecerdasan Buatan (AI)

Di dunia AI, **vektor** adalah cara untuk menerjemahkan data yang kompleks—seperti teks, gambar, atau suara—ke dalam bahasa universal yang dimengerti oleh komputer, yaitu **angka**. Anggap saja vektor sebagai "DNA digital" dari sebuah data, yang memungkinkan mesin untuk mengukur, membandingkan, dan memanipulasi informasi.

---

### 1. Memahami Bahasa Manusia: *Word Embeddings* 🗣️

Komputer tidak mengerti kata "kucing" atau "anjing". AI mengubah setiap kata menjadi sebuah vektor (kumpulan angka) dalam sebuah ruang multidimensi. Keajaibannya adalah: kata-kata dengan makna serupa akan memiliki vektor yang posisinya saling berdekatan.

* **Konsep Kunci:** Hubungan antar kata dapat dihitung secara matematis. Contoh paling terkenal adalah:
    \`\`\`js
    vektor('Raja') - vektor('Pria') + vektor('Wanita') ≈ vektor('Ratu')
    \`\`\`
* **Aplikasi:** Penerjemahan bahasa, analisis sentimen, dan *chatbot* yang lebih cerdas.


  **Word Embeddings** secara harfiah "menanamkan" makna kata ke dalam ruang vektor, mengubah linguistik menjadi geometri.


---

### 2. Pencarian Cerdas & Rekomendasi: *Vector Databases* 🔍

Pernahkah Anda berpikir bagaimana Spotify merekomendasikan lagu yang mirip dengan selera Anda? Jawabannya adalah pencarian vektor. Setiap lagu, produk, atau artikel diubah menjadi vektor. Sistem tidak lagi mencari berdasarkan kata kunci, tetapi berdasarkan **kedekatan (kemiripan)** antar vektor.

* **Konsep Kunci:** **Cosine Similarity** adalah metrik yang digunakan untuk mengukur seberapa mirip dua vektor, terlepas dari ukurannya. Semakin kecil sudut di antara keduanya, semakin mirip artinya.
* **Aplikasi:** Rekomendasi produk di *e-commerce*, pencarian gambar, dan sistem penemuan musik.



---

### 3. Melihat Dunia: *Computer Vision* 📸

Bagi AI, sebuah gambar hanyalah kumpulan piksel. Model *Computer Vision* seperti **Convolutional Neural Networks (CNN)** memecah gambar menjadi fitur-fitur visual (tepian, tekstur, bentuk) dan merepresentasikannya sebagai vektor.

* **Proses:** AI memindai gambar, mengubah fitur-fitur penting menjadi vektor, lalu membandingkannya dengan vektor lain yang sudah dikenali (misalnya, vektor untuk "kucing", "mobil", atau "wajah").
* **Aplikasi:** Pengenalan wajah (*face recognition*), mobil otonom (*self-driving cars*), dan diagnosis medis dari citra rontgen.

---

### 4. Mesin Kreatif: *Generative AI* 🎨

Model seperti DALL-E atau Midjourney menggunakan konsep bernama **ruang laten (*latent space*)**, sebuah "peta" imajinasi AI di mana setiap titik adalah sebuah vektor yang mewakili sebuah konsep abstrak.

* **Konsep Kunci:** Memanipulasi vektor di ruang laten ini sama dengan mengubah hasil akhir. Misalnya, mengambil vektor gambar wajah dan menambahkan "vektor senyum" akan menghasilkan gambar orang yang sama sedang tersenyum.
* **Aplikasi:** Pembuatan gambar dari teks, komposisi musik, dan desain seni.

---

### Kesimpulan

Vektor adalah tulang punggung dari AI modern. Mereka mengubah data yang tidak terstruktur dan kualitatif menjadi representasi numerik yang terstruktur. Kemampuan untuk mengubah kata, gambar, dan suara menjadi vektor inilah yang memungkinkan AI untuk **memahami, menghubungkan, dan bahkan berkreasi** di dunia digital.`
    }
];
