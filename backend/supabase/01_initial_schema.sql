-- PrintFlow AI - Initial Schema

-- 1. Tabela de Clientes
CREATE TABLE public.customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL, -- WhatsApp
    email TEXT
);

-- 2. Tabela de Impressoras (Ativos)
CREATE TABLE public.printers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL, -- Ex: BambuLab P1S
    energy_consumption_kw NUMERIC NOT NULL DEFAULT 0.120,
    depreciation_per_hour NUMERIC NOT NULL DEFAULT 0.50,
    status TEXT NOT NULL DEFAULT 'idle' -- idle, printing, offline
);

-- 3. Tabela de Materiais (Estoque Base)
CREATE TABLE public.materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL, -- Ex: PLA, PETG
    price_per_kg NUMERIC NOT NULL,
    color TEXT
);

-- 4. Tabela de Pedidos (O CRM Core)
CREATE TABLE public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE RESTRICT,
    title TEXT NOT NULL, -- Ex: Suporte de Headset
    status TEXT NOT NULL DEFAULT 'quote_pending', -- quote_pending, approved, printing, done, delivered
    
    -- Inputs Parametrizados (O Maker preenche)
    estimated_weight_grams NUMERIC NOT NULL DEFAULT 0,
    estimated_time_hours NUMERIC NOT NULL DEFAULT 0,
    printer_id UUID REFERENCES public.printers(id) ON DELETE SET NULL,
    material_id UUID REFERENCES public.materials(id) ON DELETE SET NULL,
    
    -- Cálculos (Feitos pelo sistema e salvos aqui)
    cost_material NUMERIC NOT NULL DEFAULT 0,
    cost_energy NUMERIC NOT NULL DEFAULT 0,
    cost_depreciation NUMERIC NOT NULL DEFAULT 0,
    cost_labor NUMERIC NOT NULL DEFAULT 0,
    margin_risk NUMERIC NOT NULL DEFAULT 0,
    
    -- Valores Finais
    total_cost NUMERIC NOT NULL DEFAULT 0,
    profit_margin_multiplier NUMERIC NOT NULL DEFAULT 2.0,
    final_price NUMERIC NOT NULL DEFAULT 0,
    
    -- Links e Arquivos
    stl_file_url TEXT,
    reference_image_url TEXT
);

-- Configurações de Segurança e RLS (Row Level Security)
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.printers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Políticas temporárias permitindo tudo (apenas para desenvolvimento inicial / MVP 1)
-- Depois precisaremos travar por usuário (tenant)
CREATE POLICY "Allow all access to customers" ON public.customers FOR ALL USING (true);
CREATE POLICY "Allow all access to printers" ON public.printers FOR ALL USING (true);
CREATE POLICY "Allow all access to materials" ON public.materials FOR ALL USING (true);
CREATE POLICY "Allow all access to orders" ON public.orders FOR ALL USING (true);
