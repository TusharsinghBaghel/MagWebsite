import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { Tab, Nav } from "react-bootstrap";

function EyesOnly() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate(); // Use navigate for "Explore More" button

  return (
    <section id="Eyes_only" className="Eyes_only section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Eyes_only</h2>
        <p>Explore the Literary journey of VNIT</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Tab.Container defaultActiveKey="Eyes_only-tab-1">
          <div className="row">
            <div className="col-lg-3">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="Eyes_only-tab-1">English</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Eyes_only-tab-2">Hindi</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Eyes_only-tab-3">Marathi</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

            <div className="col-lg-9 mt-4 mt-lg-0">
              <Tab.Content>
                <Tab.Pane eventKey="Eyes_only-tab-1">
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>Architecto ut aperiam autem id</h3>
                      <p className="fst-italic">
                        Qui laudantium consequatur laborum sit qui ad sapiente
                        dila parde sonata raqer a videna mareta paulona marka
                      </p>
                      <p>
                        Et nobis maiores eius. Voluptatibus ut enim blanditiis
                        atque harum sint. Laborum eos ipsum ipsa odit magni.
                        Incidunt hic ut molestiae aut qui. Est repellat minima
                        eveniet eius et quis magni nihil. Consequatur dolorem
                        quaerat quos qui similique accusamus nostrum rem vero.
                      </p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src="assets/img/Eyes_only-1.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/prose/english")}
                    >
                      Explore More
                    </button>{" "}
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="Eyes_only-tab-2">
                  {/* Similar structure as above */}
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>Architecto ut aperiam autem id</h3>
                      <p className="fst-italic">
                        Qui laudantium consequatur laborum sit qui ad sapiente
                        dila parde sonata raqer a videna mareta paulona marka
                      </p>
                      <p>
                        Et nobis maiores eius. Voluptatibus ut enim blanditiis
                        atque harum sint. Laborum eos ipsum ipsa odit magni.
                        Incidunt hic ut molestiae aut qui. Est repellat minima
                        eveniet eius et quis magni nihil. Consequatur dolorem
                        quaerat quos qui similique accusamus nostrum rem vero.
                      </p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src="assets/img/Eyes_only-1.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/prose/hindi")}
                    >
                      Explore More
                    </button>{" "}
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="Eyes_only-tab-3">
                  {/* Similar structure as above */}
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>Architecto ut aperiam autem id</h3>
                      <p className="fst-italic">
                        Qui laudantium consequatur laborum sit qui ad sapiente
                        dila parde sonata raqer a videna mareta paulona marka
                      </p>
                      <p>
                        Et nobis maiores eius. Voluptatibus ut enim blanditiis
                        atque harum sint. Laborum eos ipsum ipsa odit magni.
                        Incidunt hic ut molestiae aut qui. Est repellat minima
                        eveniet eius et quis magni nihil. Consequatur dolorem
                        quaerat quos qui similique accusamus nostrum rem vero.
                      </p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src="assets/img/Eyes_only-1.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/prose/marathi")}
                    >
                      Explore More
                    </button>{" "}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </div>
    </section>
  );
}

export default EyesOnly;
