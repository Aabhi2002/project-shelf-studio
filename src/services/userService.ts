import { supabase } from '@/integrations/supabase/client';

export const getUserIdByUsername = async (username: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .single();

    if (error) {
      console.error('Error fetching user ID by username:', error);
      return null;
    }

    return data?.id || null;
  } catch (error) {
    console.error('An unexpected error occurred while fetching user ID:', error);
    return null;
  }
}; 