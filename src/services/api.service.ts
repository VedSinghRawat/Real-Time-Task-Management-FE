import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

const API_METHODS = ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'] as const
type APIMethods = (typeof API_METHODS)[number]

type RequestParams<T> = {
  urlSuffix: string
  method: APIMethods
  config?: AxiosRequestConfig<T>
  headers?: AxiosRequestHeaders
  data?: unknown
}

class APIService {
  public static instance: APIService

  public static getInstance(): APIService {
    if (!this.instance) this.instance = new APIService()

    return this.instance
  }

  private API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  private async request<T>(data: RequestParams<T>) {
    try {
      const response = await axios.request<T>({
        ...data,
        ...data.config,
        baseURL: this.API_BASE_URL + data.urlSuffix,
      })
      return response.data
    } catch (error) {
      console.error(error)

      throw error
    }
  }

  public methods = API_METHODS.reduce(
    (curr, method) => {
      curr[method] = async <T>(data: Omit<RequestParams<T>, 'method'>) => {
        return await this.request<T>({ ...data, method })
      }

      return curr
    },
    {} as {
      [key in APIMethods]: key extends 'GET' | 'DELETE'
        ? <T>(data: Omit<RequestParams<T>, 'data' | 'method'>) => Promise<T>
        : <T>(data: Omit<RequestParams<T>, 'method'>) => Promise<T>
    }
  )
}

export default APIService.getInstance()
