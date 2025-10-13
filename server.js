import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configurar transporter de nodemailer con Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Endpoint para enviar emails
app.post('/api/contact', async (req, res) => {
    try {
        const { nombre, empresa, email, mensaje } = req.body;

        // Validar datos
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({
                success: false,
                message: 'Por favor completa todos los campos obligatorios'
            });
        }

        // Configurar el email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER,
            subject: `Nuevo contacto de ${nombre} - ${empresa || 'Sin empresa'}`,
            html: `
                <h2>Nuevo mensaje de contacto - abeeFlow</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje.replace(/\n/g, '<br>')}</p>
                <hr>
                <p style="color: #666; font-size: 12px;">Este mensaje fue enviado desde el formulario de contacto de abeeFlow</p>
            `,
            replyTo: email
        };

        // Enviar el email
        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.'
        });

    } catch (error) {
        console.error('Error al enviar email:', error);
        res.status(500).json({
            success: false,
            message: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.'
        });
    }
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
