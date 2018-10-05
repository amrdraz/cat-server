import * as util from "util"
import * as cache from "persistent-cache"
import { ICache } from "./index"

export class FileCacheAdapter<Data> implements ICache<Data> {
  private store = null

  constructor(options?: {
    base?: string
    name?: string
    duration?: number,
    memory?: boolean
    persist?: boolean
  }) {
    this.store = cache(options)
  }

  async get(key) {
    return this.store && util.promisify(this.store.get)(key)
  }
  async set(key, val) {
    this.store && await new Promise((res, rej) => this.store.put(key, val, (err) => err?rej(err):res()) )
  }
  async del(key) {
    this.store && await util.promisify(this.store.delete)(key)
  }
  async clear() {
    this.store && await util.promisify(this.store.unlink)()
  }
}

export default FileCacheAdapter