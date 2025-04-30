
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase environment variables. Please create a .env file in the project root with the following variables:\n" +
    "VITE_SUPABASE_URL=your_supabase_url\n" +
    "VITE_SUPABASE_ANON_KEY=your_supabase_anon_key\n\n" +
    "You can get these values from your Supabase project settings > API."
  );
}

// Export the configuration status function
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseKey;
};

// Create a mock client that returns empty results when Supabase isn't configured
const createMockClient = () => {
  return {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: (data: any) => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        })
      })
    }),
    // Add other mock methods as needed
  };
};

// Create and export the Supabase client or a mock client if not configured
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl!, supabaseKey!) 
  : createMockClient();
