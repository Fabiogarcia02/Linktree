import { Header } from "../../components/Header"
import { Input } from "../../components/input"
import { useState, type FormEvent } from "react"
import { db } from "../../services/firebaseConnectio"
import { toast } from "react-toastify"
import { addDoc, collection } from "firebase/firestore"

export function Admin() {
  const [input, setInput] = useState("")
  const [url, setUrl] = useState("")
  const [cor, setCor] = useState("#ffffff")
  const [backgroundcolor, setBackgroundcolor] = useState("#18181b")

  function handleRegister(e: FormEvent) {
    e.preventDefault()

    if (input === "" || url === "") {
      toast.warning("Preencha todos os campos")
      return
    }

    addDoc(collection(db, "links"), {
      name: input,
      url: url,
      bg: backgroundcolor,
      color: cor,
      created: new Date()
    })
      .then(() => {
        setInput("")
        setUrl("")
        toast.success("Cadastro realizado com sucesso!")
      })
      .catch((error) => {
        console.error(error)
        toast.error("Erro ao cadastrar link")
      })
  }

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />

      <form
        onSubmit={handleRegister}
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
      >
        <label className="text-white font-medium mt-2 mb-2">
          Nome do link
        </label>
        <Input
          placeholder="Digite o nome do link..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <label className="text-white font-medium mt-4 mb-2">
          URL do link
        </label>
        <Input
          type="url"
          placeholder="Digite a URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-4 items-center">
            <label className="text-white font-medium">
              Cor do link
            </label>
            <input
              type="color"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            />

            <label className="text-white font-medium">
              Fundo do link
            </label>
            <input
              type="color"
              value={backgroundcolor}
              onChange={(e) => setBackgroundcolor(e.target.value)}
            />
          </div>
        </section>

        {input && (
          <div className="flex flex-col items-center mb-7 p-2 border border-gray-100/25 rounded-md">
            <label className="text-white font-medium mb-2">
              Veja como está ficando
            </label>

            <article
              className="w-11/12 max-w-lg flex justify-center rounded px-1 py-3"
              style={{ backgroundColor: backgroundcolor }}
            >
              <p style={{ color: cor }}>{input}</p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 bg-blue-400 h-9 rounded-md text-white font-medium"
        >
          Salvar link
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">
        Meus links
      </h2>
    </div>
  )
}
