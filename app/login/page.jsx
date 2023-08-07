'use client'

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"


const Login = () => {
  const router = useRouter()
  const {data: session} = useSession()

 
  

  useEffect(() => {session && session.user ? router.push('/') : router.push('/login')},[session])
  

  


  return (
    <div className='flex flex-col md:items-center md:justify-center mt-10 md:mt-20 justify-center items-center'>
        
        {/* LOGIN WITH GOOGLE */}
        <Image className='md:scale-125'
                src={'/logo.png'}
                height={700}
                width={350}
                alt="logo"
        />
        <button onClick={() => signIn()} className='bg-blue-700 flex items-center justify-center p-2 text-white rounded-lg cursor-pointer'><span className='cursor-pointer'>Continue with <span className='text-red-500 text-bold'><span className='text-blue-900'>G</span><span className='text-red-700'>o</span><span className='text-yellow-500'>o</span><span className='text-blue-900'>g</span><span className='text-green-600'>l</span><span className='text-red-700'>e</span></span> or <span className='text-black'>Github</span></span>
                <Image 
                        src={'/google.png'}
                        height={50}
                        width={50}
                        alt='google_button'
                />
                <Image 
                        src={'/github.png'}
                        height={60}
                        width={60}
                        alt='github_button'
                />
        </button>

    </div>
  )
}

export default Login