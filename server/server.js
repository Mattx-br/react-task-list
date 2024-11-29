// ===============<>===============<>===============<>===============
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// =====Para rodar o server, digite no terminal: node server.js======
//                  Também estamos usando mongoDB:
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Acessando o prisma studio:
// > npx prisma studio

// Ligando o server node:
// > node --watch server.js

// ===============<>===============<>===============<>===============

/*
    1) tipo de rota / Método HTTP (GET | PUT | PATCH | PUSH | DELETE)
        // app.get('/task') // Traz todos os itens
        // app.post('/task') // cria um novo item
        // app.delete('/task') // deleta um item
        // app.put('/task') // altera/edita um item
    2) Endereço (nome_do_site.com/pagina_1) Nesse caso, o pagina_1 é o endereço



// Documentação: https://expressjs.com/pt-br/
// baixar thunder client no vscode na aba de extensions para analisar as requisições HTTP



    Objetivo: Criar uma API para as tasks
    
    > Criar uma task
    > Listar as tasks
    > Editar task
    > deletar task


    para rodar o server sem ter que fechar e abrir pra atualizar quando o codigo mudar, no terminal:
    node --watch server.js

    no site do mongoDB: https://cloud.mongodb.com
    após criar a conta free, e criar o cluster
    ir em Security > Network Access, ir no IP address > edit > ALLOW ACCESS FROM ANYWHERE
    

    Para conectar o código ao banco, usaremos a biblioteca prisma: https://www.prisma.io
    tutorial: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-node-mongodb

    no cmd, digitar
    > npm install prisma --save-dev
    > npx prisma init

    após configurar se baseando no link: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb/creating-the-prisma-schema-typescript-mongodb
    digitar no terminal:
    > npx prisma db push
    > npm install @prisma/client

    Para ver uma UI do banco
    > npx prisma studio
*/

import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

// Criando nova task CREATE
app.post("/task", async (req, res) => {
    // imprimindo no console só para fins de teste
    console.log(req.body);

    // Inserindo dados no banco
    await prisma.task.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            isCompleted: req.body.isCompleted,
        },
    });

    // Mensagem de resposta do status
    res.status(201).send(req.body); // 201 para avisar que CRIOU com sucesso
});

// listando tasks RESEARCH
app.get("/task", async (req, res) => {
    // res.send("Ok, Deu bom");
    let tasks = [];
    const isCompleted =
        req.query.isCompleted === "true" || req.query.isCompleted === "1"; // Verifica explicitamente "true"
    console.log(isCompleted); // true ou false

    if (req.query) {
        tasks = await prisma.task.findMany({
            where: {
                title: req.query.title,
                description: req.query.description,
                isCompleted: isCompleted,
            },
        });
    } else {
        tasks = await prisma.task.findMany();
    }

    // pegando todas as tasks do banco e inserindo na variavel/const tasks
    res.status(200).json(tasks); // 200 para avisar que LISTOU com sucesso
});

// Alterando uma task UPDATE
app.put("/task/:id", async (req, res) => {
    // imprimindo no console só para fins de teste
    // console.log(req);

    // Inserindo dados no banco
    await prisma.task.update({
        where: {
            id: req.params.id,
        },
        data: {
            title: req.body.title,
            description: req.body.description,
            isCompleted: req.body.isCompleted,
        },
    });

    // Mensagem de resposta do status
    res.status(201).send(req.body); // 201 para avisar que CRIOU com sucesso
});

// DELETE
app.delete("/task/:id", async (req, res) => {
    await prisma.task.delete({
        where: {
            id: req.params.id,
        },
    });

    res.status(200).json({ message: "Task DELETED successfully" }); // avisando que deletou com sucesso
});

app.listen(3000);
