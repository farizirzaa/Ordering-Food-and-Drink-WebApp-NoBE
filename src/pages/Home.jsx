import React, { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';
import CartItem from '../components/CartItem';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';

const Home = () => {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('Semua Menu');
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.cart) {
      setCart(location.state.cart);
    }
  }, [location.state]);

  const menuItems = [
    { id: 1, name: 'Sate Ayam', description: 'Sate ayam bumbu kacang', price: 25000, category: 'Makanan', imageUrl: '/img/sateayam.jpeg' },
    { id: 2, name: 'Ayam Geprek', description: 'Ayam geprek', price: 20400, category: 'Makanan', imageUrl: '/img/ayamgeprek.png' },
    { id: 3, name: 'Jus Alpukat', description: 'Jus alpukat mentega', price: 8600, category: 'Minuman', imageUrl: '/img/jusalpukat.jpg' },
    { id: 4, name: 'Kwetiau', description: 'Kwetiau goreng ayam', price: 20000, category: 'Makanan', imageUrl: '/img/kwetiau.jpeg' },
    { id: 5, name: 'Jus Jeruk', description: 'Jus Jeruk mandarin segar', price: 18200, category: 'Minuman', imageUrl: '/img/jusjeruk.jpg' },
    { id: 6, name: 'Soto Ayam', description: 'Soto ayam kuah bening', price: 15000, category: 'Makanan', imageUrl: '/img/sotoayam.jpg' },
    { id: 7, name: 'Rendang', description: 'Rendang sapi khas Padang', price: 35000, category: 'Makanan', imageUrl: '/img/rendang.jpg' },
    { id: 8, name: 'Nasi Uduk', description: 'Nasi uduk dengan telur', price: 20000, category: 'Makanan', imageUrl: '/img/nasiuduk.jpg' },
    { id: 9, name: 'Bakso Urat', description: 'Bakso urat kuah kaldu spesial', price: 13000, category: 'Makanan', imageUrl: '/img/bakso.jpg' },
    { id: 10, name: 'Mie Ayam', description: 'Mie ayam yamin', price: 15000, category: 'Makanan', imageUrl: '/img/mieayam.jpg' },
    { id: 11, name: 'Nasi Goreng', description: 'Nasi goreng spesial', price: 20000, category: 'Makanan', imageUrl: '/img/nasi_goreng.jpg' },
    { id: 12, name: 'Ayam Bakar', description: 'Ayam bakar dengan sambal', price: 25000, category: 'Makanan', imageUrl: '/img/ayam_bakar.jpg' },
    { id: 13, name: 'Mie Goreng', description: 'Mie goreng pedas manis', price: 18000, category: 'Makanan', imageUrl: '/img/mie_goreng.jpg' },
    { id: 14, name: 'Es Teh', description: 'Teh manis dingin', price: 5000, category: 'Minuman', imageUrl: '/img/es_teh.jpg' },
    { id: 15, name: 'Kopi Hitam', description: 'Kopi hitam panas', price: 10000, category: 'Minuman', imageUrl: '/img/kopi_hitam.jpg' },
    { id: 16, name: 'Es Campur', description: 'Es campur buah', price: 15000, category: 'Minuman', imageUrl: '/img/es_campur.jpg' },
    { id: 17, name: 'Rawon', description: 'Sup rawon daging', price: 35000, category: 'Makanan', imageUrl: '/img/rawon.png' },
    { id: 18, name: 'Ikan Bakar', description: 'Ikan bakar sambal dabu', price: 25000, category: 'Makanan', imageUrl: '/img/ikan_bakar.jpg' },
    { id: 19, name: 'Sop Buntut', description: 'Sop buntut sapi kuah', price: 30000, category: 'Makanan', imageUrl: '/img/sop_buntut.jpg' },
    { id: 20, name: 'Udang Goreng', description: 'Udang goreng', price: 25000, category: 'Makanan', imageUrl: '/img/udang_goreng.jpg' },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    filter === 'Semua Menu' ? true : item.category === filter
  );

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = (method) => {
    const totalPrice = getTotalPrice();
    if (totalPrice === 0) {
      alert('Keranjang kosong. Tambahkan item terlebih dahulu!');
      return;
    }
    navigate('/payment', { state: { paymentMethod: method, totalPrice, cart } });
  };

  // Toggle mobile cart visibility
  const toggleMobileCart = () => {
    setIsMobileCartOpen(!isMobileCartOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Cart Toggle Button - Only visible on mobile */}
      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <button 
          onClick={toggleMobileCart}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        >
          <span className="mr-2">🛒</span>
          {cart.length > 0 && (
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Main Layout Container */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6">
          {/* Category Filter */}
          <div className="mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <div className="flex space-x-2">
              {['Semua Menu', 'Makanan', 'Minuman'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    filter === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMenuItems.map((item) => (
              <MenuItem key={item.id} item={item} addToCart={addToCart} />
            ))}
          </div>
        </main>

        {/* Cart Sidebar - Hidden on mobile unless toggled */}
        <aside className={`
          fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isMobileCartOpen ? 'translate-x-0' : 'translate-x-full'}
          md:relative md:translate-x-0
          z-40
        `}>
          {/* Mobile Cart Header */}
          <div className="md:hidden flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Pesanan Anda</h2>
            <button 
              onClick={toggleMobileCart}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex flex-col h-full">
            {/* Scrollable Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 pb-24">
              {cart.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Pesanan kosong</p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </div>

            {/* Fixed Cart Summary */}
            <div className="border-t bg-white p-4 absolute bottom-0 left-0 right-0">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  Total: Rp {getTotalPrice().toLocaleString()}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePayment('QRIS')}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  Pembayaran QRIS
                </button>
                <button
                  onClick={() => handlePayment('Tunai')}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300"
                >
                  Pembayaran Tunai
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;