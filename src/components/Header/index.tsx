import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebaseConnectio';
import { signOut } from 'firebase/auth';

export function Header() {
  async function handleLogout() {
    try {
      await signOut(auth);
      console.log("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  }

  return (
    <header className="w-full bg-gray-900 shadow-md">
      <nav className="w-full flex items-center justify-between max-w-full px-6 py-2 md:py-3">
        {/* Links centralizados */}
        <div className="flex-1 flex justify-center gap-10 font-semibold text-white text-sm md:text-base">
          <Link
            to="/"
            className="relative group px-2 py-1 hover:text-yellow-400 transition-colors duration-300"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/admin"
            className="relative group px-2 py-1 hover:text-yellow-400 transition-colors duration-300"
          >
            Links
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/network"
            className="relative group px-2 py-1 hover:text-yellow-400 transition-colors duration-300"
          >
            Redes
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Botão de logout à direita */}
        <div className="flex justify-end flex-1">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center p-1 md:p-2 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
            title="Sair"
          >
            <BiLogOut size={24} />
          </button>
        </div>
      </nav>
    </header>
  );
}
