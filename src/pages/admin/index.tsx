import { Header } from "../../components/Header"
import { Input } from "../../components/input"
import { useState } from "react"
import{FiTrash} from 'react-icons/fi'
export function Admin() {
  const [input, setInput] = useState("")
  const [url, setUrl] = useState("")
  const [cor, setCor] = useState("#ffffff")
  const [backgroundcolor, setBackgroundcolor] = useState("#18181b")

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />

      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl">
        <label className="text-white font-medium mt-2 mb-2">
          Nome do link
        </label>
        <Input
          placeholder="Digite o nome do link..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <label className="text-white font-medium mt-4 mb-2">
          URL do link
        </label>
        <Input
          type="url"
          placeholder="Digite a URL..."
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-4 items-center">
            <label className="text-white font-medium">
              Cor do link
            </label>
            <input
              type="color"
              value={cor}
              onChange={(event) => setCor(event.target.value)}
            />

            <label className="text-white font-medium">
              Fundo do link
            </label>
            <input
              type="color"
              value={backgroundcolor}
              onChange={(event) =>
                setBackgroundcolor(event.target.value)
              }
            />
          </div>
        </section>

        {input !== "" && (
          <div className="flex flex-col items-center justify-start mb-7 p-2 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-2">
              Veja como está ficando
            </label>

            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-center rounded px-1 py-3"
              style={{
                backgroundColor: backgroundcolor,
                marginTop: 8,
                marginBottom: 8
              }}
            >
              <p
                className="text-base font-medium"
                style={{ color: cor }}
              >
                {input}
              </p>
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
       

        <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>
        <article className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none" 
        style={{backgroundColor:"#2563EB", color: "white"}}>
            <p> </p>
               
            <div>
                 <button className="border border-dashed p-1 rounded ">
                    <FiTrash size={18} color="white"/>
                 </button>
            </div>
        </article>
    </div>
  )
}
