# EduVector Mobile

**EduVector** adalah platform pembelajaran interaktif berbasis mobile yang dirancang untuk membantu mahasiswa memahami konsep vektor melalui visualisasi, simulasi, dan materi yang komprehensif. Aplikasi ini dikembangkan sebagai pemenuhan Tugas Besar (UAS) mata kuliah **II3140 PAWM**.

## Fitur Utama

Aplikasi ini mencakup berbagai fitur untuk mendukung pembelajaran vektor:

### 1. Simulasi Interaktif
Fitur unggulan yang memungkinkan pengguna berinteraksi langsung dengan konsep vektor:
* **Vektor Kartesius:** Visualisasi penjumlahan vektor 2D dengan sistem *drag & drop* untuk memahami resultan gaya.
* **Palet RGB:** Eksplorasi operasi vektor dalam ruang warna RGB untuk melihat bagaimana vektor matematika menghasilkan warna visual.
* **Proyektor Vektor:** Simulasi gerak parabola/peluru menggunakan prinsip fisika vektor.

### 2. Modul Pembelajaran
* Materi teori lengkap tentang vektor.
* Penjelasan konsep dasar hingga lanjut.

### 3. Kuis & Evaluasi
* Sistem kuis interaktif untuk menguji pemahaman pengguna.
* Pelacakan skor dan progres belajar.

### 4. Personalisasi
* **Autentikasi Pengguna:** Login dan Register terintegrasi (Firebase).
* **User Stats:** Memantau perkembangan belajar pengguna.
* **Gamifikasi:** Sistem level atau pencapaian.


## Teknologi yang Digunakan (Tech Stack)

Proyek ini dibangun menggunakan teknologi modern untuk pengembangan aplikasi mobile:

* **Core Framework:** [React Native](https://reactnative.dev/) dengan [Expo](https://expo.dev/) (SDK 54).
* **Language:** [TypeScript](https://www.typescriptlang.org/).
* **Routing/Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/).
* **Styling:** [NativeWind](https://www.nativewind.dev/) (TailwindCSS untuk React Native).
* **Backend & Auth:** [Firebase](https://firebase.google.com/).
* **Graphics & Animation:**
    * `@shopify/react-native-skia`.
    * `react-native-reanimated`.
    * `react-native-svg`.
* **Charts/Visualisasi Data:** `react-native-gifted-charts` & `react-native-chart-kit`.
* **Lainnya:**
    * `react-native-copilot` (tutorial aplikasi).
    * `react-native-math-view` (Rendering notasi matematika).


## Cara Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lokal komputer Anda:

### Prasyarat
* Node.js
* npm
* Aplikasi **Expo Go** di HP Anda atau Emulator.

### Langkah Instalasi

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/ibayyabi/EduVector-Mobile-UAS-II3140_18223050_18223058.git](https://github.com/ibayyabi/EduVector-Mobile-UAS-II3140_18223050_18223058.git)
    cd EduVector-Mobile-UAS-II3140_18223050_18223058/mobile
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment**
    Salin file `.env.example` menjadi `.env` dan isi konfigurasi Firebase Anda:
    ```bash
    cp .env.example .env
    ```

4.  **Jalankan Aplikasi**
    ```bash
    npx expo start
    ```


Proyek ini disusun oleh:

| NIM | Nama |
| :--- | :--- |
| **18223050** | Mochamad Ikhbar A |
| **18223058** | Alghan Pridanusuta |
---
