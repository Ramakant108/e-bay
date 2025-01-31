import React from 'react'
import { useSelector } from 'react-redux';

const Orders = () => {

  const { items } = useSelector((state) => state.order);

  return (
    <div className="container mx-auto p-6">
      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">You have no orders yet.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-8">
  <h1 className="text-3xl font-bold text-gray-900 text-center mb-12">
    My Orders
  </h1>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
    {items.map((order, index) => (
      <div
        key={order.id}
        className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={order.items[0].images[0]}
            alt={order.items[0].title}
            className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Order {index + 1}
            </h2>
            <p className="text-gray-500 text-sm">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <p className="text-gray-700 text-sm font-medium">{item.title}</p>
              <p className="text-gray-600 text-sm font-medium">
                ${item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-6">
          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total:</span>
            <span>${(order.total *1.1).toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate(`/order/${order.id}`)}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      )}
    </div>
  )
}

export default Orders