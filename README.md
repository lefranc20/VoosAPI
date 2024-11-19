Uma API para o gerenciamento de vôos de avião.

# Compilação e Execução
## Back-End

Compilação no Windows:
`mvn clean install`

Compilação no Linux:
`./mvnw clean package`

Se algum problema persistir, re-execute com mais detalhes de log para analisar melhor:
./mvnw clean package -e -X


Execute o back-end desta maneira
java -jar target/voos_api-0.0.1-SNAPSHOT.jar

### MySQL

#### No Windows
Utilize o Workbench.

#### No Linux
Utilizando o mysql server abaixo.

Alteração de senha no mysql-server
`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'senhaaqui';`
`FLUSH PRIVILEGES;`

Entrar no mysql-server:
`mysql -u root -p`

A criação do banco de dados:
`CREATE DATABASE voos_api;`

Para a utilização:
`USE voos_api`

Exibe as tabelas:
`SHOW TABLES;`

Selecionando um dado na tabela pelo id:
`SELECT * FROM voo WHERE id = 1; `

ou exibindo todos:

SELECT * FROM voo;

## Front-End
npm install
npm start