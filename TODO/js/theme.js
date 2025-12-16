// theme.js
document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('themeSwitch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Skontrolovať localStorage alebo systémové nastavenia
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeSwitch) themeSwitch.checked = true;
    } else if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeSwitch) themeSwitch.checked = false;
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeSwitch) themeSwitch.checked = true;
    }
    
    // Prepínač témy
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});