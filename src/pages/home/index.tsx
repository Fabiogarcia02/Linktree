import { Social } from "../../components/social";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { db } from "../../services/firebaseConnectio";
import {
  getDocs,
  collection,
  orderBy,
  doc,
  getDoc,
  query,
} from "firebase/firestore";
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
}

export function Home() {
  const [links, setLinks] = useState<LinksProps[]>([]);
  const [social, setSocial] = useState<SocialProps | null>(null);

  useEffect(() => {
    async function loadLinks() {
      try {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));
        const snapshot = await getDocs(queryRef);

        const lista: LinksProps[] = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });

        setLinks(lista);
      } catch (error) {
        console.error("Erro ao carregar links", error);
      }
    }

    async function loadSocial() {
      try {
        const docRef = doc(db, "social", "link");
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setSocial(snapshot.data() as SocialProps);
        }
      } catch (error) {
        console.error("Erro ao carregar redes sociais", error);
      }
    }

    loadLinks();
    loadSocial();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-white mt-20">
        Free Linktree
      </h1>

      <span className="text-gray-300 mb-6 mt-3">
        Veja meus links 👇
      </span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            className="mb-4 w-full py-4 rounded-lg transition-transform hover:scale-105 shadow-md"
            style={{ backgroundColor: link.bg }}
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <p
                className="text-base md:text-lg font-medium"
                style={{ color: link.color }}
              >
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {/* 🔗 Redes sociais */}
        {social && Object.keys(social).length > 0 && (
          <footer className="flex justify-center gap-6 mt-8">
            {social.instagram && (
              <Social url={social.instagram}>
                <FaInstagram size={32} color="#fff" />
              </Social>
            )}

            {social.facebook && (
              <Social url={social.facebook}>
                <FaGithub size={32} color="#fff" />
              </Social>
            )}

            {social.linkedin && (
              <Social url={social.linkedin}>
                <FaLinkedin size={32} color="#fff" />
              </Social>
            )}
          </footer>
        )}
      </main>
    </div>
  );
}
