import { Link } from "react-router-dom";

export function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-8">Página Não Encontrada</h2>
        <Link to="/" className="text-blue-500 underline">
            Voltar para a página inicial
        </Link>
    </div>
  );
}