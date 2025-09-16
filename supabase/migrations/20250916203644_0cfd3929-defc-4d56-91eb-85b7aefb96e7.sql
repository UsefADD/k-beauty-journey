-- Ensure the user's profile exists and set role to admin
INSERT INTO public.profiles (id, role)
VALUES ('04bbe40c-5b0e-4b02-a926-78917850004b', 'admin')
ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role;