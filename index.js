const express = require('express')
const app = express()
const port = 3000
const stream = require('stream')
const zlib = require('zlib');

app.post('/zip', (req, res) => {
  const passStream = new stream.PassThrough()
  res.set({
    'Content-Type': 'application/gzip',
    'Content-Disposition': 'attachment; filename=archieve.gz'
  });
  stream.pipeline(
      req,
      zlib.createGzip(),
      passStream,
      (err) => {
        if (err) {
          console.log('here', err)
          return res.sendStatus(400);
        }
      }
  )
  passStream.pipe(res)
})

app.post('/unzip', (req, res) => {
  const passStream = new stream.PassThrough()
  res.set({
    'Content-Type': 'text/plain',
    'Content-Disposition': 'attachment; filename=unziped'
  });
  stream.pipeline(
      req,
      zlib.createUnzip(),
      passStream,
      (err) => {
        if (err) {
          console.log('zhere', err)
          return res.sendStatus(400);
        }
      }
  )
  passStream.pipe(res)
})

if (require.main === module) {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
} else {
  module.exports = app
}
