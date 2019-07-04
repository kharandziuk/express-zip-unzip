const express = require('express')
const app = express()
const port = 3000
const stream = require('stream')
const zlib = require('zlib');

app.post('/zip', (req, res) => {
  stream.pipeline(
      req,
      zlib.createGzip(),
      res,
      (err) => {
        if (err) {
          return res.sendStatus(400);
        }
      }
  )
})

app.post('/unzip', (req, res) => {
  const passStream = new stream.PassThrough()
  stream.pipeline(
      req,
      zlib.createUnzip(),
      passStream,
      (err) => {
        if (err) {
          return res.sendStatus(400);
        }
      }
  )
  passStream.pipe(res)
})

if (module.main) {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
} else {
  module.exports = app
}
