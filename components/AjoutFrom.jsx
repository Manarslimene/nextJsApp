"use client";
//import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ... autres imports ...

export default function AjoutForm() {
    const [name, setName] = useState("");
    const [prix, setPrix] = useState("");
    const [cat, setCat] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !prix || !cat) {
            setError("All fields are necessary.");
            return;
        }

        try {
            const res = await fetch("api/ajout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, prix, cat,
                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/");
            } else {
                console.log("Product registration failed.");
            }
        } catch (error) {
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
                        Catégorie:
                        <input
                            onChange={(e) => setCat(e.target.value)}
                            type="text"
                            placeholder="Category"
                        />
                    </label>
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Add Product</button>
                </form>

            </div>
        </div>
    );
}
