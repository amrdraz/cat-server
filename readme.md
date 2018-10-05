# Cat API - 3yourmind task

A server that forwards 5 random cat images from a cat API service and caches the API using a changable cache interface and API service.

### Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/api/v1/cats/cute` to see expected JSON response.

Visit `http://localhost:3000/api/v1/cats/cute/0` to see a cached image

By default config sets cache to 10 seconds

### Development

```bash
npm run dev
```

> @types/mocha and @types/jest seem to bitch at each other but it doesn't affect the dev build, plus does not happen all the time so it was ignored

### Running tests

```bash
npm test
```

### Building a container

```bash
docker build .
```
cause why not

## API

### GET `/api/v1/cats/:tag`

PARAMS

- `tag` `string` `required`
- `base64` `boolean` `optional` `default:false`
- `size` `string` `optional` `default:5`

RESPONSE `200`

```js
{
  cats: [
    'http://localhost:3000/api/v1/cats/cute/0',
    'http://localhost:3000/api/v1/cats/cute/1',
    'http://localhost:3000/api/v1/cats/cute/2',
    'http://localhost:3000/api/v1/cats/cute/3',
    'http://localhost:3000/api/v1/cats/cute/4'
  ]
}
```

### GET `/api/v1/cats/:tag/:id`

RESPONSE `200`

Image File

Example

![Cute Cate](./example.jpeg)

## Possible Future Work

- Use dotenv for config
- Implement Redis adaptor, trivial but didn't want to add a hard dependency
- use Streams in both caching and data fetching in order to be able to serve the user the image while it's being cached