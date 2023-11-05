import React, { useState, useEffect } from "react";
import axios from "axios";

interface CarWashData {
  customer_name: string;
  contact: string;
  service: string;
  vehicle: string;
  cleaner: string;
  share: string;
  price: number;
  p_m: string;
  cashier: string;
  id: number; // Unique identifier for each entry
}

const CarWashManagement: React.FC = () => {
  const [carwashData, setCarwashData] = useState<CarWashData[]>([]);

  useEffect(() => {
    // Fetch carwash data from the API
    axios.get("http://localhost:3000/form_entries")
      .then((response) => {
        setCarwashData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch carwash data:", error);
      });
  }, []);

  const handleDataChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: number,
    field: string
  ) => {
    const updatedData = carwashData.map((data) => {
      if (data.id === id) {
        // Update the field that matches the edited data
        if (field === "price") {
          // Convert the price field to a number
          return { ...data, [field]: parseFloat(event.target.value) };
        } else {
          return { ...data, [field]: event.target.value };
        }
      }
      return data;
    });

    setCarwashData(updatedData);

    // Send the updated data to the API
    axios.put(`http://localhost:3000/form_entries/${id}`, {
      [field]: event.target.value,
    })
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Failed to update data:", error);
      });
  };

  const handleDeleteData = (id: number) => {
    // Send a delete request to the API
    axios.delete(`http://localhost:3000/form_entries/${id}`)
      .then((response) => {
        console.log("Data deleted successfully:", response.data);
        const updatedData = carwashData.filter((data) => data.id !== id);
        setCarwashData(updatedData);
      })
      .catch((error) => {
        console.error("Failed to delete data:", error);
      });
  };


  return (
    <div className="flex flex-col" style={{ height: "100vh" }}>
      <h1 className="text-center text-2xl font-bold mb-4 mt-4">Car Wash Data Management</h1>
      {carwashData.length === 0 ? (
        <p className="text-center text-2xl font-bold mb-4">No Data Available</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-blue-900 text-white font-bold uppercase text-sm border-b border-gray-400">Customer Name</th>
              <th className="px-4 py-2 bg-blue-900 text-white font-bold uppercase text-sm border-b border-gray-400">Contact</th>
              <th className="px-4 py-2 bg-blue-900 text-white font-bold uppercase text-sm border-b border-gray-400">Service</th>
              <th className="px-4 py-2 bg-blue-900 text-white font-bold uppercase text-sm border-b border-gray-400">Vehicle</th>
              <th className="px-4 py-2 bg-blue-900 text-white font-bold uppercase text-sm border-b border-gray-400">Cleaner</th>
              <th className="px-4 py-2 bg-blue-900 text-white font-bold uppercase text-sm border-b border-gray-400">Share</th>
              <th className="px-4 py-2 bg-blue-900 text-white font-bold uppercase text-sm border-b border-gray-400">Price</th>
              <th className="px-4 py-2 bg-blue-900 text-white font-bold uppercase text-sm border-b border-gray-400">P/M</th>
              <th className="px-4 py-2 bg-blue-900 text-white font-bold uppercase text-sm border-b border-gray-400">Cashier</th>
              <th className="px-4 py-2 bg-blue-900 text-white font-bold uppercase text-sm border-b border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carwashData.map((data) => (
              <tr key={data.id}>
                <td className="border px-4 py-2">
                  {data.customer_name}
                </td>
                <td className="border px-4 py-2">
                  {data.contact}
                </td>
                <td className="border px-4 py-2">
                  {data.service}
                </td>
                <td className="border px-4 py-2">
                  {data.vehicle}
                </td>
                <td className="border px-4 py-2">
                  {data.cleaner}
                </td>
                <td className="border px-4 py-2">
                  {data.share}
                </td>
                <td className="border px-4 py-2">
                  {data.price}
                </td>
                <td className="border px-4 py-2">
                  {data.p_m}
                </td>
                <td className="border px-4 py-2">
                  {data.cashier}
                </td>
                <td className="border px-4 py-2">
                  <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteData(data.id)}
                  >
                      Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CarWashManagement;
