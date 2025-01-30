
import {Customer} from "../models/Customer.ts";
import {useSelector} from "react-redux";
import '../App.css';
export function Dashboard() {

    const customers = useSelector((state) => state.customer);
    const items = useSelector((state) => state.item );
    return (
        <div className=" md-8">
            <h1 className="text-3xl font-medium text-purple-500 mb-6 text-my">Dashboard</h1>
            <div  className="p-6 grid grid-cols-2" >
                {/*customer table*/}
                <div>
                    <h1 className="text-3xl font-medium text-purple-500 mb-6">Customer Details</h1>
                    <table className=" table-auto border cellPadding-8 marginTop-20px w-full">
                        <thead>
                        <tr className="border">
                            <th className="table-css">Name</th>
                            <th className="table-css">Address</th>
                            <th className="table-css">Email</th>
                            <th className="table-css">Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers.map((customer:Customer) => (
                            <tr key={customer.CustomerID}>
                                <td className="table-css">{customer.CustomerID}</td>
                                <td className="table-css">{customer.Name}</td>
                                <td className="table-css">{customer.Address}</td>
                                <td className="table-css">{customer.Email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {/* item cards */}
                <div>
                    <div className="item-card ml-5">
                        <h1 className="text-3xl font-medium text-purple-500 mb-6">Item Details</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                            {items.map((item) => (
                                <div className="bg-white shadow-md rounded-lg p-4 border border-purple-200 hover:bg-purple-200 transition duration-500">
                                    <p><span className="font-bold">Code:</span> {item.ItemID}</p>
                                    <p><span className="font-bold">Name:</span> {item.Name}</p>
                                    <p><span className="font-bold">Quantity:</span> {item.Quantity}</p>
                                    <p><span className="font-bold">Price:</span> {item.Price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}