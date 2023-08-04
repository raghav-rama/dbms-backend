import * as React from "react";
import axios from "axios";
import "@styles/Admin.scss";

const Admin: React.FC = () => {
  const handleGetTableSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("table-name"));
    const { data } = await axios.get(
      `http://localhost:3000/admin/get/${formData.get("table-name")}`
    );
    console.log(data);
  };
  const handleDeleteSellerSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("tableName"));
    const { data } = await axios.delete(
      `http://localhost:3000/admin/delete-seller/${formData.get("seller-id")}`
    );
    console.log(data);
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:3000/admin/register",
      {
        firstName: e.currentTarget["first-name"].value,
        lastName: e.currentTarget["last-name"].value,
        username: e.currentTarget["username"].value,
        password: e.currentTarget["password"].value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
  };
  const updateProductInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get("product-id");
    const { data } = await axios.patch(
      "http://localhost:3000/admin/update-product/" + id,
      {
        productName: formData.get("product-name"),
        productPrice: formData.get("product-price"),
        productDescription: formData.get("product-description"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
  };
  return (
    <>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleRegister}>
        <div id="register-container">
          <div id="register-admin">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="first-name" />
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="last-name" />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Register</button>
        </div>
      </form>
      <form onSubmit={handleGetTableSubmit}>
        <div id="get-table-container">
          <div id="get-table">
            <label htmlFor="table-name">Table Name</label>
            <input type="text" id="table-name" name="table-name" />
          </div>
          <button type="submit">Get</button>
        </div>
      </form>
      <form onSubmit={handleDeleteSellerSubmit}>
        <div id="delete-seller-container">
          <div id="delete-seller">
            <label htmlFor="delete-seller">Delete Seller</label>
            <input type="text" id="seller-id" name="seller-id" />
          </div>
          <button type="submit">Delete</button>
        </div>
      </form>
      <form onSubmit={updateProductInfo}>
        <div id="update-product-info-container">
          <div id="update-product-info">
            <label htmlFor="product-id">Product ID</label>
            <input type="text" id="product-id" name="product-id" />
            <label htmlFor="product-name">Product Name</label>
            <input type="text" id="product-name" name="product-name" />
            <label htmlFor="product-price">Product Price</label>
            <input type="text" id="product-price" name="product-price" />
            <label htmlFor="product-description">Product Description</label>
            <input
              type="text"
              id="product-description"
              name="product-description"
            />
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default Admin;
