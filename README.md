# Zero Marketing HQ

Painel de automação de marketing com IA para o Clube Zero Dívidas.

## Funcionalidades

- Assistente de IA para criar roteiros, copies e posts
- Múltiplos provedores: Groq Cloud, DeepSeek
- Templates de conteúdo, vendas e estratégia
- Estatísticas em tempo real
- Interface moderna dark theme

## Como Usar

1. **Configurar API:**
   - Groq: Obtenha chave em [console.groq.com/keys](https://console.groq.com/keys)
   - DeepSeek: Obtenha chave em [platform.deepseek.com](https://platform.deepseek.com)

2. **Deploy no GitHub Pages:**
   ```bash
   npm run build
   ```
   Vá em Settings > Pages > Source: `main` branch `/docs` folder

3. **Rodar localmente:**
   ```bash
   npm run dev
   ```

## Importante (CORS)

Chamadas diretas de API pelo navegador podem falhar no GitHub Pages devido a CORS.
Soluções:
1. Use uma extensão CORS browser
2. Ou rode localmente (`npm run dev`)
3. Para produção, considere um proxy server

## Estrutura

```
├── index.html    # Dashboard principal
├── chat.html    # Chat imersivo
├── main.js      # Lógica (module)
├── style.css    # Estilos
├── docs/        # Build output (GitHub Pages)
└── dist/        # Build output (preview)
```