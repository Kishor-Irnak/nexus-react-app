function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand fw-bold fs-4 text-primary" href="#">
          Nexus
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
            {/* Profile dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://via.placeholder.com/32"
                  alt="profile"
                  className="rounded-circle me-2"
                  width="32"
                  height="32"
                />
                <span className="d-none d-lg-inline">Profile</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    My Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
