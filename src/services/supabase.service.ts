import { createClient } from '@supabase/supabase-js'
import { Database } from '../database.types'
import { STORAGE_BUCKET } from '../constants'

class SupabaseService {
  private static instance: SupabaseService

  static createInstance() {
    if (!SupabaseService.instance) SupabaseService.instance = new SupabaseService()
    return SupabaseService.instance
  }

  client = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY, {
    auth: {
      persistSession: true, // Required for session persistence
      autoRefreshToken: true, // Required for refreshing tokens automatically
      detectSessionInUrl: false, // Ensure OAuth logins work
    },
  })

  auth = this.client.auth
  storage = this.client.storage
  from = this.client.from.bind(this.client)

  async upload(filePath: string, file: File) {
    const { data: uploadData, error: uploadError } = await this.storage.from(STORAGE_BUCKET).upload(filePath, file, {
      upsert: true,
      cacheControl: '3600',
      contentType: file.type,
    })

    if (uploadError) {
      console.error('Error uploading image:', uploadError)
      throw uploadError
    }

    return uploadData.path
  }
}

export default SupabaseService.createInstance()
