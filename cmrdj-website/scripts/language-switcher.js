function switchLanguage(lang) {
    console.log(`Attempting to switch to ${lang}`);
    
    // Use absolute path from root of website
    fetch(`./locales/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(translations => {
            console.log('Translations loaded:', translations);
            updatePageContent(translations);
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            
            if (lang === 'ar') {
                document.body.classList.add('rtl');
            } else {
                document.body.classList.remove('rtl');
            }
            
            // Update active state
            document.querySelectorAll('.language-switcher button').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`.language-switcher button[onclick*="${lang}"]`).classList.add('active');
        })
        .catch(error => {
            console.error('Error details:', error);
            // More detailed error message
            alert(`Error loading ${lang} language file. Please check console for details.`);
        });
}

function updatePageContent(translations) {
    const elements = document.querySelectorAll('[data-translate]');
    console.log(`Found ${elements.length} translatable elements`);
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        console.log(`Translating key: ${key}`);
        if (translations[key]) {
            element.textContent = translations[key];
        } else {
            console.warn(`Missing translation for key: ${key}`);
        }
    });
}

// Initialize with French when page loads
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage('fr');
    // Set initial active state
    document.querySelector('.language-switcher button[onclick*="fr"]').classList.add('active');
});