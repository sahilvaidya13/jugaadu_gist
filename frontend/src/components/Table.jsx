import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Table = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dummyData = [
    {
      id: 1,
      username: "John Doe",
      code: 'const message = "Hello, world!"; console.log(message);',
      stdin: "Some input for the code",
      published: "2024-03-20T15:54:00Z",
    },
    {
      id: 2,
      username: "Jane Smith",
      code: "function add(x, y) { return x + y; }",
      stdin: "Another input for the code",
      published: "2024-03-20T16:00:00Z",
    },
    // Add more dummy data objects as needed
  ];

  const handleNavigate = (id) => {
    navigate(`/code-block/${id}`, {
      state: {
        newid: id,
      },
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/fetchall");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black flex flex-col overflow-hidden text-white">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-700 ">
            <table className="min-w-full divide-y divide-gray-500">
              <thead className="bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider font-jetbrains"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider font-jetbrains"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider font-jetbrains"
                  >
                    Stdin
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider font-jetbrains"
                  >
                    Published
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider font-jetbrains"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-500 font-jetbrains">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-3 py-4 whitespace-nowrap text-left text-sm">
                      {item.username}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-left text-sm">
                      {item.sourcecode.substring(0, 100)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-left text-sm">
                      {item.stdin}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-left text-sm">
                      {item.submissiontime}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-left text-sm">
                      <button
                        className="bg-black text-white font-bold py-2 px-4"
                        onClick={() => handleNavigate(item.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                <tr
                  className="text-center bg-gray-800"
                  style={{
                    display: data.length === 0 ? "table-row" : "none",
                  }}
                >
                  <td colSpan={5}>No data available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
