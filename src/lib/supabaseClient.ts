
import { supabase } from '@/integrations/supabase/client';

// Export the configuration status function
export const isSupabaseConfigured = () => {
  return true; // We now have a configured client from the integrations folder
};

// Re-export the supabase client
export { supabase };
