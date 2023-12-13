"use client";
//import Link from "next/link";
import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from 'react'
import { useParams } from "next/navigation";
const TABLE_HEAD = ["Name", "Price" ,"Category", ""];


// ... (import statements)

export default function ListingProduct() {
  const [products, setProducts] = useState(null);
  const [editedProductId, setEditedProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: "", prix: "", cat: "" });

  useEffect(() => {
    fetch('/api/listing')
      .then((res) => res.json())
      .then((response) => {
        console.log(response.products);
        setProducts(response.products);
      });
  }, []);

  const handleDelete = (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      fetch(`/api/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          alert(response.message);
          // Mettez à jour la liste des produits après la suppression du produit
          setProducts(products.filter((product) => product._id !== productId));
        } else {
          alert(response.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting product", error);
        alert('Error deleting product');
      });
    }
  };

  const handleEdit = (productId) => {
    setEditedProductId(productId);
    const selectedProduct = products.find((product) => product._id === productId);
    setEditedProduct(selectedProduct);
  };

  const handleUpdateProduct = (editedProductId) => async (e) => {
    e.preventDefault();
    //const Product = products.find((product) => product._id === editedProductId);
   
    try{
      const response = await fetch(`/api/update/${editedProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
        //const updatedProduct = await response.json();
        // Handle the updated product data as needed
        alert('Product updated successfully');
      } else {
        // Handle error response
        console.error('Failed to update product');
        alert('Failed to update product');
      }
    }catch{
      alert("Probleme");
    }
  };
  return (
    <>
      <div className='mt-6 ml-2'>
        <a
          key="addproduct"
          href='/produit'
          className='bg-gray-400 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
        >
          ADD Product
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
            {products && products.map((product, index) => {
              const isLast = index === products.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={product._id}>
                  <td className={classes}>
                    {editedProductId === product._id ? (
                      <form onSubmit={handleUpdateProduct(product._id)}>    
                        <input
                          type="text"
                          placeholder="Name"
                          value={editedProduct.name}
                          onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Price"
                          value={editedProduct.prix}
                          onChange={(e) => setEditedProduct({ ...editedProduct, prix: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Category"
                          value={editedProduct.cat}
                          onChange={(e) => setEditedProduct({ ...editedProduct, cat: e.target.value })}
                        />
                        <button type="submit">Save</button>
                      </form>
                    ) : (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.name}
                      </Typography>
      
                    )}
                  </td>
                      <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.prix}
                      </Typography>
                      </td>
                      <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.cat}
                      </Typography>
                      </td>
                  <td className={classes}>
                    <Typography
                      as="button"
                      onClick={() => handleEdit(product._id)}
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      Edit
                    </Typography>
                    <Typography
                      as="button"
                      onClick={() => handleDelete(product._id)}
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
