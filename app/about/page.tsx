import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(to bottom right, #dbeafe, #ffffff, #fef3c7)' }}>
      {/* Header */}
      <header className="py-4" style={{ background: 'linear-gradient(to right, #d97706, #ea580c)' }}>
        <div className="container">
          <h1 className="display-4 fw-bold text-white mb-2">About La Maison d&apos;Or</h1>
          <p className="lead text-white" style={{ color: '#fef3c7' }}>Our Story</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5">
        {/* Story Section */}
        <section className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <h2 className="h3 fw-bold mb-4">Our Story</h2>
            <div className="text-muted">
              <p className="mb-3">
                La Maison d&apos;Or has been a beacon of culinary excellence since its
                founding. We believe that dining is not just about food—it&apos;s about
                creating memorable experiences that linger long after the last bite.
              </p>
              <p className="mb-3">
                Our restaurant combines traditional French cuisine with modern
                techniques, creating dishes that honor the past while embracing
                innovation. Each plate is crafted with care, using only the finest
                ingredients sourced from local farms and trusted suppliers.
              </p>
              <p className="mb-0">
                Located in the heart of the city, La Maison d&apos;Or offers an elegant
                atmosphere perfect for intimate dinners, business meetings, and
                special celebrations. Our attentive staff ensures that every guest
                feels welcomed and valued.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <h2 className="h3 fw-bold mb-4">Our Values</h2>
            <div className="row g-4">
              <div className="col-md-6">
                <h3 className="h5 fw-semibold mb-2">Excellence</h3>
                <p className="text-muted mb-0">
                  We strive for perfection in every dish, every service, and every
                  interaction with our guests.
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="h5 fw-semibold mb-2">Authenticity</h3>
                <p className="text-muted mb-0">
                  Our recipes and techniques are rooted in tradition, ensuring an
                  authentic dining experience.
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="h5 fw-semibold mb-2">Hospitality</h3>
                <p className="text-muted mb-0">
                  We treat every guest like family, creating a warm and welcoming
                  atmosphere.
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="h5 fw-semibold mb-2">Sustainability</h3>
                <p className="text-muted mb-0">
                  We are committed to sustainable practices, supporting local
                  farmers and reducing our environmental impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <h2 className="h3 fw-bold mb-4">Our Team</h2>
            <div className="row g-4">
              <div className="col-md-4 text-center">
                <div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '96px', height: '96px' }}>
                  <span className="fs-1">👨‍🍳</span>
                </div>
                <h3 className="h5 fw-semibold mb-2">Chef Michel</h3>
                <p className="text-muted mb-0">Executive Chef</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '96px', height: '96px' }}>
                  <span className="fs-1">👩‍🍳</span>
                </div>
                <h3 className="h5 fw-semibold mb-2">Chef Sophie</h3>
                <p className="text-muted mb-0">Pastry Chef</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '96px', height: '96px' }}>
                  <span className="fs-1">👨‍💼</span>
                </div>
                <h3 className="h5 fw-semibold mb-2">Manager Jean</h3>
                <p className="text-muted mb-0">Restaurant Manager</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="card shadow-sm border-0 text-white text-center" style={{ background: 'linear-gradient(to right, #d97706, #ea580c)' }}>
          <div className="card-body p-4">
            <h2 className="h3 fw-bold mb-3">Experience La Maison d&apos;Or</h2>
            <p className="lead mb-4" style={{ color: '#fef3c7' }}>
              Join us for an unforgettable dining experience
            </p>
            <Link
              href="/booking"
              className="btn btn-light btn-lg px-4 py-3 fw-semibold"
              style={{ color: '#d97706' }}
            >
              Reserve Your Table
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
