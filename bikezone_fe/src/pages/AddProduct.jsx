import React, { useState } from 'react';

function AddProduct() {

    return (
        <div className=" shadow-md rounded px-8 pt-2 pb-8 bg-[#def5f596]">
            <div className="max-w-4xl p-6 mx-auto bg-[#aaeeee] rounded-md shadow-md dark:bg-gray-800 mt-10">
                <h1 className="text-xl mb-4 font-bold text-black capitalize dark:text-white">Post Your Product</h1>
                <form>
                    <div className="grid grid-cols-1 gap-6 mt- sm:grid-cols-2">
                        <div>
                            <label className="text-black dark:text-gray-200" htmlFor="username">Product Name</label>
                            <input id="username" type="text" placeholder='Enter your product name' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-black dark:text-gray-200" htmlFor="emailApriceddress">Price (Rs)</label>
                            <input id="price" placeholder='Enter price e.g. 500' type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                      
                        <div>
                            <label className="text-black dark:text-gray-200" htmlFor="passwordConfirmation">Category</label>
                            <select value={""} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <option value="" disabled hidden>Select Category</option>
                                <option>Asseccories</option>
                                <option>parts</option>
                                <option>engine</option>
                                <option>gear</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-black dark:text-gray-200" htmlFor="passwordConfirmation">Category</label>
                            <select value={""} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <option value="" disabled hidden>Select Brand</option>
                                <option>Honda</option>
                                <option>Suzuki</option>
                                <option>Road Prince</option>
                                <option>United</option>
                            </select>
                        </div>
                      
                        <div>
                            <label className="text-black dark:text-gray-200" htmlFor="passwordConfirmation">Description</label>
                            <textarea id="textarea" placeholder='Enter product description'  type="textarea" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} />
                        </div>
                        <label htmlFor='file-upload'>
                            <label className="block text-sm font-medium text-black">
                                Image
                            </label>
                            <div  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-black border-dashed rounded-md">
                                <div  className="space-y-1 text-center">
                                    <svg h className="mx-auto h-12 w-12 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer px-[2px] py-[1px] bg-white font-medium text-black hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span className>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1 text-black">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-black">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-[#122222] rounded-md  focus:outline-none focus:bg-gray-600">Upload</button>
                    </div>
                </form>
            </div>
          
        </div>

    );
}

export default AddProduct;
