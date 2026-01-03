# EduVektor Mobile App

A React Native mobile application for EduVektor, built with Expo.

## Features

- **Materi**: Interactive learning materials with mathematical equations (using KaTeX).
- **Simulasi**: Vector visualization playground to experiment with vector addition.
- **Kuis**: Practice quizzes to test your knowledge.
- **Profile**: User management.

## Tech Stack

- **Expo**: Framework for React Native.
- **NativeWind**: Tailwind CSS for React Native.
- **Firebase**: Authentication and Firestore.
- **Expo Router**: File-based routing.
- **React Native SVG**: For vector visualization.
- **React Native WebView**: For rendering complex markdown and math.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    -   Ensure you have a `.env` file with your Firebase configuration (see `.env_example` in the root or copy from your web project).
    -   Example: `EXPO_PUBLIC_API_KEY=...`

3.  **Run the App**:
    ```bash
    npx expo start -c
    ```

4.  **Test on Device**:
    -   Download the **Expo Go** app on iOS or Android.
    -   Scan the QR code displayed in the terminal.

## Troubleshooting

-   **Black Screen / No Styles**: Ensure `metro.config.js` is present and correctly configured with `nativewind`. Run `npx expo start -c` to clear the bundler cache.
