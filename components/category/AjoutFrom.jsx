"use client";
//import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert';
// ... autres imports ...

export default function AjoutForm() {
    const [label, setLabel] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!label) {
            setError("All fields are necessary.");
            return;
        }

        try {
            const res = await fetch("api/addCategory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(label),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/listingCategory").then(() => {
                    Swal({
                        title: "Category registration failed.",
                        icon: "error",
                        button: "OK",
                    });
                });
            } else {
                form.reset();
                router.push("/listingCategory");
                Swal({
                    title: "Category registration failed.",
                    icon: "error",
                    button: "OK",
                });
            }
        } catch (error) {
            console.log("Error during: ", error);
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Add Category</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    <label>
                        Category Name:
                        <input
                            onChange={(e) => setLabel(e.target.value)}
                            type="text"
                            placeholder="Category Name"
                        />
                    </label>
                   
                    
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Add Category</button>
                </form>

            </div>
        </div>
    );
}
