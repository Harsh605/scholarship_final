import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router'
import DocumentRequiredTable from "./Component/DocumentRequiredTable";

function DocumentRequired() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    return (
        <>
            <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Documents Required</p>
                        <div>
                            <button onClick={() => setOpen2(true)} className="inline-flex text-white sm:ml-3 mt-4 sm:mt-0 items-center justify-center px-6 py-3 bg-[#452a72]  border border-[#452a72]  focus:outline-none rounded">
                                <p className="text-sm font-medium leading-none">Uploads Document</p>
                            </button>
                        </div>

                    </div>
                </div>
                <DocumentRequiredTable setOpen={setOpen} setOpen2={setOpen2} open={open} open2={open2} />
            </div>
        </>
    );
}

export default DocumentRequired;
