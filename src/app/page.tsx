import Link from 'next/link';

export default function Home() {
    return (
        <>
            <section className="flex flex-col items-center justify-center h-dvh">
                <h1 className=" w-1/2 text-8xl font-bold text-balance text-center">
                    dev/taLLes Giveaways
                </h1>
                <h3 className="w-1/3 text-balance text-2xl text-gray-500 py-2 text-center font-semibold">
                    Participate in our exclusive giveaways. Every Giveaway Is a New Adventure!.
                </h3>
                <Link
                    href="https://discord.com/invite/pBjEVYTC7t"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white text-center font-bold py-4 px-2 rounded w-48 my-2"
                >
                    Join Discord
                </Link>
            </section>
            
        </>
    );
}
