import React from 'react'
import Logo from "../images/Logo-jiit.png";
import { Link } from "react-router-dom";
const JobOpening = () => {
  return (
    <>
    <div className="flex justify-center">
        <Link
            to="/jobopeningpage"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
            <button id="postJobBtn" className="relative bg-blue-500 text-white font-semibold py-2 px-8 rounded-full flex items-center space-x-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="11" strokeWidth="2" stroke="white" fill="none" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span className="ml-10">Post a Job</span>
            </button>
        </Link>  
    </div>

    <div className="flex">
        <form className="max-w-md mx-auto">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="mb-2 block w-72 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Alumini" required />
            </div>
        </form>

        <form className="max-w-xl mx-auto ">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative ">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                    <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 4a2 2 0 1 0 0 4h8a2 2 0 1 0 0-4H6ZM4 10a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="mb-2 block w-72 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Apply Filter" required />
            </div>
        </form>
    </div>

    <div className='container'>
        <div className='mx-auto w-1/2'>
            <a href="#" className="mb-3 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row xl:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="ml-4 mr-2 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={Logo} alt=""/>
                <div className="mx-auto w-4/6">
                    <div className="flex-col p-4 leading-normal bg-gray-200 rounded-lg">
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Chiranshu Agrawal</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Graduation Year- 2025</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Profile- Software Developer II</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Company- Apni Company</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Experience- 5 Years</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Past Experience- hai hi nhu</h6>
                    </div>
                </div>

            </a>
        </div>

        <div className='mx-auto w-1/2'>
            <a href="#" className="mb-3 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row xl:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="ml-4 mr-2 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={Logo} alt=""/>
                <div className="mx-auto w-4/6">
                    <div className="flex-col p-4 leading-normal bg-gray-200 rounded-lg">
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Chiranshu Agrawal</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Graduation Year- 2025</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Profile- Software Developer II</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Company- Apni Company</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Experience- 5 Years</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Past Experience- hai hi nhu</h6>
                    </div>
                </div>
            </a>
        </div>

        <div className='mx-auto w-1/2'>
            <a href="#" className="mb-3 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl lg:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="ml-4 mr-2 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={Logo} alt=""/>
                <div className="mx-auto w-4/6">
                    <div className="flex-col p-4 leading-normal bg-gray-200 rounded-lg">
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Chiranshu Agrawal</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Graduation Year- 2025</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Profile- Software Developer II</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Company- Apni Company</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Experience- 5 Years</h6>
                        <h6 className="m-2 font-bold tracking-tight text-gray-900 dark:text-white">Past Experience- hai hi nhu</h6>
                    </div>
                </div>
            </a>
        </div>


    </div>
    </>

  )
}

export default JobOpening
