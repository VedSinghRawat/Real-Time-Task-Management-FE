import { createClient } from '@supabase/supabase-js'
import { Database } from '../database.types'

export default class SupabaseService {
  static client = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
}
