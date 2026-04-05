const ContactModel = require('../models/Contact')
const sendEmail = require('../services/mailer');

const contactController = {
    createContact: async (req, res) => {
        try {
            const { name, email, phone, message } = req.body;

            // Guardar en MongoDB
            const newContact = new ContactModel({ name, email, phone, message });
            await newContact.save();

            //Envíar al gmail
            await sendEmail({ name, email, phone, message });

            res.status(201).json({ message: 'Mensaje enviado correctamente' });
        } catch (error) {
            console.error('Error al crear el contacto:', error);
            res.status(500).json({ message: 'Error al procesar el mensaje' });
        }
    }
};

module.exports = contactController;