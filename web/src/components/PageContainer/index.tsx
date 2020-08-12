import React from 'react';



import './styles.css'

const PageContainer: React.FC = ({children}) => {
  return (
    <div className="container">
        {children}
    </div>
  )
}

export default PageContainer;