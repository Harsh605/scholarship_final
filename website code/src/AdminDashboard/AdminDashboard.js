import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import { handleUnAuthorized } from "../hook/handleUnauthorized";
import axios from "axios";


const notifications = [
  { id: 1, text: "$2400, Plan1 sale", time: "22 DEC 7:20 PM" },
  { id: 2, text: "$2400, Plan2 sale", time: "25 DEC 7:20 PM" },
  { id: 3, text: "User signup request", time: "26 DEC 7:20 PM" },
  // Add more notification objects as needed
];

const plans = [
  { id: 1, name: "Member plan 1", members: 800, sale: "$14,00", average: "24.77%" },
  { id: 2, name: "Member plan 2", members: 1200, sale: "$16,00", average: "40%" },
  { id: 3, name: "Member plan 3", members: 1000, sale: "$16,00", average: "33.33%" },
  // Add more plan objects as needed
];

export default function AdminDashboard() {

  const [overview, setOverview] = useState({});
  const navigate = useNavigate();

  const getDashboardDetail = async () => {
    const token = localStorage.getItem('adminToken') || ''
    if (token) {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-dashboard-detail`, { headers: { Authorization: token } });
      if (data.data.success) {
        setOverview(data?.data?.data)
      } else {
        handleUnAuthorized(data.data.msg, navigate)
      }
    } else {
      navigate('/login')
    }
  }
  console.log('overview :>> ', overview);

  useEffect(() => {
    getDashboardDetail()
  }, [])



  return (
    <>

      <div class="relative py-3">
        <div class="px-3 md:px-3 mx-auto w-full">
          <div>
            <div class="flex flex-wrap md:gap-y-4" >
              <div className="w-full md:px-4 text-xl">SubAdmin Overview</div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1 cursor-pointer" onClick={() => navigate('/admin/all-admin')}>
                        <h5 class="text-blueGray-400 uppercase  text-xs">Total SubAdmin</h5>
                        <span class=" text-xl">{overview?.allSubAdmin}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"><i class="far fa-chart-bar"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-emerald-500 mr-2"><i class="fas fa-arrow-up"></i> 3.48%</span><span class="whitespace-nowrap">Since last month</span></p> */}
                  </div>
                </div>
              </div>



            </div>

          </div>
          <div>
            <div class="flex flex-wrap md:gap-y-4 mt-3" >
              <div className="w-full md:px-4 text-xl">Donar Overview</div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1 cursor-pointer" onClick={() => navigate('/admin/donars')}>
                        <h5 class="text-blueGray-400 uppercase  text-xs">Total</h5>
                        <span class=" text-xl">{overview?.totalDonar}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"><i class="far fa-chart-bar"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-emerald-500 mr-2"><i class="fas fa-arrow-up"></i> 3.48%</span><span class="whitespace-nowrap">Since last month</span></p> */}
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 class="text-blueGray-400 uppercase  text-xs">Active</h5>
                        <span class=" text-xl">{overview?.totalDonarActive}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"><i class="fas fa-users"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span><span class="whitespace-nowrap">Since last week</span></p> */}
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 class="text-blueGray-400 uppercase  text-xs">Deactive</h5>
                        <span class=" text-xl">{overview?.totalDonarInactive}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#452a72]"><i class="fa-solid fa-book"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span><span class="whitespace-nowrap">Since last week</span></p> */}
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 class="text-blueGray-400 uppercase  text-xs">Verified</h5>
                        <span class=" text-xl">{overview?.totalDonarVerified}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#452a72]"><i class="fa-solid fa-book"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span><span class="whitespace-nowrap">Since last week</span></p> */}
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 class="text-blueGray-400 uppercase  text-xs">Unverified</h5>
                        <span class=" text-xl">{overview?.totalDonarUnVerfied || 0}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#452a72]"><i class="fa-solid fa-book"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span><span class="whitespace-nowrap">Since last week</span></p> */}
                  </div>
                </div>
              </div>



            </div>
            <div class="flex flex-wrap md:gap-y-4 mt-4" >
              <div className="w-full md:px-4 text-xl">Student Overview</div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1 cursor-pointer" onClick={() => navigate('/admin/students')}>
                        <h5 class="text-blueGray-400 uppercase  text-xs">Total</h5>
                        <span class=" text-xl">{overview?.totalStudent}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"><i class="far fa-chart-bar"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-emerald-500 mr-2"><i class="fas fa-arrow-up"></i> 3.48%</span><span class="whitespace-nowrap">Since last month</span></p> */}
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 class="text-blueGray-400 uppercase  text-xs">Active</h5>
                        <span class=" text-xl">{overview?.totalStudentActive}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"><i class="fas fa-users"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span><span class="whitespace-nowrap">Since last week</span></p> */}
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 class="text-blueGray-400 uppercase  text-xs">Deactive</h5>
                        <span class=" text-xl">{overview?.totalStudentInactive}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#452a72]"><i class="fa-solid fa-book"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span><span class="whitespace-nowrap">Since last week</span></p> */}
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 class="text-blueGray-400 uppercase  text-xs">Verified</h5>
                        <span class=" text-xl">{overview?.totalStudentVerified}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#452a72]"><i class="fa-solid fa-book"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span><span class="whitespace-nowrap">Since last week</span></p> */}
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 class="text-blueGray-400 uppercase  text-xs">Unverified</h5>
                        <span class=" text-xl">{overview?.totalStudentUnVerified || 0}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#452a72]"><i class="fa-solid fa-book"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span><span class="whitespace-nowrap">Since last week</span></p> */}
                  </div>
                </div>
              </div>



            </div>
            <div className="flex flex-wrap md:gap-y-4 mt-4">
              <div className="w-full md:px-4 text-xl">Scholarships Overview</div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 class="text-blueGray-400 uppercase  text-xs">Total Scholarship</h5>
                        <span class=" text-xl">{overview?.totalScholarship || 0}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500"><i class="fas fa-chart-pie"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-orange-500 mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span><span class="whitespace-nowrap">Since last Month</span></p> */}
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1 cursor-pointer" onClick={() => navigate('/admin/manual-scholarship-history')}>
                        <h5 class="text-blueGray-400 uppercase  text-xs">Manual ScholarShip</h5>
                        <span class=" text-xl">{overview?.manualScholarship || 0}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-purple-500"><i class="fas fa-users"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-orange-500 mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span><span class="whitespace-nowrap">Since last Month</span></p> */}
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div class="relative w-full pr-4 max-w-full flex-grow flex-1 cursor-pointer" onClick={() => navigate('/admin/automatic-scholarship-history')}>
                        <h5 class="text-blueGray-400 uppercase  text-xs">Automatic ScholarShip</h5>
                        <span class=" text-xl">{overview?.automaticScholarship || 0}</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#293770]"><i class="fa-solid fa-book"></i></div>
                      </div>
                    </div>
                    {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-orange-500 mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span><span class="whitespace-nowrap">Since last Month</span></p> */}
                  </div>
                </div>
              </div>
            </div>



          </div>
          <div className="flex flex-wrap md:gap-y-4 mt-4">
            <div className="w-full md:px-4 text-xl">Donnation Overview</div>
            <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
              <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div class="relative w-full pr-4 max-w-full flex-grow flex-1 cursor-pointer" onClick={() => navigate('/admin/donation-history')}>
                      <h5 class="text-blueGray-400 uppercase  text-xs">Total Donnation Received</h5>
                      <span class=" text-xl">{overview?.totalDonation || 0}</span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500"><i class="fas fa-chart-pie"></i></div>
                    </div>
                  </div>
                  {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-orange-500 mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span><span class="whitespace-nowrap">Since last Month</span></p> */}
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
              <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 class="text-blueGray-400 uppercase  text-xs">Total Donation Distributed</h5>
                      <span class=" text-xl">{overview?.totalDonationDistribute || 0}</span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-purple-500"><i class="fas fa-users"></i></div>
                    </div>
                  </div>
                  {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-orange-500 mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span><span class="whitespace-nowrap">Since last Month</span></p> */}
                </div>
              </div>
            </div>
            {/* <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
              <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 class="text-blueGray-400 uppercase  text-xs">Total Expense</h5>
                      <span class=" text-xl">{overview?.remainingDonationAmount || 0}</span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-purple-500"><i class="fas fa-users"></i></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
              <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 class="text-blueGray-400 uppercase  text-xs">Remaining Scholar Amount</h5>
                      <span class=" text-xl">{overview?.remainingDonationAmount}</span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-purple-500"><i class="fas fa-users"></i></div>
                    </div>
                  </div>
                  {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-orange-500 mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span><span class="whitespace-nowrap">Since last Month</span></p> */}
                </div>
              </div>
            </div>

          </div>
          <div className="flex flex-wrap md:gap-y-4 mt-4">
            <div className="w-full md:px-4 text-xl">Documents Overview</div>
            <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
              <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div class="relative w-full pr-4 max-w-full flex-grow flex-1 cursor-pointer" onClick={() => navigate('/admin/document-history')}>
                      <h5 class="text-blueGray-400 uppercase  text-xs">Total</h5>
                      <span class=" text-xl">{overview?.totalDocument || 0}</span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500"><i class="fas fa-chart-pie"></i></div>
                    </div>
                  </div>
                  {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-orange-500 mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span><span class="whitespace-nowrap">Since last Month</span></p> */}
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
              <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 class="text-blueGray-400 uppercase  text-xs">Verified</h5>
                      <span class=" text-xl">{overview?.totalDocumentVerified || 0}</span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-purple-500"><i class="fas fa-users"></i></div>
                    </div>
                  </div>
                  {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-orange-500 mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span><span class="whitespace-nowrap">Since last Month</span></p> */}
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 md:px-4">
              <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 class="text-blueGray-400 uppercase  text-xs">Unverified</h5>
                      <span class=" text-xl">{overview?.totalDocumentUnverified || 0}</span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-purple-500"><i class="fas fa-users"></i></div>
                    </div>
                  </div>
                  {/* <p class="text-sm text-blueGray-500 mt-4"><span class="text-orange-500 mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span><span class="whitespace-nowrap">Since last Month</span></p> */}
                </div>
              </div>
            </div>

          </div>

          {/* </div> */}
        </div>
      </div >
      <ToastContainer />


      {/* <div className="mb-4 px-1 md:px-3 my-3 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
          <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
            <div>
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">Plans</h6>
              <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-[#452a72]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-[#452a72]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                </svg>
                <strong>3000 sale</strong> total
              </p>
            </div>
            <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase n-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                </svg>
              </span>
            </button>
          </div>
          <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase -gray-400">plans</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase -gray-400">members</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase -gray-400">sale</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase -gray-400">Average</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, index) => (
                  <tr key={index}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <img
                          src="https://cdn.tuk.dev/assets/templates/olympus/projects.png"
                          alt="Material XD Version"
                          className="inline-block relative object-cover object-center w-9 h-9 rounded-md"
                        />
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 ">
                          {plan.name}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-xs font-medium text-[#452a72]">
                        {plan.members}
                      </p>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-xs font-medium text-[#452a72]">
                        {plan.sale}
                      </p>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="w-10/12">
                        <p className="antialiased font-sans mb-1 block text-xs font-medium text-[#452a72]">
                          {plan.average}
                        </p>
                        <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                          <div
                            className="flex justify-center items-center h-full bg-gradient-to-tr from-[#7963a7] to-[#452a72] text-white"
                            style={{ width: plan.average }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-2">
              Notifications
            </h6>
            <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-[#452a72]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                aria-hidden="true"
                className="h-3.5 w-3.5 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                ></path>
              </svg>
              <strong>24%</strong> this month
            </p>
          </div>
          <div className="p-6 pt-0">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-4 py-3">
                <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] after:h-4/6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="!w-5 !h-5 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="antialiased font-sans text-sm leading-normal text-blue-gray-900 block font-medium">
                    {notification.text}
                  </p>
                  <span className="block antialiased font-sans text-xs font-medium text-blue-gray-500">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div> */}







    </>
  );
}
