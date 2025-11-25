import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(to bottom right, #dbeafe, #ffffff, #fef3c7)' }}>
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(to right, #d97706, #ea580c)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center text-white">
              <h1 className="display-4 fw-bold mb-4">
                Welcome to La Maison d&apos;Or
              </h1>
              <p className="lead mb-4" style={{ color: '#fef3c7' }}>
                Experience fine dining in an elegant atmosphere
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link
                  href="/booking"
                  className="btn btn-light btn-lg px-4 py-3 fw-semibold"
                  style={{ color: '#d97706' }}
                >
                  Book a Table
                </Link>
                <Link
                  href="/about"
                  className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 display-5">Why Choose Us</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                    <i className="bi bi-clock fs-3 text-warning"></i>
                  </div>
                  <h3 className="card-title fw-semibold mb-3">Easy Booking</h3>
                  <p className="card-text text-muted">
                    Book your table and select your preferred seat in just a few clicks
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                    <i className="bi bi-shield-check fs-3 text-warning"></i>
                  </div>
                  <h3 className="card-title fw-semibold mb-3">Secure Reservations</h3>
                  <p className="card-text text-muted">
                    Your booking is confirmed instantly with a unique booking ID
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                    <i className="bi bi-people fs-3 text-warning"></i>
                  </div>
                  <h3 className="card-title fw-semibold mb-3">Seat Selection</h3>
                  <p className="card-text text-muted">
                    Choose your exact table and seat from our interactive floor plan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-4">Ready to Dine With Us?</h2>
              <p className="lead text-muted mb-4">
                Reserve your table today and experience exceptional cuisine in a
                sophisticated setting
              </p>
              <Link
                href="/booking"
                className="btn btn-lg px-5 py-3 fw-semibold text-white"
                style={{ background: 'linear-gradient(to right, #d97706, #ea580c)' }}
              >
                Make a Reservation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h3 className="h5 fw-bold mb-3">La Maison d&apos;Or</h3>
              <p className="text-secondary">
                Fine dining restaurant offering exceptional cuisine and elegant
                atmosphere.
              </p>
            </div>
            <div className="col-md-4">
              <h3 className="h5 fw-bold mb-3">Quick Links</h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link href="/menu" className="text-secondary text-decoration-none">
                    Menu
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/booking" className="text-secondary text-decoration-none">
                    Book Table
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/my-bookings" className="text-secondary text-decoration-none">
                    My Bookings
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/about" className="text-secondary text-decoration-none">
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/contact" className="text-secondary text-decoration-none">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3 className="h5 fw-bold mb-3">Contact</h3>
              <p className="text-secondary">
                123 Restaurant Street
                <br />
                City, State 12345
                <br />
                Phone: (555) 123-4567
                <br />
                Email: info@lamaisondor.com
              </p>
            </div>
          </div>
          <div className="border-top border-secondary mt-4 pt-4 text-center text-secondary">
            <p className="mb-0">&copy; 2024 La Maison d&apos;Or. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
