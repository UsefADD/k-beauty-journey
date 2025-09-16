-- Promote the specified user to admin
UPDATE public.profiles
SET role = 'admin'
WHERE id = '04bbe40c-5b0e-4b02-a926-78917850004b';