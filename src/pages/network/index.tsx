import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { useState,FormEvent } from "react";
import { db } from "../../services/firebaseConnectio";
import{addDoc, setDoc, getDoc, doc} from "firebase/firestore";
import { toast } from "react-toastify"

export function Network() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

   function HandleRegistrer(e:FormEvent) {
        e.preventDefault();

         setDoc(doc(db,"social","link"),{
            facebook:facebook,
            instagram:instagram,
            linkedin:linkedin
   })
        .then(()=>{
            toast.success("Links salvos com sucesso!")
        })
        .catch((error)=>{
            toast.error("Erro ao salvar os links!")
            console.log(error)
        })
}

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas redes sociais
      </h1>

      <form onSubmit={HandleRegistrer}
      className="flex flex-col max-w-xl w-full">
        <label className="text-white font-medium mt-2 mb-2">
          Link do Facebook
        </label>
        <Input
          type="url"
          placeholder="Digite a URL do Facebook..."
          value={facebook}
          onChange={(event) => setFacebook(event.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">
          Link do Instagram
        </label>
        <Input
          type="url"
          placeholder="Digite a URL do Instagram..."
          value={instagram}
          onChange={(event) => setInstagram(event.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">
          Link do LinkedIn
        </label>
        <Input
          type="url"
          placeholder="Digite a URL do LinkedIn..."
          value={linkedin}
          onChange={(event) => setLinkedin(event.target.value)}
        />

        <button className="text-white bg-blue-600 h-10 rounded-md flex items-center justify-center mb-7 ">
         Salvar Links
       </button>

      </form>
 
    </div>
  );
}
