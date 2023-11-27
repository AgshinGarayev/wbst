const express = require('express')
const {postQuote,
       deleteQuote,
       getQuote,
       getquoteId,
       getUserQuotes,
       updateQuote} = require('../controllers/QuoteController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

router.use(requireAuth)

router.get("/get", getQuote);

router.get("/each", getUserQuotes)

router.get('/:id', getquoteId);

router.post("/post", postQuote);

router.delete('/:id', deleteQuote);
  
router.patch('/:id', updateQuote);


module.exports=router