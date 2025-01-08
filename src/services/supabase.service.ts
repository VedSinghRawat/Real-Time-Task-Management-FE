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
  channel = this.client.channel.bind(this.client)

  async uploadFile(filePath: string, file: File) {
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

  async getStorageFilePublicUrl(filePath: string) {
    const { data } = await this.storage.from(STORAGE_BUCKET).createSignedUrl(filePath, 60 * 60 * 24 * 1)
    if (!data) throw new Error('Failed to get signed URL')

    return data.signedUrl
  }

  async deleteFile(filePath: string) {
    const { error } = await this.storage.from(STORAGE_BUCKET).remove([filePath])
    if (error) throw error
  }
}

export default SupabaseService.createInstance()
