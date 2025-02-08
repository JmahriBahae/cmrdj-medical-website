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
            console.error('Error loading translations:', error);
        });
}

function updatePageContent(translations) {
    console.log('Starting content update with translations:', translations);
    const elements = document.querySelectorAll('[data-translate]');
    console.log('Found elements:', elements.length);
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        console.log('Processing element with key:', key);
        
        // Handle nested keys
        const value = key.split('.').reduce((obj, k) => {
            console.log('Accessing key:', k, 'Current obj:', obj);
            return obj && obj[k];
        }, translations);
        
        console.log('Final value for key:', key, 'is:', value);
        
        if (value) {
            element.innerHTML = value.replace(/\n/g, '<br>');
            console.log('Updated element content:', element.innerHTML);
        } else {
            console.warn('No translation found for key:', key);
        }
    });
}

// Initialize with French when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with French content
    switchLanguage('fr');
    // Set initial active state
    document.querySelector('.language-switcher button[onclick*="fr"]').classList.add('active');
});