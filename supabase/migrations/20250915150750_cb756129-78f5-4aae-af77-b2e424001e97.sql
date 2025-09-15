-- Set admin role for the user
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'idrissi.randa@gmail.com';