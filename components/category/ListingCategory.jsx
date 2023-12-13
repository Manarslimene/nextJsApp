"use client";
//import Link from "next/link";
import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from 'react'
const TABLE_HEAD = ["Category Name", "Actions"];


// ... (import statements)

export default function ListingCategory() {
  const [categories, setCategories] = useState(null);
  //const [editedProductId, setEditedProductId] = useState(null);
 // const [editedProduct, setEditedProduct] = useState({ name: "", prix: "", cat: "" });

  useEffect(() => {
    fetch('/api/listingCategory')
      .then((res) => res.json())
      .then((response) => {
        console.log(response.categories);
        setCategories(response.categories);
      });
  }, []);

  return (
    <>
      <div className='mt-6 ml-2'>
        <a
          key="addproduct"
          href='/category'
          className='bg-gray-400 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
        >
          ADD Category
        </a>
      </div>

      <Card className="h-full w-full overflow-scroll mt-6">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories && categories.map((categorie, index) => {
              const isLast = index === categories.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={categorie._id}>
                  <td className={classes}>
                  <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {categorie.label}
                      </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="button"
                      onClick={() => handleEdit(categorie._id)}
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      Edit
                    </Typography>
                    <Typography
                      as="button"
                      onClick={() => handleDelete(categorie._id)}
                      variant="small"
                      color="red"
                      className="font-medium"
                    >
                      Delete
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
