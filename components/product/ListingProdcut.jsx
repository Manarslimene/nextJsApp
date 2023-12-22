"use client";
//import Link from "next/link";
import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
const TABLE_HEAD = ["Name", "Price", "Category", ""];
import Swal from 'sweetalert2';

// ... (import statements)

export default function ListingProduct() {
  const [products, setProducts] = useState(null);
  const [editedProductId, setEditedProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: "", prix: "", cat: "" });
  const router = useRouter();
  useEffect(() => {
    fetch('/api/listing')
      .then((res) => res.json())
      .then((response) => {
        console.log(response.products);
        setProducts(response.products);
      });
  }, []);

  const handleDelete = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to remove this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/delete/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log(response);
            if (response.ok) {
              // Mettez à jour la liste des produits après la suppression du produit
              setProducts(products.filter((product) => product._id !== productId));
              router.push("/listing");
              Swal.fire({
                icon: 'success',
                title: 'Product deleted with successful!',
                showConfirmButton: true,
                timer: 5000 // close after 1.5 seconds
              });
            } else {
              // Mettez à jour la liste des produits après la suppression du produit
              setProducts(products.filter((product) => product._id !== productId));
              router.push("/listing");
              Swal.fire({
                icon: 'error',
                title: response.message,
                showConfirmButton: true,
                timer: 5000 // close after 1.5 seconds
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting product", error);
            Swal.fire({
              icon: 'error',
              title: error,
              showConfirmButton: true,
              timer: 5000 // close after 1.5 seconds
            });
          });
      }
    });
  };

  const handleEdit = (productId) => {
    setEditedProductId(productId);
    const selectedProduct = products.find((product) => product._id === productId);
    setEditedProduct(selectedProduct);
  };

  const handleUpdateProduct = (editedProductId) => async (e) => {
    e.preventDefault();
    //const Product = products.find((product) => product._id === editedProductId);

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
      const response = await fetch(`/api/update/${editedProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });
      loadingSwal.close();
      if (response.ok) {
         // Update the products state with the modified product
      const updatedProducts = products.map((product) => {
        if (product._id === editedProductId) {
          return editedProduct;
        }
        return product;
      });

      setProducts(updatedProducts);
        setEditedProductId(null);
        Swal.fire({
          icon: 'success',
          title: 'Product Updated with successful!',
          showConfirmButton: true,
          timer: 5000 // close after 1.5 seconds
      });
      } else {
        // Handle error response
        console.error('Failed to update product');
        alert('Failed to update product');
      }
    } catch {
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
                        <button type="submit" className="font-medium bg-yellow-500 text-white px-4 py-2 rounded-lg">Save</button>
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
                      className="font-medium bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Typography>

                    <Typography
                      as="button"
                      onClick={() => handleDelete(product._id)}
                      variant="small"
                      color="red"
                      className="font-medium bg-red-500 text-white px-4 py-2 rounded-lg"
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
