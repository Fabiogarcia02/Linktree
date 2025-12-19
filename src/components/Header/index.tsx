import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebaseConnectio';
import { signOut } from 'firebase/auth';

export function Header() {
  async function handleLogout() {
    try {
      await signOut(auth);
      console.log("Logout realizado com sucesso!");
      // Aqui você pode redirecionar para a página de login, se quiser
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  }

  return (
    <header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-3">
        <div className="flex gap-4 font-medium">
          <Link to="/">Home</Link>
          <Link to="/admin">Login</Link>
          <Link to="/">Links</Link>
          <Link to="/networks">Redes sociais</Link>
        </div>
        <button onClick={handleLogout} className="p-0 m-0">
  <BiLogOut size={28} color="#db2629" />
</button>
      </nav>
    </header>
  );
}
