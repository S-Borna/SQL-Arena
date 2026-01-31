// ===== SQL Quest - Configuration =====
// Miljövariabler och konfiguration

const CONFIG = {
    // Supabase (PostgreSQL + Auth)
    SUPABASE_URL: 'YOUR_SUPABASE_URL',  // Ersätt med din Supabase URL
    SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY',  // Ersätt med din anon key

    // OpenAI
    OPENAI_API_KEY: '',  // Sätts av användaren i settings
    OPENAI_MODEL: 'gpt-4o-mini',

    // Tillåtna email-domäner för registrering
    ALLOWED_EMAIL_DOMAINS: ['chasacademy.se'],

    // App settings
    APP_NAME: 'SQL Quest',
    VERSION: '1.0.0'
};

// Validera email-domän
function isAllowedEmail(email) {
    if (!email) return false;
    const domain = email.split('@')[1]?.toLowerCase();
    return CONFIG.ALLOWED_EMAIL_DOMAINS.includes(domain);
}

// Exportera
window.CONFIG = CONFIG;
window.isAllowedEmail = isAllowedEmail;
