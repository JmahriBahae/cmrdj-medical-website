function switchLanguage(lang) {
    fetch(`./locales/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(translations => {
            updatePageContent(translations);
            updateDocumentLanguage(lang);
            updateButtonState(lang);
        })
        .catch(error => {
            console.error('Error loading translations:', error);
            // Fallback to embedded translations if fetch fails
            const fallbackTranslations = getEmbeddedTranslations(lang);
            if (fallbackTranslations) {
                updatePageContent(fallbackTranslations);
                updateDocumentLanguage(lang);
                updateButtonState(lang);
            }
        });
}

function updatePageContent(translations) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const value = key.split('.').reduce((obj, k) => obj && obj[k], translations);
        if (value) {
            element.innerHTML = value.replace(/\n/g, '<br>');
        }
    });
}

function updateDocumentLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ar');
}

function updateButtonState(lang) {
    document.querySelectorAll('.language-switcher button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.language-switcher button[onclick*="${lang}"]`).classList.add('active');
}

// Initialize with French when page loads
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage('fr');
});