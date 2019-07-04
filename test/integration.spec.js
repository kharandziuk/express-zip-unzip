const S = require('supertest')
const { expect } = require('chai')

const app = require('../index.js')

describe('server', () => {

  it('zip-unzip', async () => {
    let response = await S(app)
      .post('/zip')
      .send(Buffer.from('some data', 'utf8'))
      .responseType('blob')
    expect(response.statusCode).eql(200)

    response = await S(app)
      .post('/unzip')
      .send(Buffer.from(response.body, 'utf8'))
      .responseType('blob')

    expect(response.statusCode).eql(200)
    expect(response.body.toString()).eql('some data')
  })

  it('unzip non-sence', async () => {
    response = await S(app)
      .post('/unzip')
      .send(Buffer.from('nonsense', 'utf8'))
      .responseType('blob')
    expect(response.statusCode).eql(400)
  })
})
