import { useState, useEffect } from "react";
import {Edit2,  Trash2} from "react-feather";
import { useNavigate } from "react-router";
import { AppDispatch } from "../store/store.tsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteCustomer, getCustomers, saveCustomer, UpdateCustomer} from "../reducers/CustomerReducer.ts";
import { Customer } from "../models/Customer.ts";

export function Customers() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // State for the last customer code
  const [lastCustomerCode, setLastCustomerCode] = useState(
      parseInt(localStorage.getItem("lastCustomerCode") || "0", 10)
  );

  const [CustomerId, setCustomerId] = useState("");
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const customers = useSelector((state) => state.customer);


  useEffect(() => {
    if (customers.length ===0){
      dispatch(getCustomers())
    }
    const newCustomerCode = generateCustomerCode();
    setCustomerId(newCustomerCode);
    console.log("Dispatching getCustomers");
    resetForm();
  }, [lastCustomerCode, dispatch]);


  const generateCustomerCode = () => {
    const nextNumber = lastCustomerCode + 1;
    const formattedNumber = String(nextNumber).padStart(3, "0");
    return `CUS-${formattedNumber}`;
  };

  function handleRowClick(customers: Customer) {
    setCustomerId(customers.CustomerID);
    setName(customers.Name);
    setAddress(customers.Address);
    setEmail(customers.Email);
    setIsEditing(true);
  }

  function handleAdd  (){
    const newCustomer = new Customer(CustomerId, Name, Address, Email);
    dispatch(saveCustomer(newCustomer));
    getCustomers();
    alert(JSON.stringify(newCustomer, null, 2));
    const nextNumber = lastCustomerCode + 1;
    setLastCustomerCode(nextNumber);
    localStorage.setItem("lastCustomerCode", nextNumber.toString());
    navigate("/");
    resetForm();
  }


  function handleEdit  (){
    const updatedCustomer = new Customer(CustomerId, Name, Address, Email);
    dispatch(UpdateCustomer(updatedCustomer));
    alert(JSON.stringify(updatedCustomer, null, 2));
    console.log(updatedCustomer);
    resetForm();
    getCustomers();

  }

  function handleDelete(Email: string) {
    dispatch(deleteCustomer(Email))
        .unwrap()
        .then((response) => {
          if (response) {
            getCustomers();
            alert('Customer deleted successfully.');
            resetForm();
          } else {
            alert('Failed to delete customer. Please try again.');
          }
        })
        .catch((error) => {
          console.error('Error deleting customer:', error);
          alert('An error occurred while deleting the customer.');
        });
  }

  const resetForm = () => {
    setName("");
    setAddress("");
    setEmail("");
    const newCode = generateCustomerCode();
    setCustomerId(newCode);
  };

  return (
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
              type="text"
              name="id"
              placeholder="ID"
              value={CustomerId}
              className="border p-2 rounded-full bg-gray-200 cursor-not-allowed"
              readOnly
              onChange={(e) => setCustomerId(e.target.value)}


          />
          <input
              type="text"
              name="name"
              placeholder="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-full"
          />
          <input
              type="text"
              name="address"
              placeholder="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 rounded-full"
          />
          <input
              type="email"
              name="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-full"
          />
        </div>
        <div className="flex justify-end">
          {isEditing ? (
              <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded-full mr-2 hover:cursor-pointer w-20 h-10">Update
              </button>
          ) : (
              <button onClick={handleAdd} className="bg-green-500 text-white p-2 rounded-full mr-2 hover:cursor-pointer w-20 h-10">
                Add
              </button>
          )}
          {isEditing && (
              <button onClick={resetForm} className="bg-gray-500 text-white p-2 rounded">
                Cancel
              </button>
          )}
        </div>
        <table className="min-w-full table-auto border-collapse mt-6">
          <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
          </thead>
          <tbody>
          {customers.map(customer => (
              <tr key={customer.CustomerID} className="hover:cursor-pointer hover:bg-slate-600 hover:text-white">
                <td className="border px-4 py-2">{customer.CustomerID}</td>
                <td className="border px-4 py-2">{customer.Name}</td>
                <td className="border px-4 py-2">{customer.Address}</td>
                <td className="border px-4 py-2">{customer.Email}</td>
                <td className="border px-4 py-2 text-center">
                  <button onClick={() => handleDelete(customer.Email)}  className="bg-red-500 hover:cursor-pointer text-white p-2 rounded-lg mr-3">
                    <Trash2/>
                  </button>

                  <button onClick={() => handleRowClick(customer)} className="hover:cursor-pointer bg-blue-500 text-white p-2 rounded-lg">
                    <Edit2/>
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}