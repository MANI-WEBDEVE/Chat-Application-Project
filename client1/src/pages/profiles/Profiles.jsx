import { useAppStore } from '@/store'
import React from 'react'

const Profiles = () => {
  const { userInfo } = useAppStore()
  return (
    <>
      Profile
    <div>
      Email: {userInfo.email}
    </div>
    </>
    
  )
}

export default Profiles
