var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=e((()=>{})),r=t((()=>{n();var e=`http://localhost:11434/api/chat`,t=()=>localStorage.getItem(`czd_groq_key`)||``,r=`https://api.groq.com/openai/v1/chat/completions`,i=`Você é a ASSISTENTE DE MARKETING do ZERO MARKETING HQ — um painel de automação administrativa para o Clube Zero Dívidas.

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
Você é a braço direito do admin no marketing. Ele confia em você para criar conteúdo excepcional. SEJA CRIATIVA, ESTRATÉGICA e SEMPRE ENTREGUE MAIS DO QUE O ESPERADO!`,a={conteudo:[{label:`📧 Email de Venda`,prompt:`Escreva um email persuasivo para oferecer o serviço de recuperação de crédito para um lead frio.`},{label:`🎬 Roteiro Reels`,prompt:`Crie um roteiro de Reels de 30s altamente viral sobre como limpar o nome sem pagar juros abusivos.`},{label:`📸 Carrossel 7 Dias`,prompt:`Gere um plano de 7 dias de conteúdo para carrossel sobre educação financeira e recuperação de crédito.`},{label:`✍️ Legenda Engajamento`,prompt:`Escreva uma legenda persuasiva com CTAs fortes para um post sobre o Clube Zero Dívidas.`},{label:`💡 Ideias Virais`,prompt:`Me dê 10 ideias de títulos chocantes para vídeos de TikTok sobre o nicho de dívidas.`}],vendas:[{label:`💰 Script de Fechamento`,prompt:`Crie um script de fechamento via WhatsApp para um lead com dúvida.`},{label:`🛡️ Quebra Objeções`,prompt:`Como responder quando o cliente diz que o serviço é caro?`},{label:`🚀 Pitch de Venda`,prompt:`Crie um pitch de 60 segundos para apresentar o Clube Zero Dívidas.`}],visual:[{label:`🎨 Prompt Imagem`,prompt:`Crie um prompt detalhado para gerar uma imagem de sucesso financeiro no Leonardo AI.`},{label:`🖼️ Layout Design`,prompt:`Descreva a estrutura visual ideal para um anúncio de alta conversão.`}],afiliado:[{label:`🤝 Copy Recrutamento`,prompt:`Crie um texto de convite para novos parceiros afiliados.`},{label:`🎁 Material Apoio`,prompt:`Quais criativos são essenciais para um afiliado vender bem?`}],estrategia:[{label:`🎯 Plano 30 dias`,prompt:`Trace uma estratégia de marketing completa para este mês.`},{label:`📊 Análise Persona`,prompt:`Descreva as dores e desejos do cliente que tem nome sujo.`}]};function o(e){let t=document.getElementById(`gen-buttons`);t&&(t.innerHTML=``,(a[e]||[]).forEach(e=>{let n=document.createElement(`button`);n.className=`gen-btn fade-in`,n.innerHTML=`<span>${e.label}</span>`,n.onclick=()=>{let t=document.getElementById(`custom-prompt`);t&&(t.value=e.prompt,t.focus())},t.appendChild(n)}),document.querySelectorAll(`.ai-tab`).forEach(t=>{t.classList.remove(`active`),t.textContent.toLowerCase()===e&&t.classList.add(`active`)}))}var s={legenda_reel:`🎯 Cansado de ter o nome restrito?

O Clube Zero Dívidas limpa seu nome em até 20 dias com base na Lei 8.078! 📋

✅ Sem precisar pagar a dívida abusiva
✅ 100% legal e seguro
✅ Suporte completo

📩 Komente 'QUERO' e receba o guia gratuito!

#limpanome #clubezerodividas #creditolimpo #serasa #spc`,pitch_wpp:`Olá! 👋

Você sabia que existe uma forma LEGAL de limpar seu nome sem pagar a dívida abusiva?

O Clube Zero Dívidas usa a Lei 8.078 (Código de Defesa do Consumidor) para quitar suas pendências financeiras!

🚀 Resultado em até 20 dias
💰 Economia média de 60%
✅ 100% seguro e garantido

Quer saber como funciona? É só responder essa mensagem! 👇`,followup:`Oi! Tudo bem? 😊

Lembra que você demonstrou interesse no serviço de limpeza de nome?

Só passando para lembrar que ainda temos vagas disponíveis com condição especial!

Quer que eu explique como funciona? É só me chamar! 🚀`,urgencia:`⚠️ ATENÇÃO: Vagas limitadas!

Essa semana temos uma condição especial para quem quer limpar o nome:

✅ Desconto de 30%
✅ Parcelamento em até 12x
✅ Atendimento prioritário

⏰ Mas corre, são apenas X vagas!

Interessado? Responde aqui que eu te passo os detalhes!`,default:`🔓 O Clube Zero Dívidas é especialista em recuperação de crédito.

Usamos a Lei do Consumidor para limpar seu nome SPC/Serasa em até 20 dias, sem você precisar pagar a dívida abusiva.

Quer saber mais? É só me chamar! 🚀`},c=``;document.addEventListener(`DOMContentLoaded`,()=>{o(`conteudo`),v(),lucide.createIcons();let e=document.getElementById(`custom-prompt`);e&&e.addEventListener(`keypress`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),generateCustom())})});async function l(n,a=null,o=!0){document.getElementById(`gen-output`);let c=document.getElementById(`gen-actions`),l=document.getElementById(`gen-placeholder`);l&&(l.style.display=`none`),o&&d(`user`,n);let p=f();c&&(c.style.display=`none`),u();try{let t=new AbortController;setTimeout(()=>t.abort(),3e3);let r=await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({model:`llama3`,messages:[{role:`system`,content:i},{role:`user`,content:n}],stream:!1}),signal:t.signal});if(r.ok){p.remove(),d(`ai`,(await r.json()).message.content,!0);return}}catch{}let m=t(),h=localStorage.getItem(`czd_ai_model`)||`llama-3.1-8b-instant`;try{let e=await fetch(r,{method:`POST`,headers:{Authorization:`Bearer ${m}`,"Content-Type":`application/json`},body:JSON.stringify({model:h,messages:[{role:`system`,content:i},{role:`user`,content:n}],max_tokens:2048,temperature:.7})});if(e.ok){p.remove(),d(`ai`,(await e.json()).choices[0].message.content,!0);return}}catch{}p.remove(),d(`ai`,s[a]||s.default,!0)}function u(){let e=parseInt(localStorage.getItem(`czd_total_queries`))||0;localStorage.setItem(`czd_total_queries`,e+1),window.updateStats&&window.updateStats(),window.updateMessageCount&&window.updateMessageCount()}function d(e,t,n=!1){let r=document.getElementById(`gen-output`),i=document.getElementById(`gen-actions`),a=document.createElement(`div`);a.className=`bubble ${e}`,e===`user`?a.innerHTML=`<div class="msg-content">${m(t)}</div>`:a.innerHTML=`<div class="msg-content"></div>`,r.appendChild(a),lucide.createIcons(),r.scrollTop=r.scrollHeight,n&&p(a.querySelector(`.msg-content`),t,()=>{i&&(i.style.display=`flex`,i.style.position=`fixed`),window.updateMessageCount&&window.updateMessageCount()})}function f(){let e=document.getElementById(`gen-output`),t=document.createElement(`div`);return t.className=`bubble ai typing`,t.innerHTML=`
        <div class="typing-dots">
            <span></span><span></span><span></span>
        </div>
        <span style="color: var(--text-dim); font-size: 0.85rem;">Processando...</span>
    `,e.appendChild(t),e.scrollTop=e.scrollHeight,t}function p(e,t,n){let r=0,i=Math.max(2,Math.floor(t.length/100)),a=setInterval(()=>{if(r<t.length){e.textContent=t.slice(0,++r);let n=document.getElementById(`gen-output`);n&&(n.scrollTop=n.scrollHeight)}else clearInterval(a),n&&n()},i)}function m(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}window.generate=e=>{c=PROMPTS[e],l(c,e)},window.generateCustom=()=>{let e=document.getElementById(`custom-prompt`);if(!e)return;let t=e.value.trim();t&&(c=t,l(t),e.value=``,e.style.height=`auto`)},window.regenerate=()=>{c&&l(c,null,!1)},window.copyOutput=()=>{let e=document.querySelectorAll(`.bubble.ai .msg-content`);e.length!==0&&navigator.clipboard.writeText(e[e.length-1].textContent).then(()=>y(`📋 Copiado para clipboard!`))},window.clearOutput=()=>{let e=document.getElementById(`gen-output`);if(!e)return;Array.from(e.children).forEach(e=>e.remove());let t=document.createElement(`div`);t.className=`gen-placeholder`,t.id=`gen-placeholder`,t.innerHTML=`
        <i data-lucide="sparkles"></i>
        <p>Selecione uma automação ou envie seu comando personalizado...</p>
    `,e.appendChild(t),lucide.createIcons();let n=document.getElementById(`gen-actions`);n&&(n.style.display=`none`),window.updateMessageCount&&window.updateMessageCount()};var h=JSON.parse(localStorage.getItem(`czd_notes`))||[],g=`Roteiro`,_=`all`;window.selectTag=(e,t)=>{e&&(document.querySelectorAll(`#note-tags-input button`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),g=t)},window.filterByTag=e=>{_=e,v()};function v(e=``){let t=document.getElementById(`notes-grid`),n=document.getElementById(`admin-notes-count`),r=document.getElementById(`filtered-count`),i=document.getElementById(`empty-state`);n&&(n.textContent=h.length);let a=h;if(_===`pinned`?a=h.filter(e=>e.pinned):_!==`all`&&(a=h.filter(e=>e.tag===_)),e&&(a=a.filter(t=>t.text.toLowerCase().includes(e.toLowerCase())||t.tag&&t.tag.toLowerCase().includes(e.toLowerCase()))),a.sort((e,t)=>e.pinned&&!t.pinned?-1:!e.pinned&&t.pinned?1:t.id-e.id),r&&(r.textContent=a.length),!t)return;let o=window.location.pathname.includes(`notes.html`);if(a.length===0){t.innerHTML=``,i&&(i.style.display=`block`);return}i&&(i.style.display=`none`),t.innerHTML=``,a.forEach(e=>{let n=document.createElement(`div`);o?(n.className=`asset-card ${e.pinned?`pinned`:``}`,n.innerHTML=`
                <div class="asset-card-header">
                    <span class="asset-badge">${e.tag||`Roteiro`}</span>
                    ${e.pinned?`<i data-lucide="star" style="width:16px;color:var(--primary)"></i>`:``}
                </div>
                <div class="asset-body">${m(e.text)}</div>
                <div class="asset-card-footer">
                    <span class="asset-date">${new Date(e.id).toLocaleDateString(`pt-BR`)}</span>
                    <div class="asset-actions">
                        <button class="asset-btn pin" onclick="togglePin(${e.id})" title="${e.pinned?`Desafixar`:`Fixar`}">
                            <i data-lucide="${e.pinned?`star-off`:`star`}"></i>
                        </button>
                        <button class="asset-btn" onclick="exportNote(${e.id})" title="Exportar">
                            <i data-lucide="download"></i>
                        </button>
                        <button class="asset-btn" onclick="copyNoteText(${e.id})" title="Copiar">
                            <i data-lucide="copy"></i>
                        </button>
                        <button class="asset-btn danger" onclick="deleteNote(${e.id})" title="Excluir">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>`):(n.className=`note-item ${e.pinned?`pinned`:``}`,n.innerHTML=`
                <span class="note-tag">${e.pinned?`⭐ `:``}${e.tag||`Roteiro`}</span>
                <p class="note-excerpt">${m(e.text)}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                    <button class="btn-ghost" style="font-size: 0.7rem; padding: 4px 8px;" onclick="copyNoteText(${e.id}); event.stopPropagation();">
                        <i data-lucide="copy" style="width:12px"></i>
                    </button>
                </div>`),t.appendChild(n)}),lucide.createIcons(),window.updateStats&&window.updateStats(),window.updateCounts&&window.updateCounts()}window.saveToNotes=()=>{let e=document.querySelectorAll(`.bubble.ai .msg-content`);if(e.length===0)return y(`Nenhum conteúdo para salvar`);let t=e[e.length-1].textContent.trim();t&&(h.unshift({id:Date.now(),text:t,tag:g,pinned:!1}),localStorage.setItem(`czd_notes`,JSON.stringify(h)),v(),y(`💾 Injetado no Banco de Ativos!`))},window.saveNote=()=>{let e=document.getElementById(`note-input`);if(!e||!e.value.trim())return y(`Digite algo para salvar`);h.unshift({id:Date.now(),text:e.value.trim(),tag:g,pinned:!1}),localStorage.setItem(`czd_notes`,JSON.stringify(h)),e.value=``,document.getElementById(`editor-stats`)&&(document.getElementById(`editor-stats`).textContent=`0 caracteres`,document.getElementById(`word-count`).textContent=`0 palavras`),v(),y(`📝 Conteúdo salvo na biblioteca!`)},window.togglePin=e=>{let t=h.find(t=>t.id===e);t&&(t.pinned=!t.pinned),localStorage.setItem(`czd_notes`,JSON.stringify(h)),v(),y(t.pinned?`⭐ Marcado como VIP`:`⭐ Removido dos VIPs`)},window.filterNotes=()=>{v(document.getElementById(`note-search`)?.value||``)},window.exportNote=e=>{let t=h.find(t=>t.id===e);if(!t)return;let n=`[${t.tag}] - ${new Date(t.id).toLocaleString(`pt-BR`)}\n\n${t.text}`,r=new Blob([n],{type:`text/plain`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`ativo_${t.tag||`nota`}_${e}.txt`,a.click(),y(`📂 Arquivo exportado!`)},window.exportAllNotes=()=>{if(h.length===0)return y(`Nenhum ativo para exportar`);let e=`ZERO MARKETING - BACKUP COMPLETO
`;e+=`=====================================

`,e+=`Exportado em: ${new Date().toLocaleString(`pt-BR`)}\n`,e+=`Total de ativos: ${h.length}\n\n`,e+=`=====================================

`,h.forEach((t,n)=>{e+=`[${n+1}] [${t.tag||`Sem tag`}] ${t.pinned?`⭐ `:``}${new Date(t.id).toLocaleString(`pt-BR`)}\n`,e+=`-`.repeat(50)+`
`,e+=t.text+`

`});let t=new Blob([e],{type:`text/plain`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`backup_marketing_${Date.now()}.txt`,r.click(),y(`📂 Backup completo exportado!`)},window.deleteNote=e=>{h=h.filter(t=>t.id!==e),localStorage.setItem(`czd_notes`,JSON.stringify(h)),v(),y(`🗑️ Ativo removido`)},window.copyNoteText=e=>{let t=h.find(t=>t.id===e);t&&navigator.clipboard.writeText(t.text).then(()=>y(`📋 Copiado!`))},window.confirmClearAll=()=>{confirm(`Tem certeza que deseja remover TODOS os ativos?`)&&(h=[],localStorage.setItem(`czd_notes`,JSON.stringify(h)),v(),y(`🗑️ Todos os ativos foram removidos`))},window.clearAllNotes=()=>{h=[],localStorage.setItem(`czd_notes`,JSON.stringify(h)),v(),window.closeConfirmModal&&window.closeConfirmModal(),y(`🗑️ Banco de ativos limpo`)};function y(e){let t=document.getElementById(`toast`);t&&(t.textContent=e,t.classList.add(`show`),setTimeout(()=>t.classList.remove(`show`),3e3))}window.showToast=y}));n(),r();