import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../DoctorDashboard/Sidebar'
import axios from 'axios'
import { handleUnAuthorized } from '../hook/handleUnauthorized'
import '../index.css';


const DoctorLayout = ({ userData }) => {
    const navigate = useNavigate()
    const [permission, setPermission] = useState({})

    const MyData = () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        if (adminToken) {
            axios.get(process.env.REACT_APP_API_URL + `/api/me`, {
                headers: {
                    Authorization: `${adminToken}`
                }
            }).then(res => {
                if (res.data.success) {
                    const perm = JSON.parse(res.data.data.permission)
                    if (res.data.data.type === "admin") {
                        setPermission({
                            type: "Admin",
                            dashboard: true,
                            profile: true,
                            donationHistory: true,
                            donar: true,
                            student: true,
                            allAdmin: true,
                            scholarshipDistributionAutomatic: true,
                            manualScholarshipHistory: true,
                            automaticScholarshipHistory: true,
                            documentHistory: true,
                            masterDocument: true,
                            masterScholarshipScheme: true,
                            blog: true,
                            generalDonation: true
                        });
                    } else if (res.data.data.type === "subAdmin") {
                        setPermission({
                            type: "Admin",
                            userName: res.data.name,
                            dashboard: true,
                            profile: true,
                            donationHistory: perm?.[0]?.Status || false,
                            donar: perm?.[1]?.Status || false,
                            student: perm?.[2]?.Status || false,
                            allAdmin: perm?.[3]?.Status || false,
                            scholarshipDistributionAutomatic: perm?.[4]?.Status || false,
                            manualScholarshipHistory: perm?.[5]?.Status || false,
                            automaticScholarshipHistory: perm?.[6]?.Status || false,
                            documentHistory: perm?.[7]?.Status || false,
                            masterDocument: perm?.[8]?.Status || false,
                            masterScholarshipScheme: perm?.[9]?.Status || false,
                            blog: perm?.[10]?.Status || false,
                            generalDonation: perm?.[11]?.Status || false,
                        });
                    }
                } else {
                    handleUnAuthorized(res.data.msg, navigate)
                }

            }).catch(err => {
                console.log(err, "/me err");
                handleUnAuthorized(err.response.data, navigate)
            });
        }

    }

    useEffect(() => {
        MyData()
    }, [])
    return (
        <>
            {/* <link rel='stylesheet' href='/css/index.css'></link> */}
            <Sidebar Outlet={Outlet} userData={userData} permission={permission} />
        </>

    )
}

export default DoctorLayout