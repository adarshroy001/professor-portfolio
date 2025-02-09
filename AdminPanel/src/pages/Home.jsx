import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API_BASE_URL from "../config";

function Home() {
    const [formData, setFormData] = useState({
        name: "",
        workPlace: "",
        about: "",
        img: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, img: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("workPlace", formData.workPlace);
        formDataToSend.append("about", formData.about);
        if (formData.img) formDataToSend.append("img", formData.img);

        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/home/update`,
                formDataToSend,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            toast.success(response.data.message);
        } catch (error) {
            console.error("Error updating home:", error);
            toast.error("Failed to update home data");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Update Home Page Data
                </h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your Name..."
                            className="mt-2 pl-3 py-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            WorkPlace
                        </label>
                        <input
                            type="text"
                            name="workPlace"
                            placeholder="Enter your current company..."
                            className="mt-2 pl-3 py-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            About
                        </label>
                        <input
                            type="text"
                            name="about"
                            placeholder="Describe about yourself..."
                            className="mt-2 pl-3 py-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-2 pl-3 py-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            onChange={handleFileChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-5 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;
