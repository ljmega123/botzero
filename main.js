// main.js - Logic for Zero Marketing AI

// ===========================
// CONFIG
// ===========================
const OLLAMA_URL = 'http://localhost:11434/api/chat';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';

localStorage.removeItem('czd_notes');
localStorage.removeItem('czd_total_queries');

const getGroqKey = () => localStorage.getItem('czd_groq_key') || '';
const getDeepSeekKey = () => localStorage.getItem('czd_deepseek_key') || '';
const getAIProvider = () => localStorage.getItem('czd_ai_provider') || 'groq';
const getAIModel = () => localStorage.getItem('czd_ai_model') || 'llama-3.1-8b-instant';

const STATS = {
    get: () => JSON.parse(localStorage.getItem('czd_stats') || '{"msgs":0,"copies":0,"queries":0,"start":' + Date.now() + '}'),
    increment: (field) => {
        const s = STATS.get();
        s[field] = (s[field] || 0) + 1;
        localStorage.setItem('czd_stats', JSON.stringify(s));
        return s;
    },
    updateUI: () => {
        const s = STATS.get();
        const ms = document.getElementById('stat-messages');
        const cp = document.getElementById('stat-copies');
        const qy = document.getElementById('stat-queries');
        const tm = document.getElementById('stat-time');
        
        if (ms) ms.textContent = s.msgs || 0;
        if (cp) cp.textContent = s.copies || 0;
        if (qy) qy.textContent = s.queries || 0;
        
        if (tm) {
            const diffMs = Date.now() - (s.start || Date.now());
            const hours = Math.floor(diffMs / 3600000);
            const mins = Math.floor((diffMs % 3600000) / 60000);
            tm.textContent = `${hours.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}`;
        }
    }
};

const SYSTEM_CTX = `Você é a ASSISTENTE DE MARKETING do ZERO MARKETING HQ — um painel de automação para o Clube Zero Dívidas.
Sua missão é ajudar o administrador a criar roteiros, copies, posts e estratégias de marketing digital para o nicho de recuperação de crédito.
Seja direta, criativa e use tom profissional.`;

// ===========================
// PROMPT MAP
// ===========================
const PROMPT_MAP = {
    conteudo: [
        { label: "📧 Email de Venda", prompt: "Escreva um email persuasivo para oferecer o serviço de recuperação de crédito." },
        { label: "🎬 Roteiro Reels", prompt: "Crie um roteiro de Reels de 30s viral sobre como limpar o nome legalmente." },
        { label: "✍️ Legenda Engajamento", prompt: "Escreva uma legenda persuasiva para um post sobre o Clube Zero Dívidas." },
        { label: "📝 Copy Vendas", prompt: "Crie um copy de vendas direto para post de Instagram sobre quitação de dívidas." },
        { label: "💼 Post Institucional", prompt: "Escreva um post profissional apresentando o Clube Zero Dívidas." },
        { label: "🎤 Story Raso", prompt: "Crie um texto para story explicando como funciona a recuperação de crédito." }
    ],
    vendas: [
        { label: "💬 Script WhatsApp", prompt: "Crie um script de fechamento via WhatsApp para um cliente interessado." },
        { label: "🛡️ Quebra Objeções", prompt: "Como responder quando o cliente diz que o serviço demora?" },
        { label: "💰 Proposta Comercial", prompt: "Crie uma proposta comercial atrativa para novos clientes." },
        { label: "📞 Script Ligação", prompt: "Elabore um script para ligação de prospecção." },
        { label: "🎁 Oferta Irresistível", prompt: "Crie uma oferta especial para conversão rápida." }
    ],
    estrategia: [
        { label: "📅 Plano 7 dias", prompt: "Trace uma estratégia de conteúdo para os próximos 7 dias." },
        { label: "🎯 Funil Completo", prompt: "Descreva um funil de vendas completo para recuperação de crédito." },
        { label: "📈 Tráfego", prompt: "Sugira estratégias de tráfego pago para o nicho de finanças." },
        { label: "🔄 Automação", prompt: "Liste ideias de automações para WhatsApp e email." }
    ]
};

// ===========================
// ENGINE
// ===========================
async function generateContent(prompt) {
    const output = document.getElementById('gen-output');
    const placeholder = document.getElementById('gen-placeholder');
    
    if (placeholder) placeholder.style.display = 'none';
    
    appendMessage('user', prompt);
    STATS.increment('queries');
    STATS.increment('msgs');
    STATS.updateUI();
    
    const typingIndicator = showTyping();

    const provider = getAIProvider();
    let apiUrl = GROQ_URL;
    let apiKey = getGroqKey();

    if (provider === 'deepseek') {
        apiUrl = DEEPSEEK_URL;
        apiKey = getDeepSeekKey();
    }

    if (apiKey) {
        try {
            console.log(`Tentando conexão com ${provider}...`);
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${apiKey}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    model: getAIModel(),
                    messages: [
                        { role: "system", content: SYSTEM_CTX },
                        { role: "user", content: prompt }
                    ],
                    max_tokens: 2048,
                    temperature: 0.7
                })
            });
            
            if (res.ok) {
                const data = await res.json();
                typingIndicator.remove();
                appendMessage('ai', data.choices[0].message.content, true);
                STATS.increment('copies');
                STATS.updateUI();
                return;
            } else {
                const errData = await res.json().catch(() => ({}));
                console.error(`Erro ${provider}:`, res.status, errData);
                throw new Error(`Erro na API (${res.status}): ${errData.error?.message || 'Falha na resposta'}`);
            }
        } catch (e) { 
            console.error(`${provider} Catch:`, e);
            if (e.message.includes('Failed to fetch')) {
                lastError = `Erro de Conexão (CORS ou Internet). O provedor ${provider} pode estar bloqueando chamadas directas do navegador.`;
            } else {
                lastError = e.message;
            }
        }
    } else {
        lastError = `Chave API do ${provider} não configurada. Vá em 'Configurações' e insira sua chave.`;
    }

    // 2. TRY OLLAMA (Local)
    try {
        console.log("Tentando Ollama local...");
        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), 2000);
        const res = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "llama3",
                messages: [{ role: "system", content: SYSTEM_CTX }, { role: "user", content: prompt }],
                stream: false
            }),
            signal: ctrl.signal
        });
        if (res.ok) {
            const data = await res.json();
            typingIndicator.remove();
            appendMessage('ai', data.message.content, true);
            return;
        }
    } catch (e) { console.log("Ollama não disponível."); }

    // 3. FINAL FALLBACK
    typingIndicator.remove();
    appendMessage('ai', `❌ Erro: ${lastError}\n\nNota: Se você está no GitHub Pages, chaves de API podem falhar por segurança (CORS). Tente rodar localmente ou verifique sua chave no console.`, true);
}

