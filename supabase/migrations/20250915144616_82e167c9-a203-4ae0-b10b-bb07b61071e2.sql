-- Make the current logged-in user an admin (replace with your actual user email)
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'idrissi.randa@gmail.com';