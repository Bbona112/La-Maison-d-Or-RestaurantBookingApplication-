'use client';

import { useState } from 'react';
import MenuCarousel from '@/components/MenuCarousel';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizers' | 'mains' | 'desserts' | 'drinks';
  vegetarian?: boolean;
  glutenFree?: boolean;
  image: string;
}

const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: '1',
    name: 'Escargots de Bourgogne',
    description: 'Traditional French snails in garlic herb butter',
    price: 18,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80',
  },
  {
    id: '2',
    name: 'Foie Gras',
    description: 'Pan-seared duck liver with fig compote and brioche',
    price: 32,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  },
  {
    id: '3',
    name: 'Salade Niçoise',
    description: 'Fresh mixed greens with tuna, olives, eggs, and anchovies',
    price: 16,
    category: 'appetizers',
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
  },
  {
    id: '4',
    name: 'Soupe à l\'Oignon',
    description: 'Classic French onion soup with gruyère cheese',
    price: 14,
    category: 'appetizers',
    vegetarian: true,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
  },
  {
    id: '5',
    name: 'Tartare de Saumon',
    description: 'Fresh salmon tartare with avocado, capers, and dill',
    price: 20,
    category: 'appetizers',
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  },
  
  // Mains
  {
    id: '6',
    name: 'Coq au Vin',
    description: 'Braised chicken in red wine with mushrooms and pearl onions',
    price: 28,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80',
  },
  {
    id: '7',
    name: 'Bouillabaisse',
    description: 'Provençal fish stew with saffron, fennel, and rouille',
    price: 38,
    category: 'mains',
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
  },
  {
    id: '8',
    name: 'Boeuf Bourguignon',
    description: 'Slow-cooked beef in red wine with carrots and onions',
    price: 42,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?w=800&q=80',
  },
  {
    id: '9',
    name: 'Duck Confit',
    description: 'Crispy duck leg with roasted potatoes and green beans',
    price: 36,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80',
  },
  {
    id: '10',
    name: 'Ratatouille',
    description: 'Provençal vegetable stew with herbs and olive oil',
    price: 24,
    category: 'mains',
    vegetarian: true,
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  },
  {
    id: '11',
    name: 'Filet Mignon',
    description: 'Prime beef tenderloin with béarnaise sauce and pommes frites',
    price: 48,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?w=800&q=80',
  },
  {
    id: '12',
    name: 'Sole Meunière',
    description: 'Pan-fried sole with lemon butter sauce and haricots verts',
    price: 34,
    category: 'mains',
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
  },
  
  // Desserts
  {
    id: '13',
    name: 'Crème Brûlée',
    description: 'Classic vanilla custard with caramelized sugar',
    price: 12,
    category: 'desserts',
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
  },
  {
    id: '14',
    name: 'Tarte Tatin',
    description: 'Upside-down apple tart with vanilla ice cream',
    price: 14,
    category: 'desserts',
    vegetarian: true,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
  },
  {
    id: '15',
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with crème anglaise',
    price: 16,
    category: 'desserts',
    vegetarian: true,
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
  },
  {
    id: '16',
    name: 'Profiteroles',
    description: 'Cream puffs filled with vanilla ice cream and chocolate sauce',
    price: 13,
    category: 'desserts',
    vegetarian: true,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
  },
  {
    id: '17',
    name: 'Macarons Assortis',
    description: 'Selection of French macarons (6 pieces)',
    price: 15,
    category: 'desserts',
    vegetarian: true,
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
  },
  
  // Drinks
  {
    id: '18',
    name: 'Champagne',
    description: 'Dom Pérignon, Moët & Chandon, or house selection',
    price: 25,
    category: 'drinks',
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1510812431401-e41e7b2d5b8a?w=800&q=80',
  },
  {
    id: '19',
    name: 'Wine Selection',
    description: 'Extensive French wine list - ask your server',
    price: 12,
    category: 'drinks',
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1510812431401-e41e7b2d5b8a?w=800&q=80',
  },
  {
    id: '20',
    name: 'Cognac',
    description: 'Hennessy XO, Rémy Martin, or house selection',
    price: 18,
    category: 'drinks',
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1510812431401-e41e7b2d5b8a?w=800&q=80',
  },
  {
    id: '21',
    name: 'Espresso',
    description: 'French press coffee or espresso',
    price: 5,
    category: 'drinks',
    vegetarian: true,
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80',
  },
  {
    id: '22',
    name: 'Herbal Tea',
    description: 'Selection of premium teas',
    price: 6,
    category: 'drinks',
    vegetarian: true,
    glutenFree: true,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80',
  },
];

const categories = [
  { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
  { id: 'mains', name: 'Main Courses', icon: '🍽️' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Drinks', icon: '🍷' },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'carousel'>('list');

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
          <p className="text-amber-100 text-lg">Exquisite French Cuisine</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        {/* View Mode Toggle and Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
              }`}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md font-semibold transition-colors flex items-center gap-2 ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="List View"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              List
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-2 rounded-md font-semibold transition-colors flex items-center gap-2 ${
                viewMode === 'carousel'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Carousel View"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Carousel
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {categories
            .filter((cat) => selectedCategory === 'all' || selectedCategory === cat.id)
            .map((category) => {
              const categoryItems = filteredItems.filter(
                (item) => item.category === category.id
              );

              if (categoryItems.length === 0) return null;

              return (
                <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <span>{category.icon}</span>
                      {category.name}
                    </h2>
                  </div>
                  <div className="p-6">
                    {viewMode === 'carousel' ? (
                      <MenuCarousel items={categoryItems} autoRotate={true} autoRotateInterval={5000} />
                    ) : (
                      <div className="space-y-6">
                        {categoryItems.map((item) => (
                          <div
                            key={item.id}
                            className="group relative border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-start gap-3 mb-2">
                                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                                    {item.name}
                                  </h3>
                                  <div className="flex gap-2 flex-wrap">
                                    {item.vegetarian && (
                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                                        Vegetarian
                                      </span>
                                    )}
                                    {item.glutenFree && (
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                                        Gluten Free
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <p className="text-gray-600">{item.description}</p>
                              </div>
                              <div className="sm:ml-4">
                                <span className="text-2xl font-bold text-amber-600">
                                  {formatPrice(item.price)}
                                </span>
                              </div>
                            </div>
                            
                            {/* Hover Image Preview */}
                            <div className="absolute left-full ml-4 top-0 w-64 h-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none hidden lg:block">
                              <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-amber-200">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';
                                  }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                  <p className="text-white font-semibold text-sm">{item.name}</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Mobile Image Preview (shown below item) */}
                            <div className="mt-4 lg:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-amber-200">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-48 object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Items Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Dine?</h2>
          <p className="text-xl mb-6 text-amber-100">
            Reserve your table and experience our exquisite menu
          </p>
          <a
            href="/booking"
            className="inline-block bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 transition-colors shadow-lg"
          >
            Book a Table
          </a>
        </div>
      </main>
    </div>
  );
}

