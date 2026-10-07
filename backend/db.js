const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://mtvmuteknkfhydqnjdte.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

exports.supabase = supabase;
