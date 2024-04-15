import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function AnswerTheQuestion() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => { });

  const handleBack = () => {
    navigate("/doctor/questions");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submit logic or API call here
  };


  return (
    <>
      <div className="px-0 py-0 ">
        <div className="flex flex-no-wrap items-start">
          <div className="w-full ">
            <div className="py-4 px-2">
              <div className="bg-white rounded shadow py-7">
                <div className="mt-10 px-7">

                  <form onSubmit={handleSubmit}>

                    <div>
                      <p className="px-1 text-base font-medium leading-none text-gray-800">
                        Q.   What is Your Name ?
                      </p>
                  
                    </div>
                    <div className="pt-6 border-gray-300 mt-2 px-2">
                      <p className="text-base font-semibold leading-4 text-gray-800">
                        Ans.
                      </p>
                      <div className="mt-5 border border-gray-300 rounded">
                        <textarea
                          className="resize-none w-full h-[100px] px-4 py-4 text-base outline-none text-slate-600"
                          placeholder="Start typing here ..."
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                        />
                      </div>
                    </div>



                    <hr className="h-[1px] bg-gray-100 my-14" />
                    <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                      <button
                        onClick={handleBack}
                        className="bg-white border-[#452a72] rounded hover:bg-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-[#452a72] hover:text-white border lg:max-w-[95px]  w-full "
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-[#452a72] rounded  border border-[#452a72] transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  lg:max-w-[144px] w-full "
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}




export default AnswerTheQuestion