const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: `${process.env.CLIENT_URL}`
  // origin: 'https://jot-journal.vercel.app/'
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);


/* MONGOOSE SETUP */
const mongoose = require('mongoose');
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));