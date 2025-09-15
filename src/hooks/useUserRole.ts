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
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setRole(data.role as UserRole);
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