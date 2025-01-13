import React, { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';
import CartItem from '../components/CartItem';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles.css'; // Impor CSS kustom

const Home = () => {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('Semua Menu'); // Menyimpan filter yang dipilih
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data cart dari state (jika ada)
  useEffect(() => {
    if (location.state && location.state.cart) {
      setCart(location.state.cart);
    }
  }, [location.state]);

  // Daftar menu dengan kategori
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

  return (
    <div className="layout">
      <main className="flex-1 p-6 flex flex-col">
        <h3 className="sub-header">Pilihan Menu</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.map((item) => (
            <MenuItem key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <aside className="sidebar">
        <h2 className='sub-title'>Pesanan Anda</h2>
        <div className="cart-list-container">
          {cart.length === 0 ? (
            <p className="text-gray-600 font-semibold text-center">Pesanan kosong</p>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        <div className="cart-summary">
          <h3 id='total' className='font-semibold'>Total: Rp {getTotalPrice().toLocaleString()}</h3>
          <button onClick={() => handlePayment('QRIS')} className="button button-primary" id='buttoncheckout'>Pembayaran QRIS</button>
          <button onClick={() => handlePayment('Tunai')} className="button button-secondary " id='buttoncheckout'>Pembayaran Tunai</button>
        </div>
      </aside>
    </div>
  );
};

export default Home;
