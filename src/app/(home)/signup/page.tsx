'use client'
import { useState } from 'react';
import { register } from './action';
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Page() {

    const [isLoading, setIsLoading] = useState(false);
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true);
		const formData = new FormData(e.currentTarget)
		const result = await register(formData);

		setIsLoading(false);

		if (result) {
			toast.error(result.error);
		} else {
			toast.success('Welcome to Drogoscans');
			router.push('/')
		}
	};
    return (
        <div className="flex flex-col w-[400px] h-[80vh] items-center gap-2 text-center justify-center text-white">
        <h1 className="text-3xl font-bold tracking-wider">SIGN UP</h1>
        <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-2">
            <label htmlFor="email">Email</label>
            <input name="email" id="email" className="rounded-md w-full text-black-200 px-2" placeholder="Input Your email here"/>
            <label htmlFor="password" >Password</label>
            <input type="password" name="password" id="password" className="rounded-md w-full text-black-200 px-2" placeholder="Input Your Password" />
            <button type="submit" className="bg-black-200 hover:bg-red-500 p-1 transition-all duration-500 rounded-md w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Create"}
            </button>
            <a href="/auth/google" className="bg-black-200 flex justify-center items-center hover:bg-red-500 p-1 transition-all duration-500 rounded-md w-full">
                <FcGoogle className="w-6 h-6 mr-2" /> Login with Google
            </a>
        </form>
        <span className="opacity-80">Already have an account? <Link href={'/signin'} className="hover:text-red-500 transition-all duration-300">
				Sign In Here
			</Link></span>
    </div>
    )
}
