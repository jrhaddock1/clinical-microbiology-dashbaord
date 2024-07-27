const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const { PositivityRate } = require('./models');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/clinical_microbiology', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Positivity Rate APIs
app.get('/positivity-rates', async (req, res) => {
  const rates = await PositivityRate.find();
  res.json(rates);
});

app.post('/positivity-rates', async (req, res) => {
  const rate = new PositivityRate(req.body);
  await rate.save();
  res.json(rate);
});

app.put('/positivity-rates/:id', async (req, res) => {
  const rate = await PositivityRate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(rate);
});

app.delete('/positivity-rates/:id', async (req, res) => {
  await PositivityRate.findByIdAndDelete(req.params.id);
  res.send('Positivity rate deleted');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
