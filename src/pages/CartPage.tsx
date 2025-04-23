
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead, TableCaption, TableFooter } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />
      <main className="container mx-auto flex-1 py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-black">Your Cart</h1>
        {items.length === 0 ? (
          <div className="text-lg text-center text-gray-700 py-32">
            Your cart is empty.
            <div className="mt-4">
              <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto">
            <Table>
              <TableCaption>Items in your cart</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.price.toFixed(2)} MAD</TableCell>
                    <TableCell>
                      <input 
                        type="number"
                        min={1}
                        className="w-16 p-1 border rounded text-center"
                        value={item.quantity}
                        onChange={e => {
                          const qty = Number(e.target.value);
                          if (qty >= 1) updateQuantity(item.id, qty);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {(item.price * item.quantity).toFixed(2)} MAD
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} />
                  <TableCell className="font-bold text-black">Total Items</TableCell>
                  <TableCell className="font-bold">{totalItems}</TableCell>
                  <TableCell className="font-bold text-black">Total</TableCell>
                  <TableCell className="font-bold">{totalPrice.toFixed(2)} MAD</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
              <Button onClick={() => navigate("/payment")}>Proceed to Payment</Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
