### 🏁 Fase 1: Backend & Infraestrutura (A Fundação)

- [x]  **Migração/Resolução do Banco de Dados**
    - *Ação:* Criar instância no **Neon.tech** ou **Supabase** (já que o Render expirou).
    - *Ação:* Rodar as migrations/scripts SQL para recriar as tabelas (`users`, `books`, `authors`, `loans`).
- [x]  **Configuração de Segurança (CORS)**
    - *Ação:* Instalar/Configurar o pacote `cors` no backend.
    - *Regra:* Permitir origens: `http://localhost:5173` (Vite padrão) e `https://seu-front-na-vercel.app`.
- [x]  **Re-deploy na Vercel**
    - *Ação:* Atualizar as Variáveis de Ambiente na Vercel (`DATABASE_URL`, `JWT_SECRET`).
    - *Teste:* Testar uma rota simples (ex: `/health` ou `/api`) pelo navegador para ver se o back está respondendo.

---

### 🛠 Fase 2: Setup do Frontend (O Esqueleto)

*Configuração inicial para não ter dor de cabeça com pastas bagunçadas depois.*

- [x]  **Inicialização do Projeto**
    - *Comando:* `npm create vite@latest nome-do-app -- --template react` (ou react-ts).
- [x]  **Instalação de Dependências Essenciais**
    - *Rotas:* `npm install react-router-dom`
    - *Requisições:* `npm install axios`
    - *Estilização:* `npm install tailwindcss postcss autoprefixer` (ou biblioteca de UI de preferência).
    - *Ícones:* `npm install lucide-react` (ou `react-icons`).
    - *Feedback:* `npm install react-toastify` (para alertas de sucesso/erro).
- [x]  **Arquitetura de Pastas**
    - Criar pastas: `/services` (api.js), `/contexts` (AuthContext), `/pages`, `/components`, `/hooks`.
- [x]  **Configuração do Axios**
    - Criar instância com `baseURL` dinâmica (ler de `.env`).

---

### 🔐 Fase 3: Autenticação & Rotas (O Porteiro)

*Garantir que usuários comuns não entrem na área de admin.*

- [ ]  **Contexto de Autenticação (AuthContext)**
    - Lógica para salvar Token no `localStorage`.
    - Função `logout()` que limpa o storage e redireciona.
- [ ]  **Página de Login**
    - Layout centralizado.
    - Feedback visual de "Carregando..." enquanto espera a API.
    - Tratamento de erro (ex: "Senha incorreta").
- [ ]  **Página de Cadastro (Sign Up)**
    - Formulário para criar novo usuário (Nome, Email, Senha).
    - Validação básica (senha mínima, email válido).
- [ ]  **Proteção de Rotas (PrivateRoutes)**
    - Componente que verifica: Tem token? O token é válido?
    - Lógica de Redirecionamento: Admin vai para `/admin`, User vai para `/home`.

---

### 👔 Fase 4: Módulo Administrador (Backoffice)

*Foco em produtividade e gestão de dados.*

- [ ]  **Layout Admin**
    - **Sidebar Lateral:** Menu fixo com links (Dashboard, Livros, Autores, Empréstimos).
    - Botão de Logout visível.
- [ ]  **Gestão de Livros (CRUD)**
    - **Listagem:** Tabela com ID, Título, Autor, Estoque e Status.
    - **Adicionar/Editar:** Modal ou Página com formulário (Título, Select de Autor, Qtd Estoque, Capa URL).
    - **Excluir:** Botão com confirmação ("Tem certeza?").
- [ ]  **Gestão de Autores (CRUD)**
    - Tabela simples com Nome do Autor.
    - Adicionar/Remover autores (necessário para popular o select de livros).
- [ ]  **Gestão de Empréstimos**
    - **Painel de Controle:** Ver quem pegou qual livro.
    - **Ação de Devolução:** Botão "Dar Baixa" que chama a API para devolver o livro e aumentar o estoque.
    - **Filtros visuais:** Destacar em vermelho quem está atrasado.

---

### 🏠 Fase 5: Módulo Usuário (Vitrine)

*Foco na experiência de descoberta e facilidade de uso.*

- [ ]  **Navbar do Usuário**
    - Logo, Campo de Busca (Search Input), Link "Meus Livros", Avatar/Logout.
- [ ]  **Home / Catálogo (Landing Page Logada)**
    - **Grid de Cards:** Exibir os livros de forma visual (Capa + Título).
    - **Lógica de Disponibilidade:**
        - Se `estoque > 0` → Botão "Alugar" (Verde/Azul).
        - Se `estoque == 0` → Botão "Indisponível" (Cinza/Desabilitado).
        - Se `usuario_ja_tem_esse_livro` → Botão "Devolver" (Opcional, ou apenas informativo).
- [ ]  **Componente: Card de Livro**
    - Imagem (lidar com falha de imagem/placeholder).
    - Título truncado (para não quebrar o layout).
    - Nome do Autor.
- [ ]  **Ação de Empréstimo**
    - Ao clicar em "Alugar":
        1. Mostrar Loading.
        2. Chamar API.
        3. Exibir Toast de Sucesso ("Boa leitura!").
        4. Atualizar o contador de estoque localmente sem recarregar a página.
