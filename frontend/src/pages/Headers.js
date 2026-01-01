import "./shadow.css";
const Headers = () => {
  return (
    <>
      <header>
        <div class="header-sticky shadow">
          <div class="header-main">
            <div class="container">
              <div class="row align-items-center custom-header-height">
                <div class="col-xxl-9 col-xl-9 col-lg-9 d-flex align-items-center col-md-6 col-sm-4 col-6">
                  <div class="sasup-logo mr-35 d-inline-block">
                    <a href="/">
                      <img
                        src="assets/img/logo/edu.PNG"
                        class="logo-1"
                        alt="image not found"
                        style={{ width: "100px", height: "25px" }}
                      />
                    </a>
                    <a href="/">
                      <img
                        src="assets/img/logo/edu.PNG"
                        class="logo-2"
                        alt="image not found"
                        style={{ width: "100px", height: "25px" }}
                      />
                    </a>
                  </div>
                </div>
                <div class="col-xxl-3 col-xl-3 col-lg-4 col-md-8 col-sm-8 col-6">
                  <div class="sasup-header-action-btn">
                    <a
                      href="/login"
                      class="sasup-theme-btn sasup-broder-btn-space-3 ml-25"
                      style={{ color: "#0366D6", backgroundColor: "#ffc107" }}
                    >
                      Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="responsive-sidebar d-block d-lg-none">
        <div class="responsive-sidebar-inner">
          <div class="logo mb-30">
            <div class="row">
              <div class="col-6">
                <img src="assets/img/logo/edu.PNG" alt="image not found" />
              </div>
              <div class="col-6">
                <div class="text-end">
                  <button class="responsive-sidebar-close">
                    <i class="fal fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="resposive-sidebar-menu mb-50">
            <div class="mobile-menu"></div>
          </div>
          <div class="responsive-sidebar-actions">
            <a
              href="/login"
              class="sasup-border-btn d-block sasup-broder-btn-space-3 ms-0 text-center mb-2"
              style={{ color: "#0366D6" }}
            >
              login
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headers;
