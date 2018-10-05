import Cash from "./index"
import { CASH_BASE_DIR } from "../../config"

describe('cache interface', () => {
  let localCache
  let key = "superkey"
  let value = "super value"
  beforeAll(() => localCache = new Cash({ base: CASH_BASE_DIR, name: "test" }))
  
  test('get and set Cache ', async function () {
    expect(await localCache.get(key)).toBeUndefined()
    await localCache.set(key, value)
    expect(await localCache.get(key)).toEqual(value)
  })
  test('del value', async function () {
    await localCache.del(key)
    expect(await localCache.get(key)).toBeUndefined()
  })
  test('clear all', async function () {
    await localCache.set(key, value)
    expect(await localCache.get(key)).toEqual(value)
    await localCache.clear()
  })
})