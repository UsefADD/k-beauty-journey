-- Update user role to admin for the specified email
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'idrissi.randa@gmail.com';