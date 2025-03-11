import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='header'>
        <div className='header-logo'>
            <Image src="http://ipu.ac.in/style/head_foot_img/220px-usemGuru_Gobind_Singh_Indraprastha_University12.png" alt="logo" width={300} height={300} />
        </div>
    </div>
  )
}

export default Header