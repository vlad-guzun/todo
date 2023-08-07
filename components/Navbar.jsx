'use client'


import { signOut } from "next-auth/react"
import Image from 'next/image'
import { useSession } from "next-auth/react"


const Navbar = () => {

  
  const {data: session} = useSession()

  return (
    <div className='flex justify-end bg-green-600'>
        <Image  className='rounded-full'
                src={session?.user.image}
                height={50}
                width={50}
                alt="profile_pic"        
        />
        
        <button onClick={signOut}>sign out</button>
    </div>
  )
}

export default Navbar