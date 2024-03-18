import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { getRaffles } from '@/actions/raffles/getRaffles';

export default async function RafflePage() {
    const response = await getRaffles({ page: 1, take: 12 });
    const { raffles, currentPage, totalPages } = response;

    return (
        <section className="h-dvh p-4">
            <h1 className="text-6xl font-bold">Sorteos</h1>
            <p className="text-gray-600">Listado de sorteos disponibles</p>
            <article className="grid grid-cols-3 place-content-center place-items-center p-8 gap-4">
                {raffles.map((item: any) => (
                    <div
                        key={item.id}
                        className="p-4 shadow rounded flex flex-col w-3/4 min-h-auto"
                    >
                        <Image
                            src={
                                item.imageUrl ||
                                'https://media.licdn.com/dms/image/C4E0BAQHZYYIUKBtZNw/company-logo_200_200/0/1677855312170/devtalles_logo?e=2147483647&v=beta&t=OZpWhXCaIPtwzdat0Dz7zpZLmLJhO7pn5GjsqW8yVDg'
                            }
                            alt="banner"
                            className="self-center"
                            width={200}
                            height={50}
                        />
                        <div className="p-2">
                            <h4 className="text-xl font-bold">{item.name}</h4>
                            <p className="text-gray-500 text-xs">
                                creado: {item.createdAt.toString()}
                            </p>
                        </div>
                        <div className="p-2 truncate">
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
}
