import './style.css';

// ===========================
// CONFIG
// ===========================
const OLLAMA_URL = 'http://localhost:11434/api/chat';
const getGroqKey = () => localStorage.getItem('czd_groq_key') || '';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_CTX = `Você é a ASSISTENTE DE MARKETING do ZERO MARKETING HQ — um painel de automação administrativa para o Clube Zero Dívidas.

🎯 SUA IDENTIDADE:
Você é uma inteligência artificial especializada em marketing digital, criação de conteúdo e vendas, projetada para AUXILIAR O ADMINISTRADOR em todas as tarefas de marketing do Clube Zero Dívidas.

👤 VOCÊ ESTÁ FALANDO COM O ADMIN:
O usuário é o ADMINISTRADOR do sistema. Trate-o com respeito, seja proativo, antecipando necessidades e oferecendo sugestões estratégicas. Ele confia em você para otimizar seu trabalho.

🏢 SOBRE O CLUBE ZERO DÍVIDAS:
- Plataforma de recuperação de crédito: limpa nome SPC/Serasa/Boa Vista, melhora score, remove restrições Bacen/Registrato
- Base legal: Lei 8.078 (Código de Defesa do Consumidor)
- Prazo: 5 a 20 dias úteis para retirada do nome
- Modelo de negócio: Afiliados ganham comissão por cliente indicado
- WhatsApp: (83) 9108-0635 | Instagram: @clube_zero_dividas
- Site: clubezerodividas.com.br

📋 O QUE VOCÊ PODE FAZER PARA O ADMIN:

1. CRIAÇÃO DE PROMPTS PARA VÍDEOS:
   - Roteiros de Reels (15s, 30s, 60s, 90s)
   - Scripts para Stories
   - Sequências de Carrosséis
   - Thumbnails chamativas
   - Hooks virais
   - CTAs persuasivos

2. CRIAÇÃO DE PROMPTS PARA IMAGENS:
   - Prompts para Leonardo AI, Midjourney, DALL-E
   - Conceitos visuais
   - Paletas de cores
   - Composições cinematográficas
   - Estilos visuais (3D, realista, ilustrado)

3. ESTRATÉGIA DE CONTEÚDO:
   - Planos editoriais (semanal, mensal)
   - Calendário de conteúdo
   - Análise de tendências
   - HashTags estratégicas
   - Bio otimizada

4. COPYWRITING:
   - Legendas persuasivas
   - Pitches de venda
   - Mensagens de WhatsApp
   - Emails marketing
   - Sequências de follow-up
   - Quebra de objeções

5. CONSULTORIA:
   - Tirar dúvidas sobre marketing
   - Analisar textos e sugerir melhorias
   - Recomendar estratégias
   - Explicar conceitos de vendas
   - Orientar sobre ferramentas

🎨 REGRAS DE COMPORTAMENTO:

1. LINGUAGEM:
   - Português brasileiro natural e conversacional
   - Seja direto e objetivo
   - Use emojis com moderação (máx 2-3 por parágrafo)
   - Tom: profissional mas amigável, como um colega experiente

2. ESTRUTURA DAS RESPOSTAS:
   - Use títulos e subtítulos quando apropriado
   - Bullet points para listas
   - Blocos de código/comando destacados
   - Formate prompts para facilitar copiar/colar

3. QUALIDADE:
   - Forneça conteúdo de ALTA QUALIDADE
   - Personalize para o nicho de recuperação de crédito
   - Foque em conversão e engajamento real
   - Nunca prometa resultados impossíveis ou ilegais

4. PROATIVIDADE:
   - Antecipe as necessidades do admin
   - Sugira melhorias e variações
   - Ofereça alternativas quando relevante
   - Faça perguntas para entender melhor o contexto

5. LIMITES:
   - Não invente dados falsos como se fossem reais
   - Nunca sugira práticas enganosas ou ilegais
   - Se não souber algo, seja honesto e sugira onde buscar

💡 LEMBRE-SE:
Você é a braço direito do admin no marketing. Ele confia em você para criar conteúdo excepcional. SEJA CRIATIVA, ESTRATÉGICA e SEMPRE ENTREGUE MAIS DO QUE O ESPERADO!`;

