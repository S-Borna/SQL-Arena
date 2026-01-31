// ===== SQL Quest - AI Assistant (OpenAI Integration) =====
// Hjälper användare förstå SQL med GPT-4o mini

// Fråga AI om hjälp
async function askAI(question, context = '') {
    // Hämta API-nyckel från localStorage
    const openaiApiKey = localStorage.getItem('openai_api_key');

    if (!openaiApiKey) {
        throw new Error('Ingen API-nyckel konfigurerad. Gå till Inställningar för att lägga till din OpenAI API-nyckel.');
    }

    // Bygg upp systemmeddelande
    const systemMessage = `Du är en vänlig och pedagogisk SQL-lärare som hjälper studenter på Chas Academy att lära sig SQL.

VIKTIGA REGLER:
1. Svara ALLTID på svenska
2. Var uppmuntrande och positiv
3. Förklara koncept steg-för-steg
4. Ge INTE hela lösningen direkt - guida istället
5. Använd enkla analogier för att förklara
6. Om studenten verkar frustrerad, var extra stöttande

KONTEXT:
- Studenten arbetar med SQLite i webbläsaren
- Tillgängliga tabeller: kunder, produkter, ordrar, orderrader, anstalda, kategorier, stader
${context}

DITT SVAR SKA:
- Vara koncist (max 3-4 korta stycken)
- Fokusera på att hjälpa studenten FÖRSTÅ, inte bara lösa
- Inkludera ett litet kodexempel om relevant (men inte hela lösningen)
- Formateras med markdown för bättre läsbarhet`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: question }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'API-fel');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('AI-fel:', error);
        throw error;
    }
}

// Förklara ett SQL-koncept
async function explainConcept(concept) {
    const question = `Förklara SQL-konceptet "${concept}" på ett enkelt sätt för en nybörjare. Använd gärna en analogi från vardagen.`;
    return await askAI(question);
}

// Förklara vad en SQL-fråga gör
async function explainQuery(query) {
    const question = `Förklara vad denna SQL-fråga gör, rad för rad:

\`\`\`sql
${query}
\`\`\`

Bryt ner det i enkla steg.`;
    return await askAI(question);
}

// Hjälp med felmeddelande
async function explainError(errorMessage, query) {
    const question = `Jag fick detta felmeddelande när jag körde min SQL:

Fel: ${errorMessage}

Min kod:
\`\`\`sql
${query}
\`\`\`

Vad gör jag fel och hur kan jag lösa det?`;

    const context = {
        currentDay: currentDay,
        exerciseDescription: getExercise(currentDay, currentExercise)?.description
    };

    return await askAI(question, context);
}

// Ge ledtråd för övning
async function getHintFromAI() {
    const exercise = getExercise(currentDay, currentExercise);
    if (!exercise) return { error: true, message: 'Ingen övning vald' };

    const question = `Jag fastnade på denna övning:

"${exercise.description}"

Kan du ge mig en ledtråd utan att avslöja hela lösningen? Peka mig i rätt riktning.`;

    const context = {
        currentDay: currentDay,
        exerciseDescription: exercise.description
    };

    return await askAI(question, context);
}

// Granska användarens försök
async function reviewAttempt(userQuery, expectedResult) {
    const exercise = getExercise(currentDay, currentExercise);
    if (!exercise) return { error: true, message: 'Ingen övning vald' };

    const question = `Jag försökte lösa denna övning:

"${exercise.description}"

Mitt försök:
\`\`\`sql
${userQuery}
\`\`\`

Det fungerar inte riktigt. Kan du förklara vad som är fel och guida mig mot rätt lösning? Ge inte hela svaret, men hjälp mig förstå vad jag missar.`;

    const context = {
        currentDay: currentDay,
        exerciseDescription: exercise.description
    };

    return await askAI(question, context);
}

// Visa AI-chat modal
function showAIChat() {
    if (!openaiApiKey) {
        showModal('settings-modal');
        showNotification('Konfigurera din OpenAI API-nyckel först!', 'warning');
        return;
    }
    showModal('ai-chat-modal');
}

// Skicka meddelande i AI-chat
async function sendAIMessage() {
    const input = document.getElementById('ai-chat-input');
    const messagesContainer = document.getElementById('ai-chat-messages');

    if (!input || !messagesContainer) return;

    const question = input.value.trim();
    if (!question) return;

    // Visa användarens meddelande
    messagesContainer.innerHTML += `
        <div class="chat-message user">
            <div class="message-content">${escapeHtml(question)}</div>
        </div>
    `;

    input.value = '';

    // Visa loading
    messagesContainer.innerHTML += `
        <div class="chat-message ai loading" id="ai-loading">
            <div class="message-content">
                <i class="fas fa-spinner fa-spin"></i> Tänker...
            </div>
        </div>
    `;

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Fråga AI
    const context = {
        currentDay: currentDay,
        exerciseDescription: getExercise(currentDay, currentExercise)?.description
    };

    const response = await askAI(question, context);

    // Ta bort loading
    document.getElementById('ai-loading')?.remove();

    // Visa AI:s svar
    messagesContainer.innerHTML += `
        <div class="chat-message ai">
            <div class="message-content">${formatAIResponse(response.message)}</div>
        </div>
    `;

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Formatera AI-svar (markdown-liknande)
function formatAIResponse(text) {
    if (!text) return '';

    // Escape HTML först
    text = escapeHtml(text);

    // Konvertera kodblock
    text = text.replace(/```sql\n?([\s\S]*?)```/g, '<pre><code class="sql">$1</code></pre>');
    text = text.replace(/```\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Konvertera inline kod
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Konvertera bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Konvertera radbrytningar
    text = text.replace(/\n/g, '<br>');

    return text;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Snabbfrågor
async function quickAIQuestion(type) {
    let response;

    switch (type) {
        case 'hint':
            response = await getHintFromAI();
            break;
        case 'explain-error':
            const editor = document.getElementById('sql-editor');
            const lastError = document.querySelector('.error-message');
            if (lastError && editor) {
                response = await explainError(
                    lastError.textContent.replace('❌ Fel: ', ''),
                    editor.value
                );
            } else {
                response = { error: true, message: 'Inget fel att förklara' };
            }
            break;
        case 'review':
            const query = document.getElementById('sql-editor')?.value;
            if (query) {
                response = await reviewAttempt(query);
            } else {
                response = { error: true, message: 'Skriv en SQL-fråga först' };
            }
            break;
        default:
            response = { error: true, message: 'Okänd frågetyp' };
    }

    // Visa svar i chat
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (messagesContainer && response) {
        messagesContainer.innerHTML += `
            <div class="chat-message ai">
                <div class="message-content">${formatAIResponse(response.message)}</div>
            </div>
        `;
        showModal('ai-chat-modal');
    }
}

// Exportera
window.initAI = initAI;
window.setOpenAIKey = setOpenAIKey;
window.askAI = askAI;
window.explainConcept = explainConcept;
window.explainQuery = explainQuery;
window.explainError = explainError;
window.getHintFromAI = getHintFromAI;
window.reviewAttempt = reviewAttempt;
window.showAIChat = showAIChat;
window.sendAIMessage = sendAIMessage;
window.quickAIQuestion = quickAIQuestion;
