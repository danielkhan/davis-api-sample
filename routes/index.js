const express = require('express');
const axios = require('axios');
const router = express.Router();

const jsonformat = require('json-format');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Davis API' });
});

router.post('/', async (req, res, next) => {
  try {
    const response = await axios.post('https://davis.dynatrace.com/api/v2/interact', {
      timezone: "Europe/Vienna",
      sessionId: "custom:test@dynatrace.com:1",
      input: req.body.input
    }, {
        headers: {
          'Authorization': `api-token ${process.env.DAVIS_API_TOKEN}`
        }
      });

      res.render('index', { title: 'Davis API', davisdata: jsonformat(response.data) });
  } catch (err) {
    console.error(err);
    res.render('index', { title: 'Error' });
  }
});


module.exports = router;
