import { createClient } from '@supabase/supabase-js'
import { AsyncStorage } from '@react-native-async-storage/async-storage';

//console.log(process.env.SUPABASE_URL);
//console.log(process.env.SUPABASE_KEY);

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    localStorage: AsyncStorage,
});

export { supabase };