// ===== SQL Quest - Main Application =====

// State
let currentDay = 0;
let currentExercise = 0;
let completedExercises = {};
let totalFlames = 0;
let onboardingStep = 1;
const totalOnboardingSteps = 5;

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    // Load saved progress
    loadProgress();

    // Initialize database
    const dbReady = await initDatabase();
    if (!dbReady) {
        showError('Kunde inte starta databasen. Ladda om sidan.');
        return;
    }

    // Setup event listeners
    setupEventListeners();

    // Update UI
    updateCandleDisplay();
    updateDayCards();

    // Initialize onboarding
    initOnboarding();

    // Check auth status
    checkAuthStatus();

    // Check OpenAI status
    updateAIStatus();

    console.log('🚀 SQL Quest redo!');
});

// Initialize onboarding
function initOnboarding() {
    const hasSeenOnboarding = localStorage.getItem('sqlquest_onboarding_seen');
    const overlay = document.getElementById('onboarding-overlay');

    if (!hasSeenOnboarding && overlay) {
        overlay.classList.remove('hidden');
        createOnboardingDots();
    } else if (overlay) {
        overlay.classList.add('hidden');
    }
}

function createOnboardingDots() {
    const dotsContainer = document.getElementById('onboarding-dots');
    if (!dotsContainer) return;

    let html = '';
    for (let i = 1; i <= totalOnboardingSteps; i++) {
        html += `<span class="dot ${i === 1 ? 'active' : ''}" data-step="${i}"></span>`;
    }
    dotsContainer.innerHTML = html;
}

function nextOnboardingStep() {
    if (onboardingStep >= totalOnboardingSteps) {
        // Complete onboarding
        localStorage.setItem('sqlquest_onboarding_seen', 'true');
        document.getElementById('onboarding-overlay').classList.add('hidden');
        return;
    }

    // Hide current step
    document.querySelector(`.onboarding-step[data-step="${onboardingStep}"]`).classList.remove('active');

    // Show next step
    onboardingStep++;
    document.querySelector(`.onboarding-step[data-step="${onboardingStep}"]`).classList.add('active');

    // Update dots
    document.querySelectorAll('.onboarding-dots .dot').forEach(dot => {
        dot.classList.toggle('active', parseInt(dot.dataset.step) === onboardingStep);
    });

    // Update buttons
    document.getElementById('onboarding-prev').style.display = onboardingStep > 1 ? 'flex' : 'none';

    if (onboardingStep === totalOnboardingSteps) {
        document.getElementById('onboarding-next').innerHTML = 'Börja! <i class="fas fa-rocket"></i>';
    }
}

function prevOnboardingStep() {
    if (onboardingStep <= 1) return;

    // Hide current step
    document.querySelector(`.onboarding-step[data-step="${onboardingStep}"]`).classList.remove('active');

    // Show previous step
    onboardingStep--;
    document.querySelector(`.onboarding-step[data-step="${onboardingStep}"]`).classList.add('active');

    // Update dots
    document.querySelectorAll('.onboarding-dots .dot').forEach(dot => {
        dot.classList.toggle('active', parseInt(dot.dataset.step) === onboardingStep);
    });

    // Update buttons
    document.getElementById('onboarding-prev').style.display = onboardingStep > 1 ? 'flex' : 'none';
    document.getElementById('onboarding-next').innerHTML = 'Nästa <i class="fas fa-arrow-right"></i>';
}

// Setup event listeners
function setupEventListeners() {
    // SQL Editor keyboard shortcuts
    const editor = document.getElementById('sql-editor');
    if (editor) {
        editor.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to run
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                runSQL();
            }
            // Tab for indentation
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
                editor.selectionStart = editor.selectionEnd = start + 4;
            }
        });

        // Update line numbers
        editor.addEventListener('input', updateLineNumbers);
        editor.addEventListener('scroll', syncLineNumbers);
    }

    // Navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelector('.nav-links a.active')?.classList.remove('active');
            e.target.classList.add('active');
        });
    });
}

