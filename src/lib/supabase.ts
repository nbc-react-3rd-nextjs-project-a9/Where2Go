import { createClient, SupabaseClient } from "@supabase/supabase-js";
// import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
