import { useState, FormEvent } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../services/firebaseConnectio"
import { toast } from "react-toastify"
import { Input } from "../../components/input"
import { Header } from "../../components/Header"
import { useNavigate } from "react-router-dom"

export function Cadastro() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function handleRegister(e: FormEvent) {
    e.preventDefault()

    // Validação de campos vazios
    if (!email || !password) {
      toast.warning("Preencha todos os campos")
      return
    }

    // Validação de senha mínima
    if (password.length < 6) {
      toast.warning("A senha deve ter pelo menos 6 caracteres")
      return
    }

    // Cadastro no Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Cadastro realizado com sucesso!")
        navigate("/admin")
      })
      .catch((error: any) => {
        console.error(error)

        // Tratamento dos erros do Firebase
        switch (error.code) {
          case "auth/weak-password":
            toast.error("A senha deve ter pelo menos 6 caracteres")
            break
          case "auth/email-already-in-use":
            toast.error("Este email já está em uso")
            break
          case "auth/invalid-email":
            toast.error("Email inválido")
            break
          default:
            toast.error("Erro ao cadastrar usuário")
        }
      })
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-2">
      <Header />

      <h1 className="text-white text-2xl font-bold mt-8 mb-6">
        Criar conta
      </h1>

      <form onSubmit={handleRegister} className="flex flex-col w-full max-w-md">
        <label className="text-white mb-2">Email</label>
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-white mt-4 mb-2">Senha</label>
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="mt-6 bg-blue-600 h-10 rounded-md text-white font-medium"
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}
