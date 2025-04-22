/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",  // və ya sən hansı qovluqdan istifadə edirsənsə
        "./public/index.html"
    ],
    darkMode: 'class', // dark mode dəstəyi üçün
    theme: {
        extend: {
            colors: {
                'cyber-bg': '#0f0f1a',
                'cyber-panel': '#101124',
                'cyber-accent': '#00ffff',
                'cyber-block': '#1a1a2e',
                'cyber-code': '#12131c',
                'cyber-pink': '#ff69b4',
            },
            fontFamily: {
                mono: ['Space Mono', 'monospace'],
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'), // prose üçün
        require('@tailwindcss/forms'),      // input & search box üçün
    ],
};
