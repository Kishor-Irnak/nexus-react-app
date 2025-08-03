function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="./public/verify.png"  // place your logo file in the public folder
            alt="Logo"
            width="32"
            height="32"
            className="me-2"
           />
           <span className="fw-bold fs-4 text-dark">Nexus</span>
        </a>

        {/* Mobile menu button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Centered Search Bar */}
          <form
            className="d-flex mx-auto"
            style={{ maxWidth: '400px', flex: 1 }}
          >
            <input
              className="form-control rounded-pill px-3"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          {/* Right side icons */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-3">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-house-door fs-5"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-bell fs-5"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-envelope fs-5"></i>
              </a>
            </li>
     
           
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
