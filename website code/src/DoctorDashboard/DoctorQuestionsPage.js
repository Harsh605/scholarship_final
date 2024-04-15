
import React, { useState } from "react";
import { useNavigate } from 'react-router'
import MyQuestionsTable from "../PatientDashboard/Component/MyQuestionsTable";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'; // Import Material-UI components
import InfoIcon from '@mui/icons-material/Info';

function DoctorQuestionsPage() {
    const navigate = useNavigate()
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    
    const [showReplied, setShowReplied] = useState(false); // New state variable for filtering

    const toggleShowReplied = () => {
        setShowReplied((prevShowReplied) => !prevShowReplied);
    };

    const handleDltNote = () => { };

    const handleEditNote = (id) => {
        navigate(`${id}/edit`)

    };
    const handleToggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    // Array of post data
    const questions = [
        {
            id: 1,
            question: 'How to treat himself ?',
            category: "category 1",
            status: 'Pending',
            AskedBy: "Harsh",
            createdAt: '20/03/23',
            repliedBy: [
                {
                    name: "YourName",

                },
                {
                    name: "shivam",

                }
            ]
        },
        {
            id: 1,
            question: 'How to treat himself ?',
            category: "category 1",
            status: 'Pending',
            AskedBy: "Harsh",
            createdAt: '20/03/23',
            repliedBy: [
                {
                    name: "MyName",

                },
                {
                    name: "shivam",

                }
            ]
        },

        // Add more post objects as needed
    ];

    const filteredQuestions = questions.filter((cur) => {
        if (showReplied) {
            return cur.repliedBy.some(person => person.name === "YourName"); // Replace "YourName" with your actual name
        }
        if (startDate && endDate) {
            const questionDate = new Date(cur.createdAt.replace(/(\d{2})\/(\d{2})\/(\d{2})/, '20$3-$2-$1'));
            const filterStartDate = new Date(startDate);
            const filterEndDate = new Date(endDate);
            return questionDate >= filterStartDate && questionDate <= filterEndDate;
        }
        return true;
    });

    return (
        <>
            <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Questions</p>
                        <div>
                           

                            <div className="flex items-center space-x-4 mb-4">
                                <input
                                    type="date"
                                    className="border p-2"
                                    id="startDate"
                                    value={startDate || ''}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="border p-2"
                                    id="endDate"
                                    value={endDate || ''}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                                <button
                                    className={`px-4 py-2 bg-[#452a72] text-white rounded ${showReplied ? 'bg-[#452a72]' : 'bg-[#452a72]'}`}
                                    onClick={toggleShowReplied}
                                >
                                    {showReplied ? 'Show All' : 'Replied By Me'}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-normal text-left pl-4">Question</th>
                                <th className="font-normal text-left pl-12">Category</th>
                                <th className="font-normal text-left pl-12">Asked By</th>
                                <th className="font-normal text-left pl-12">Created At</th>
                                <th className="font-normal text-left pl-12">Replied By</th>
                                <th className="font-normal text-left pl-12">I replied?</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {filteredQuestions.map((cur, index) => (
                                <tr
                                    key={cur.id}
                                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                                >

                                    <td className="px-0 2xl:px-0 mt-4 flex justify-center items-center">
                                        <p className="font-medium">{cur.question.slice(0, 25)}...</p>
                                        <Tooltip content="View Description">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => {
                                                    setSelectedQuestion(cur.id);
                                                    handleToggleDialog();
                                                }}
                                            >
                                                <InfoIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.category}
                                        </p>
                                    </td>


                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.AskedBy}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.createdAt}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.repliedBy.length > 0 ? `${cur.repliedBy.length} Peoples` : 'None'}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.repliedBy.name === "Harsh" ? `No` : 'Yes'}
                                        </p>
                                    </td>

                                    <td className="px-7 2xl:px-0">
                                        <Tooltip content="Answer this question">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => handleEditNote(cur.id)}
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Dialog open={isDialogOpen} onClose={handleToggleDialog}>
                        <DialogContent>
                            Q. {selectedQuestion && questions.find(note => note.id === selectedQuestion).question}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleToggleDialog}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    );
}

export default DoctorQuestionsPage;


