require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
