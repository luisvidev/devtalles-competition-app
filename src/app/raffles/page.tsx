import Image from "next/image";
import React from "react";
import Link from "next/link";

const Raffles = () => {
  const data = [
    {
      id: "1",
      name: "DevTalles Sorteo 1",
      description: "Este es un sorteo para la comunidad de devtalles",
      imageUrl: "/guitar.png",
      timezone: "GMT-6",
      createdAt: "2024/03/14",
      endAt: "2024/03/14",
    },
    {
      id: "2",
      name: "DevTalles Sorteo 2",
      description: "Este es un sorteo para la comunidad de devtalles",
      imageUrl: "/guitar.png",
      timezone: "GMT-6",
      createdAt: "2024/04/14",
      endAt: "2024/04/14",
    },
    {
      id: "3",
      name: "DevTalles Sorteo 3",
      description: "Este es un sorteo para la comunidad de devtalles",
      imageUrl: "/guitar.png",
      timezone: "GMT-6",
      createdAt: "2024/05/14",
      endAt: "2024/05/14",
    },
    {
      id: "4",
      name: "DevTalles Sorteo 4",
      description: "Este es un sorteo para la comunidad de devtalles",
      imageUrl: "/guitar.png",
      timezone: "GMT-6",
      createdAt: "2024/06/14",
      endAt: "2024/06/14",
    },
    {
      id: "5",
      name: "DevTalles Sorteo 5",
      description: "Este es un sorteo para la comunidad de devtalles",
      imageUrl: "/guitar.png",
      timezone: "GMT-6",
      createdAt: "2024/07/14",
      endAt: "2024/07/14",
    },
    {
      id: "6",
      name: "DevTalles 1",
      description: "Este es un sorteo para la comunidad de devtalles",
      imageUrl: "/guitar.png",
      timezone: "GMT-6",
      createdAt: "2024/08/14",
      endAt: "2024/08/14",
    },
    {
      id: "7",
      name: "DevTalles 2",
      description: "Este es un sorteo para la comunidad de devtalles",
      imageUrl: "/guitar.png",
      timezone: "GMT-6",
      createdAt: "2024/09/14",
      endAt: "2024/09/14",
    },
    {
      id: "8",
      name: "DevTalles 1M suscriptores",
      description: "Este es un sorteo para la comunidad de devtalles",
      imageUrl: "/guitar.png",
      timezone: "GMT-6",
      createdAt: "2024/10/14",
      endAt: "2024/10/14",
    },
    {
      id: "9",
      name: "DevTalles Gold",
      description: "Este es un sorteo para la comunidad de devtalles",
      imageUrl: "/guitar.png",
      timezone: "GMT-6",
      createdAt: "2024/11/14",
      endAt: "2024/11/14",
    },
    {
      id: "10",
      name: "DevTalles Zero",
      description: "Este es un sorteo para la comunidad de devtalles",
      imageUrl: "/guitar.png",
      timezone: "GMT-6",
      createdAt: "2024/12/14",
      endAt: "2024/12/14",
    },
  ];

  return (
    <section className="h-dvh p-4">
      <h1 className="text-6xl font-bold">Sorteos</h1>
      <p className="text-gray-600">Listado de sorteos disponibles</p>
      <article className="grid grid-cols-3 place-content-center place-items-center p-8 gap-4">
        {data.map((item) => (
          <div key={item.id} className="p-4 shadow rounded flex flex-col w-3/4">
            <Image
              src={item.imageUrl}
              alt="banner"
              className="self-center"
              width={200}
              height={50}
            />
            <div className="p-2">
              <h4 className="text-xl font-bold">{item.name}</h4>
              <p className="text-gray-500 text-xs">creado: {item.createdAt}</p>
            </div>
            <div className="p-2">
              <p>{item.description}</p>
            </div>

            <Link
              className="py-2 px-4 bg-indigo-800 text-white rounded w-1/4 self-end text-center hover:bg-indigo-500"
              href={`/raffles/${item.id}`}
            >
              Ver mas
            </Link>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Raffles;
