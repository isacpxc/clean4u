# GUIA

## React (client)

Obs: realize as instruções a seguir dentro do diretório client

**Instale** o Node.js e o npm:
Primeiro, certifique-se de ter o Node.js instalado em sua máquina. O Node.js é uma plataforma que permite executar JavaScript no servidor ou localmente. Ele também inclui o npm (Node Package Manager), que é usado para gerenciar pacotes e dependências.


**Instale** as Dependências:
Entre na pasta do projeto clonado:
```
cd clean4u
cd client
```
Execute o seguinte comando para instalar as dependências do projeto:
```
npm install
```

Inicie o Projeto:
Após a instalação das dependências, execute o seguinte comando para iniciar o servidor de desenvolvimento:
```
npm start
```



## Node (server)

leia  o tópico mySQL antes de prosseguir:

Obs: realize as instruções a seguir dentro do diretório server

**Instale** o Node.js e o npm:
Primeiro, verifique se você tem o Node.js instalado em sua máquina. O Node.js é uma plataforma que permite executar JavaScript no servidor ou localmente. Ele também inclui o npm (Node Package Manager), que é usado para gerenciar pacotes e dependências.

**Instale** as Dependências:
Entre na pasta do projeto clonado:
```
cd clean4u
cd server
```

Execute o seguinte comando para instalar as dependências do projeto:
```
npm install
```

Agora execute
```
node server.js
```

## mySQL

Após realizar a instalação do mySQL, vá em server/db/connection.js e faça as alterações necessários em 

```
const sequelizeOptions = {
  dialect: 'mysql',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: '3306',
  database: 'users',
  logging: false
};
```
alterando ``` username: 'root'``` para o seu próprio configurado na instalação do mySQL, assim como ```password``` 

pelo terminal execute ```mysql -u root -p``` digite sua senha, agora está conectado como root.

a seguir rode o comando ```CREATE DATABASE users;```

pronto agora já temos o banco de dados que será ultilizado no projeto.


## Outros

<font color="red">Devido a problemas com postgreSQL, o projeto foi feito com mySQL, ultilizando sequelize. todos os comandos ultilizados no sequelize estão no arquivo commands.sql na raiz do projeto.</font>

O algoritimo de força bruta do caixeiro viajante foi ultilizado para resolver os problema das rotas.

Para que o projeto funcione corretamente é preciso que a aplicação react e a aplicação node estejam rodando ao mesmo tempo.

o DDL da tabela está no diretório ```/ddl``` na raiz

as versões das dependências estão dentro de package.json

node - ```Latest Current Version: 21.7.0 (includes npm 10.5.0)```

mySQL - ```MySQL Server 8.0```

Há alguns comentários explicando o algoritmo do caixeiro viajante em ```server.js```



