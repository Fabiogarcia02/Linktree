import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { useEffect, useState, type FormEvent } from "react";
import { db, auth } from "../../services/firebaseConnectio";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { FiTrash } from "react-icons/fi";

interface ListaProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");
  const [cor, setCor] = useState("#ffffff");
  const [backgroundcolor, setBackgroundcolor] = useState("#1f1f1f");
  const [links, setLinks] = useState<ListaProps[]>([]);
  const [preview, setPreview] = useState<ListaProps>({
    id: "",
    name: "",
    url: "",
    bg: "#1f1f1f",
    color: "#ffffff",
  });

  // Atualiza preview sempre que input, cor ou fundo mudam
  useEffect(() => {
    setPreview({
      id: "preview",
      name: input || "Nome do link",
      url: url || "#",
      bg: backgroundcolor,
      color: cor,
    });
  }, [input, url, cor, backgroundcolor]);

  // Carrega links do usuário logado
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setLinks([]);
      return;
    }

    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const lista: ListaProps[] = [];
      snapshot.forEach((document) => {
        const data = document.data() as ListaProps & { userId: string };
        if (data.userId === currentUser.uid) {
          lista.push({
            id: document.id,
            name: data.name,
            url: data.url,
            bg: data.bg,
            color: data.color,
          });
        }
      });
      setLinks(lista);
    });

    return () => unsubscribe();
  }, []);

  async function handleDeletelink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
    toast.success("Link deletado com sucesso!");
  }

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error("Você precisa estar logado para criar links.");
      return;
    }

    if (input === "" || url === "") {
      toast.warning("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: input,
      url: url,
      bg: backgroundcolor,
      color: cor,
      created: new Date(),
      userId: currentUser.uid,
    })
      .then(() => {
        setInput("");
        setUrl("");
        toast.success("Cadastro realizado com sucesso!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao cadastrar link");
      });
  }

  return (
    <div className="flex flex-col items-center min-h-screen pb-10 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Header />

      {/* Formulário */}
      <form
        onSubmit={handleRegister}
        className="flex flex-col mt-10 mb-6 w-full max-w-xl bg-gray-800 p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Adicionar novo link</h2>

        <label className="text-gray-300 font-medium mt-2 mb-1">Nome do link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400"
        />

        <label className="text-gray-300 font-medium mt-4 mb-1">URL do link</label>
        <Input
          type="url"
          placeholder="Digite a URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400"
        />

        <section className="flex my-4 gap-6 items-center">
          <div className="flex gap-4 items-center">
            <label className="text-gray-300 font-medium">Cor do link</label>
            <input
              type="color"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              className="w-10 h-10 p-0 border-0 rounded-full cursor-pointer"
            />

            <label className="text-gray-300 font-medium">Fundo do link</label>
            <input
              type="color"
              value={backgroundcolor}
              onChange={(e) => setBackgroundcolor(e.target.value)}
              className="w-10 h-10 p-0 border-0 rounded-full cursor-pointer"
            />
          </div>
        </section>

        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 py-3 rounded-full text-white font-semibold shadow-lg hover:scale-105 transform transition duration-200"
        >
          Salvar link
        </button>
      </form>

      {/* Preview */}
      <div className="mb-8 w-full max-w-xl">
        <h3 className="text-white font-semibold mb-2">Pré-visualização</h3>
        <a
          href={preview.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block py-3 px-4 rounded-xl select-none shadow-lg hover:scale-105 transform transition duration-200"
          style={{ backgroundColor: preview.bg, color: preview.color }}
        >
          {preview.name}
        </a>
      </div>

      {/* Lista de links */}
      <h2 className="font-bold text-2xl mb-4 text-white">Meus links</h2>

      <div className="flex flex-col gap-3 w-full max-w-xl mb-10">
        {links.length === 0 && (
          <p className="text-gray-400 text-center">Nenhum link cadastrado</p>
        )}

        {links.map((link) => (
          <article
            key={link.id}
            className="flex items-center justify-between w-full rounded-xl py-3 px-4 bg-gray-700 hover:bg-gray-600 shadow-lg transition-transform transform hover:scale-105"
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white font-medium">
              {link.name}
            </a>

            <button
              onClick={() => handleDeletelink(link.id)}
              className="p-2 rounded-full bg-red-600 hover:bg-red-500 transition transform hover:scale-110"
            >
              <FiTrash size={20} color="#fff" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
