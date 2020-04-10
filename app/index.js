const tracer = require('dd-trace').init({
	env: 'node-hooks',
	analytics: true,
  logInjection: true
})

const bunyan = require('bunyan');
const express = require('express')
const app = express()
const port = 3000

const logger = bunyan.createLogger({
  name: 'testLog',
  streams: [
    {
      level: 'debug',
      path: 'testLog'
    }
  ]
})

app.get('*', function(req, res) {
  const checkoutPrice = randomIntFromInterval(10, 100)
  let discount = 0

  if (checkoutPrice > 50) {
    discount = 5  
  }

  const thankYou = `
  Hello ${req.query && req.query.name}, 
  thanks for shopping today! You order total today was: $${checkoutPrice - discount}. 
  You saved ${discount} dollars. Come back real soon!
  \n
  ` 

  logger.info({event: thankYou}, 'Received incoming request ...test')

  res.status(200).send(thankYou)
})

app.listen(port, function() {
  console.log(`listening on port ${port}!`)
})


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
