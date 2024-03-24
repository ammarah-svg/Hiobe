import React from 'react'
import {Row,Col} from 'react-bootstrap'
import Sidebar from './sidebar/Sidebar'
import Welcome from './Welcome'
const Home = () => {
  return (
    <>
    <div className='col-lg-9 bg-success '>
    <div className='d-flex '>
    <div className='col-lg-3' >
    <Sidebar/> </div>
    <div className='col-lg-9'  >
    <Welcome/></div>
    </div>

    
    </div>
    </>
  )
}

export default Home