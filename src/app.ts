import * as express from 'express'
import * as morgan from 'morgan'
import routes from "./routes"

const app = express()

app.use(morgan('tiny'))
app.use(routes)

export default app
