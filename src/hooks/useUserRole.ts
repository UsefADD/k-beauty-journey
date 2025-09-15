import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'customer';

export const useUserRole = () => {
  const { user, isAuthenticated } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!isAuthenticated || !user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        // Try to get existing profile
        const { data, error, status } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (!data) {
          // Create a default customer profile if missing
          const { error: insertErr } = await supabase
            .from('profiles')
            .insert({ id: user.id, email: user.email, full_name: user.user_metadata?.full_name || null });
          if (insertErr) {
            console.error('Failed to create profile:', insertErr);
          }
          // Try fetching again
          const { data: afterInsert } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .maybeSingle();
          setRole((afterInsert?.role as UserRole) || 'customer');
        } else {
          setRole((data.role as UserRole) || 'customer');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRole('customer'); // Default to customer on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [isAuthenticated, user]);

  const isAdmin = role === 'admin';
  const isCustomer = role === 'customer';

  return {
    role,
    isAdmin,
    isCustomer,
    loading
  };
};