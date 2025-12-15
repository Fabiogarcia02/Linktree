import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/input"
import { useState, type FormEvent } from "react"
import {auth} from '../../services/firebaseConnectio';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from "react-toastify";

export function Loguin() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const navigate = useNavigate();
  function handleSubmit(event: FormEvent) {
    event.preventDefault()

            if(email==='' ||senha ===''){
                alert("Preencha todos os campos!")
            }
            signInWithEmailAndPassword(auth,email,senha)
            .then(()=>
            {
                 toast.success("Login realizado com sucesso!")   
                    navigate("/admin", {replace:true})
            })
              .catch(()=>
            {
                 toast.error("Email ou senha inválidos")
            })
  }

  return (
    <div className="flex w-full h-screen items-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2 gap-3"
      >
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Digite o seu email..."
        />

        <Input
          type="password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          placeholder="********"
        />

        <button
          type="submit"
          className="h-9 bg-blue-400 rounded text-lg font-medium text-white hover:bg-blue-500 transition"
        >
          Acessar
        </button>
      </form>
    </div>
  )
}
