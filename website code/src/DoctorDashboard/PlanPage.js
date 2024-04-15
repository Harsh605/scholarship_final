import React from "react";
import Pricing from "../Pages/Pricing";
import DashboardPricing from "./Component/DashboardPricing";
function PlanPage() {
    return (
        <>
            <div className="w-full bg-gray-200 dark:bg-gray-900 py-2 sm:py-3">
                <div className="container mx-auto px-0 sm:px-3  flex items-start justify-center">
                    <div className="w-full">
                        {/* Card is full width. Use in 12 col grid for best view. */}
                        {/* Card code block start */}
                        <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 shadow rounded">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                                <h1 className="mr-12 text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold lg:w-1/2">Tesla Pro Version</h1>
                                <div className="flex flex-col md:flex-row items-start md:items-center">
                                    <div className="mt-4 lg:mt-0 mr-0 xl:mr-8 text-sm bg-[#bac3df] text-[#452a72] dark:text-[#452a72] rounded font-medium py-2 w-48 flex justify-center">Start Date: 22 Jun, 2020</div>
                                    <div className="mt-4 lg:mt-0 mr-0 lg:mr-4 xl:mr-8 text-sm bg-red-100 text-red-500 rounded font-medium py-2 w-48 flex justify-center">End Date: 03 Dec, 2020</div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row items-start lg:items-center">
                                <div className="w-full lg:w-1/2 pr-0 lg:pr-48">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded">
                                            <img className="w-full h-full overflow-hidden object-cover rounded object-center" src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_28.png" alt="logo" />
                                        </div>
                                        <div className="ml-2">
                                            <h5 className="text-gray-800 dark:text-gray-100 font-medium text-base">Tesla Pro Version</h5>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs font-normal">Paid- 250 $</p>
                                        </div>
                                    </div>
                                    <ul className="flex flex-col mb-6 mt-5 text-gray-600 dark:text-gray-400">
                                        <li className="flex items-center mb-1">
                                            <img src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png" class="mr-4" alt="check-mark" />
                                            <p className=" text-base font-normal">24/7 access</p>
                                        </li>
                                        <li className="flex items-center mb-1">
                                            <img src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png" class="mr-4" alt="check-mark" />
                                            <p className="text-base font-normal">Order labs + Results</p>
                                        </li>
                                    </ul>
                                    <button className="bg-[#452a72] font-medium transition duration-150 ease-in-out  rounded text-white  px-6 py-2 text-sm border border-[#452a72] ] focus:outline-none">Upgrade Plan</button>

                                </div>
                                <div className="lg:pl-8 w-full lg:w-1/2 flex flex-col lg:flex-row items-start lg:items-center">
                                    <div className="mr-12 flex lg:block items-center lg:mr-6 xl:mr-12 mt-5 lg:mt-0">
                                        <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl lg:text-2xl leading-6 mb-1 lg:text-center">30</h2>
                                        <p className="ml-2 lg:ml-0 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">Total Days</p>
                                    </div>
                                    <div className="mr-12 flex lg:block lg:mr-6 xl:mr-12 mt-5 lg:mt-0">
                                        <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl lg:text-2xl leading-6 mb-1 lg:text-center">10</h2>
                                        <p className="ml-2 lg:ml-0 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">Expired in</p>
                                    </div>
                                    <div className="mt-5 flex lg:block lg:mt-0">
                                        <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl lg:text-2xl leading-6 mb-1 lg:text-center">Live</h2>
                                        <p className="ml-2 lg:ml-0 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">Status</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Card code block end */}
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-900 py-2 sm:py-3 ">
                <div className="container mx-auto  px-0 sm:px-3  flex items-start justify-center">
                    <div className="w-full">
                        {/* Card is full width. Use in 12 col grid for best view. */}
                        {/* Card code block start */}
                        <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 shadow rounded">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                                <h1 className="mr-12 text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold lg:w-1/2">Other Plans</h1>

                            </div>
                            <div className="flex flex-col lg:flex-row items-start lg:items-center">
                                <DashboardPricing />
                            </div>
                        </div>
                        {/* Card code block end */}
                    </div>
                </div>
            </div>
        </>
    );
}
export default PlanPage;
