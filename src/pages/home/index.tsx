import { Social } from "../../components/social";
import { FaInstagram, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { db } from "../../services/firebaseConnectio";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialProps {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

export function Home() {
  const [links, setLinks] = useState<LinksProps[]>([]);
  
  // Fallback local para redes sociais
  const [social, setSocial] = useState<SocialProps>({
    instagram: "https://instagram.com/teste",
    facebook: "https://facebook.com/teste",
    linkedin: "https://linkedin.com/in/teste",
    github: "https://github.com/teste",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Atualização em tempo real dos links
    const unsubscribeLinks = onSnapshot(collection(db, "links"), (snapshot) => {
      const linksList: LinksProps[] = [];
      snapshot.forEach((doc) => {
        linksList.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });
      setLinks(linksList);
      setLoading(false);
    });

    // Atualização em tempo real das redes sociais
    const socialRef = doc(db, "social", "link");
    const unsubscribeSocial = onSnapshot(socialRef, (snapshot) => {
      console.log("Social snapshot:", snapshot.data());
      if (snapshot.exists()) {
        setSocial(snapshot.data() as SocialProps);
      }
    });

    return () => {
      unsubscribeLinks();
      unsubscribeSocial();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full py-6 items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold mt-16 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
        Free Linktree
      </h1>

      <span className="text-gray-300 mb-6 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {/* 🔗 LINKS */}
        {links.length === 0 && <p className="text-gray-400">Nenhum link cadastrado</p>}

        {links.map((link) => (
          <section
            key={link.id}
            className="mb-4 w-full py-4 rounded-xl shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: link.bg }}
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="block">
              <p className="text-base md:text-lg font-semibold" style={{ color: link.color }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {/* Botão "Gerenciar links" mais estilizado */}
        <a
          href="/admin"
          className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
        >
          ➕ Gerenciar links
        </a>

        {/* 🌐 REDES SOCIAIS abaixo do botão */}
        {social ? (
          <footer className="flex justify-center gap-6 mt-6">
            {social.instagram && (
              <Social url={social.instagram}>
                <FaInstagram
                  size={36}
                  color="#fff"
                  className="hover:text-pink-500 transform hover:scale-110 transition duration-200"
                />
              </Social>
            )}
            {social.facebook && (
              <Social url={social.facebook}>
                <FaFacebook
                  size={36}
                  color="#fff"
                  className="hover:text-blue-600 transform hover:scale-110 transition duration-200"
                />
              </Social>
            )}
            {social.github && (
              <Social url={social.github}>
                <FaGithub
                  size={36}
                  color="#fff"
                  className="hover:text-gray-400 transform hover:scale-110 transition duration-200"
                />
              </Social>
            )}
            {social.linkedin && (
              <Social url={social.linkedin}>
                <FaLinkedin
                  size={36}
                  color="#fff"
                  className="hover:text-blue-500 transform hover:scale-110 transition duration-200"
                />
              </Social>
            )}
          </footer>
        ) : null}
      </main>
    </div>
  );
}
