import { Social } from "../../components/social";
import { FaInstagram, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { db, auth } from "../../services/firebaseConnectio";
import { collection, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { Link } from "react-router-dom";
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
  const [social, setSocial] = useState<SocialProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Monitorar estado de autenticação
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  // Carregar links do usuário logado e redes sociais globais
  useEffect(() => {
    // Carregar redes sociais (visível para todos)
    const socialRef = doc(db, "social", "link");
    const unsubscribeSocial = onSnapshot(socialRef, (snapshot) => {
      if (snapshot.exists()) {
        setSocial(snapshot.data() as SocialProps);
      } else {
        setSocial(null);
      }
    });

    // Se não houver usuário logado, não carrega links
    if (!user) {
      setLoading(false);
      return () => unsubscribeSocial();
    }

    // Carregar links do usuário logado
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));
    const unsubscribeLinks = onSnapshot(queryRef, (snapshot) => {
      const linksList: LinksProps[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.userId === user.uid) {
          linksList.push({
            id: doc.id,
            name: data.name,
            url: data.url,
            bg: data.bg,
            color: data.color,
          });
        }
      });
      setLinks(linksList);
      setLoading(false);
    });

    return () => {
      unsubscribeLinks && unsubscribeLinks();
      unsubscribeSocial && unsubscribeSocial();
    };
  }, [user]);

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
        {!user ? (
          <div className="flex flex-col items-center mt-10">
            <p className="text-gray-400 mb-4">
              Faça login para ver seus links.
            </p>
            <Link
              to="/admin"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
            >
              🔑 Login
            </Link>
          </div>
        ) : (
          <>
            {/* 🔗 LINKS */}
            {links.length === 0 ? (
              <p className="text-gray-400 mb-6">Nenhum link cadastrado</p>
            ) : (
              links.map((link) => (
                <section
                  key={link.id}
                  className="mb-4 w-full py-4 rounded-xl shadow-md transition-transform hover:scale-105"
                  style={{ backgroundColor: link.bg }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <p
                      className="text-base md:text-lg font-semibold"
                      style={{ color: link.color }}
                    >
                      {link.name}
                    </p>
                  </a>
                </section>
              ))
            )}

            {/* Botão "Gerenciar links" */}
            <Link
              to="/admin"
              className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
            >
              ➕ Gerenciar links
            </Link>
          </>
        )}

        {/* 🌐 REDES SOCIAIS - visíveis para todos */}
        {social && Object.keys(social).length > 0 && (
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
        )}
      </main>
    </div>
  );
}
