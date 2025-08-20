# TaskMaster - Gerenciador de Tarefas Colaborativo

![Badge de Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Um gerenciador de tarefas full-stack construído com Node.js no backend e React no frontend. Permite que usuários se cadastrem, façam login e gerenciem suas próprias listas de tarefas de forma segura.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

| Categoria | Tecnologia |
|-----------|------------|
| **Backend** | Node.js, Express, Prisma, SQLite |
| **Frontend**| React, Vite, Tailwind CSS |
| **Autenticação** | JWT (JSON Web Tokens), bcrypt |

---


## 📂 Estrutura inicial do projeto

```
meu-projeto/
├─ backend/
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ routes/
│  │  └─ middlewares/
│  ├─ prisma/
│  ├─ index.js
│  └─ .env
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ main.jsx
│  ├─ index.css
│  └─ vite.config.js
├─ .gitignore
└─ README.md
```
---

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/en/) (que já vem com o npm)
* [Git](https://git-scm.com/)

---

## ⚙️ Começando: Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente.

1.  **Clone o repositório:**
    ```bash
    git clone https://SEU_LINK_DO_REPOSITORIO_AQUI
    cd nome-do-projeto
    ```

2.  **Configuração do Backend:**
    ```bash
    # Navegue até a pasta do backend
    cd backend

    # Instale as dependências
    npm install

    # Crie um arquivo .env a partir do exemplo
    cp .env.example .env
    ```
    > ⚠️ **Importante:** Abra o arquivo `.env` recém-criado e substitua o valor de `JWT_SECRET` por uma chave secreta de sua preferência.

    ```bash
    # Rode as migrações do banco de dados para criar as tabelas
    npx prisma migrate dev

    # Inicie o servidor do backend
    node index.js
    ```
    > O backend estará rodando em `http://localhost:5000`.

3.  **Configuração do Frontend:**
    > Abra um **novo terminal** para rodar o frontend.
    ```bash
    # Navegue até a pasta do frontend
    cd frontend

    # Instale as dependências
    npm install

    # Inicie o servidor de desenvolvimento
    npm run dev
    ```
    > A aplicação estará disponível em `http://localhost:5173` (ou a porta indicada no terminal).

---

## ✨ Funcionalidades

* ✅ Autenticação de usuários com JWT (Registro e Login).
* ✅ Criação, Leitura, Atualização e Deleção (CRUD) de tarefas.
* ✅ Cada usuário só pode acessar suas próprias tarefas.
* ✅ Interface responsiva com tema claro e escuro (Dark Mode).


## 📸 Screenshots

Aqui estão algumas telas que demonstram a aplicação em funcionamento.

![Tela de Cadastro](https://github.com/user-attachments/assets/b4b21f8b-9476-43d8-946e-62380d96ab77)
*Tela de registro de novo usário.*

![Tela de Login](https://github.com/user-attachments/assets/4bc3a9b9-4f5f-4feb-a839-a52d96f139ee)
*Tela de autenticação.*

![Tela de Tarefas](https://github.com/user-attachments/assets/fc5210ec-f29a-43b1-b552-bf02c3d0a641)
*Visão principal do gerenciador de tarefas.*

![Tela de Tarefas Dark Mode](https://github.com/user-attachments/assets/ab3a46ad-1d8b-459e-9a96-745779235172)
*Visão principal do gerenciador de tarefas no modo escuro.*

![Tela de Tarefas Mobile](https://github.com/user-attachments/assets/10050b7a-ee31-4610-a21a-70e1b81624f6)
*Visão principal do gerenciador de tarefas em aparelho móvel.*

---

## 🔗 Deploy

O projeto será hospedado e estará disponível para acesso público em breve.

* **Frontend (Vercel):** `(Link virá aqui)`
* **Backend (Render):** `(Link virá aqui)`