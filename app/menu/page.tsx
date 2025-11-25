'use client';

import { useState } from 'react';
import Link from 'next/link';

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
  { id: '1', name: 'Escargots de Bourgogne', description: 'Traditional French snails in garlic herb butter', price: 18, category: 'appetizers' },
  { id: '2', name: 'Foie Gras', description: 'Pan-seared duck liver with fig compote and brioche', price: 32, category: 'appetizers' },
  { id: '3', name: 'Salade Niçoise', description: 'Fresh mixed greens with tuna, olives, eggs, and anchovies', price: 16, category: 'appetizers', glutenFree: true },
  { id: '4', name: 'Soupe à l\'Oignon', description: 'Classic French onion soup with gruyère cheese', price: 14, category: 'appetizers', vegetarian: true },
  { id: '5', name: 'Tartare de Saumon', description: 'Fresh salmon tartare with avocado, capers, and dill', price: 20, category: 'appetizers', glutenFree: true },
  // Mains
  { id: '6', name: 'Coq au Vin', description: 'Braised chicken in red wine with mushrooms and pearl onions', price: 28, category: 'mains' },
  { id: '7', name: 'Bouillabaisse', description: 'Provençal fish stew with saffron, fennel, and rouille', price: 38, category: 'mains', glutenFree: true },
  { id: '8', name: 'Boeuf Bourguignon', description: 'Slow-cooked beef in red wine with carrots and onions', price: 42, category: 'mains' },
  { id: '9', name: 'Duck Confit', description: 'Crispy duck leg with roasted potatoes and green beans', price: 36, category: 'mains' },
  { id: '10', name: 'Ratatouille', description: 'Provençal vegetable stew with herbs and olive oil', price: 24, category: 'mains', vegetarian: true, glutenFree: true },
  { id: '11', name: 'Filet Mignon', description: 'Prime beef tenderloin with béarnaise sauce and pommes frites', price: 48, category: 'mains' },
  { id: '12', name: 'Sole Meunière', description: 'Pan-fried sole with lemon butter sauce and haricots verts', price: 34, category: 'mains', glutenFree: true },
  // Desserts
  { id: '13', name: 'Crème Brûlée', description: 'Classic vanilla custard with caramelized sugar', price: 12, category: 'desserts', glutenFree: true },
  { id: '14', name: 'Tarte Tatin', description: 'Upside-down apple tart with vanilla ice cream', price: 14, category: 'desserts', vegetarian: true },
  { id: '15', name: 'Chocolate Soufflé', description: 'Warm chocolate soufflé with crème anglaise', price: 16, category: 'desserts', vegetarian: true, glutenFree: true },
  { id: '16', name: 'Profiteroles', description: 'Cream puffs filled with vanilla ice cream and chocolate sauce', price: 13, category: 'desserts', vegetarian: true },
  { id: '17', name: 'Macarons Assortis', description: 'Selection of French macarons (6 pieces)', price: 15, category: 'desserts', vegetarian: true, glutenFree: true },
  // Drinks
  { id: '18', name: 'Champagne', description: 'Dom Pérignon, Moët & Chandon, or house selection', price: 25, category: 'drinks', glutenFree: true },
  { id: '19', name: 'Wine Selection', description: 'Extensive French wine list - ask your server', price: 12, category: 'drinks', glutenFree: true },
  { id: '20', name: 'Cognac', description: 'Hennessy XO, Rémy Martin, or house selection', price: 18, category: 'drinks', glutenFree: true },
  { id: '21', name: 'Espresso', description: 'French press coffee or espresso', price: 5, category: 'drinks', vegetarian: true, glutenFree: true },
  { id: '22', name: 'Herbal Tea', description: 'Selection of premium teas', price: 6, category: 'drinks', vegetarian: true, glutenFree: true },
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
    <div className="min-vh-100" style={{ background: 'linear-gradient(to bottom right, #dbeafe, #ffffff, #fef3c7)' }}>
      {/* Header */}
      <header className="py-4" style={{ background: 'linear-gradient(to right, #d97706, #ea580c)' }}>
        <div className="container">
          <h1 className="display-4 fw-bold text-white mb-2">Our Menu</h1>
          <p className="lead text-white" style={{ color: '#fef3c7' }}>Exquisite French Cuisine</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5">
        {/* Search Bar */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`btn ${selectedCategory === 'all' ? 'btn-warning' : 'btn-light'} px-4 py-2 fw-semibold`}
          >
            All Items
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`btn ${selectedCategory === category.id ? 'btn-warning' : 'btn-light'} px-4 py-2 fw-semibold d-flex align-items-center gap-2`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="d-flex flex-column gap-4">
          {categories
            .filter((cat) => selectedCategory === 'all' || selectedCategory === cat.id)
            .map((category) => {
              const categoryItems = filteredItems.filter(
                (item) => item.category === category.id
              );

              if (categoryItems.length === 0) return null;

              return (
                <div key={category.id} className="card shadow-sm border-0">
                  <div className="card-header text-white" style={{ background: 'linear-gradient(to right, #d97706, #ea580c)' }}>
                    <h2 className="h4 fw-bold mb-0 d-flex align-items-center gap-2">
                      <span>{category.icon}</span>
                      {category.name}
                    </h2>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex flex-column gap-4">
                      {categoryItems.map((item) => (
                        <div key={item.id} className="border-bottom pb-4 last-child-border-0">
                          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-2">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-start gap-2 mb-2 flex-wrap">
                                <h3 className="h5 fw-semibold mb-0">{item.name}</h3>
                                <div className="d-flex gap-2 flex-wrap">
                                  {item.vegetarian && (
                                    <span className="badge bg-success">Vegetarian</span>
                                  )}
                                  {item.glutenFree && (
                                    <span className="badge bg-info">Gluten Free</span>
                                  )}
                                </div>
                              </div>
                              <p className="text-muted mb-0">{item.description}</p>
                            </div>
                            <div className="text-nowrap">
                              <span className="h4 fw-bold text-warning mb-0">
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
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body p-5">
              <i className="bi bi-search fs-1 text-muted mb-3 d-block"></i>
              <h3 className="h4 fw-semibold mb-2">No Items Found</h3>
              <p className="text-muted mb-0">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="card shadow-sm border-0 text-white text-center mt-5" style={{ background: 'linear-gradient(to right, #d97706, #ea580c)' }}>
          <div className="card-body p-4">
            <h2 className="h3 fw-bold mb-3">Ready to Dine?</h2>
            <p className="lead mb-4" style={{ color: '#fef3c7' }}>
              Reserve your table and experience our exquisite menu
            </p>
            <Link
              href="/booking"
              className="btn btn-light btn-lg px-4 py-3 fw-semibold"
              style={{ color: '#d97706' }}
            >
              Book a Table
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
