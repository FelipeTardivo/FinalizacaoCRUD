const express = require("express");
const app = express();
const cors = require("cors");
const { pool } = require("./data/data");
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
    console.log("Server ativo na porta 3000");
})

// Encerrar as conexões do pool de conexões ao final do processo
process.on('SIGINT', () => {
    pool.end();
    process.exit();
});

let register = null;
app.post('/api/registerUser', async (req, res) => {
    try {
        register = await pool.connect();
        const { nome, email, password } = req.body;
        await register.query(`INSERT INTO Users (id, nome, email, password) VALUES (uuid_generate_v4(), '${nome}', '${email}', '${password}')`)
        res.send("Cadastrado com sucesso!")
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar usuário");
    } finally {
        // Liberar a conexão do pool de conexões
        register.release();
    }
});

app.get('/api/getUsers', async(req, res) => {
    try {
        register = await pool.connect();
        const data = await register.query(`SELECT * FROM Users`);
        // console.log(data.rows);
        res.send(data.rows)
    } catch (error) {
        res.status(500).send('Erro na consulta')
    }
})

app.put("/api/updateUser", async (req, res) => {
    try {
        const { email, nome, password} = req.body;
        pool.query (`UPDATE users SET nome = '${nome}', password = '${password}' WHERE email = ${email}`)
        res.send("Cadastrado alterado com sucesso!")
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de conexão com o servidor");
        
    }
});

app.delete("/api/deleteUser", async (req, res) => {
    try {
        const { email, password } = req.body;
        await pool.query(`DELETE FROM Users WHERE email = '${email}', password = '${password}'`);
        res.send("Usuário excluído com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao excluir usuário");
    }
});