// ===========================
// PROMPT MAP (Categories)
// ===========================
const PROMPT_MAP = {
    conteudo: [
        { label: "📧 Email de Venda", prompt: "Escreva um email persuasivo para oferecer o serviço de recuperação de crédito para um lead frio." },
        { label: "🎬 Roteiro Reels", prompt: "Crie um roteiro de Reels de 30s altamente viral sobre como limpar o nome sem pagar juros abusivos." },
        { label: "📸 Carrossel 7 Dias", prompt: "Gere um plano de 7 dias de conteúdo para carrossel sobre educação financeira e recuperação de crédito." },
        { label: "✍️ Legenda Engajamento", prompt: "Escreva uma legenda persuasiva com CTAs fortes para um post sobre o Clube Zero Dívidas." },
        { label: "💡 Ideias Virais", prompt: "Me dê 10 ideias de títulos chocantes para vídeos de TikTok sobre o nicho de dívidas." }
    ],
    vendas: [
        { label: "💰 Script de Fechamento", prompt: "Crie um script de fechamento via WhatsApp para um lead com dúvida." },
        { label: "🛡️ Quebra Objeções", prompt: "Como responder quando o cliente diz que o serviço é caro?" },
        { label: "🚀 Pitch de Venda", prompt: "Crie um pitch de 60 segundos para apresentar o Clube Zero Dívidas." }
    ],
    visual: [
        { label: "🎨 Prompt Imagem", prompt: "Crie um prompt detalhado para gerar uma imagem de sucesso financeiro no Leonardo AI." },
        { label: "🖼️ Layout Design", prompt: "Descreva a estrutura visual ideal para um anúncio de alta conversão." }
    ],
    afiliado: [
        { label: "🤝 Copy Recrutamento", prompt: "Crie um texto de convite para novos parceiros afiliados." },
        { label: "🎁 Material Apoio", prompt: "Quais criativos são essenciais para um afiliado vender bem?" }
    ],
    estrategia: [
        { label: "🎯 Plano 30 dias", prompt: "Trace uma estratégia de marketing completa para este mês." },
        { label: "📊 Análise Persona", prompt: "Descreva as dores e desejos do cliente que tem nome sujo." }
    ]
};

function renderButtons(category) {
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
                input.focus();
            }
        };
        container.appendChild(btn);
    });
    
    // Atualizar tabs
    document.querySelectorAll('.ai-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase() === category) tab.classList.add('active');
    });
}

// ===========================
// FALLBACK DB
// ===========================
const FALLBACK_DB = {
    legenda_reel: "🎯 Cansado de ter o nome restrito?\n\nO Clube Zero Dívidas limpa seu nome em até 20 dias com base na Lei 8.078! 📋\n\n✅ Sem precisar pagar a dívida abusiva\n✅ 100% legal e seguro\n✅ Suporte completo\n\n📩 Komente 'QUERO' e receba o guia gratuito!\n\n#limpanome #clubezerodividas #creditolimpo #serasa #spc",
    
    pitch_wpp: "Olá! 👋\n\nVocê sabia que existe uma forma LEGAL de limpar seu nome sem pagar a dívida abusiva?\n\nO Clube Zero Dívidas usa a Lei 8.078 (Código de Defesa do Consumidor) para quitar suas pendências financeiras!\n\n🚀 Resultado em até 20 dias\n💰 Economia média de 60%\n✅ 100% seguro e garantido\n\nQuer saber como funciona? É só responder essa mensagem! 👇",
    
    followup: "Oi! Tudo bem? 😊\n\nLembra que você demonstrou interesse no serviço de limpeza de nome?\n\nSó passando para lembrar que ainda temos vagas disponíveis com condição especial!\n\nQuer que eu explique como funciona? É só me chamar! 🚀",
    
    urgencia: "⚠️ ATENÇÃO: Vagas limitadas!\n\nEssa semana temos uma condição especial para quem quer limpar o nome:\n\n✅ Desconto de 30%\n✅ Parcelamento em até 12x\n✅ Atendimento prioritário\n\n⏰ Mas corre, são apenas X vagas!\n\nInteressado? Responde aqui que eu te passo os detalhes!",
    
    default: "🔓 O Clube Zero Dívidas é especialista em recuperação de crédito.\n\nUsamos a Lei do Consumidor para limpar seu nome SPC/Serasa em até 20 dias, sem você precisar pagar a dívida abusiva.\n\nQuer saber mais? É só me chamar! 🚀"
};