let lastError = "";

// ===========================
// UI HELPERS
// ===========================
function appendMessage(role, text, isAI = false) {
    const output = document.getElementById('gen-output');
    if (!output) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `bubble ${role}`;
    msgDiv.innerHTML = `<div class="msg-content">${isAI ? '' : escapeHtml(text)}</div>`;
    output.appendChild(msgDiv);
    output.scrollTop = output.scrollHeight;

    if (isAI) {
        typeText(msgDiv.querySelector('.msg-content'), text);
    }
}

function showTyping() {
    const output = document.getElementById('gen-output');
    const div = document.createElement('div');
    div.className = 'bubble ai typing';
    div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
    return div;
}

function typeText(el, text) {
    let i = 0;
    const speed = text.length > 500 ? 1 : 5;
    const iv = setInterval(() => {
        if (i < text.length) {
            el.textContent += text.charAt(i++);
            const out = document.getElementById('gen-output');
            if (out) out.scrollTop = out.scrollHeight;
        } else {
            clearInterval(iv);
            const actions = document.getElementById('gen-actions');
            if (actions) actions.style.display = 'flex';
        }
    }, speed);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===========================
// BUTTONS
// ===========================
window.renderButtons = (category) => {
    const container = document.getElementById('gen-buttons');
    if (!container) return;
    
    container.innerHTML = '';
    const items = PROMPT_MAP[category] || [];
    
    items.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'gen-btn fade-in';
        btn.innerHTML = `<span>${item.label}</span>`;
        btn.onclick = () => {
            const input = document.getElementById('custom-prompt');
            if (input) {
                input.value = item.prompt;
                generateContent(item.prompt);
                input.value = '';
            }
        };
        container.appendChild(btn);
    });
    
    document.querySelectorAll('.ai-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase() === category) tab.classList.add('active');
    });
};

// ===========================
// EXPORTS
// ===========================
window.generateCustom = () => {
    const inp = document.getElementById('custom-prompt');
    if (!inp) return;
    const val = inp.value.trim();
    if (!val) return;
    generateContent(val);
    inp.value = '';
};

window.copyOutput = () => {
    const msgs = document.querySelectorAll('.bubble.ai .msg-content');
    if (msgs.length === 0) return;
    const text = msgs[msgs.length - 1].textContent;
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = 'Copiado!';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    });
};

window.clearOutput = () => {
    const out = document.getElementById('gen-output');
    if (out) out.innerHTML = '';
    const actions = document.getElementById('gen-actions');
    if (actions) actions.style.display = 'none';
};

window.testConnection = async () => {
    const status = document.getElementById('connection-status');
    const btn = document.getElementById('test-connection-btn');
    const provider = document.getElementById('ai-provider-select').value;
    
    let key, url, model;
    if (provider === 'groq') {
        key = document.getElementById('groq-key-input').value.trim();
        url = GROQ_URL;
        model = 'llama-3.1-8b-instant';
    } else {
        key = document.getElementById('deepseek-key-input').value.trim();
        url = DEEPSEEK_URL;
        model = 'deepseek-chat';
    }
    
    if (!key) {
        if (status) {
            status.className = 'status-box error';
            status.innerHTML = `<i data-lucide="alert-circle" style="width:14px"></i>Cole sua chave do ${provider} primeiro!`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
        return;
    }
    
    if (status) {
        status.className = 'status-box loading';
        status.innerHTML = `<i data-lucide="loader" class="spin" style="width:14px"></i>Testando ${provider}...`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
    if (btn) btn.disabled = true;
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${key}`, 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: 'Olá' }],
                max_tokens: 5
            })
        });
        
        if (res.ok) {
            if (status) {
                status.className = 'status-box success';
                status.innerHTML = `<i data-lucide="check-circle" style="width:14px"></i>Conexão OK! Chave ${provider} válida.`;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        } else {
            const err = await res.json().catch(() => ({}));
            if (status) {
                status.className = 'status-box error';
                status.innerHTML = `<i data-lucide="alert-circle" style="width:14px"></i>Erro ${res.status}: ${err.error?.message || 'Chave inválida'}`;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        }
    } catch (e) {
        if (status) {
            status.className = 'status-box error';
            status.innerHTML = `<i data-lucide="alert-circle" style="width:14px"></i>Erro: Verifique sua internet ou CORS.`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }
    
    if (btn) btn.disabled = false;
};

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    if (window.renderButtons) window.renderButtons('conteudo');
    if (typeof lucide !== 'undefined') lucide.createIcons();
    STATS.updateUI();
    setInterval(STATS.updateUI, 60000);
});
