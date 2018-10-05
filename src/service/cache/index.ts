// import InMemoryCacheAdapter from "./inmemory-cache.adapter"
import FileCacheAdapter from "./file-cache.adapter"

// TODO: implement getStream and setStream in order to support sending the image while it is being cached
export interface ICache<Data> {
  /**
   * retrieve entry with key and value
   */
  get(key: string): Promise<Data>
  /**
   * set entry with key and value
   */
  set(key: string, value: Data): Promise<void>
  /**
   * remove entry with key
   */
  del(key: string): Promise<void>
  /**
   * empty cache
   */
  clear(): Promise<void>
}

// extend the class you want to be used accross the service
// note A bridge was not implemented since multiple cache
// adapters are not used in the same time.
export class Cache<Data> extends FileCacheAdapter<Data> {}

export default Cache