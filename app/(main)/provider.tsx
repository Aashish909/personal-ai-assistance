'use client'

import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { AssistantContext } from '@/context/AssistantContext';


const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const router = useRouter()
    const convex= useConvex()
    const {user, setUser} = useContext(AuthContext)
    const [assistant, setAssistant] = useState();
    useEffect(()=> {
        CheckUserAuth();
    }, [])

    const CheckUserAuth = async () => {
        const token = localStorage.getItem('user_token')
        //Get New access token
        const user = token && await GetAuthUserData(token)
       
        if(!user?.email) {
            router.replace('/sign-in')
            return ;
        }
        //Get User Info from database
        try {
            const result = await convex.query(api.users.GetUser,{
                email:user?.email
            })
           
            setUser(result)
        } catch (e) {
            
        }
    }
  return (
        <div>
            <AssistantContext.Provider value={{assistant, setAssistant}}>

            <Header/>
            {children}
            </AssistantContext.Provider>
        </div>
  )
}

export default Provider