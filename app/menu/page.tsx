'use client';

import { useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizers' | 'mains' | 'desserts' | 'drinks';
  vegetarian?: boolean;
  glutenFree?: boolean;
}

const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: '1',
    name: 'Escargots de Bourgogne',
    description: 'Traditional French snails in garlic herb butter',
    price: 18,
    category: 'appetizers',
  },
  {
    id: '2',
    name: 'Foie Gras',
    description: 'Pan-seared duck liver with fig compote and brioche',
    price: 32,
    category: 'appetizers',
  },
  {
    id: '3',
    name: 'Salade Niçoise',
    description: 'Fresh mixed greens with tuna, olives, eggs, and anchovies',
    price: 16,
    category: 'appetizers',
    glutenFree: true,
  },
  {
    id: '4',
    name: 'Soupe à l\'Oignon',
    description: 'Classic French onion soup with gruyère cheese',
    price: 14,
    category: 'appetizers',
    vegetarian: true,
  },
  {
    id: '5',
    name: 'Tartare de Saumon',
    description: 'Fresh salmon tartare with avocado, capers, and dill',
    price: 20,
    category: 'appetizers',
    glutenFree: true,
  },
  
  // Mains
  {
    id: '6',
    name: 'Coq au Vin',
    description: 'Braised chicken in red wine with mushrooms and pearl onions',
    price: 28,
    category: 'mains',
  },
  {
    id: '7',
    name: 'Bouillabaisse',
    description: 'Provençal fish stew with saffron, fennel, and rouille',
    price: 38,
    category: 'mains',
    glutenFree: true,
  },
  {
    id: '8',
    name: 'Boeuf Bourguignon',
    description: 'Slow-cooked beef in red wine with carrots and onions',
    price: 42,
    category: 'mains',
  },
  {
    id: '9',
    name: 'Duck Confit',
    description: 'Crispy duck leg with roasted potatoes and green beans',
    price: 36,
    category: 'mains',
  },
  {
    id: '10',
    name: 'Ratatouille',
    description: 'Provençal vegetable stew with herbs and olive oil',
    price: 24,
    category: 'mains',
    vegetarian: true,
    glutenFree: true,
  },
  {
    id: '11',
    name: 'Filet Mignon',
    description: 'Prime beef tenderloin with béarnaise sauce and pommes frites',
    price: 48,
    category: 'mains',
  },
  {
    id: '12',
    name: 'Sole Meunière',
    description: 'Pan-fried sole with lemon butter sauce and haricots verts',
    price: 34,
    category: 'mains',
    glutenFree: true,
  },
  
  // Desserts
  {
    id: '13',
    name: 'Crème Brûlée',
    description: 'Classic vanilla custard with caramelized sugar',
    price: 12,
    category: 'desserts',
    glutenFree: true,
  },
  {
    id: '14',
    name: 'Tarte Tatin',
    description: 'Upside-down apple tart with vanilla ice cream',
    price: 14,
    category: 'desserts',
    vegetarian: true,
  },
  {
    id: '15',
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with crème anglaise',
    price: 16,
    category: 'desserts',
    vegetarian: true,
    glutenFree: true,
  },
  {
    id: '16',
    name: 'Profiteroles',
    description: 'Cream puffs filled with vanilla ice cream and chocolate sauce',
    price: 13,
    category: 'desserts',
    vegetarian: true,
  },
  {
    id: '17',
    name: 'Macarons Assortis',
    description: 'Selection of French macarons (6 pieces)',
    price: 15,
    category: 'desserts',
    vegetarian: true,
    glutenFree: true,
  },
  
  // Drinks
  {
    id: '18',
    name: 'Champagne',
    description: 'Dom Pérignon, Moët & Chandon, or house selection',
    price: 25,
    category: 'drinks',
    glutenFree: true,
  },
  {
    id: '19',
    name: 'Wine Selection',
    description: 'Extensive French wine list - ask your server',
    price: 12,
    category: 'drinks',
    glutenFree: true,
  },
  {
    id: '20',
    name: 'Cognac',
    description: 'Hennessy XO, Rémy Martin, or house selection',
    price: 18,
    category: 'drinks',
    glutenFree: true,
  },
  {
    id: '21',
    name: 'Espresso',
    description: 'French press coffee or espresso',
    price: 5,
    category: 'drinks',
    vegetarian: true,
    glutenFree: true,
  },
  {
    id: '22',
    name: 'Herbal Tea',
    description: 'Selection of premium teas',
    price: 6,
    category: 'drinks',
    vegetarian: true,
    glutenFree: true,
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

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
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
                    <div className="space-y-6">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-start gap-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-800">
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
                        </div>
                      ))}
                    </div>
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

