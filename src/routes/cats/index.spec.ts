import * as supertest from 'supertest'
import * as express from "express"
import route from './index'

import { checkIfbase64Image, checkValidCatUrls } from "../../test/test-helper"
import { getMimeAndDataFrom64BitImageData } from "../../utils"

const app = express()
app.use(route)

describe('/api/v1/cats', () => {
  const tag = "cute"
  let firstCat = null
  test('/:tag should return cats array with API urls', async () => {
    jest.setTimeout(6000);
    let { body } = await supertest(app)
      .get(`/${tag}`)
      .expect(200)
    expect(body).toHaveProperty("cats")
    expect(body.cats).toHaveLength(5)
    checkValidCatUrls(body.cats, tag)
  })

  test('/:tag?base64=true should return cats array with base64 data urls', async () => {
    jest.setTimeout(6000);
    let { body } = await supertest(app)
      .get(`/${tag}?base64=true`)
      .expect(200)
    expect(body).toHaveProperty("cats")
    expect(body.cats).toHaveLength(5)
    firstCat = body.cats[0]
    checkIfbase64Image(firstCat)
  })

  test('/:tag?base64=true should return cached response after first time', async () => {
    jest.setTimeout(1000);
    let { body } = await supertest(app)
      .get(`/${tag}?base64=true`)
      .expect(200)
    expect(body).toHaveProperty("cats")
    expect(body.cats).toHaveLength(5)
    checkIfbase64Image(body.cats[0])
    expect(body.cats[0]).toEqual(firstCat)
  })

  test('/:tag/:id should return an image file', async () => {
    jest.setTimeout(1000);
    let { header, body } = await supertest(app)
      .get(`/${tag}/0`)
      .expect(200)
    let { mime } = getMimeAndDataFrom64BitImageData(firstCat)
    expect(header).toHaveProperty('content-type', mime)
    expect(body instanceof Buffer).toBeDefined()
  })
})
