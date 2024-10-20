const express = require("express");
const app = express();
const port = 3000;

let users = [];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de crud com Node.js e Express");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.post("/users", (req, res) => {
    const user = req.body;
    user.id = Date.now();
    users.push(user);
    res.status(201).json({message: "Usuario criado com sucesso", user});
})

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id); 
    const user = users.find(u => u.id === id); 

    if (user) {
        res.json(user); 
    } else {
        res.status(404).json({message: "Usuario não encontrado"}); 
    }
});

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.find(u => u.id === id);

    if (index !== -1){
        users[index] = {...users[index], ...req.body};
        res.json({message: "Usuario atualizado com sucesso", user: users[index]});
    }else {
        res.status(404).json({message: "Usuario não encontrado"})
    }
});

app.delete("users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);

    if (users.length < initialLength){
        res.json({message: "Usuario excluido com sucesso"});
    }else {
        res.status(404).json({message: "Usuario não encontrado"})
    }
});

