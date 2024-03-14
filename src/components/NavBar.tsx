import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
    return (
        <header className="px-8 py-4 bg-black flex justify-between items-center sticky top-0 z-10">
            <Link href="/">
                <Image src="/LOGOBLANCO.png" alt="logo" width={128} height={64} />
            </Link>
            <nav>
                <ul className="flex gap-4 text-white">
                    <Link href="/register">
                        <li>Register</li>
                    </Link>
                    <Link href="/login">
                        <li>Sign In</li>
                    </Link>
                    {/*
                    Final section to add team info 
                    <Link href="/register">
                        <li>About</li>
                    </Link>
                     */}
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
