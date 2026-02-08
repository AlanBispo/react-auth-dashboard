# React Auth Dashboard

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/Material--UI-Component_Lib-007FFF?style=for-the-badge&logo=mui&logoColor=white)

Uma dashboard administrativa moderna para gerenciamento de usuários, com foco em segurança e experiência do usuário (UX). Este projeto consome a [Flask Auth API](https://github.com/AlanBispo/flask-auth-api).

## 🚀 Tecnologias

- **Core:** React.js + Vite
- **UI Framework:** Material UI (MUI)
- **HTTP Client:** Axios
- **Roteamento:** React Router Dom
- **Feedback:** React Toastify

## ✨ Funcionalidades

- 🎨 **Interface Moderna:** Layout responsivo com Material UI.
- 🔐 **Autenticação Segura:** Login persistente e proteção de rotas privadas.
- 🔄 **Silent Refresh (Axios Interceptors):** Renovação automática do token JWT quando ele expira, sem deslogar o usuário (UX transparente).
- 📝 **Gerenciamento de Usuários:** Listagem, Edição e Exclusão com feedback visual (Toasts).
- ⚡ **Performance:** Build otimizado com Vite.

## ⚙️ Como Rodar

1. Clone o repositório para sua máquina.
2. Instale as dependências:
   ```
    npm install
    # ou
    yarn install
   ```
3. Crie um arquivo .env na raiz (adpte a porta do seu back-end):
   `VITE_API_BASE_URL=http://localhost:5001`

Acesse em http://localhost:5173

## 🧠 Destaque Técnico: Axios Interceptor
Este projeto implementa um padrão de interceptação de requisições. Se a API retornar erro 401 Unauthorized, o sistema automaticamente:

- Pausa as requisições.
- Usa o refresh_token para solicitar um novo acesso.
- Atualiza o cabeçalho de autorização.
- Refaz a requisição original falha.
- Tudo isso acontece sem que o usuário perceba ou precise fazer login novamente.

## 🤝 Back-end
A API necessária para rodar este projeto está aqui: [Flask Auth API](https://github.com/AlanBispo/flask-auth-api).
