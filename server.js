const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

// Connect mongoose
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api'
);

// Log mongoose queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`App listening at localhost:${PORT}`));
