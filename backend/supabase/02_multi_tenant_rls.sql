-- PrintFlow AI - Multi-Tenant Security & RLS Migration

-- 1. ADICIONAR COLUNA DO DONO (TENANT) EM TODAS AS TABELAS
-- Lincamos cada linha do banco diretamente com o usuário que a criou no Auth
ALTER TABLE public.customers ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.printers ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.materials ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.orders ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. DELETAR AS REGRAS ANTIGAS INSEGURAS (MVP 1)
DROP POLICY IF EXISTS "Allow all access to customers" ON public.customers;
DROP POLICY IF EXISTS "Allow all access to printers" ON public.printers;
DROP POLICY IF EXISTS "Allow all access to materials" ON public.materials;
DROP POLICY IF EXISTS "Allow all access to orders" ON public.orders;

-- 3. CRIAR OS MUROS DE CONCRETO (ROW LEVEL SECURITY)
-- Agora o banco só permite ler/escrever se o ID logado bater com o dono da linha

-- CUSTOMERS
CREATE POLICY "Tenant pode ver seus clientes" ON public.customers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Tenant pode inserir clientes" ON public.customers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Tenant pode atualizar clientes" ON public.customers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Tenant pode deletar clientes" ON public.customers FOR DELETE USING (auth.uid() = user_id);

-- PRINTERS
CREATE POLICY "Tenant pode ver suas impressoras" ON public.printers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Tenant pode inserir impressoras" ON public.printers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Tenant pode atualizar impressoras" ON public.printers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Tenant pode deletar impressoras" ON public.printers FOR DELETE USING (auth.uid() = user_id);

-- MATERIALS
CREATE POLICY "Tenant pode ver seus materiais" ON public.materials FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Tenant pode inserir materiais" ON public.materials FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Tenant pode atualizar materiais" ON public.materials FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Tenant pode deletar materiais" ON public.materials FOR DELETE USING (auth.uid() = user_id);

-- ORDERS (CRM)
CREATE POLICY "Tenant pode ver seus pedidos" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Tenant pode inserir pedidos" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Tenant pode atualizar pedidos" ON public.orders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Tenant pode deletar pedidos" ON public.orders FOR DELETE USING (auth.uid() = user_id);
