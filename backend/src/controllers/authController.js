const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const prisma = new PrismaClient();
const saltRounds = 10;

// Schema de validação movido para perto de onde é usado
const registerSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

// Exportamos a função para que a rota possa usá-la
exports.register = async (req, res) => {
    try {
        // 1. Valida os dados
        const userData = registerSchema.parse(req.body);

        // 2. Verifica se o usuário já existe
        const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // 3. Hash da senha
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        
        // 4. Cria o usuário
        const createdUser = await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            }
        });
        
        res.status(201).json({ id: createdUser.id, name: createdUser.name, email: createdUser.email });

    } catch (error) {
        // Se a validação do Zod falhar, ele gera um erro que é pego aqui
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.issues });
        }
        console.error(error); 
        res.status(500).json({ error: 'Internal server error' });
    }
};