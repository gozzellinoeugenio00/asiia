const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data: p1 } = await supabase.from('profiles').select('*').limit(1);
    console.log("Profiles:", p1);
    const { data: p2 } = await supabase.from('professionals').select('*').limit(1);
    console.log("Professionals:", p2);
}
check();
