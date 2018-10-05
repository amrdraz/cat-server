import { findCatsByTag, catCache, findCatByTagAndId } from "./index"
import { checkIfbase64Image, checkValidCatUrls } from "../../test/test-helper"

describe('findCatsByTag', () => {
  beforeAll(catCache.clear)
  const tag = "cute"
  let firstCat = null
  test('should default to returning 5 urls', async function () {
    let catUrls = await findCatsByTag({ tag })
    expect(catUrls).toHaveLength(5)
    checkValidCatUrls(catUrls, tag)
  })
  test('should be able to return 64bit image data', async function () {
    jest.setTimeout(10000)
    let catUrls = await findCatsByTag({ tag, base64: true })
    expect(catUrls).toHaveLength(5)
    firstCat = catUrls[0]
    checkIfbase64Image(firstCat)
  })
  test('should return cached 64bit images for same tag', async function () {
    jest.setTimeout(1000)
    
    let catUrls = await findCatsByTag({ tag, base64: true })
    expect(catUrls).toHaveLength(5)
    firstCat = catUrls[0]
    checkIfbase64Image(firstCat)
  })
})

describe('findCatByTagAndId', () => {
  beforeAll(catCache.clear)
  const tag = "cute"
  const id = 0
  let firstCat = null
  test('should returned base64 image', async function () {
    jest.setTimeout(3000)
    firstCat = await findCatByTagAndId({ tag, id })
    checkIfbase64Image(firstCat)
  })
  test('should returned cached base64 image for same tag and id', async function () {
    jest.setTimeout(200)
    let cat = await findCatByTagAndId({ tag, id })
    checkIfbase64Image(cat)
    expect(cat).toEqual(firstCat)
  })
})

afterAll(catCache.clear)