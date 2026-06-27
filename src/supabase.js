import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://woiiluzpzygkfhjmsawe.supabase.co";

const supabaseKey = "sb_publishable_qqe_1vhFiHns7KGhC9T54A_3kJzqqPc";

export const supabase = createClient(supabaseUrl, supabaseKey);