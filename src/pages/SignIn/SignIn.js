import React from 'react'
import LoginForm from '../../components/Form/LoginForm'
import LoginAnimation from '../../components/Moveset/LoginAnimation'

const SignIn = () => {
  return (
    <div className='grid grid-cols-2 h-screen bg-gray-300'>
      <div className='flex items-center justify-center'>
        <LoginAnimation/>
      </div>
      <div>
        <LoginForm/>
      </div>
    </div>
  )
}

export default SignIn