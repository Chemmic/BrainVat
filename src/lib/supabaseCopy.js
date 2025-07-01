import { createClient } from '@supabase/supabase-js'

const supabaseUrl = ''
const supabaseAnonKey = ''

export const supabaseCopy = createClient(supabaseUrl, supabaseAnonKey)