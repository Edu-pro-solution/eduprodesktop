
import "./style.css";
const Home = () => {
  const backgroundStyle = {
    backgroundColor: "#0366D6",
  };
  return (
    <>
   
      <body>
        <main>
          <div
            class="hero-area sasup-hero-height-4 p-rel bg-top-left d-flex align-items-center "
            // data-background="assets/img/bg/banner-1.webp"
            style={backgroundStyle}
          >
       
            <div class="container p-rel">
          
              <div class="row align-items-center">
                <div class="col-xxl-12 col-xl-12 col-lg-12">
                  <div class="sasup-hero-content-4 text-center">
                    <h6 class="sasup-hero-title-4 " style={{ color: "#fff", fontSize: "30px" }}>
                   Welcome to EdSofta
                    </h6>
                    <p class="sasup-hero-text-4 text-center">
                    EdSofta provides the best way to prepare you for your exams with materials you need readily available
                    </p>
                    <a href="/login" class="sasup-hero-started-btn-4">
                      <span>Next</span>
                    </a>
                  </div>
                </div>
              
              </div>
            </div>
          </div>


        </main>
    
      </body>
    </>
  );
};

export default Home;
