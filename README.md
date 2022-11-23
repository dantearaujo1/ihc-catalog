# IHC-CATALOG

## TIHCI This is Human Computer Interaction
Web Application Catalog for IHC Avaliation Instruments with additional features. Project for Human-Computer Interaction (IHC) course of  Digital Media Systems (SMD)  program at Universidade Federal do Ceará (UFC)

### Initial Plan:

* Create a web application that is capable of filter a set of combinations of caracteristics of an Instrument and show to the user a list with compatibles instruments;
* Create a system of suggestion for the user send to the admin know what instruments are missing;

***


#### Instructions

1. Git clone this project into a directory of your preference.
2. For now we only have files inside develop branch

```git
git clone https://github.com/dantearaujo1/ihc-catalog && cd ihc-catalog
git checkout develop

```

2. Follow one of the following options

##### Using Docker

> **You will have to have Docker installed in you machine**
* First you need to build a docker image from the Dockerfile

```bash
docker build -t ihc-tihci .
```

* Then you need to start docker container with:

```bash
docker run -dp 3000:5173 ihc-tihci
```

* Go to you we browser and see the application running at:

 &ensp; &ensp; &ensp; [TIHCI - Web Application](http://localhost:3000)

##### Using NPM

> **Ensure you have NodeJS version 18.11.0 or above**

* Enter your cloned directory and run the command:

```NodeJS
npm install
```
* Go to you we browser and see the application running at:

 &ensp; &ensp; &ensp; [TIHCI - Web Application](http://localhost:5173)
=======
```

* Wait for the installation end and after that run the commnd:

```NodeJS
npm run dev
```

* Go to you we browser and see the application running at:

 &ensp; &ensp; &ensp; [TIHCI - Web Application](http://localhost:5173)

***

### Folder Structure

```bash.
|-- .dockerignore
|-- .gitignore
|-- Dockerfile
|-- README.md
|-- backend
|   |-- app.js
|   |-- controllers
|   |   `-- userController.js
|   |-- dataa.json
|   |-- models
|   |   |-- Article.js
|   |   |-- Groups.js
|   |   `-- User.js
|   |-- package-lock.json
|   |-- package.json
|   `-- routes
|       |-- articleRoutes.js
|       `-- loginRoutes.js
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
|   |   |   `-- react.svg
|   |   |-- components
|   |   |   |-- Filter
|   |   |   |   `-- TagSelect.jsx
|   |   |   |-- Modals
|   |   |   |   `-- InstrumentAdd.jsx
|   |   |   `-- Navigation
|   |   |       |-- InstrumentManager.jsx
|   |   |       |-- NavigationBar.jsx
|   |   |       |-- NavigationHeader.css
|   |   |       |-- NavigationHeader.jsx
|   |   |       `-- SuggestionList.jsx
|   |   |-- index.css
|   |   |-- main.jsx
|   |   `-- routes
|   |       |-- Admin.jsx
|   |       |-- Home.jsx
|   |       |-- Login.jsx
|   |       `-- routes.jsx
|   `-- vite.config.js
|-- package-lock.json
|-- package.json
`-- todo.norg

```

## Requisitos funcionais

|  Código                           |  Descrição                    |  Codificação  | Status | 
|  ----------------------------   |  --------------------------|  ---------  | --------- |
|  RF001     |  Autenticação(admin)              |  [código]()     | Concluído
|  RF002     |  Sugestão de novos instrumentos(usuário)              |  [código]()     | Concluído
|  RF003     |  Filtragem de conteúdos por categorias(usuário)              |  [código]()     | Iniciado
|  RF004     |  Ferramenta de busca por palavras chaves(usuário)              |  [código]()     | Concluído
|  RF005     |  Aprovar sugestões(admin)              |  [código]()     | Não iniciado
|  RF006     |  Reprovar sugestões(admin)              |  [código]()     | Não iniciado
|  RF007     |  Visualizar instrumentos aprovados ou reprovados(admin)              |  [código]()     | Não iniciado
|  RF008     |  Adição de subcategorias(admin)              |  [código]()     | Não iniciado
|  RF009     |  Remoção de subcategorias(admin)              |  [código]()     | Não iniciado
|  RF010     |  Edição de subcategorias(admin)              |  [código]()     | Não iniciado
|  RF011     |  Mostrar lista de resultados na busca(usuário)              |  [código]()     | Concluído
|  RF012     |  Mostrar formulário de sugestão(usuário)              |  [código]()     | Concluído
|  RF013     |  Mostrar lista de resultados filtrados(usuário)              |  [código]()     | Concluído
|  RF014     |  Pesquisar por categorias específicas(usuário)              |  [código]()     | Concluído
|  RF015     |  Mostrar subcategorias da pesquisa por categorias(usuário)              |  [código]()     | Concluído


***
