
import pro from "./image.png";
import "./style.css";
const Recommend = () => {
  const backgroundStyle = {
    backgroundColor: "#fff",
  };
  return (
    <>


   <main>
  <div
    className="hero-area p-rel bg-top-left d-flex align-items-center mt-110 onboarding-hero"
    style={backgroundStyle}
  >
    <div className="container p-rel">
      <div className="row align-items-center onboarding-row">

        {/* LEFT CONTENT */}
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="sasup-hero-content-4 onboarding-content">
 
                    <h3 class="sasup-hero-title-4" style={{ color: "#000",fontSize: "30px" }}>
                Recommendations
                    </h3>
                    <p class="sasup-hero-text-4" style={{ color: "#000" }}>
                      A wide collection of past question and materials spanning many years is available
                    </p>
          


            {/* VISUAL PROGRESS BAR (3 steps, step 1 active) */}
       {/* ONBOARDING PROGRESS BAR */}
<div className="onboarding-progress-bar">
  <div className="onboarding-progress-fill2"></div>
</div>


            <a
              href="/ask"
              className="sasup-hero-started-btn-4 mt-30"
              style={{ backgroundColor: "#0366D6", color: "white" }}
            >
              <span>Get Started</span>
            </a>

          </div>
        </div>

        {/* RIGHT IMAGE */}
     {/* RIGHT IMAGE (NO FLEX, NO RESIZE) */}
<div className="col-xxl-6 col-xl-6 col-lg-6">
  <div className="sasup-hero-content-right-img-4">
    <img src={pro} alt="image not found" />
  </div>
</div>

      </div>
    </div>
  </div>
</main>

     
     
    </>
  );
};

export default Recommend;
