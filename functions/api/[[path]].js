// API routes for SQL Arena auth
export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        // Auth routes
        if (path === '/api/auth/register' && request.method === 'POST') {
            return await handleRegister(request, env, corsHeaders);
        }

        if (path === '/api/auth/login' && request.method === 'POST') {
            return await handleLogin(request, env, corsHeaders);
        }

        if (path === '/api/auth/logout' && request.method === 'POST') {
            return await handleLogout(request, env, corsHeaders);
        }

        if (path === '/api/auth/me' && request.method === 'GET') {
            return await handleGetUser(request, env, corsHeaders);
        }

        // Progress routes
        if (path === '/api/progress' && request.method === 'GET') {
            return await handleGetProgress(request, env, corsHeaders);
        }

        if (path === '/api/progress' && request.method === 'POST') {
            return await handleSaveProgress(request, env, corsHeaders);
        }

        // Achievements routes
        if (path === '/api/achievements' && request.method === 'GET') {
            return await handleGetAchievements(request, env, corsHeaders);
        }

        return new Response(JSON.stringify({ error: 'Not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        // Log full error server-side for diagnostics
        console.error(`[API Error] ${request.method} ${path}:`, error.message, error.stack);

        // Return user-friendly message — never expose internal DB errors to client
        const isDbError = error.message?.includes('D1_ERROR') || error.message?.includes('SQLITE_ERROR');
        const userMessage = isDbError
            ? 'Tjänsten är tillfälligt otillgänglig. Försök igen om en stund.'
            : error.message || 'Ett oväntat fel uppstod';
        const statusCode = isDbError ? 503 : 500;

        return new Response(JSON.stringify({ error: userMessage }), {
            status: statusCode,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
}

// Generate UUID
function generateId() {
    return crypto.randomUUID();
}

// Hash password using Web Crypto API
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

// Auth handlers
async function handleRegister(request, env, corsHeaders) {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
        return new Response(JSON.stringify({ error: 'Email, password och namn krävs' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    // Check if user exists
    const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
    if (existing) {
        return new Response(JSON.stringify({ error: 'E-postadressen är redan registrerad' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    const userId = generateId();
    const passwordHash = await hashPassword(password);

    await env.DB.prepare(
        'INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)'
    ).bind(userId, email, name, passwordHash).run();

    // Create session
    const sessionId = generateId();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await env.DB.prepare(
        'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(sessionId, userId, expiresAt).run();

    // Create default settings
    await env.DB.prepare(
        'INSERT INTO user_settings (user_id) VALUES (?)'
    ).bind(userId).run();

    return new Response(JSON.stringify({
        user: { id: userId, email, name },
        sessionId
    }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

async function handleLogin(request, env, corsHeaders) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Email och lösenord krävs' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    const passwordHash = await hashPassword(password);
    const user = await env.DB.prepare(
        'SELECT id, email, name, avatar_url FROM users WHERE email = ? AND password_hash = ?'
    ).bind(email, passwordHash).first();

    if (!user) {
        return new Response(JSON.stringify({ error: 'Felaktig e-post eller lösenord' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    // Update last login
    await env.DB.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').bind(user.id).run();

    // Create session
    const sessionId = generateId();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await env.DB.prepare(
        'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(sessionId, user.id, expiresAt).run();

    return new Response(JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatar_url },
        sessionId
    }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

async function handleLogout(request, env, corsHeaders) {
    const sessionId = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (sessionId) {
        await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
    }

    return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

async function handleGetUser(request, env, corsHeaders) {
    const sessionId = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Ej inloggad' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    const session = await env.DB.prepare(
        'SELECT user_id FROM sessions WHERE id = ? AND expires_at > CURRENT_TIMESTAMP'
    ).bind(sessionId).first();

    if (!session) {
        return new Response(JSON.stringify({ error: 'Session utgången' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    const user = await env.DB.prepare(
        'SELECT id, email, name, avatar_url FROM users WHERE id = ?'
    ).bind(session.user_id).first();

    return new Response(JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatar_url }
    }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

// Progress handlers
async function handleGetProgress(request, env, corsHeaders) {
    const sessionId = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Ej inloggad' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    const session = await env.DB.prepare(
        'SELECT user_id FROM sessions WHERE id = ? AND expires_at > CURRENT_TIMESTAMP'
    ).bind(sessionId).first();

    if (!session) {
        return new Response(JSON.stringify({ error: 'Session utgången' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    const progress = await env.DB.prepare(
        'SELECT exercise_id, completed, attempts, completed_at FROM user_progress WHERE user_id = ?'
    ).bind(session.user_id).all();

    return new Response(JSON.stringify({ progress: progress.results }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

async function handleSaveProgress(request, env, corsHeaders) {
    const sessionId = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Ej inloggad' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    const session = await env.DB.prepare(
        'SELECT user_id FROM sessions WHERE id = ? AND expires_at > CURRENT_TIMESTAMP'
    ).bind(sessionId).first();

    if (!session) {
        return new Response(JSON.stringify({ error: 'Session utgången' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    const { exerciseId, completed, solution } = await request.json();

    await env.DB.prepare(`
    INSERT INTO user_progress (user_id, exercise_id, completed, attempts, best_solution, completed_at)
    VALUES (?, ?, ?, 1, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, exercise_id) DO UPDATE SET
      completed = CASE WHEN ? THEN 1 ELSE completed END,
      attempts = attempts + 1,
      best_solution = CASE WHEN ? THEN ? ELSE best_solution END,
      completed_at = CASE WHEN ? AND completed_at IS NULL THEN CURRENT_TIMESTAMP ELSE completed_at END
  `).bind(
        session.user_id, exerciseId, completed ? 1 : 0, solution,
        completed ? 1 : 0, completed ? 1 : 0, solution, completed ? 1 : 0
    ).run();

    return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

async function handleGetAchievements(request, env, corsHeaders) {
    const sessionId = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Ej inloggad' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    const session = await env.DB.prepare(
        'SELECT user_id FROM sessions WHERE id = ? AND expires_at > CURRENT_TIMESTAMP'
    ).bind(sessionId).first();

    if (!session) {
        return new Response(JSON.stringify({ error: 'Session utgången' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    const achievements = await env.DB.prepare(
        'SELECT achievement_type, earned_at, metadata FROM achievements WHERE user_id = ?'
    ).bind(session.user_id).all();

    return new Response(JSON.stringify({ achievements: achievements.results }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}
