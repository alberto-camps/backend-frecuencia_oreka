require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./config/db');
const mongo_uri = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

/* // Comporbar que express arranca
app.get('/', (req, res) => {
    res.send(`<h1>Backend de Frecuencia Oreka funcionando</h1>`);
}) */

app.use('/', require('./routes/contactRoutes'));

dbConnection(mongo_uri);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});