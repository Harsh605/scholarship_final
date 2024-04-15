import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import caret from '../../Images/caret-down.png'
import className from 'classnames'
import { TrashIcon, UserIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/solid";

import {
  IconButton,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import EditScheme from './EditScheme';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { startCase } from 'lodash';
import '../../ComponentCss.css'
import { AnnualIncome2DropDown, CityState2DropDown, Country2DropDown, DatePicker, InputSearch, handleUnAuthorized } from '../../hook/handleUnauthorized';

const BlogTable = () => {
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

  const handleDltMember = (id) => {
    // Handle deleting member
  };
  const members = []
  const getUser = async () => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      let query = {
        // startDate: search.startDate,
        // endDate: search.endDate,
        // keyword: search.keyword,
        // country: search.country,
        // city: search.city,
        // state: search.state,
        // annualIncome: search.annualIncome,
        // sortKey: sortingState.sortBy,
        // sortType: sortingState.sortType
      }
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog-list`, { params: query, headers: { Authorization: adminToken } });
      if (data.data.success) {
        setUser(data.data.data)
      } else {
        handleUnAuthorized(data.data.msg, navigate)
      }
      // setUser(jwt_decode(token));
    } else {
      navigate('/login')
      // localStorage.removeItem('token')
    }
  }

  const handleSort = (e, sortType, state) => {
    setSortingState({ sortBy: e.target.name, sortType })
    setSort({ [state]: true })
  }

  const handleChange = async (status, item) => {
    const adminToken = localStorage.getItem('adminToken') || ''
    if (adminToken) {
      const payload = {
        status: status ? 'active' : 'inactive'
      }
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/admin/change-user-status/${item.id}`, payload, { headers: { Authorization: adminToken } });
      console.log("data.data.msg", data)
      if (data.data.success) {
        toast.success(data.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-success'
        });
        // getUser()
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
          {/* <DatePicker search={search} setSearch={setSearch} />
          <InputSearch search={search} setSearch={setSearch} msg={"Search..."} />
          <Country2DropDown search={search} setSearch={setSearch} />
          <AnnualIncome2DropDown search={search} setSearch={setSearch} msg={"Select Annual Income"} /> */}
        </div>
        <div className="mb-4 flex justify-end">
          {/* <CityState2DropDown search={search} setSearch={setSearch} type={'city'} />
          <CityState2DropDown search={search} setSearch={setSearch} type={'state'} /> */}
        </div>
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">S.No.</th>
              <th className="font-normal text-left pl-12">
                Title
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='email' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.emailUpArrow })} onClick={(e) => handleSort(e, 'asc', 'emailUpArrow')} />
                  <img name='email' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.emailDownArrow })} onClick={(e) => handleSort(e, 'desc', 'emailDownArrow')} />
                </button> */}
              </th>
              <th className="font-normal text-left pl-12">
                Description
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='email' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.emailUpArrow })} onClick={(e) => handleSort(e, 'asc', 'emailUpArrow')} />
                  <img name='email' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.emailDownArrow })} onClick={(e) => handleSort(e, 'desc', 'emailDownArrow')} />
                </button> */}
              </th>
              {/* <th className="font-normal text-left pl-12">
                Is Verified */}
              {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='city' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.cityUpArrow })} onClick={(e) => handleSort(e, 'asc', 'cityUpArrow')} />
                  <img name='city' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.cityDownArrow })} onClick={(e) => handleSort(e, 'desc', 'cityDownArrow')} />
                </button> */}
              {/* </th> */}
              <th className="font-normal text-left pl-12">Date
                {/* <button className='ml-1' style={{ width: "1.5rem", height: "1.2rem", backgroundColor: "white" }}>
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5 rotate-180 ', { 'opacity-20': sort.createdAtUpArrow })} onClick={(e) => handleSort(e, 'asc', 'createdAtUpArrow')} />
                  <img name='createdAt' src={caret} alt='' className={className('w-2.5', { 'opacity-20': sort.createdAtDownArrow })} onClick={(e) => handleSort(e, 'desc', 'createdAtDownArrow')} />
                </button> */}
              </th>
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
                      className="w-10 h-10"
                    >
                      {index + 1}
                    </div>
                  </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-25 h-10"
                  >
                    {item?.title || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-25 h-10"
                    style={{ color: 'black!important'}}
                    dangerouslySetInnerHTML={{ __html: item?.description?.split('">')[1]?.slice(0, 60) || <p style={{ color: 'black'}}>{'N/A'}</p>}}
                  >
                  </div>
                </div>
                </td>
                {/* <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.city || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.state || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.country || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.occupation || 'N/A'}
                  </div>
                </div>
                </td>
                <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item.designation || 'N/A'}
                  </div>
                </div>
                </td> */}
                {/* <td className="pl-12"><div className="flex items-center">
                  <div
                    className="w-10 h-10"
                  >
                    {item?.isVerified ? 'verified' : 'notverified'}
                  </div>
                </div>
                </td> */}
                <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-23 h-10"
                    >
                      {item?.createdAt || 'N/A'}
                    </div>
                  </div>
                </td>
                {/* <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      <label class="switch small">
                        <input type="checkbox" id="toggle" checked={item.status === 'active'} onClick={(e) => handleChange(e.target.checked, item)} style={{ margin: '4px' }} />
                        <span class="slider"></span>
                      </label>
                    </div>
                  </div>
                </td> */}
                {/* <td className="pl-12">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10"
                    >
                      {item.status || 'N/A'}
                    </div>
                  </div>
                </td> */}


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
                          onClick={() => navigate('/admin/edit-donar', { state: { userId: item.id } })}
                        >
                          <PencilIcon className="h-4 w-4" />
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

export default BlogTable;
