import { Header } from "../../components/Header"
import { Input } from "../../components/input"
import { useEffect, useState, type FormEvent } from "react"
import { db } from "../../services/firebaseConnectio"
import { toast } from "react-toastify"
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from "firebase/firestore"
import { FiTrash } from "react-icons/fi"

interface ListaProps {
  id: string
  name: string
  url: string
  bg: string
  color: string
}

export function Admin() {
  const [input, setInput] = useState("")
  const [url, setUrl] = useState("")
  const [cor, setCor] = useState("#ffffff")
  const [backgroundcolor, setBackgroundcolor] = useState("#18181b")
  const [links, setLinks] = useState<ListaProps[]>([])
  const [preview, setPreview] = useState<ListaProps>({
    id: "",
    name: "",
    url: "",
    bg: "#18181b",
    color: "#ffffff"
  })

  // Atualiza preview sempre que input, cor ou fundo mudam
  useEffect(() => {
    setPreview({
      id: "preview",
      name: input || "Nome do link",
      url: url || "#",
      bg: backgroundcolor,
      color: cor
    })
  }, [input, url, cor, backgroundcolor])

  useEffect(() => {
    const linksRef = collection(db, "links")
    const queryRef = query(linksRef, orderBy("created", "asc"))

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      let lista: ListaProps[] = []

      snapshot.forEach((document) => {
        lista.push({
          id: document.id,
          name: document.data().name,
          url: document.data().url,
          bg: document.data().bg,
          color: document.data().color
        })
      })

      setLinks(lista)
    })

    return () => unsubscribe()
  }, [])

  async function handleDeletelink(id: string) {
    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)
    toast.success("Link deletado com sucesso!")
  }

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

      {/* Formulário */}
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

        <section className="flex my-4 gap-5 items-center">
          <div className="flex gap-4 items-center">
            <label className="text-white font-medium">Cor do link</label>
            <input
              type="color"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            />

            <label className="text-white font-medium">Fundo do link</label>
            <input
              type="color"
              value={backgroundcolor}
              onChange={(e) => setBackgroundcolor(e.target.value)}
            />
          </div>
        </section>

        <button
          type="submit"
          className="mb-7 bg-blue-400 h-9 rounded-md text-white font-medium"
        >
          Salvar link
        </button>
      </form>

      {/* Preview em tempo real */}
      <div className="mb-6 w-11/12 max-w-xl">
        <h3 className="text-white font-semibold mb-2">Pré-visualização:</h3>
        <a
          href={preview.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block py-3 px-4 rounded select-none shadow-md transition-transform hover:scale-105"
          style={{ backgroundColor: preview.bg, color: preview.color }}
        >
          {preview.name}
        </a>
      </div>

      {/* Lista de links salvos */}
      <h2 className="font-bold text-2xl mb-4 text-white">
        Meus links
      </h2>

      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none shadow-md transition-transform hover:scale-105"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.name}
          </a>

          <button
            onClick={() => handleDeletelink(link.id)}
            className="border border-dashed p-1 rounded bg-neutral-900 hover:bg-neutral-800 transition"
          >
            <FiTrash size={19} color="#fff" />
          </button>
        </article>
      ))}
    </div>
  )
}
