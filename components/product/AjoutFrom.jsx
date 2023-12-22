"use client";
//import Link from "next/link";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
// ... autres imports ...

export default function AjoutForm() {
    const [name, setName] = useState("");
    const [prix, setPrix] = useState("");
    const [cat, setCat] = useState("");
    const [error, setError] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const router = useRouter();
    

    useEffect(() => {
        fetch('/api/listingCategory')
          .then((res) => res.json())
          .then((response) => {
            setCategoryList(response.categories); // Add this line
          });
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !prix || !cat) {
            setError("All fields are necessary.");
            return;
        }

        try {
            const loadingSwal = Swal.fire({
                title: 'Loading...',
                html: '<i class="fas fa-spinner fa-spin"></i>',
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                },
            });
        
            const res = await fetch("api/ajout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, prix, cat,
                }),
            });

            loadingSwal.close();
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/listing");

                Swal.fire({
                    icon: 'success',
                    title: 'Product registered successfully!',
                    showConfirmButton: true,
                    timer: 5000 // close after 1.5 seconds
                });
            } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Product registration failed!',
                  text: 'Please try again later.',
                  showConfirmButton: true,
               });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Product registration failed!',
                text: 'Please try again later.',
                showConfirmButton: true,
             });
            console.log("Error during: ", error);
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Add Product</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    <label>
                        Product Name:
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Product Name"
                        />
                    </label>
                    <label>
                        Prix:
                        <input
                            onChange={(e) => setPrix(e.target.value)}
                            type="text"
                            placeholder="Price"
                        />
                    </label>
                    <label>
                        <select onChange={(e) => setCat(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option >
                                    Select Category
                                </option>
                            {categoryList.map((category) => (
                                <option key={category._id} value={category.label}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Add Product</button>
                </form>

            </div>
        </div>
    );
}
