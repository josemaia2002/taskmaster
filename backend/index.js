const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Importa as rotas de autenticação
const authRoutes = require('./src/routes/authRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
    res.send('API working');
});

// Usa as rotas de autenticação com um prefixo (opcional, mas recomendado)
// Agora a rota de registro será acessada em /api/auth/register
app.use('/api/auth', authRoutes);

// Inicia o servidor
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});