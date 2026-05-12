import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layers, AlertCircle } from "lucide-react";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 mb-2">
            <Layers className="text-blue-500 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Print<span className="text-blue-500">Flow</span> AI</h1>
          <p className="text-zinc-500 text-sm">O sistema operacional da sua fazenda.</p>
        </div>

        <form action={login} className="space-y-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
          {params?.error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              {params.error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">E-mail Corporativo</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="bg-zinc-900 border-zinc-800"
              placeholder="voce@empresa.com.br"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha Mestra</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="bg-zinc-900 border-zinc-800"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white">
              Entrar no Cofre
            </Button>
            <Button formAction={signup} type="submit" variant="outline" className="w-full border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
              Criar Primeira Conta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
