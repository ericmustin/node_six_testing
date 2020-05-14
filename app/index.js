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

app.get('*', function(req, res) {
  const checkoutPrice = randomIntFromInterval(10, 100)
  let discount = 0

  if (checkoutPrice > 50) {
    discount = 5  
  }

  logger.info({event: checkoutPrice - discount}, 'Received incoming request ...test')

  responseMsg = 'Original ' + "Price: " + checkoutPrice + `, Your Price: ${checkoutPrice - discount}`
  res.status(200).send(responseMsg)
})

app.listen(port, function() {
  console.log(`listening on port ${port}!`)
})


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
