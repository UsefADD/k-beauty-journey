-- Create INSERT policy for profiles
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create trigger to auto-create profiles on signup
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- Upsert the user's profile and promote to admin
INSERT INTO public.profiles (id, email, full_name, role)
SELECT u.id, u.email, COALESCE(u.raw_user_meta_data->>'full_name', ''), 'admin'
FROM auth.users u
WHERE u.email = 'idrissi.randa@gmail.com'
ON CONFLICT (id) DO UPDATE
SET role = EXCLUDED.role,
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = now();
