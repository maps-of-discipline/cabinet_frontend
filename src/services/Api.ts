import axios from './axios'

abstract class Api {
  static async ping() {
    console.log(import.meta.env.VITE_API)

    const res = await axios('ping')
    return res
  }
}

Object.defineProperty(window, '_Api', { value: Api })

export default Api
