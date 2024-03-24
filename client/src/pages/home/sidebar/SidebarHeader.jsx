import React from 'react'
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { FaUser } from 'react-icons/fa'
import { TbBrandStorytel } from "react-icons/tb";
import { MdDarkMode } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMendeley } from "react-icons/fa";
import { TbCirclePlus2 } from "react-icons/tb";
import './sbheader.css'
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-bootstrap';
const SidebarHeader = ({ darkMode, setDarkMode }) => {


const {user} = useSelector(state=>state.auth)

const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };


    return (
        <>
            <div style={{
                backgroundColor: `${darkMode ? '#121C24' : '#EEEEEE'}`,
                color: `${darkMode ? 'white' : 'black'}`,
                position:'relative'
            }} className="d-flex p-2 ps-4  align-items-center justify-content-between">
                <div className="image p-2 d-flex gap-2 ">
                <FaUser className='fs-2  p-2 text-white rounded-circle bg-secondary' size={35} />
                    <h4 className='text-capitalize'>{user?.f_name} {user?.l_name}</h4>
                </div>
                
                <div className="d-flex gap-4 fs-4 align-items-center">
                <FaMendeley  size={30}  />
      <TbCirclePlus2 size={30}  />
                    <div className="modes position-relative">

                        {darkMode ? (
                            <IoSunnyOutline style={{ cursor:'Darkode' }} className='mode' onClick={() => setDarkMode(false)} />
                        ) : (

                            <MdDarkMode className='mode' onClick={() => setDarkMode(true)} />
                        )}
                        <div className="text bg-secondary text-white fs-6 p-1 position-absolute" style={{
                            width: 'max-content'
                        }}>
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </div>
                    </div>
                    <div>
                    <BsThreeDotsVertical onClick={toggleVisibility} className='dots-icon' />
                    <div ref={divRef} style={{
                        position:'absolute',
                        top:'67px',
                        right:'17px',
                        zIndex:'22222',
                        display: `${isVisible ? 'block' : 'none'} `,


                    }} className=' threedots bg-white p-4 fs-6  gap-2'> 
                        <ul className=' d-flex flex-column  gap-3 list-unstyled'>
                           <li >New Group</li>
                         <li>Starred messages</li>  
                          <li >Change theme</li>
                            <li >Settings</li>
                            <li><button className='btn btn-dark p-2'  >Logout</button></li>
                        </ul>
                    </div>
                
                    </div>
                
                   
                </div>
            </div>
        </>
    )
}

export default SidebarHeader