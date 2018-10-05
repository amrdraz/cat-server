import { ICache } from "./index"

/**
 * An InMemory cache used during initial concept testing
 */
export class InMemoryCacheAdapter<Data> implements ICache<Data> {
  private store = {}

  async get(key) {
    return this.store[key]
  }
  async set(key, val) {
    this.store[key] = val
  }
  async del(key) {
    delete this.store[key]
  }
  async clear() {
    this.store = {}
  }
}

export default InMemoryCacheAdapter