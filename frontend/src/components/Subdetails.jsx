import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Subdetails() {
  const [data, setData] = useState();
  const location = useLocation();

  const category = location.state?.itemD.categories;
  const curItem = location.state?.itemD

  async function fetchData() {
    try {
      console.log("categories", category);
      const response = await axios 
        .get(`http://localhost:3000/api/v1/dashboard/subdetails/${category}`)
        .then((res) => {
          console.log("res", res.data);
          setData(res.data);
        });

      return response;
    } catch (error) {
      console.log("error in subdetails fetching data", error);
    }
  }

  useEffect(() => {
    fetchData().then((res) => {
      console.log("res", res);
      console.log("data1", data);
    });
    setTimeout(() => {
      console.log("data", data);
    }, 2500);
  }, []);

  if (!data) return <div>loading ---------- </div>;

  return (
    <>
      <div>
        <div className="flex flex-wrap gap-6 justify-center p-5">
          {data.map((item) => (
            <div 
              key={item._id}
              className="w-80 border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>

              {item.userDetails && (
                <div className="flex items-center mt-4">
                  {item.userDetails.profileUrl ? (
                    <img
                      src={item.userDetails.profileUrl}
                      alt={item.userDetails.username}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  )}
                  <span className="text-gray-700 font-medium">
                    {item.userDetails.username}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Subdetails;
