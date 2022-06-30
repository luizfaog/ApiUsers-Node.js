const express = require('express')
const userRouter = express.Router()
let usuarios = require ('../data/usuarios.json');

let idUsuario = usuarios.length + 1

userRouter.get('/usuarios', (req,res) => {
    const {nome, idade} = req.query
    if (!nome && !idade)
    return res.status(200).json(usuarios)
    if(nome && idade) {
        const usuariosFiltrados = usuarios.filter((usuario) => usuario.nome.includes(nome) || usuario.idade == idade)
        return res.status(200).json(usuariosFiltrados)
    }
    if(nome) {
        const usuariosFiltrados = usuarios.filter((usuario) => usuario.nome.includes(nome) )
        return res.status(200).json(usuariosFiltrados)
    }
    if(idade) {
        const usuariosFiltrados = usuarios.filter((usuario) => usuario.idade == idade)
        return res.status(200).json(usuariosFiltrados)
    }
   
});

userRouter.get('/usuarios/:id', (req, res) => {
    const {id} = req.params
    const usuario = usuarios.find((usuario) => usuario.id == id)
    if (!usuario) return res.status(404).json("not found")
    return res.status(200).json(usuario)
});

userRouter.put('./usuarios/:id', (req, res) => {
    const {id} = req.params
    const {nome, idade} = req.body

    const newUsuario = {
        nome,
        idade,
        id
    }

    const usuariosIndex = usuarios.findIndex(usuario => usuario.id == id)

    usuarios[usuariosIndex] = newUsuario

    return res.status(200).json(newUsuario)
});

userRouter.post('/usuarios', (req,res) =>
{
    console.log(req)
    if(!req.body)
    return res.status(400).send("Nome e idade obrigatórios")
    if (!req.body.nome)
    return res.status(400).send("Nome Obrigatório")

    if (!req.body.idade)
    return res.status(400).send("Idade Obrigatório")
    
    const { nome, idade} = req.body
    
    const usuario = { nome, idade, id: idUsuario++}
    
    usuarios.push(usuario)
    return res.status(201).json({message: "usuario criando", usuario})
});

userRouter.delete('/usuarios/:id', (req, res) => {
   const id = req.params.id

   let newUsuarios = usuarios.filter(usuario => usuario.id != id)
     
    usuarios=newUsuarios

    return res.send(newUsuarios)

});

module.exports = userRouter
