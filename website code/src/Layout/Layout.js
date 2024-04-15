import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import '../App.css';
import './Main.css';

const Layout = ({ userData }) => {
   
    return (
        <>
            <link rel='stylesheet' href='/css/App.css'></link>
            <link rel='stylesheet' href='/css/Main.css'></link>
            <Navbar userData={userData} />
            <Outlet />
            <Footer />

        </>

    )
}

export default Layout