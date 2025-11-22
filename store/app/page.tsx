'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', nameAr: 'لابتوب', price: 2999, image: '💻', category: 'electronics' },
  { id: 2, name: 'Smartphone', nameAr: 'هاتف ذكي', price: 1499, image: '📱', category: 'electronics' },
  { id: 3, name: 'Headphones', nameAr: 'سماعات', price: 299, image: '🎧', category: 'electronics' },
  { id: 4, name: 'Watch', nameAr: 'ساعة', price: 799, image: '⌚', category: 'accessories' },
  { id: 5, name: 'Camera', nameAr: 'كاميرا', price: 1899, image: '📷', category: 'electronics' },
  { id: 6, name: 'Backpack', nameAr: 'حقيبة ظهر', price: 149, image: '🎒', category: 'accessories' },
  { id: 7, name: 'Sneakers', nameAr: 'حذاء رياضي', price: 249, image: '👟', category: 'fashion' },
  { id: 8, name: 'Sunglasses', nameAr: 'نظارات شمسية', price: 199, image: '🕶️', category: 'accessories' },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All', nameAr: 'الكل' },
    { id: 'electronics', name: 'Electronics', nameAr: 'إلكترونيات' },
    { id: 'accessories', name: 'Accessories', nameAr: 'إكسسوارات' },
    { id: 'fashion', name: 'Fashion', nameAr: 'أزياء' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🛍️ المتجر الإلكتروني
            </h1>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
              Cart
            </button>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-3 flex-wrap justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.nameAr}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-7xl">
                {product.image}
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{product.nameAr}</h3>
                <p className="text-sm text-gray-500 mb-3">{product.name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 text-sm font-medium"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">🛒 السلة</h2>
              <button onClick={() => setShowCart(false)} className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full">
                <X size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-lg">السلة فارغة</p>
              </div>
            ) : (
              <>
                <div className="p-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded-xl p-4 mb-3 shadow">
                      <div className="flex gap-4">
                        <div className="text-4xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{item.nameAr}</h3>
                          <p className="text-sm text-gray-500">${item.price}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-bold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
                            >
                              <Plus size={16} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:bg-red-50 p-1 rounded-full"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                        <div className="font-bold text-purple-600">
                          ${item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sticky bottom-0 bg-white border-t-2 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-gray-800">المجموع:</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300">
                    إتمام الشراء ✨
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
