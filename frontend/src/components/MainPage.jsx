import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    sourcecode: "",
    stdin: "",
    lang: 53, // Default language
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/newcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessDialogOpen(true);
        console.log("Form submitted successfully!");
      } else {
        console.error("Form submission failed!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };
  return (
    <div>
      <div className="bg-black h-screen">
        <div className="w-[60%] h-24 flex mx-auto border-white border-2">
          <div className="w-[30%] text-center items-center flex justify-center border-white border-r-2">
            <h1 className="font-extrabold text-2xl text-white font-jetbrains">
              Jugaadu_Gist
            </h1>
          </div>
          <div className=" w-[50%] flex items-center justify-center">
            <div className="p-5 h-full w-[85%] flex justify-center items-center">
              <div className=" h-full w-[30%] flex items-center justify-center ">
                <h1 className="text-white font-bold font-jetbrains">
                  Username:
                </h1>
              </div>
              <div className=" h-full w-[70%] flex items-center justify-center">
                <input
                  className="p-2 ml-5 outline-none bg-black text-white placeholder:font-jetbrains font-jetbrains"
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div
            className="bg-white w-[20%] flex items-center justify-center hover:cursor-pointer"
            onClick={() => navigate("/code-list")}
          >
            <h1 className="text-black font-bold font-jetbrains ">
              See Code List
            </h1>
          </div>
        </div>
        <div className=" mx-auto mt-8 pb-5  w-[85%] h-[75%] flex justify-center items-center">
          <div className="h-full w-[60%] ">
            <div className=" h-[10%] w-full flex justify-between">
              <div className=" h-full w-[50%] flex items-center pl-4 font-jetbrains">
                <h1 className="text-white">Source Code</h1>
              </div>
              <div className=" h-[90%] mr-2 w-[50%] flex justify-between">
                <h1 className="text-white font-jetbrains">Select Language</h1>
                <select
                  className="block w-full px-3 py-2  border border-gray-300 text-white font-jetbrains focus:outline-none bg-black"
                  name="language"
                  value={formData.lang}
                  onChange={handleChange}
                >
                  <option value={53}>C++</option>
                  <option value={91}>Java</option>
                  <option value={71}>Python</option>
                  <option value={93}>Javascript</option>
                </select>
              </div>
            </div>
            <div className=" h-[90%] w-full">
              {/* <div className="p-4 border-white border-2 h-full"></div> */}
              <textarea
                wrap="soft"
                className=" whitespace-pre-line bg-black border-2 border-white text-white outline-none w-full h-full font-jetbrains"
                name="sourcecode"
                value={formData.sourcecode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="h-full w-[40%]  pl-8">
            <div className="flex items-center h-[10%]">
              <h1 className="text-white font-jetbrains">
                Standard Input(stdin)
              </h1>
            </div>
            <div>
              <textarea
                className="bg-black border-2 border-white text-white outline-none w-full font-jetbrains"
                name="stdin"
                value={formData.stdin}
                onChange={handleChange}
              />
            </div>
            <div
              className="bg-white w-36 h-12 mx-auto flex items-center justify-center mt-5 hover:cursor-pointer"
              onClick={handleSubmit}
            >
              <h1 className="text-black font-jetbrains font-semibold">
                Submit Code
              </h1>
            </div>
          </div>
        </div>
        <footer className=" bg-black flex items-center justify-center">
          <a
            className="underline mx-auto font-jetbrains text-2xl text-white"
            href="mailto:sahil.vaidya13@gmail.com"
          >
            Made By Vaidya
          </a>
        </footer>
      </div>

      {successDialogOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center">
          <div className="relative bg-black border-2 border-white  shadow-lg max-w-md w-full p-6">
            <button
              className="absolute top-0 right-0 m-4 text-white"
              onClick={handleCloseSuccessDialog}
            >
              &times;
            </button>
            <p className="text-xl font-semibold mb-4 text-white font-jetbrains">
              Success!
            </p>
            <p className="mb-4 text-white font-jetbrains">
              Code submitted successfully!
            </p>
            <button
              className="bg-black border-2 border-white text-white py-2 px-4 font-jetbrains"
              onClick={handleCloseSuccessDialog}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
