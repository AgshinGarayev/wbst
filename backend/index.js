require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const quoteModel = require('./models/Quote')


const app = express()
app.use(express.json())
app.use(cors())



// GET method to fetch all quotes
app.get('/quotes', async (req, res) => {
  try {
    const quotes = await quoteModel.find();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST method to create a new quote
app.post('/quotes', async (req, res) => {
  const { author, quote } = req.body;

  if (!author || !quote) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newQuote = new quoteModel({
    author,
    quote
  });

  try {
    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



mongoose.connect(process.env.MONG_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 