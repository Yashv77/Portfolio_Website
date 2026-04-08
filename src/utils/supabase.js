import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ehrnakvepsutuobmtzcf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocm5ha3ZlcHN1dHVvYm10emNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNjI4MDgsImV4cCI6MjA5MDczODgwOH0.X8SpZvlC0aoE5GhUwl39YgwOgPx2RiT5YfNrxN8Woug'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