// Load day content
function loadDay(day) {
    // Check if day is unlocked
    if (day > 1 && !isDayUnlocked(day)) {
        showNotification('🔒 Klara först Dag ' + (day - 1) + ' för att låsa upp!', 'warning');
        return;
    }

    currentDay = day;
    currentExercise = 0;

    // Update active card
    document.querySelectorAll('.day-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-day="${day}"]`)?.classList.add('active');

    // Load theory
    const theory = getDayTheory(day);
    if (theory) {
        document.getElementById('theory-content').innerHTML = theory;
    }

    // Load first exercise
    loadExercise(0);

    // Update exercise dots
    updateExerciseDots();

    // Scroll to practice section
    document.getElementById('practice').scrollIntoView({ behavior: 'smooth' });
}

// Load specific exercise
function loadExercise(index) {
    const dayData = getDayExercises(currentDay);
    if (!dayData || !dayData.exercises[index]) return;

    currentExercise = index;
    const exercise = dayData.exercises[index];

    // Update challenge box
    const difficultyEmoji = {
        'easy': '🟢 Lätt',
        'medium': '🟡 Medium',
        'hard': '🔴 Svår'
    };

    document.querySelector('.challenge-number').textContent = `Övning ${index + 1}`;
    document.querySelector('.challenge-difficulty').textContent = difficultyEmoji[exercise.difficulty] || '🟢 Lätt';
    document.getElementById('challenge-text').textContent = exercise.description;

    // Update navigation
    updateExerciseNav();
    updateExerciseDots();

    // Clear editor if not completed
    const key = `${currentDay}-${index}`;
    if (!completedExercises[key]) {
        document.getElementById('sql-editor').value = '';
    }

    // Clear results
    document.getElementById('results-content').innerHTML = '<p class="placeholder-text">Kör en SQL-fråga för att se resultatet här</p>';
    document.getElementById('result-info').textContent = '';
}

// Run SQL from editor
function runSQL() {
    const editor = document.getElementById('sql-editor');
    const query = editor.value.trim();

    if (!query) {
        showNotification('Skriv en SQL-fråga först!', 'warning');
        return;
    }

    // Execute query
    const result = executeSQL(query);

    // Display results
    displayResults(result);

    // Check if correct (if in exercise mode)
    if (currentDay > 0 && currentExercise >= 0) {
        checkAnswer(result);
    }
}

// Display query results
function displayResults(result) {
    const container = document.getElementById('results-content');
    const info = document.getElementById('result-info');

    if (result.error) {
        container.innerHTML = `<div class="error-message">❌ Fel: ${result.error}</div>`;
        info.textContent = '';
        return;
    }

    if (result.message) {
        // Non-SELECT query
        container.innerHTML = `<div class="success-message">✅ ${result.message}</div>`;
        info.textContent = '';
        return;
    }

    if (!result.columns || result.columns.length === 0) {
        container.innerHTML = '<p class="placeholder-text">Inga resultat returnerades</p>';
        info.textContent = '0 rader';
        return;
    }

    // Build table
    let html = '<table class="results-table"><thead><tr>';
    result.columns.forEach(col => {
        html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';

    result.values.forEach(row => {
        html += '<tr>';
        row.forEach(cell => {
            const displayValue = cell === null ? '<em>NULL</em>' : cell;
            html += `<td>${displayValue}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
    info.textContent = `${result.rowCount} rad(er)`;
}

// Check if answer is correct
function checkAnswer(result) {
    const exercise = getExercise(currentDay, currentExercise);
    if (!exercise) return;

    const isCorrect = exercise.validate(result);

    if (isCorrect) {
        const key = `${currentDay}-${currentExercise}`;

        if (!completedExercises[key]) {
            completedExercises[key] = true;
            totalFlames++;
            saveProgress();

            // Show success modal
            document.getElementById('success-message').textContent =
                `Du klarade övning ${currentExercise + 1}! 🔥 ${totalFlames} ljus tända totalt.`;
            showModal('success-modal');

            // Update UI
            updateCandleDisplay();
            updateDayCards();
            updateExerciseDots();
        } else {
            showNotification('✅ Rätt svar!', 'success');
        }
    }
}

// Show hint
function showHint() {
    const exercise = getExercise(currentDay, currentExercise);
    if (exercise && exercise.hint) {
        document.getElementById('hint-text').textContent = exercise.hint;
        showModal('hint-modal');
    }
}

// Navigation
function nextExercise() {
    const dayData = getDayExercises(currentDay);
    if (dayData && currentExercise < dayData.exercises.length - 1) {
        loadExercise(currentExercise + 1);
    }
}

function prevExercise() {
    if (currentExercise > 0) {
        loadExercise(currentExercise - 1);
    }
}

function updateExerciseNav() {
    const dayData = getDayExercises(currentDay);
    if (!dayData) return;

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) prevBtn.disabled = currentExercise === 0;
    if (nextBtn) nextBtn.disabled = currentExercise >= dayData.exercises.length - 1;
}

function updateExerciseDots() {
    const dayData = getDayExercises(currentDay);
    if (!dayData) return;

    const container = document.getElementById('exercise-dots');
    if (!container) return;

    let html = '';
    dayData.exercises.forEach((_, index) => {
        const key = `${currentDay}-${index}`;
        const isCompleted = completedExercises[key];
        const isActive = index === currentExercise;

        html += `<div class="exercise-dot ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}"
                      onclick="loadExercise(${index})"
                      title="Övning ${index + 1}"></div>`;
    });
    container.innerHTML = html;
}

// Candle display
function updateCandleDisplay() {
    // Update flame count in nav
    document.querySelector('.flame-count').textContent = totalFlames;

    // Update candle progress display
    const display = document.getElementById('candle-progress');
    if (!display) return;

    let html = '';
    for (let day = 1; day <= 7; day++) {
        html += `<div class="day-candles-display">`;
        for (let ex = 0; ex < 7; ex++) {
            const key = `${day}-${ex}`;
            const isLit = completedExercises[key];
            html += `<div class="mini-candle ${isLit ? 'lit' : ''}"></div>`;
        }
        html += `</div>`;
    }
    display.innerHTML = html;
}

// Update day cards
function updateDayCards() {
    for (let day = 1; day <= 7; day++) {
        const card = document.querySelector(`[data-day="${day}"]`);
        if (!card) continue;

        // Count completed exercises for this day
        let completed = 0;
        for (let ex = 0; ex < 7; ex++) {
            if (completedExercises[`${day}-${ex}`]) completed++;
        }

        // Update lock status
        const isUnlocked = isDayUnlocked(day);
        card.classList.toggle('locked', !isUnlocked);

        // Update completion status
        const isComplete = completed === 7;
        card.classList.toggle('completed', isComplete);

        // Update candles in card
        const candlesDiv = document.getElementById(`day${day}-candles`);
        if (candlesDiv) {
            let candleHtml = '';
            for (let i = 0; i < completed; i++) {
                candleHtml += '<div class="mini-candle lit"></div>';
            }
            candlesDiv.innerHTML = candleHtml;
        }
    }
}

// Check if day is unlocked
function isDayUnlocked(day) {
    if (day === 1) return true;

    // Previous day must have at least 5 exercises completed
    let prevCompleted = 0;
    for (let ex = 0; ex < 7; ex++) {
        if (completedExercises[`${day - 1}-${ex}`]) prevCompleted++;
    }
    return prevCompleted >= 5;
}

// Clear editor
function clearEditor() {
    document.getElementById('sql-editor').value = '';
    document.getElementById('results-content').innerHTML = '<p class="placeholder-text">Kör en SQL-fråga för att se resultatet här</p>';
    document.getElementById('result-info').textContent = '';
    updateLineNumbers();
}

// Line numbers
function updateLineNumbers() {
    const editor = document.getElementById('sql-editor');
    const lineNumbers = document.getElementById('line-numbers');
    if (!editor || !lineNumbers) return;

    const lines = editor.value.split('\n').length;
    let numbers = '';
    for (let i = 1; i <= lines; i++) {
        numbers += i + '\n';
    }
    lineNumbers.textContent = numbers;
}

function syncLineNumbers() {
    const editor = document.getElementById('sql-editor');
    const lineNumbers = document.getElementById('line-numbers');
    if (editor && lineNumbers) {
        lineNumbers.scrollTop = editor.scrollTop;
    }
}

// Toggle panels
function toggleTheory() {
    document.getElementById('theory-panel').classList.toggle('collapsed');
}

function toggleSchema() {
    document.getElementById('schema-panel').classList.toggle('collapsed');
}

// Modals
function showModal(id) {
    document.getElementById(id).classList.add('show');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

// Notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#3fb950' : type === 'warning' ? '#f0883e' : '#58a6ff'};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Save/Load progress
function saveProgress() {
    localStorage.setItem('sqlquest_progress', JSON.stringify({
        completedExercises,
        totalFlames,
        currentDay
    }));
}

function loadProgress() {
    const saved = localStorage.getItem('sqlquest_progress');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            completedExercises = data.completedExercises || {};
            totalFlames = data.totalFlames || 0;
            // Count actual completed to verify
            totalFlames = Object.keys(completedExercises).filter(k => completedExercises[k]).length;
        } catch (e) {
            console.error('Kunde inte ladda progress:', e);
        }
    }
}

// Reset progress
function resetProgress() {
    if (confirm('Är du säker på att du vill nollställa all progress?')) {
        completedExercises = {};
        totalFlames = 0;
        localStorage.removeItem('sqlquest_progress');
        resetDatabase();
        updateCandleDisplay();
        updateDayCards();
        showNotification('Progress nollställd!', 'info');
    }
}

// Start journey button
function startJourney() {
    loadDay(1);
}

// Show error
function showError(message) {
    const container = document.getElementById('results-content');
    if (container) {
        container.innerHTML = `<div class="error-message">❌ ${message}</div>`;
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .day-candles-display {
        display: flex;
        gap: 3px;
        margin: 5px;
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.loadDay = loadDay;
window.loadExercise = loadExercise;
window.runSQL = runSQL;
window.clearEditor = clearEditor;
window.nextExercise = nextExercise;
window.prevExercise = prevExercise;
window.showHint = showHint;
window.toggleTheory = toggleTheory;
window.toggleSchema = toggleSchema;
window.showModal = showModal;
window.closeModal = closeModal;
window.startJourney = startJourney;
window.resetProgress = resetProgress;
window.nextOnboardingStep = nextOnboardingStep;
window.prevOnboardingStep = prevOnboardingStep;
window.showSolution = showSolution;
window.copySolutionToEditor = copySolutionToEditor;
window.showAIChat = showAIChat;
window.sendAIMessage = sendAIMessage;
window.quickAIQuestion = quickAIQuestion;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handleLogout = handleLogout;
window.switchAuthModal = switchAuthModal;
window.saveOpenAIKey = saveOpenAIKey;
window.showGuide = showGuide;
window.scrollToGuideSection = scrollToGuideSection;
window.showNotification = showNotification;

// ===== Solution Functions =====
function showSolution() {
    if (currentDay === 0) {
        showNotification('Välj en dag och övning först!', 'warning');
        return;
    }

    const exercise = getExercise(currentDay, currentExercise);
    if (!exercise) return;

    // Get detailed solution
    const detailedSolution = getSolutionExplanation(currentDay, currentExercise);

    // Update modal content
    document.getElementById('solution-code').textContent = exercise.solution;

    if (detailedSolution) {
        document.getElementById('solution-explanation').innerHTML = detailedSolution;
    } else {
        document.getElementById('solution-explanation').innerHTML = `
            <h4>Förklaring</h4>
            <p>Denna fråga returnerar rätt resultat för övningen.</p>
            <div class="tip">💡 Tips: Analysera varje del av frågan för att förstå hur den fungerar.</div>
        `;
    }

    showModal('solution-modal');
}

function copySolutionToEditor() {
    const exercise = getExercise(currentDay, currentExercise);
    if (!exercise) return;

    document.getElementById('sql-editor').value = exercise.solution;
    closeModal('solution-modal');
    showNotification('Lösningen kopierades till editorn', 'success');
    updateLineNumbers();
}

// ===== AI Chat Functions =====
function showAIChat() {
    showModal('ai-chat-modal');

    // Check if API key is configured
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
        addChatMessage('ai', '⚠️ AI-assistenten kräver en OpenAI API-nyckel. Gå till Inställningar (kugghjulet i menyn) för att konfigurera.');
    }
}

function addChatMessage(type, content) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendAIMessage() {
    const input = document.getElementById('ai-chat-input');
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage('user', message);
    input.value = '';

    // Check for API key
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
        addChatMessage('ai', '⚠️ Du behöver konfigurera en OpenAI API-nyckel i Inställningar först.');
        return;
    }

    // Show loading
    const loadingId = 'loading-' + Date.now();
    addChatMessage('ai loading', '<i class="fas fa-spinner fa-spin"></i> Tänker');

    try {
        // Get context about current exercise
        const exercise = getExercise(currentDay, currentExercise);
        const currentCode = document.getElementById('sql-editor').value;

        const context = exercise ? `
Användaren arbetar med: Dag ${currentDay}, Övning ${currentExercise + 1}
Uppgift: ${exercise.description}
Deras nuvarande kod: ${currentCode || '(tom)'}
        ` : '';

        const response = await askAI(message, context);

        // Remove loading message
        const messages = document.querySelectorAll('.chat-message.loading');
        messages.forEach(m => m.remove());

        addChatMessage('ai', response);
    } catch (error) {
        // Remove loading message
        const messages = document.querySelectorAll('.chat-message.loading');
        messages.forEach(m => m.remove());

        addChatMessage('ai', `❌ Fel: ${error.message}`);
    }
}

async function quickAIQuestion(type) {
    const exercise = getExercise(currentDay, currentExercise);
    const currentCode = document.getElementById('sql-editor').value;

    if (!exercise) {
        showNotification('Välj en övning först!', 'warning');
        return;
    }

    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
        addChatMessage('ai', '⚠️ Du behöver konfigurera en OpenAI API-nyckel i Inställningar först.');
        return;
    }

    let prompt = '';
    switch (type) {
        case 'hint':
            prompt = 'Ge mig en ledtråd för denna uppgift utan att avslöja svaret';
            break;
        case 'explain-error':
            prompt = `Förklara varför min kod inte fungerar: ${currentCode}`;
            break;
        case 'review':
            prompt = `Granska mitt försök och ge feedback: ${currentCode}`;
            break;
    }

    addChatMessage('user', prompt);

    // Show loading
    addChatMessage('ai loading', '<i class="fas fa-spinner fa-spin"></i> Tänker');

    try {
        const context = `
Användaren arbetar med: Dag ${currentDay}, Övning ${currentExercise + 1}
Uppgift: ${exercise.description}
Tips från övningen: ${exercise.hint}
Deras kod: ${currentCode || '(ingen kod ännu)'}
        `;

        const response = await askAI(prompt, context);

        // Remove loading
        const messages = document.querySelectorAll('.chat-message.loading');
        messages.forEach(m => m.remove());

        addChatMessage('ai', response);
    } catch (error) {
        const messages = document.querySelectorAll('.chat-message.loading');
        messages.forEach(m => m.remove());
        addChatMessage('ai', `❌ Fel: ${error.message}`);
    }
}

// ===== Auth Functions =====
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    // Validate email domain
    if (!CONFIG.isAllowedEmail(email)) {
        errorDiv.textContent = 'Endast @chasacademy.se-konton är tillåtna';
        return;
    }

    try {
        if (typeof signIn === 'function') {
            const result = await signIn(email, password);
            if (result.error) {
                errorDiv.textContent = result.error.message || 'Inloggning misslyckades';
            } else {
                closeModal('login-modal');
                showNotification('Inloggad!', 'success');
                updateUserUI(result.user);
            }
        } else {
            // Supabase not configured - simulate login
            closeModal('login-modal');
            localStorage.setItem('sqlquest_user', email);
            showNotification('Inloggad (lokalt läge)', 'success');
            updateUserUI({ email });
        }
    } catch (error) {
        errorDiv.textContent = error.message || 'Ett fel uppstod';
    }
}

async function handleSignup(event) {
    event.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-password-confirm').value;
    const errorDiv = document.getElementById('signup-error');

    // Validate email domain
    if (!CONFIG.isAllowedEmail(email)) {
        errorDiv.textContent = 'Endast @chasacademy.se-konton är tillåtna';
        return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Lösenorden matchar inte';
        return;
    }

    try {
        if (typeof signUp === 'function') {
            const result = await signUp(email, password);
            if (result.error) {
                errorDiv.textContent = result.error.message || 'Registrering misslyckades';
            } else {
                closeModal('signup-modal');
                showNotification('Konto skapat! Kolla din mail för verifiering.', 'success');
            }
        } else {
            // Supabase not configured
            closeModal('signup-modal');
            showNotification('Registrering kräver Supabase-konfiguration', 'info');
        }
    } catch (error) {
        errorDiv.textContent = error.message || 'Ett fel uppstod';
    }
}

function switchAuthModal(type) {
    if (type === 'signup') {
        closeModal('login-modal');
        showModal('signup-modal');
    } else {
        closeModal('signup-modal');
        showModal('login-modal');
    }
}

function checkAuthStatus() {
    // Check localStorage for simulated login
    const localUser = localStorage.getItem('sqlquest_user');
    if (localUser) {
        updateUserUI({ email: localUser });
    }

    // Check Supabase if available
    if (typeof getUser === 'function') {
        const user = getUser();
        if (user) {
            updateUserUI(user);
        }
    }
}

function updateUserUI(user) {
    if (!user) {
        document.getElementById('auth-section').style.display = 'flex';
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('save-status').textContent = 'lokalt';
        return;
    }

    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('user-info').style.display = 'flex';

    const initial = user.email.charAt(0).toUpperCase();
    document.getElementById('user-info').innerHTML = `
        <span class="user-avatar">${initial}</span>
        <span class="user-email">${user.email}</span>
        <button class="logout-btn" onclick="handleLogout()" title="Logga ut">
            <i class="fas fa-sign-out-alt"></i>
        </button>
    `;

    document.getElementById('save-status').textContent = 'i molnet';
}

function handleLogout() {
    localStorage.removeItem('sqlquest_user');

    if (typeof signOut === 'function') {
        signOut();
    }

    updateUserUI(null);
    showNotification('Du har loggat ut', 'info');
}

// ===== Settings Functions =====
function saveOpenAIKey() {
    const keyInput = document.getElementById('openai-key');
    const key = keyInput.value.trim();

    if (key) {
        localStorage.setItem('openai_api_key', key);
        showNotification('API-nyckel sparad!', 'success');
        updateAIStatus();
    } else {
        localStorage.removeItem('openai_api_key');
        updateAIStatus();
    }
}

function updateAIStatus() {
    const key = localStorage.getItem('openai_api_key');
    const statusDiv = document.getElementById('ai-status');

    if (!statusDiv) return;

    if (key) {
        statusDiv.className = 'ai-status active';
        statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> AI-hjälp aktiverad';
    } else {
        statusDiv.className = 'ai-status inactive';
        statusDiv.innerHTML = '<i class="fas fa-times-circle"></i> AI-hjälp ej konfigurerad';
    }
}

// ===== Guide Functions =====
function showGuide() {
    showModal('guide-modal');
}

function scrollToGuideSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