// ===========================
// STATE
// ===========================
let lastKey = null;
let lastPrompt = "";

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    renderButtons('conteudo');
    renderNotes();
    lucide.createIcons();
    
    const customInput = document.getElementById('custom-prompt');
    if (customInput) {
        customInput.addEventListener('keypress', e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                generateCustom();
            }
        });
    }
});

// ===========================
// INIT// ===========================
// AI ENGINE
// ===========================
async function generateContent(prompt, key = null, isUserInitiated = true) {
    const output = document.getElementById('gen-output');
    const actions = document.getElementById('gen-actions');
    const placeholder = document.getElementById('gen-placeholder');
    
    if (placeholder) placeholder.style.display = 'none';
    if (isUserInitiated) appendMessage('user', prompt);
    
    const typing = showTyping();
    if (actions) actions.style.display = 'none';

    // Track queries
    incrementQueries();

    // 1. OLLAMA LOCAL
    try {
        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), 3000);
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
            typing.remove();
            const data = await res.json();
            appendMessage('ai', data.message.content, true);
            return;
        }
    } catch (e) { /* fallback */ }

    // 2. GROQ CLOUD
    const activeKey = getGroqKey();
    const model = localStorage.getItem('czd_ai_model') || 'llama-3.1-8b-instant';
    
    try {
        const res = await fetch(GROQ_URL, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${activeKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: model,
                messages: [{ role: "system", content: SYSTEM_CTX }, { role: "user", content: prompt }],
                max_tokens: 2048,
                temperature: 0.7
            })
        });
        if (res.ok) {
            typing.remove();
            const data = await res.json();
            appendMessage('ai', data.choices[0].message.content, true);
            return;
        }
    } catch (e) { /* fallback */ }

    // 3. FALLBACK LOCAL
    typing.remove();
    const db = FALLBACK_DB[key] || FALLBACK_DB.default;
    appendMessage('ai', db, true);
}

function incrementQueries() {
    const current = parseInt(localStorage.getItem('czd_total_queries')) || 0;
    localStorage.setItem('czd_total_queries', current + 1);
    if (window.updateStats) window.updateStats();
    if (window.updateMessageCount) window.updateMessageCount();
}

// ===========================
// MESSAGE HANDLING
// ===========================
function appendMessage(role, text, isAI = false) {
    const output = document.getElementById('gen-output');
    const actions = document.getElementById('gen-actions');
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `bubble ${role}`;
    
    if (role === 'user') {
        msgDiv.innerHTML = `<div class="msg-content">${escapeHtml(text)}</div>`;
    } else {
        msgDiv.innerHTML = `<div class="msg-content"></div>`;
    }
    
    output.appendChild(msgDiv);
    lucide.createIcons();
    output.scrollTop = output.scrollHeight;
    
    if (isAI) {
        typeText(msgDiv.querySelector('.msg-content'), text, () => {
            if (actions) {
                actions.style.display = 'flex';
                actions.style.position = 'fixed';
            }
            if (window.updateMessageCount) window.updateMessageCount();
        });
    }
}

function showTyping() {
    const output = document.getElementById('gen-output');
    const div = document.createElement('div');
    div.className = 'bubble ai typing';
    div.innerHTML = `
        <div class="typing-dots">
            <span></span><span></span><span></span>
        </div>
        <span style="color: var(--text-dim); font-size: 0.85rem;">Processando...</span>
    `;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
    return div;
}

