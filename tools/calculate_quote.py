import json

def calculate_quote(analysis_data: dict, material_price_kg: float, printer_profile: dict, profit_margin: float, human_labor_hours: float, labor_cost_ph: float) -> dict:
    \"\"\"
    Fórmula: Custo Final = (Material + Energia + Depreciação + Mão de obra + Margem de Falha) × Margem de lucro
    Retorna o equivalente a QuoteSchema (gemini.md).
    \"\"\"
    weight = analysis_data.get("weight_grams", 0)
    est_hours = analysis_data.get("estimated_hours", 0)
    risk_score = analysis_data.get("risk_score", 0) / 100.0
    
    energy_kw = printer_profile.get("energy_kw", 0.120)
    depreciation_ph = printer_profile.get("depreciation_ph", 0.40)
    energy_price_kwh = 0.90 # TODO: Vir de config
    
    material_cost = (weight / 1000.0) * material_price_kg
    energy_cost = est_hours * energy_kw * energy_price_kwh
    machine_depreciation = est_hours * depreciation_ph
    labor_cost = human_labor_hours * labor_cost_ph
    
    failure_margin = (material_cost + energy_cost) * risk_score
    
    base_cost = material_cost + energy_cost + machine_depreciation + labor_cost + failure_margin
    final_price = base_cost * profit_margin
    
    return {
        "material_cost": material_cost,
        "energy_cost": energy_cost,
        "machine_depreciation": machine_depreciation,
        "failure_margin": failure_margin,
        "labor_cost": labor_cost,
        "final_price": final_price
    }

if __name__ == "__main__":
    pass
