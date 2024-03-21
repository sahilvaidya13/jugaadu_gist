import React, { useRef, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
const CodeSnippet = () => {
  const location = useLocation();
  const { id } = useParams();
  const [codeBlockData, setCodeBlockData] = useState({});

  const codeRef = useRef(null);

  const copyUrlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying URL to clipboard:", error);
        alert("Failed to copy URL to clipboard. Please try again.");
      });
  };
  useEffect(() => {
    const fetchCodeBlockData = async () => {
      try {
        const response = await fetch(
          `https://tuf-intern.onrender.com/api/fetch/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch code block data");
        }
        const data = await response.json();
        console.log(data);
        setCodeBlockData(data);
      } catch (error) {
        console.error("Error fetching code block data:", error);
      }
    };

    fetchCodeBlockData();
    console.log(id);
  }, [id]);

  return (
    <div className="bg-gray-900 p-6 shadow-lg ">
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-semibold text-white">
          Posted by: {codeBlockData.username}
        </p>
        <button
          className="bg-black text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400"
          onClick={copyUrlToClipboard}
        >
          Copy Link
        </button>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg overflow-auto" ref={codeRef}>
        <pre className="whitespace-pre-line text-white">
          {codeBlockData.sourcecode}
        </pre>
      </div>
      <div className="mt-4 text-white grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Stdin:</p>
          <p>{codeBlockData.stdin}</p>
        </div>
        <div>
          <p className="font-semibold">Stdout:</p>
          <p>{codeBlockData.stdout}</p>
        </div>
        <div>
          <p className="font-semibold">Time:</p>
          <p>{codeBlockData.submissiontime}</p>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;
