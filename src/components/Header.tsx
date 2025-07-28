import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { shadow } from '@/styles/utils';
import { Button } from './ui/button';
import { DarkModeToggle } from './DarkModeToggle';
import LogOutButton from './LogOutButton';
import { getUser } from '@/auth/server';
import { SidebarTrigger } from './ui/sidebar';

async function Header() {

    const user = await getUser();
    return (
        <header className="relative flex h-24 w-full items-center bg-popover" style={{ boxShadow: shadow }}>
            <div className="flex items-center gap-4 ml-64 sm:ml-49">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/notes.png"
                        alt="Logo"
                        width={60}
                        height={60}
                        className="rounded-full"
                        priority
                    />
                    <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
                        THE <span>Notes</span>
                    </h1>
                </Link>
            </div>
            <div className="flex gap-4 ml-auto mr-3 sm:mr-8">
                {user ? (
                    <LogOutButton />
                ) : (
                    <>
                        <Button asChild>
                            <Link href="/sign-up" className="hidden sm:block">Sign Up</Link>
                        </Button>

                        <Button asChild variant="outline">
                            <Link href="/login">Login</Link>
                        </Button>
                    </>
                )}

                <DarkModeToggle />
            </div>
        </header>
    )
}

export default Header;