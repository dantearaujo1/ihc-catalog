[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
# IHC-CATALOG

## Projeto
O catálogo de Instrumentos de Avaliação de Experiência do usuário é um projeto
para conclusão da cadeira de Interação Humano Computador (IHC) do curso de Sistemas e
Midias Digitais (SMD) da Universidade Federal do Ceará.

O catálogo será uma Aplicação Web com intuito de catalogar e filtrar
Instrumentos de Avaliação UX permitindo que o usuário tenha um local que
centralize essas informações e evite ter que ir de site em site buscando por
meios de avaliar a experiência do usuário.


## Dados

* Cliente:
    * Ticianne Darin
* Produto:
    *  Ferramenta que disponibilize para o usuário um conjunto de instrumentos de avaliação e redirecione para o link de acesso a esses instrumentos. Tal ferramenta deve ser capaz de gerenciar esses instrumentos.
* Prazo:
* Equipe | Dante Araújo | Drielle Furtado | Luis Eduardo | Manoel Costa | Maxwell de Sousa |
* Ferramentas
    * Ferramentas de Gerenciamento:

        [![Trello](https://img.shields.io/badge/Trello-0052CC.svg?style=for-the-badge&logo=Trello&logoColor=white)](https://trello.com)
        [![Github](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com)

    * Ferramentas de Prototipação e Design: Figma, Miro, Canva.

        [![Miro](https://img.shields.io/badge/Miro-050038.svg?style=for-the-badge&logo=Miro&logoColor=white)](https://miro.com)
        [![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)](https://figma.com)
        [![Canva](https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white)](https://canva.com)

    * Ferramentas de Desenvolvimento:
        * Editores de Texto:

            [![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?style=for-the-badge&logo=Visual-Studio-Code&logoColor=white)](https://code.visualstudio.com/)
            [![Neovim](https://img.shields.io/badge/Neovim-57A143.svg?style=for-the-badge&logo=Neovim&logoColor=white)](https://neovim.com/)

        * Banco de Dados:

            [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

        * Frameworks:

            ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
            ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
            ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

            * Packages

                * Package Manager:    ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

                * Components: ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

                * Routes: ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

                * Build Tool: ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)<BS>



## Requisistos Funcionais

### Acompanhe o andamento da nossa aplicação

|  Código                           |  Descrição                                                              |  Codificação    | Status    |
|  ----------------------------     |  --------------------------                                             |  ---------      | --------- |
|  RF001                            |  Autenticação(admin)                                                    |  [código]()     | Concluído
|  RF002                            |  Sugestão de novos instrumentos(usuário)                                |  [código]()     | Iniciado
|  RF003                            |  Filtragem de conteúdos por categorias(usuário)                         |  [código]()     | Iniciado
|  RF004                            |  Ferramenta de busca por palavras chaves(usuário)                       |  [código]()     | Concluído
|  RF005                            |  Aprovar sugestões(admin)                                               |  [código]()     | Não iniciado
|  RF006                            |  Reprovar sugestões(admin)                                              |  [código]()     | Não iniciado
|  RF007                            |  Visualizar instrumentos aprovados ou reprovados(admin)                 |  [código]()     | Não iniciado
|  RF008                            |  Adição de subcategorias(admin)                                         |  [código]()     | Não iniciado
|  RF009                            |  Remoção de subcategorias(admin)                                        |  [código]()     | Não iniciado
|  RF010                            |  Edição de subcategorias(admin)                                         |  [código]()     | Não iniciado
|  RF011                            |  Mostrar lista de resultados na busca(usuário)                          |  [código]()     | Concluído
|  RF012                            |  Mostrar formulário de sugestão(usuário)                                |  [código]()     | Concluído
|  RF013                            |  Mostrar lista de resultados filtrados(usuário)                         |  [código]()     | Concluído
|  RF014                            |  Pesquisar por categorias específicas(usuário)                          |  [código]()     | Concluído
|  RF015                            |  Mostrar subcategorias da pesquisa por categorias(usuário)              |  [código]()     | Concluído

### Instruções


1. Clone o projeto em uma pasta de sua preferência.
2. Acesse a branch develop, é nela que encontram-se os arquivos necessários para rodar a aplicação

```git
git clone https://github.com/dantearaujo1/ihc-catalog && cd ihc-catalog
git checkout develop
```

2. Existem três maneiras para rodar a aplicação

##### Usando Batch Script da pasta dist (FORMA MAIS FÁCIL)

* Entre na pasta dist e execute o arquivo runWindows.bat, ele irá se
encarregar de executar os comandos e rodar os servidores.

##### Usando Docker

> **Será preciso ter o Docker instalado no seu computador**
* Primeiro, crie um build da imagem docker a partir do Dockerfile do repositório.

```bash
docker build -t ihc .
```

* Depois dê inicio ao seu container docker com o seguinte comando:

```bash
docker run -dp 5173:5173 ihc
```

* Basta acessar a aplicação

 &ensp; &ensp; &ensp; [Acesse a aplicação aqui](http://localhost:5173)

##### Usando Node Package Manager (NPM)

> **Tenha instalado a versão 18.11.0 ou superior do NodeJS**

* Entre na sua pasta raiz da pasta clonada e digite o seguinte comando:

```NodeJS
npm install
```

* Espere a instalação terminar e poderá rodá-la com o seguinte comando:

```NodeJS
npm run dev
```
* Basta acessar sua aplicação

 &ensp; &ensp; &ensp; [Acesse a aplicação aqui](http://localhost:5173)


### Estrutura de Pastas

```bash.
.
|-- .dockerignore
|-- .gitignore
|-- Dockerfile
|-- README.md
|-- backend
|   |-- .env
|   |-- app.js
|   |-- articleXsub.json
|   |-- controllers
|   |   |-- articleController.js
|   |   |-- categoryController.js
|   |   `-- userController.js
|   |-- dataa.json
|   |-- models
|   |   |-- Article.js
|   |   |-- Category.js
|   |   |-- Group.js
|   |   `-- User.js
|   |-- package-lock.json
|   |-- package.json
|   |-- routes
|   |   |-- articleRoutes.js
|   |   |-- categoryRoutes.js
|   |   `-- loginRoutes.js
|   |-- sanitized_data.json
|   `-- scratch.js
|-- frontend
|   |-- index.html
|   |-- package-lock.json
|   |-- package.json
|   |-- public
|   |   `-- vite.svg
|   |-- src
|   |   |-- App.css
|   |   |-- App.jsx
|   |   |-- assets
|   |   |   |-- ComponentStyle.jsx
|   |   |   |-- react.svg
|   |   |   `-- themes.jsx
|   |   |-- components
|   |   |   |-- ArticleCard.jsx
|   |   |   |-- Filter
|   |   |   |   `-- TagSelect.jsx
|   |   |   |-- GroupBadge.jsx
|   |   |   |-- Modals
|   |   |   |   `-- InstrumentAdd.jsx
|   |   |   `-- Navigation
|   |   |       |-- InstrumentManager.jsx
|   |   |       |-- NavigationBar.jsx
|   |   |       |-- NavigationHeader.jsx
|   |   |       `-- SuggestionList.jsx
|   |   |-- index.css
|   |   |-- main.jsx
|   |   `-- routes
|   |       |-- Admin.jsx
|   |       |-- Home.jsx
|   |       |-- InstrumentDetail.jsx
|   |       |-- Login.jsx
|   |       |-- ResultList.jsx
|   |       `-- routes.jsx
|   `-- vite.config.js
|-- logs
|-- package-lock.json
|-- package.json
|-- scrathfile.json
`-- todo.norg

```

