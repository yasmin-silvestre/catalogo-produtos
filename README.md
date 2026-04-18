# 🛒 Catálogo de Produtos



Bem-vindo ao repositório do Catálogo de Produtos! Este projeto é uma aplicação E-commerce desenvolvida em **React**, focada em boas práticas de arquitetura, separação de responsabilidades e uma experiência de usuário (UX) fluida.



---



## 🏗️ Arquitetura do Projeto

O projeto utiliza uma arquitetura baseada em camadas para facilitar a manutenção:



* **`src/services/`**: Camada de dados. Centraliza as chamadas à API (FakeStoreAPI). Se a URL da API mudar, alteramos apenas um arquivo.

* **`src/hooks/`**: Lógica de negócio isolada. Usamos Custom Hooks para gerenciar estados de carregamento, erros e busca de dados, deixando as páginas mais "limpas".

* **`src/contexts/`**: Gerenciamento de estado global com Context API para o Carrinho de Compras.

* **`src/components/`**: Unidades de interface reutilizáveis (Header, Cards, Sidebar, Spinner).

* **`src/pages/`**: Páginas principais que orquestram os componentes (Home, Details, Cart).

* **`src/styles/`**: Centralização de estilos globais e variáveis CSS.



---



## ✨ Funcionalidades Principais



### 📦 Persistência de Dados

Implementação de **LocalStorage** no `CartContext`. Agora, ao adicionar produtos ao carrinho e atualizar a página (Refresh), seus itens continuam lá.



### 🔍 Filtro por Categorias

Sidebar interativa que consome dinamicamente as categorias da API, permitindo filtrar a listagem de produtos em tempo real.



### 📱 UX & Design Responsivo

* **Liquid Buttons**: Botões personalizados com efeitos de vidro (Glassmorphism) e feedback visual ao passar o mouse.

* **Tratamento de Texto**: Títulos longos de produtos são tratados com `word-break` e `flex-wrap` para evitar quebras de layout em telas menores.

* **Feedbacks Visuais**: Spinner de carregamento e estados de erro amigáveis ao usuário.



---



## 🛠️ Tecnologias

* [React](https://reactjs.org/) - Biblioteca principal.

* [Vite](https://vitejs.dev/) - Ferramenta de build e desenvolvimento ultra-rápida.

* [React Router Dom](https://reactrouter.com/) - Gerenciamento de rotas e navegação.

* [Context API](https://reactjs.org/docs/context.html) - Estado global para o carrinho.