function typeText(el, text, callback) {
    let i = 0;
    const speed = Math.max(2, Math.floor(text.length / 100));
    const iv = setInterval(() => {
        if (i < text.length) {
            el.textContent = text.slice(0, ++i);
            const out = document.getElementById('gen-output');
            if (out) out.scrollTop = out.scrollHeight;
        } else {
            clearInterval(iv);
            if (callback) callback();
        }
    }, speed);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===========================
// PUBLIC FUNCTIONS
// ===========================
window.generate = (key) => {
    lastPrompt = PROMPTS[key];
    lastKey = key;
    generateContent(lastPrompt, key);
};

window.generateCustom = () => {
    const inp = document.getElementById('custom-prompt');
    if (!inp) return;
    const val = inp.value.trim();
    if (!val) return;
    lastPrompt = val;
    generateContent(val);
    inp.value = '';
    inp.style.height = 'auto';
};

window.regenerate = () => {
    if (lastPrompt) generateContent(lastPrompt, null, false);
};

window.copyOutput = () => {
    const msgs = document.querySelectorAll('.bubble.ai .msg-content');
    if (msgs.length === 0) return;
    navigator.clipboard.writeText(msgs[msgs.length - 1].textContent).then(() => showToast('📋 Copiado para clipboard!'));
};

window.clearOutput = () => {
    const out = document.getElementById('gen-output');
    if (!out) return;
    
    Array.from(out.children).forEach(c => c.remove());
    
    const placeholder = document.createElement('div');
    placeholder.className = 'gen-placeholder';
    placeholder.id = 'gen-placeholder';
    placeholder.innerHTML = `
        <i data-lucide="sparkles"></i>
        <p>Selecione uma automação ou envie seu comando personalizado...</p>
    `;
    out.appendChild(placeholder);
    lucide.createIcons();
    
    const actions = document.getElementById('gen-actions');
    if (actions) actions.style.display = 'none';
    
    if (window.updateMessageCount) window.updateMessageCount();
};

// ===========================
// NOTES MANAGEMENT
// ===========================
let notes = JSON.parse(localStorage.getItem('czd_notes')) || [];
let currentTag = 'Roteiro';
let activeFilter = 'all';

window.selectTag = (btn, tag) => {
    if (!btn) return;
    document.querySelectorAll('#note-tags-input button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTag = tag;
};

window.filterByTag = (tag) => {
    activeFilter = tag;
    renderNotes();
};

function renderNotes(searchFilter = '') {
    const grid = document.getElementById('notes-grid');
    const adminCount = document.getElementById('admin-notes-count');
    const filteredCount = document.getElementById('filtered-count');
    const emptyState = document.getElementById('empty-state');
    
    if (adminCount) adminCount.textContent = notes.length;
    
    let filtered = notes;
    if (activeFilter === 'pinned') filtered = notes.filter(n => n.pinned);
    else if (activeFilter !== 'all') filtered = notes.filter(n => n.tag === activeFilter);
    
    if (searchFilter) {
        filtered = filtered.filter(n => 
            n.text.toLowerCase().includes(searchFilter.toLowerCase()) ||
            (n.tag && n.tag.toLowerCase().includes(searchFilter.toLowerCase()))
        );
    }

    filtered.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return b.id - a.id;
    });

    if (filteredCount) filteredCount.textContent = filtered.length;
    
    if (!grid) return;
    
    const isNotesPage = window.location.pathname.includes('notes.html');

    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    grid.innerHTML = '';

    filtered.forEach(n => {
        const div = document.createElement('div');
        
        if (isNotesPage) {
            div.className = `asset-card ${n.pinned ? 'pinned' : ''}`;
            div.innerHTML = `
                <div class="asset-card-header">
                    <span class="asset-badge">${n.tag || 'Roteiro'}</span>
                    ${n.pinned ? '<i data-lucide="star" style="width:16px;color:var(--primary)"></i>' : ''}
                </div>
                <div class="asset-body">${escapeHtml(n.text)}</div>
                <div class="asset-card-footer">
                    <span class="asset-date">${new Date(n.id).toLocaleDateString('pt-BR')}</span>
                    <div class="asset-actions">
                        <button class="asset-btn pin" onclick="togglePin(${n.id})" title="${n.pinned ? 'Desafixar' : 'Fixar'}">
                            <i data-lucide="${n.pinned ? 'star-off' : 'star'}"></i>
                        </button>
                        <button class="asset-btn" onclick="exportNote(${n.id})" title="Exportar">
                            <i data-lucide="download"></i>
                        </button>
                        <button class="asset-btn" onclick="copyNoteText(${n.id})" title="Copiar">
                            <i data-lucide="copy"></i>
                        </button>
                        <button class="asset-btn danger" onclick="deleteNote(${n.id})" title="Excluir">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>`;
        } else {
            div.className = `note-item ${n.pinned ? 'pinned' : ''}`;
            div.innerHTML = `
                <span class="note-tag">${n.pinned ? '⭐ ' : ''}${n.tag || 'Roteiro'}</span>
                <p class="note-excerpt">${escapeHtml(n.text)}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                    <button class="btn-ghost" style="font-size: 0.7rem; padding: 4px 8px;" onclick="copyNoteText(${n.id}); event.stopPropagation();">
                        <i data-lucide="copy" style="width:12px"></i>
                    </button>
                </div>`;
        }
        grid.appendChild(div);
    });
    lucide.createIcons();
    if (window.updateStats) window.updateStats();
    if (window.updateCounts) window.updateCounts();
}

