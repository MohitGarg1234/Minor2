import React from 'react'
import Logo from "../images/Logo-jiit.png";

const Message = () => {
  return (
    <>
    <div className="container w-11/12 mx-auto">
        <div className="flex items-center gap-4 mb-4">
            <img className="w-10 h-10 rounded-full mx-2" src={Logo} alt=""/>
            <div className="font-medium dark:text-white">
                <div>Chiranshu Agrawal</div>
            </div>
        </div>
        
        <form>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                    <label htmlFor="editor" className="sr-only">Publish post</label>
                    <textarea id="editor" rows="8" className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write an article..." required ></textarea>
                </div>
            </div>
            
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white " htmlFor="file_input">Upload file</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4" id="file_input" type="file"/>

            <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Send Request
            </button>
        </form>
        </div>

    </>

  )
}

export default Message
