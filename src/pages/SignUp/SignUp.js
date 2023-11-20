import React from 'react'
import RegisterAnimation from '../../components/Moveset/RegisterAnimation'
import RegisterForm from '../../components/Form/RegisterForm'

const SignUp = () => {
  return (
    <div className='grid grid-cols-2 h-screen bg-gray-300'>
      <div className='flex items-center justify-center'>
        <RegisterAnimation/>
      </div>
      <div>
        <RegisterForm/>
      </div>
    </div>
  )
}

export default SignUp