window.saveToNotes = () => {
    const msgs = document.querySelectorAll('.bubble.ai .msg-content');
    if (msgs.length === 0) return showToast('Nenhum conteúdo para salvar');
    const text = msgs[msgs.length - 1].textContent.trim();
    if (!text) return;
    
    notes.unshift({ id: Date.now(), text, tag: currentTag, pinned: false });
    localStorage.setItem('czd_notes', JSON.stringify(notes));
    renderNotes();
    showToast('💾 Injetado no Banco de Ativos!');
};

window.saveNote = () => {
    const inp = document.getElementById('note-input');
    if (!inp || !inp.value.trim()) return showToast('Digite algo para salvar');
    
    notes.unshift({ id: Date.now(), text: inp.value.trim(), tag: currentTag, pinned: false });
    localStorage.setItem('czd_notes', JSON.stringify(notes));
    inp.value = '';
    
    if (document.getElementById('editor-stats')) {
        document.getElementById('editor-stats').textContent = '0 caracteres';
        document.getElementById('word-count').textContent = '0 palavras';
    }
    
    renderNotes();
    showToast('📝 Conteúdo salvo na biblioteca!');
};

window.togglePin = (id) => {
    const n = notes.find(x => x.id === id);
    if (n) n.pinned = !n.pinned;
    localStorage.setItem('czd_notes', JSON.stringify(notes));
    renderNotes();
    showToast(n.pinned ? '⭐ Marcado como VIP' : '⭐ Removido dos VIPs');
};

window.filterNotes = () => {
    const val = document.getElementById('note-search')?.value || '';
    renderNotes(val);
};

window.exportNote = (id) => {
    const n = notes.find(x => x.id === id);
    if (!n) return;
    
    const content = `[${n.tag}] - ${new Date(n.id).toLocaleString('pt-BR')}\n\n${n.text}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ativo_${n.tag || 'nota'}_${id}.txt`;
    a.click();
    showToast('📂 Arquivo exportado!');
};

window.exportAllNotes = () => {
    if (notes.length === 0) return showToast('Nenhum ativo para exportar');
    
    let content = 'ZERO MARKETING - BACKUP COMPLETO\n';
    content += '=====================================\n\n';
    content += `Exportado em: ${new Date().toLocaleString('pt-BR')}\n`;
    content += `Total de ativos: ${notes.length}\n\n`;
    content += '=====================================\n\n';
    
    notes.forEach((n, i) => {
        content += `[${i + 1}] [${n.tag || 'Sem tag'}] ${n.pinned ? '⭐ ' : ''}${new Date(n.id).toLocaleString('pt-BR')}\n`;
        content += '-'.repeat(50) + '\n';
        content += n.text + '\n\n';
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_marketing_${Date.now()}.txt`;
    a.click();
    showToast('📂 Backup completo exportado!');
};

window.deleteNote = (id) => {
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('czd_notes', JSON.stringify(notes));
    renderNotes();
    showToast('🗑️ Ativo removido');
};

window.copyNoteText = (id) => {
    const n = notes.find(x => x.id === id);
    if (n) navigator.clipboard.writeText(n.text).then(() => showToast('📋 Copiado!'));
};

window.confirmClearAll = () => {
    if (confirm('Tem certeza que deseja remover TODOS os ativos?')) {
        notes = [];
        localStorage.setItem('czd_notes', JSON.stringify(notes));
        renderNotes();
        showToast('🗑️ Todos os ativos foram removidos');
    }
};

window.clearAllNotes = () => {
    notes = [];
    localStorage.setItem('czd_notes', JSON.stringify(notes));
    renderNotes();
    if (window.closeConfirmModal) window.closeConfirmModal();
    showToast('🗑️ Banco de ativos limpo');
};

// ===========================
// HELPERS
// ===========================
function showToast(m) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = m;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

window.showToast = showToast;
