--Criação db

CREATE DATABASE users;

--Criação de tabela

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(45) NOT NULL,
    name VARCHAR(45),
    tel VARCHAR(45),
    codx INT,
    cody INT
);

--Inserção de novo usuário

INSERT INTO users (email, name, tel, codx, cody) 
VALUES ('novoemail@example.com', 'NovoUsuário', '123456789', 42, 99);

--Deleção baseada no id

DELETE FROM users WHERE id = 4;

--busca de todos os usuários em users

SELECT * FROM users;

--busca de usuário por id

SELECT * FROM users WHERE id = 4;


