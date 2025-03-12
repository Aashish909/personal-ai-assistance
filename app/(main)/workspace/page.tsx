import { Assistant } from 'next/font/google'
import React from 'react'
import AssistantList from './_components/AssistantList'
import AssistantSettings from './_components/AssistantSettings'
import ChatUi from './_components/ChatUi'

const Workspace = () => {
  return (
    <div className='h-screen fixed w-full'>
        <div className='grid grid-cols-5'>
            <div className='hidden md:block'>
                
                {/* Assistant List */}
                <AssistantList />
            </div>
            <div className='md:col-span-4 lg:col-span-3'>
               
                {/* Chat ui */}
                <ChatUi />
            </div>
            <div className='hidden lg:block'>
                {/* Settings */}
                <AssistantSettings/>
            </div>
        </div>
    </div>
  )
}

export default Workspace