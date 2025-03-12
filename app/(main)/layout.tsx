import React from 'react'
import Provider from './provider';


const WorkspaceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
        <Provider>
            
        {children}
        </Provider>
        </div>
  )
}

export default WorkspaceLayout