import { CAT_API_PATH, HOST } from "../config"

export function checkValidCatUrls(catUrls, tag, size = 5) {
  expect(catUrls).toMatchObject([...new Array(5)].map((_, id) => `${HOST}${CAT_API_PATH}/${tag}/${id}`))
}

export function checkIfbase64Image(Base64DataString) {
  expect(Base64DataString).toBeDefined()
  expect(typeof Base64DataString === "string").toBe(true)
  // starts with a data string
  expect(Base64DataString).toEqual(expect.stringMatching(/^data\:image/))
  // base 64 encoded from the end
  expect(Base64DataString).toEqual(expect.stringMatching(/([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/))
}

// export async function mockRoute(route, req = {}, response = {
//   body: null,
//   headers: {},
//   status: 500,
// }, next = () => {}) {
//   const res = {
//     status: jest.fn((status) => response.status = status),
//     set: jest.fn((head, value) => {
//       if(typeof head === 'object' ) {
//         Object.assign(response.headers, head)
//       } else {
//         response.headers[head] = value
//       }
//     }),
//     send: jest.fn((body) => {
//       response.body = body
//     }),
//   }
//   await Promise.resolve(route(req, res, next))
//   return response
// }