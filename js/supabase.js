// ===== SQL Quest - Supabase Integration =====
// Hanterar autentisering och datalagring med PostgreSQL via Supabase

let supabase = null;
let currentUser = null;

// Initiera Supabase-klient
async function initSupabase() {
    if (!CONFIG.SUPABASE_URL || CONFIG.SUPABASE_URL === 'YOUR_SUPABASE_URL') {
        console.log('⚠️ Supabase inte konfigurerad - kör i offline-läge');
        return false;
    }

    try {
        // Ladda Supabase från CDN om det inte finns
        if (typeof window.supabase === 'undefined') {
            await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
        }

        const { createClient } = window.supabase;
        supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

        // Kolla om användaren redan är inloggad
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            currentUser = session.user;
            await loadUserProgress();
        }

        // Lyssna på auth-ändringar
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                currentUser = session.user;
                await loadUserProgress();
                updateAuthUI();
            } else {
                currentUser = null;
                updateAuthUI();
            }
        });

        console.log('✅ Supabase initierad');
        return true;
    } catch (error) {
        console.error('❌ Kunde inte initiera Supabase:', error);
        return false;
    }
}

// Hjälpfunktion för att ladda script
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// ===== AUTENTISERING =====

// Registrera ny användare
async function signUp(email, password) {
    // Validera email-domän
    if (!isAllowedEmail(email)) {
        return {
            error: {
                message: `Endast email-adresser med @${CONFIG.ALLOWED_EMAIL_DOMAINS.join(' eller @')} är tillåtna.`
            }
        };
    }

    if (!supabase) {
        return { error: { message: 'Databasanslutning saknas. Kontakta administratör.' } };
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    registered_at: new Date().toISOString()
                }
            }
        });

        if (error) throw error;

        // Skapa användarprofil
        if (data.user) {
            await createUserProfile(data.user.id, email);
        }

        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}

// Logga in
async function signIn(email, password) {
    if (!supabase) {
        // Offline-läge: Kolla bara email-domänen
        if (!isAllowedEmail(email)) {
            return {
                error: {
                    message: `Endast @chasacademy.se-konton är tillåtna.`
                }
            };
        }
        // Simulera inloggning i offline-läge
        currentUser = { email, id: 'offline-' + Date.now() };
        updateAuthUI();
        return { data: { user: currentUser }, error: null };
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}

// Logga ut
async function signOut() {
    if (supabase) {
        await supabase.auth.signOut();
    }
    currentUser = null;
    updateAuthUI();
}

// Skapa användarprofil i databasen
async function createUserProfile(userId, email) {
    if (!supabase) return;

    try {
        await supabase.from('user_profiles').insert({
            user_id: userId,
            email: email,
            created_at: new Date().toISOString()
        });
    } catch (error) {
        console.error('Kunde inte skapa profil:', error);
    }
}

// ===== PROGRESS-HANTERING =====

// Spara progress till databasen
async function saveProgressToDb() {
    if (!currentUser || !supabase) {
        // Spara lokalt istället
        saveProgress();
        return;
    }

    try {
        const progressData = {
            user_id: currentUser.id,
            completed_exercises: completedExercises,
            total_flames: totalFlames,
            current_day: currentDay,
            updated_at: new Date().toISOString()
        };

        // Upsert - uppdatera om finns, skapa annars
        const { error } = await supabase
            .from('user_progress')
            .upsert(progressData, { onConflict: 'user_id' });

        if (error) throw error;

        // Spara också lokalt som backup
        saveProgress();

        console.log('✅ Progress sparad till molnet');
    } catch (error) {
        console.error('❌ Kunde inte spara progress:', error);
        // Fallback till lokal lagring
        saveProgress();
    }
}

// Ladda progress från databasen
async function loadUserProgress() {
    if (!currentUser || !supabase) return;

    try {
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows

        if (data) {
            completedExercises = data.completed_exercises || {};
            totalFlames = data.total_flames || 0;

            // Uppdatera UI
            updateCandleDisplay();
            updateDayCards();

            console.log('✅ Progress laddad från molnet');
        }
    } catch (error) {
        console.error('❌ Kunde inte ladda progress:', error);
        // Fallback till lokal lagring
        loadProgress();
    }
}

// Spara övningslösning
async function saveExerciseSolution(day, exerciseIndex, solution, isCorrect) {
    if (!currentUser || !supabase) return;

    try {
        await supabase.from('exercise_solutions').insert({
            user_id: currentUser.id,
            day: day,
            exercise_index: exerciseIndex,
            solution: solution,
            is_correct: isCorrect,
            submitted_at: new Date().toISOString()
        });
    } catch (error) {
        console.error('Kunde inte spara lösning:', error);
    }
}

// ===== UI-UPPDATERINGAR =====

function updateAuthUI() {
    const authSection = document.getElementById('auth-section');
    const userInfo = document.getElementById('user-info');

    if (!authSection || !userInfo) return;

    if (currentUser) {
        authSection.style.display = 'none';
        userInfo.style.display = 'flex';
        userInfo.innerHTML = `
            <span class="user-email">${currentUser.email}</span>
            <button class="logout-btn" onclick="signOut()">
                <i class="fas fa-sign-out-alt"></i> Logga ut
            </button>
        `;
    } else {
        authSection.style.display = 'flex';
        userInfo.style.display = 'none';
    }
}

// Exportera funktioner
window.initSupabase = initSupabase;
window.signUp = signUp;
window.signIn = signIn;
window.signOut = signOut;
window.saveProgressToDb = saveProgressToDb;
window.loadUserProgress = loadUserProgress;
window.saveExerciseSolution = saveExerciseSolution;
window.currentUser = () => currentUser;
