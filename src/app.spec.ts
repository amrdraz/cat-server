import * as supertest from 'supertest'
import app from './app'

describe('app working', async () => {
  test("/ Ok ", () => supertest(app).get("/").expect(200))
});