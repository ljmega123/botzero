import './style.css';

// ===========================
// CONFIG
// ===========================
const OLLAMA_URL = 'http://localhost:11434/api/chat';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Cleanup residual storage
localStorage.removeItem('czd_notes');
localStorage.removeItem('czd_total_queries');

const getGroqKey = () => localStorage.getItem('czd_groq_key') || '';
const getAIModel = () => localStorage.getItem('czd_ai_model') || 'llama-3.1-8b-instant';

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
        { label: "✍️ Legenda Engajamento", prompt: "Escreva uma legenda persuasiva para um post sobre o Clube Zero Dívidas." }
    ],
    vendas: [
        { label: "💰 Script WhatsApp", prompt: "Crie um script de fechamento via WhatsApp para um cliente interessado." },
        { label: "🛡️ Quebra Objeções", prompt: "Como responder quando o cliente diz que o serviço demora?" }
    ],
    estrategia: [
        { label: "🎯 Plano 7 dias", prompt: "Trace uma estratégia de conteúdo para os próximos 7 dias." }
    ]
};

// ===========================
// ENGINE
// ===========================
async function generateContent(prompt) {
    const output = document.getElementById('gen-output');
    const placeholder = document.getElementById('gen-placeholder');
    
    if (placeholder) placeholder.style.display = 'none';
    
    // Add User Message
    appendMessage('user', prompt);
    
    const typingIndicator = showTyping();

    // 1. TRY GROQ
    const activeKey = getGroqKey();
    if (activeKey) {
        try {
            const res = await fetch(GROQ_URL, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${activeKey}`, 
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
                return;
            }
        } catch (e) { console.error("Groq Error:", e); }
    }

    // 2. TRY OLLAMA (Local)
    try {
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
    } catch (e) { /* ignore */ }

    // 3. FALLBACK
    typingIndicator.remove();
    appendMessage('ai', "Desculpe, não consegui conectar aos servidores de IA. Verifique sua chave Groq nas configurações.", true);
}

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

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    if (window.renderButtons) window.renderButtons('conteudo');
    if (typeof lucide !== 'undefined') lucide.createIcons();
});
