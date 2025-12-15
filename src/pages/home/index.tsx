import { Social } from "../../components/social"
import { FaInstagram, FaGithub } from "react-icons/fa"

export function Home() {
  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-white mt-20">
        Fábio Garcia
      </h1>

      <span className="text-gray-50 mb-5 mt-3">
        Veja meus links 👇
      </span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        <section className="bg-white mb-4 w-full py-4 rounded-lg transition-transform hover:scale-105">
          <a
            href="/images/curriculo.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-base md:text-lg text-gray-800 font-medium">
              Currículo
            </p>
          </a>
        </section>

        <footer className="flex justify-center gap-4 my-4">
          <Social url="https://www.instagram.com/fabiogmartins06/">
            <FaInstagram size={35} color="#FFF" />
          </Social>

          <Social url="https://github.com/Fabiogarcia02">
            <FaGithub size={35} color="#FFF" />
          </Social>
        </footer>
      </main>
    </div>
  )
}
