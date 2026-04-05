const ContactModel = require('../models/Contact')
const sendEmail = require('../services/mailer');

const contactController = {
    createContact: async (req, res) => {
        try {
            const { name, email, phone, message } = req.body;

            // Guardar en MongoDB
            const newContact = new ContactModel({ name, email, phone, message });
            await newContact.save();
            
            res.status(201).json({ message: 'Mensaje enviado correctamente' });

            //Envíar al gmail
            await sendEmail({ name, email, phone, message });

        } catch (error) {
            console.error('Error al crear el contacto:', error);
            res.status(500).json({ message: 'Error al procesar el mensaje' });
        }
    },

    getContacts: async (req, res) => {
        try {
            const contacts = await ContactModel.find().sort({ createdAt: -1 });
            res.status(200).json(contacts);
        } catch (error) {
        console.error('Error real al obtener contactos:', error);
        res.status(500).json({ message: 'Error al obtener los contactos', error: error.message });
        }
    }
};

module.exports = contactController;