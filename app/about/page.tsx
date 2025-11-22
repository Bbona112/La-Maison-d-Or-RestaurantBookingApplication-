import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-2">About La Maison d&apos;Or</h1>
          <p className="text-amber-100 text-lg">Our Story</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {/* Story Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              La Maison d&apos;Or has been a beacon of culinary excellence since its
              founding. We believe that dining is not just about food—it&apos;s about
              creating memorable experiences that linger long after the last bite.
            </p>
            <p className="mb-4">
              Our restaurant combines traditional French cuisine with modern
              techniques, creating dishes that honor the past while embracing
              innovation. Each plate is crafted with care, using only the finest
              ingredients sourced from local farms and trusted suppliers.
            </p>
            <p>
              Located in the heart of the city, La Maison d&apos;Or offers an elegant
              atmosphere perfect for intimate dinners, business meetings, and
              special celebrations. Our attentive staff ensures that every guest
              feels welcomed and valued.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for perfection in every dish, every service, and every
                interaction with our guests.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Authenticity
              </h3>
              <p className="text-gray-600">
                Our recipes and techniques are rooted in tradition, ensuring an
                authentic dining experience.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Hospitality
              </h3>
              <p className="text-gray-600">
                We treat every guest like family, creating a warm and welcoming
                atmosphere.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Sustainability
              </h3>
              <p className="text-gray-600">
                We are committed to sustainable practices, supporting local
                farmers and reducing our environmental impact.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👨‍🍳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Chef Michel
              </h3>
              <p className="text-gray-600">Executive Chef</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👩‍🍳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Chef Sophie
              </h3>
              <p className="text-gray-600">Pastry Chef</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Manager Jean
              </h3>
              <p className="text-gray-600">Restaurant Manager</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Experience La Maison d&apos;Or</h2>
          <p className="text-xl mb-6 text-amber-100">
            Join us for an unforgettable dining experience
          </p>
          <Link
            href="/booking"
            className="inline-block bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 transition-colors shadow-lg"
          >
            Reserve Your Table
          </Link>
        </section>
      </main>
    </div>
  );
}

