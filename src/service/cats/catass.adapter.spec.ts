import { fetchBase64Data } from "./catass.adapter"
import { checkIfbase64Image } from "../../test/test-helper"

describe('catass service', () => {
  test.only('fetchBase64Data to return a data encoded base64 image string', async function () {
    let Base64DataString = await fetchBase64Data("cute")
    checkIfbase64Image(Base64DataString)
  })
})