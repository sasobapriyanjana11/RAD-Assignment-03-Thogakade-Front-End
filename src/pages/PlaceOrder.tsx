import { useState } from "react"

function PlaceOrder() {
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [orderItems, setOrderItems] = useState<any[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const [items] = useState([
    { item_id: "I001", name: "Arduino Board", quantity: 10, price: 20.5 },
    { item_id: "I002", name: "Raspberry Pi", quantity: 5, price: 35.0 }
  ])

  const [customers] = useState([
    {
      id: "C001",
      name: "John Doe",
      nic: "123456789V",
      email: "john@example.com",
      phone: "1234567890"
    },
    {
      id: "C002",
      name: "Jane Smith",
      nic: "987654321X",
      email: "jane@example.com",
      phone: "0987654321"
    }
  ])

  const handleItemSelect = (itemId: string) => {
    const item = items.find((item) => item.item_id === itemId)
    setSelectedItem(item || null)
    setQuantity(1)
  }

  const handleAddToCart = () => {
    if (!selectedItem) return
    if (quantity < 1) {
      alert("Quantity must be at least 1")
      return
    }
    if (quantity > selectedItem.quantity) {
      alert("Insufficient stock available!")
      return
    }

    const existing = orderItems.find(
        (orderItem) => orderItem.item_id === selectedItem.item_id
    )
    if (existing) {
      alert("Item already added to the order!")
      return
    }

    const newOrderItem = {
      ...selectedItem,
      quantity,
      total: selectedItem.price * quantity
    }

    setOrderItems([...orderItems, newOrderItem])
    // setSelectedItem(null)
    setQuantity(1)
    calculateTotal([...orderItems, newOrderItem])
  }

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      alert("Quantity must be at least 1")
      return
    }

    const findedItem: any = items.find(
        (orderItem) => orderItem.item_id === itemId
    )
    if (quantity > findedItem?.quantity) {
      alert("Insufficient stock available!")
      return
    }

    const updatedItems = orderItems.map((orderItem) =>
        orderItem.item_id === itemId
            ? { ...orderItem, quantity, total: orderItem.price * quantity }
            : orderItem
    )
    setOrderItems(updatedItems)
    calculateTotal(updatedItems)
  }

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = orderItems.filter(
        (orderItem) => orderItem.item_id !== itemId
    )
    setOrderItems(updatedItems)
    calculateTotal(updatedItems)
  }

  const handlePlaceOrder = () => {
    if (!selectedCustomer) {
      alert("Please select a customer!")
      return
    }
    if (orderItems.length === 0) {
      alert("Add at least one item to the order!")
      return
    }

    const order = {
      customer: selectedCustomer,
      items: orderItems,
      total: totalPrice,
      date: new Date().toLocaleDateString()
    }

    console.log("Order placed:", order)
    resetForm()
    alert("Order placed successfully!")
  }

  const resetForm = () => {
    setSelectedCustomer("")
    setOrderItems([])
    setTotalPrice(0)
  }

  const calculateTotal = (items: any[]) => {
    const total = items.reduce(
        (acc, curr) => acc + curr.quantity * curr.price,
        0
    )
    setTotalPrice(total)
  }

  return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Place Order</h2>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Select Customer</label>
          <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="border p-2 rounded w-full"
          >
            <option value="">-- Select Customer --</option>
            {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Select Item</label>
          <select
              onChange={(e) => handleItemSelect(e.target.value)}
              className="border p-2 rounded w-full"
          >
            <option value="">-- Select Item --</option>
            {items.map((item) => (
                <option key={item.item_id} value={item.item_id}>
                  {item.name} - ${item.price}
                </option>
            ))}
          </select>
        </div>

        {selectedItem && (
            <div className="border p-4 mt-4 rounded">
              <h4 className="font-bold text-lg">Item Details</h4>
              <p>Name: {selectedItem.name}</p>
              <p>Price: ${selectedItem.price.toFixed(2)}</p>
              <p>Stock: {selectedItem.quantity}</p>
              <label className="block mt-2">Enter Quantity:</label>
              <input
                  type="number"
                  value={quantity}
                  min="1"
                  max={selectedItem.quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border p-2 rounded w-20"
              />
              <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                Add to Cart
              </button>
            </div>
        )}

        {orderItems.length > 0 && (
            <table className="min-w-full table-auto border-collapse mt-4">
              <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Item Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
              </thead>
              <tbody>
              {orderItems.map((orderItem) => (
                  <tr key={orderItem.item_id}>
                    <td className="border px-4 py-2">{orderItem.name}</td>
                    <td className="border px-4 py-2">
                      ${orderItem.price.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      <input
                          type="number"
                          value={orderItem.quantity}
                          min="1"
                          max={orderItem.stock}
                          className="w-16 border p-1 rounded"
                          onChange={(e) =>
                              handleQuantityChange(
                                  orderItem.item_id,
                                  parseInt(e.target.value)
                              )
                          }
                      />
                    </td>
                    <td className="border px-4 py-2">
                      ${(orderItem.quantity * orderItem.price).toFixed(2)}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                          onClick={() => handleRemoveItem(orderItem.item_id)}
                          className="bg-red-500 text-white p-2 rounded-lg"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}

        <div className="mt-4 font-bold text-xl">
          Total: ${totalPrice.toFixed(2)}
        </div>

        <div className="flex justify-end mt-6">
          <button
              onClick={handlePlaceOrder}
              className="bg-green-500 text-white p-2 rounded"
          >
            Place Order
          </button>
        </div>
      </div>
  )
}

export default PlaceOrder