const tracer = require('dd-trace').init({
	env: 'node-hooks'
})

tracer.use('express', {
  hooks: {
    request: (span, req, res) => {
    console.log('express hook invoked')
      // span.setTag('hook_tag_key', 'hook_tag_value')
      
      // logger.info(span.context())

      // logger.info(span.context()._tags)

      // logger.info(span.context()._trace.started[0].context())
  }
  }
})

const bunyan = require('bunyan');
const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

const logger = bunyan.createLogger({
  name: 'testLog',
  streams: [
    {
      level: 'debug',
      stream: process.stdout
    }
  ]
})


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var exampleOne = function(req, res) {
  const checkoutPrice = randomIntFromInterval(10, 100)
  let discount = 0

  if (checkoutPrice > 50) {
    discount = 5  
  }

  let specialDiscount = 0
  // Make a request for a user with a given ID
  axios.get('https://www.google.com')
    .then(function (response) {
      // handle success
      console.log('handling response')
      specialDiscount = 50
    })

  logger.info({event: checkoutPrice - discount - specialDiscount}, 'Received incoming request ...test')

  responseMsg = 'Original ' + "Price: " + checkoutPrice + `, Your Price: ${checkoutPrice - discount - specialDiscount}`
  res.status(200).send(responseMsg)
}


var exampleTwo = function(req, res) {
  const checkoutPrice = randomIntFromInterval(10, 100)
  let discount = 0

  if (checkoutPrice > 50) {
    discount = 5  
  }

  let specialDiscount = 0
  // Example using .then callback
  axios.get('https://www.google.com').then(function (response) {
    // handle success
    console.log('handling response')
    specialDiscount = 50

    logger.info({event: checkoutPrice - discount - specialDiscount}, 'Received incoming request ...test')

    responseMsg = 'Original ' + "Price: " + checkoutPrice + `, Your Price: ${checkoutPrice - discount - specialDiscount}`
    res.status(200).send(responseMsg)
  }) 
}


var exampleThree = async function(req, res) {
  const checkoutPrice = randomIntFromInterval(10, 100)
  let discount = 0

  if (checkoutPrice > 50) {
    discount = 5  
  }

  let specialDiscount = 0
  // Example using async await
  await axios.get('https://www.google.com')
  console.log('handling response')
  specialDiscount = 50

  logger.info({event: checkoutPrice - discount - specialDiscount}, 'Received incoming request ...test')

  responseMsg = 'Original ' + "Price: " + checkoutPrice + `, Your Price: ${checkoutPrice - discount - specialDiscount}`
  res.status(200).send(responseMsg)
}



app.get('/', exampleOne)
app.get('/one', exampleOne)
app.get('/two', exampleTwo)
app.get('/three', exampleThree)

app.listen(port, function() {
  console.log(`listening on port ${port}!`)
})