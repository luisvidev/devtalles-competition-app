import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-primary min-h-screen px-10 pt-10">
      <div className="flex gap-x-4">
        <div>
          <Image
            src="/LOGOBLANCO.png"
            width={200}
            height={200}
            alt="Picture of the author"
          />
        </div>
        <div>
          <Image
            src="/wink.png"
            width={35}
            height={35}
            alt="Picture of the author"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center lg:pt-0 pt-20">
        <div className="flex flex-col xl:flex-row justify-around gap-x-10 ">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Participa en nuestros exclusivos sorteos.
              </span>
              <span className="text-white">
                Cada sorteo es una nueva aventura!
              </span>
            </h1>
            <div className="flex justify-center py-4">
              <Link
                href={"/raffles"}
                className="animate-soft-bounce rounded-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Ver Sorteos
              </Link>
            </div>
            <div className="flex flex-col content-center gap-y-4">
              <h2 className="text-white text-center pt-5">
                O visitanos en nuestras plataformas oficiales:
              </h2>
              <div className="flex justify-center gap-x-10">
                <Link
                  href="https://twitter.com/devtalles?lang=en"
                  target="_blank"
                  className="pointer"
                >
                  <Image
                    src="/twitter.png"
                    width={40}
                    height={40}
                    alt="Twitter logo"
                  />
                </Link>
                <Link
                  href="https://discord.com/invite/pBjEVYTC7t"
                  target="_blank"
                  className="pointer"
                >
                  <Image
                    src="/discord.png"
                    width={40}
                    height={40}
                    alt="Discord logo"
                  />
                </Link>
                <Link
                  href="https://open.spotify.com/show/0jrfxcnCrD7N9tlA0BGJp5"
                  target="_blank"
                  className="pointer"
                >
                  <Image
                    src="/spotify.png"
                    width={40}
                    height={40}
                    alt="Spotify logo"
                  />
                </Link>
                <Link
                  href="https://cursos.devtalles.com/"
                  target="_blank"
                  className="pointer"
                >
                  <Image
                    src="/devtalles-rounded-corners.png"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                  />
                </Link>
              </div>
            </div>
          </div>
          <Image
            src="/programmer.png"
            width={600}
            height={200}
            alt="Picture of the author"
            className="self-center"
          />
        </div>
      </div>
    </main>
  );
}
