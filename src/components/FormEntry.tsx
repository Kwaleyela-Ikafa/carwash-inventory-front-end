import React, { useState } from "react";
import axios from "axios";

interface FormEntryData {
    customer_name: string;
    contact: string;
    service: string;
    vehicle: string;
    cleaner: string;
    share: string;
    price: number;
    p_m: string;
    cashier: string;
}
  

  const initialFormData: FormEntryData = {
    customer_name: "",
    contact: "",
    service: "",
    vehicle: "",
    cleaner: "",
    share: "",
    price: 0,
    p_m: "",
    cashier: "",
  };
  
  const FormEntry: React.FC = () => {
    const [formData, setFormData] = useState<FormEntryData>(initialFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/form_entries", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Form data submitted successfully:", response.data);
      setFormData(initialFormData);
    } catch (error: any) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("No response received.");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="overflow-x-hidden w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
      >
        {/* Customer Name */}
        <div className="mt-4">
          <label htmlFor="customer_name" className="block text-gray-700 text-sm font-bold mb-2">
            Customer Name:
          </label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Contact */}
        <div className="mt-4">
          <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">
            Contact:
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Service */}
        <div className="mt-4">
          <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">
            Service:
          </label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Vehicle */}
        <div className="mt-4">
          <label htmlFor="vehicle" className="block text-gray-700 text-sm font-bold mb-2">
            Vehicle:
          </label>
          <input
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Cleaner */}
        <div className="mt-4">
          <label htmlFor="cleaner" className="block text-gray-700 text-sm font-bold mb-2">
            Cleaner:
          </label>
          <input
            type="text"
            name="cleaner"
            value={formData.cleaner}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Share */}
        <div className="mt-4">
          <label htmlFor="share" className="block text-gray-700 text-sm font-bold mb-2">
            Share:
          </label>
          <input
            type="text"
            name="share"
            value={formData.share}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Price */}
        <div className="mt-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* P M */}
        <div className="mt-4">
          <label htmlFor="p_m" className="block text-gray-700 text-sm font-bold mb-2">
            P M:
          </label>
          <input
            type="text"
            name="p_m"
            value={formData.p_m}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Cashier */}
        <div className="mt-4">
          <label htmlFor="cashier" className="block text-gray-700 text-sm font-bold mb-2">
            Cashier:
          </label>
          <input
            type="text"
            name="cashier"
            value={formData.cashier}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormEntry;
