import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import caret from '../../Images/caret-down.png'
import className from 'classnames'
import { TrashIcon, UserIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/solid";


// import '../../ComponentCss.css'

import {
  IconButton,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import EditScheme from './EditScheme';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { startCase } from 'lodash';
import { AnnualIncome2DropDown, CityState2DropDown, DatePicker, InputSearch, PercentageDropDown, ResetButton, ScholarshipRecieveDropDown, StatusDropDown, handleUnAuthorized } from '../../hook/handleUnauthorized';

const StudentTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [open2, setOpen2] = useState(false)
  const [user, setUser] = useState([])
  const [item, setItem] = useState({})
  const [edit, setEdit] = useState(false)
  const [search, setSearch] = useState({})
  const [sort, setSort] = useState({ createdAtUpArrow: true })
  const [sortingState, setSortingState] = useState({
    sortBy: 'createdAt',
    sortType: 'desc'
  })
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const handleMakeAdmin = (data) => {
    // Handle making member admin
    setEdit(true)
    setItem(data)
    setOpen2(true)
  };

  const handleSort = (e, sortType, state) => {
    setSortingState({ sortBy: e.target.name, sortType })
    setSort({ [state]: true })
  }

  const handleDltMember = (id) => {
    // Handle deleting member
  };
  const members = []
  const getUser = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      let query = {
        startDate: search.startDate,
        endDate: search.endDate,
        keyword: search.keyword,
        scholarshipRecieveStatus: search.scholarshipRecieveStatus,
        status: search.status,
        percentage: search.percentage,
        city: search.city,
        state: search.state,
        annualIncome: search.annualIncome,
        sortKey: sortingState.sortBy,
        sortType: sortingState.sortType
      }
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/student-list`, { params: query, headers: { Authorization: adminToken } });
      if (data.data.success) {
        setUser(data.data.data.userList)
      } else {
        handleUnAuthorized(data.data.msg, navigate)
      }
      // setUser(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }

  const handleChange = async (status, item) => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      const payload = {
        status: status ? 'active' : 'inactive'
      }
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/change-user-status/${item.id}`, payload, { headers: { Authorization: adminToken } });
      if (data.data.success) {
        toast.success(data.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
        getUser()
      } else {
        handleUnAuthorized(data.data.msg, navigate)
      }
      // setUser(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }

  useEffect(() => {
    getUser()
  }, [search, sortingState])

  return (
    <>
      <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <div className="mb-0 flex justify-end">
          <DatePicker search={search} setSearch={setSearch} />
          <InputSearch search={search} setSearch={setSearch} msg={"Student Name"} />
          <StatusDropDown search={search} setSearch={setSearch} />
          <ScholarshipRecieveDropDown search={search} setSearch={setSearch} />
          <AnnualIncome2DropDown search={search} setSearch={setSearch} msg={"Select Family Annual Income"} />
        </div>
        <div className='mb-4 flex justify-end'>
          <ResetButton search={search} setSearch={setSearch} />
          <PercentageDropDown search={search} setSearch={setSearch} msg={"Select Percentage"} />
          <CityState2DropDown search={search} setSearch={setSearch} type={'city'} />
          <CityState2DropDown search={search} setSearch={setSearch} type={'state'} />
        </div>
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">S.No.</th>
              <th className="font-normal text-left pl-4">Student Name
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='name' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.nameUpArrow })} onClick={(e) => handleSort(e, 'asc', 'nameUpArrow')} />
                  <img name='name' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.nameDownArrow })} onClick={(e) => handleSort(e, 'desc', 'nameDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Student ID
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='id' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.idUpArrow })} onClick={(e) => handleSort(e, 'asc', 'idUpArrow')} />
                  <img name='id' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.idDownArrow })} onClick={(e) => handleSort(e, 'desc', 'idDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Mobile No.
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='mobile' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.mobileUpArrow })} onClick={(e) => handleSort(e, 'asc', 'mobileUpArrow')} />
                  <img name='mobile' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.mobileDownArrow })} onClick={(e) => handleSort(e, 'desc', 'mobileDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Email Id
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='email' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.emailUpArrow })} onClick={(e) => handleSort(e, 'asc', 'emailUpArrow')} />
                  <img name='email' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.emailDownArrow })} onClick={(e) => handleSort(e, 'desc', 'emailDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">City
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='city' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.cityUpArrow })} onClick={(e) => handleSort(e, 'asc', 'cityUpArrow')} />
                  <img name='city' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.cityDownArrow })} onClick={(e) => handleSort(e, 'desc', 'cityDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">State
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='state' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.stateUpArrow })} onClick={(e) => handleSort(e, 'asc', 'stateUpArrow')} />
                  <img name='state' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.stateDownArrow })} onClick={(e) => handleSort(e, 'desc', 'stateDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Country
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='country' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.countryUpArrow })} onClick={(e) => handleSort(e, 'asc', 'countryUpArrow')} />
                  <img name='country' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.countryDownArrow })} onClick={(e) => handleSort(e, 'desc', 'countryDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Higher Class Percentage
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='higherClassPercentage' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.higherClassPercentageUpArrow })} onClick={(e) => handleSort(e, 'asc', 'higherClassPercentageUpArrow')} />
                  <img name='higherClassPercentage' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.higherClassPercentageDownArrow })} onClick={(e) => handleSort(e, 'desc', 'higherClassPercentageDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Pursing Class
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='pursuingClass' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.pursuingClassUpArrow })} onClick={(e) => handleSort(e, 'asc', 'pursuingClassUpArrow')} />
                  <img name='pursuingClass' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.pursuingClassDownArrow })} onClick={(e) => handleSort(e, 'desc', 'pursuingClassDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Year
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='year' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.yearUpArrow })} onClick={(e) => handleSort(e, 'asc', 'yearUpArrow')} />
                  <img name='year' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.yearDownArrow })} onClick={(e) => handleSort(e, 'desc', 'yearDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Family Annual Income
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='annualIncome' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.annualIncomeUpArrow })} onClick={(e) => handleSort(e, 'asc', 'annualIncomeUpArrow')} />
                  <img name='annualIncome' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.annualIncomeDownArrow })} onClick={(e) => handleSort(e, 'desc', 'annualIncomeDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-12">Status</th>
              <th className="font-normal text-left pl-12">Scholorship Receive
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='scholarshipRecieve' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.scholarshipRecieveUpArrow })} onClick={(e) => handleSort(e, 'asc', 'scholarshipRecieveUpArrow')} />
                  <img name='scholarshipRecieve' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.scholarshipRecieveDownArrow })} onClick={(e) => handleSort(e, 'desc', 'scholarshipRecieveDownArrow')} />
                </button>
              </th>
              {/* <th className="font-normal text-left pl-16">Edit/ detail</th> */}
              <th className="font-normal text-left pl-16">Date
                <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.createdAtUpArrow })} onClick={(e) => handleSort(e, 'asc', 'createdAtUpArrow')} />
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.createdAtDownArrow })} onClick={(e) => handleSort(e, 'desc', 'createdAtDownArrow')} />
                </button>
              </th>
              <th className="font-normal text-left pl-16">Block user</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {user.map((item, index) => (
              <tr
                key={index}
                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
              >
                <td className="pl-4 cursor-pointer">
                  <div className="flex items-center">
                    <div
                      className="w-5 h-10"
                    >
                      {index + 1}
                    </div>
                  </div>
                </td>
                <td className="pl-4">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.name || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.id || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.mobile || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-25 h-10"
                  >
                    {item.email || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-20 h-10"
                  >
                    {item.city || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-20 h-10"
                  >
                    {item.state || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-20 h-10"
                  >
                    {item.country || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-20 h-10"
                  >
                    {item.higherClassPercentage || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-20 h-10"
                  >
                    {item.pursuingClass || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-20 h-10"
                  >
                    {item.year || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-20 h-10"
                  >
                    {item.annualIncome || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-20 h-10"
                  >
                    <span style={{ backgroundColor: item.scholarshipStatus === 'verified' ? 'green' : 'red', color: 'white', padding: '4px' }}>{startCase(item.scholarshipStatus) || 'N/A'}</span>
                  </div>
                </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      <span style={{ backgroundColor: item.scholarshipRecieve === 'yes' ? 'green' : 'red', color: 'white', padding: '4px' }}>{item?.scholarshipRecieve ? startCase(item.scholarshipRecieve) : 'N/A'}</span>
                    </div>
                  </div>
                </td>
                {/* <td className="" style={{ paddingLeft: '4rem' }}>
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item?.editDetail || 'N/A'}
                    </div>
                  </div>
                </td> */}
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-25 h-10"
                    >
                      {item.createdAt || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {/* <Switch
                        checked={item.status === 'active'}
                        onChange={(e) => console.log(item, "abcd")}
                        onClick={(e) => console.log(item, "abcd1")}
                        inputProps={{ 'aria-label': 'controlled' }}
                      /> */}
                      <label class="switch small">
                        <input type="checkbox" id="toggle" checked={item.status === 'active'} onClick={(e) => handleChange(e.target.checked, item)} style={{ margin: '4px' }} />
                        <span class="slider"></span>
                      </label>
                    </div>
                  </div>
                </td>

                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      <Tooltip content="Edit">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => navigate('/admin/edit-student', { state: { userId: item.id } })}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </td>

                {/* <td className="pl-16">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {member.createdAt}
                  </p>
                </td> 
                <Tooltip content="Delete member">
                <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => handleDltMember(member.id)}
                >
                <ViewfinderCircleIcon className="h-5 w-5" />
                </IconButton>
              </Tooltip>*/}
                {/* <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      <Tooltip content="Edit">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => handleMakeAdmin(item)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </td> */}

              </tr>
            ))}
          </tbody>
        </table>
        {user.length === 0 && <div className='border p-2' style={{ textAlign: 'center' }}>
          No Data Found.
        </div>}

        {/* <div className="flex justify-center mt-5">
          <div className="flex">
            <p className="text-[#452a72] pt-3">Total Pages -</p>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-3 py-1 text-sm font-medium mx-1 rounded-md focus:outline-none ${currentPage === index + 1
                  ? 'bg-[#452a72] text-white'
                  : 'text-[#452a72]'
                  }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default StudentTable;
