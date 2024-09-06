const express = require('express');
const fs = require('fs');
const { request } = require('http');
const path = require('path');

const caminhoArquivo = path.join(__dirname, './mock/dados.txt');
const fsPromises = fs.promises;

const server = express();

server.use(express.json());

server.get('/dados', async (req, res) => {
    try {
        let dados = await fsPromises.readFile(caminhoArquivo, 'utf-8');
    
        dados = dados
            .split('\r')
            .join('')
            .split('\n')
            .filter(linha => linha.trim() !== '');
    
        res.json({dados});
    } catch (err) {
        res.status(500).json({ err: 'Erro ao ler o arquivo de texto.' })
    }
});

server.put('/mudardado', async (req, res) => {
    const textoDado = req.body.newData;
    
    try {
        let dados = await fsPromises.readFile(caminhoArquivo, 'utf-8');

        let novoDado = dados += textoDado

        await fsPromises.writeFile(caminhoArquivo, novoDado);
        
        dados = dados
            .split('\r')
            .join('')
            .split('\n')
            .filter(linha => linha.trim() !== '');
    
            console.log(textoDado)
        res.json(dados);
    } catch (err) {
        res.status(500).json({ err: 'Rota não existe.' })
    }
});


server.listen(3000, () => console.log('Api online. Bom dia senhor Stark.'));


