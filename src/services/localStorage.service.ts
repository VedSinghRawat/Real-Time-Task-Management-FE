type LocalStorageMap = {
  access_token: string
}

export default class LocalStorageService {
  static set<K extends keyof LocalStorageMap>(key: K, value: LocalStorageMap[K]) {
    localStorage.setItem(key, value)
  }

  static get<K extends keyof LocalStorageMap>(key: K): LocalStorageMap[K] | null {
    return localStorage.getItem(key) as LocalStorageMap[K] | null
  }
}
