import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import salonImage from '../Assets/salon.jpg';
import hairImage from '../Assets/hair.jpg';
import beautyImage from '../Assets/beauty.jpg';
import skincareImage from '../Assets/skincare.jpg';

const Home = () => {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh'
    }}>
      {/* Home Hero Section (unchanged) */}
      <div
        className="container-fluid d-flex align-items-center justify-content-center px-3 px-md-5"
        style={{ backgroundColor: '#3498db', minHeight: '82vh' }}
      >
        <style>
          {`
            .btn-conteiner {
              display: flex;
              justify-content: center;
              --color-text: #ffffff;
              --color-background: #1abc9c;
              --color-outline: rgba(20, 255, 255, 0.5);
              --color-shadow: rgba(29, 86, 100, 0.5);
            }

            .btn-content {
              display: flex;
              align-items: center;
              padding: 5px 30px;
              text-decoration: none;
              font-family: 'Poppins', sans-serif;
              font-weight: 600;
              font-size: 24px;
              color: var(--color-text);
              background: var(--color-background);
              transition: 1s;
              border-radius: 100px;
              box-shadow: 0 0 0.2em 0 var(--color-background);
            }

            .btn-content:hover, .btn-content:focus {
              transition: 0.5s;
              -webkit-animation: btn-content 1s;
              animation: btn-content 1s;
              outline: 0.1em solid transparent;
              outline-offset: 0.2em;
              box-shadow: 0 0 0.4em 0 var(--color-background);
            }

            .btn-content .icon-arrow {
              transition: 0.5s;
              margin-right: 0px;
              transform: scale(0.6);
            }

            .btn-content:hover .icon-arrow {
              transition: 0.5s;
              margin-right: 25px;
            }

            .icon-arrow {
              width: 20px;
              margin-left: 15px;
              position: relative;
              top: 6%;
            }

            #arrow-icon-one {
              transition: 0.4s;
              transform: translateX(-60%);
            }

            #arrow-icon-two {
              transition: 0.5s;
              transform: translateX(-30%);
            }

            .btn-content:hover #arrow-icon-three {
              animation: color_anim 1s infinite 0.2s;
            }

            .btn-content:hover #arrow-icon-one {
              transform: translateX(0%);
              animation: color_anim 1s infinite 0.6s;
            }

            .btn-content:hover #arrow-icon-two {
              transform: translateX(0%);
              animation: color_anim 1s infinite 0.4s;
            }

            @keyframes color_anim {
              0% { fill: white; }
              50% { fill: var(--color-background); }
              100% { fill: white; }
            }

            @-webkit-keyframes btn-content {
              0% { outline: 0.2em solid var(--color-background); outline-offset: 0; }
            }

            @keyframes btn-content {
              0% { outline: 0.2em solid var(--color-background); outline-offset: 0; }
            }

            @media (max-width: 576px) {
              .btn-content {
                font-size: 20px;
                padding: 5px 20px;
              }
              .icon-arrow {
                width: 15px;
                margin-left: 10px;
              }
            }
          `}
        </style>

        <div className="row w-100 align-items-center text-white g-4">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-5 display-md-4 fw-bold animate__animated animate__fadeInDown">
              Your One-Stop <span className="text-warning">Beauty Destination</span>
            </h1>
            <p className="lead mt-3 animate__animated animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
              Discover expert services from salon to skincare in one elegant space.
            </p>
            <div className="mt-4 d-flex flex-column flex-sm-row flex-wrap gap-3 justify-content-center justify-content-md-start">
              <div className="btn-conteiner animate__animated animate__zoomIn" style={{ animationDelay: '0.5s' }}>
                <a href="#salon" className="btn-content">
                  <span>Salon</span>
                  <svg className="icon-arrow" viewBox="30 0 10 43" height="20" width="20">
                    <path id="arrow-icon-one" d="M40.154 0L65.651 21.945L40.154 43.891L37.172 40.909L56.127 21.945L37.172 3L40.154 0Z" />
                    <path id="arrow-icon-two" d="M25.497 0L50.994 21.945L25.497 43.891L22.515 40.909L41.47 21.945L22.515 3L25.497 0Z" />
                    <path id="arrow-icon-three" d="M10.841 0L36.338 21.945L10.841 43.891L7.859 40.909L26.814 21.945L7.859 3L10.841 0Z" />
                  </svg>
                </a>
              </div>
              <div className="btn-conteiner animate__animated animate__zoomIn" style={{ animationDelay: '0.7s' }}>
                <a href="#beauty" className="btn-content">
                  <span>Beauty</span>
                  <svg className="icon-arrow" viewBox="30 0 10 43" height="20" width="20">
                    <path id="arrow-icon-one" d="M40.154 0L65.651 21.945L40.154 43.891L37.172 40.909L56.127 21.945L37.172 3L40.154 0Z" />
                    <path id="arrow-icon-two" d="M25.497 0L50.994 21.945L25.497 43.891L22.515 40.909L41.47 21.945L22.515 3L25.497 0Z" />
                    <path id="arrow-icon-three" d="M10.841 0L36.338 21.945L10.841 43.891L7.859 40.909L26.814 21.945L7.859 3L10.841 0Z" />
                  </svg>
                </a>
              </div>
              <div className="btn-conteiner animate__animated animate__zoomIn" style={{ animationDelay: '0.9s' }}>
                <a href="#skincare" className="btn-content">
                  <span>Skincare</span>
                  <svg className="icon-arrow" viewBox="30 0 10 43" height="20" width="20">
                    <path id="arrow-icon-one" d="M40.154 0L65.651 21.945L40.154 43.891L37.172 40.909L56.127 21.945L37.172 3L40.154 0Z" />
                    <path id="arrow-icon-two" d="M25.497 0L50.994 21.945L25.497 43.891L22.515 40.909L41.47 21.945L22.515 3L25.497 0Z" />
                    <path id="arrow-icon-three" d="M10.841 0L36.338 21.945L10.841 43.891L7.859 40.909L26.814 21.945L7.859 3L10.841 0Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <img
              src={salonImage}
              alt="Beauty Services"
              className="img-fluid rounded animate__animated animate__pulse"
              style={{
                maxHeight: '400px',
                objectFit: 'cover',
                border: '2px solid #566573',
                boxShadow: '0px 8px 30px 25px #85c1e9',
                width: '100%',
                maxWidth: '500px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0px 12px 40px 30px #3498db';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0px 8px 30px 25px #85c1e9';
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container-fluid px-0">
        {/* Salon Section */}
        <section className="py-5" id="salon">
          <div className="container">
            <div className="row align-items-center py-5">
              <div className="col-md-6 text-center mb-4 mb-md-0">
                <img
                  src={hairImage}
                  alt="Salon Services"
                  className="img-fluid rounded shadow animate__animated animate__slideInLeft"
                  style={{
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    borderRadius: '15px',
                    maxHeight: '400px',
                    objectFit: 'cover',
                    border: '2px solid #3498db',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                  }}
                />
              </div>
              <div className="col-md-6 text-center animate__animated animate__fadeInRight">
                <h2 className="text-primary fw-bold mb-4 animate__animated animate__fadeInDown">Premium Salon Services</h2>
                <p className="lead mb-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                  Experience luxury hair care with our expert stylists using top-quality products for your perfect look.
                </p>
                <ul className="list-unstyled d-flex flex-column align-items-center" style={{ padding: 0, margin: 0 }}>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '0.4s' }}>
                    <strong>Precision Haircuts</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Tailored cuts to suit your style and face shape.
                    </p>
                  </li>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '0.6s' }}>
                    <strong>Balayage & Highlights</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Vibrant, hand-painted color for a natural glow.
                    </p>
                  </li>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '0.8s' }}>
                    <strong>Keratin Treatments</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Smooth and strengthen hair for lasting shine.
                    </p>
                  </li>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '1.0s' }}>
                    <strong>Scalp Treatments</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Nourish and revitalize for healthy hair growth.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Beauty Section */}
        <section className="py-5" id="beauty">
          <div className="container">
            <div className="row align-items-center flex-md-row-reverse py-5">
              <div className="col-md-6 text-center mb-4 mb-md-0">
                <img
                  src={beautyImage}
                  alt="Beauty Services"
                  className="img-fluid rounded shadow animate__animated animate__slideInRight"
                  style={{
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    borderRadius: '15px',
                    maxHeight: '400px',
                    objectFit: 'cover',
                    border: '2px solid #3498db',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                  }}
                />
              </div>
              <div className="col-md-6 text-center animate__animated animate__fadeInLeft">
                <h2 className="text-primary fw-bold mb-4 animate__animated animate__fadeInDown">Luxury Beauty Treatments</h2>
                <p className="lead mb-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                  Enhance your natural beauty with our professional makeup and nail services.
                </p>
                <ul className="list-unstyled d-flex flex-column align-items-center" style={{ padding: 0, margin: 0 }}>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '0.4s' }}>
                    <strong>Bridal Makeup</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Flawless, long-lasting looks for your special day.
                    </p>
                  </li>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '0.6s' }}>
                    <strong>Gel Manicures</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Durable, glossy nails with vibrant colors.
                    </p>
                  </li>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '0.8s' }}>
                    <strong>Nail Art Design</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Custom designs to express your unique style.
                    </p>
                  </li>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '1.0s' }}>
                    <strong>Spa Pedicures</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Relaxing foot care with a polished finish.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skincare Section */}
        <section className="py-5" id="skincare">
          <div className="container">
            <div className="row align-items-center py-5">
              <div className="col-md-6 text-center mb-4 mb-md-0">
                <img
                  src={skincareImage}
                  alt="Skincare Services"
                  className="img-fluid rounded shadow animate__animated animate__slideInLeft"
                  style={{
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    borderRadius: '15px',
                    maxHeight: '400px',
                    objectFit: 'cover',
                    border: '2px solid #3498db',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                  }}
                />
              </div>
              <div className="col-md-6 text-center animate__animated animate__fadeInRight">
                <h2 className="text-primary fw-bold mb-4 animate__animated animate__fadeInDown">Advanced Skincare Solutions</h2>
                <p className="lead mb-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                  Rejuvenate your skin with our clinically-proven treatments tailored to your skin's unique needs.
                </p>
                <ul className="list-unstyled d-flex flex-column align-items-center" style={{ padding: 0, margin: 0 }}>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '0.4s' }}>
                    <strong>HydraFacial MD</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Deep cleansing and hydration for radiant skin.
                    </p>
                  </li>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '0.6s' }}>
                    <strong>Microdermabrasion</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Exfoliate and rejuvenate for a smooth complexion.
                    </p>
                  </li>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '0.8s' }}>
                    <strong>Chemical Peels</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Improve skin tone and texture with tailored peels.
                    </p>
                  </li>
                  <li className="mb-3 animate__animated animate__bounceIn" style={{ animationDelay: '1.0s' }}>
                    <strong>Microneedling</strong>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      Stimulate collagen for youthful, firm skin.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-dark text-white py-5">
          <div className="container">
            <div className="row g-4">
              {/* Contact Info */}
              <div className="col-md-4 text-center text-md-start animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                <h4 className="fw-bold mb-4 animate__animated animate__fadeInDown">Contact Us</h4>
                <p className="mb-2 animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
                  <i className="bi bi-geo-alt me-2"></i>Lb nagar vanastalipuram hydetabad 500070
                </p>
                <p className="mb-2 animate__animated animate__fadeInUp" style={{ animationDelay: '0.6s' }}>
                  <i className="bi bi-telephone me-2"></i> (91+) 9777733220
                </p>
                <p className="mb-2 animate__animated animate__fadeInUp" style={{ animationDelay: '0.8s' }}>
                  <i className="bi bi-envelope me-2"></i> custqsalon@gmail.com
                </p>
              </div>

              {/* Quick Links */}
              <div className="col-md-4 text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
                <h4 className="fw-bold  mb-4 animate__animated animate__fadeInDown">Quick Links</h4>
                <ul className="list-unstyled">
                  <li className="mb-2 animate__animated animate__fadeInUp" style={{ animationDelay: '0.6s' }}>
                    <a href="#salon" className=" text-dark text-decoration-none">Salon Services</a>
                  </li>
                  <li className="mb-2 animate__animated animate__fadeInUp" style={{ animationDelay: '0.8s' }}>
                    <a href="#beauty" className="text-dark text-decoration-none">Beauty Treatments</a>
                  </li>
                  <li className="mb-2 animate__animated animate__fadeInUp" style={{ animationDelay: '1.0s' }}>
                    <a href="#skincare" className="text-dark text-decoration-none">Skincare Solutions</a>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div className="col-md-4 text-center text-md-end animate__animated animate__fadeInUp" style={{ animationDelay: '0.6s' }}>
                <h4 className="fw-bold mb-4 animate__animated animate__fadeInDown">Follow Us</h4>
                <div className="d-flex justify-content-center justify-content-md-end gap-3">
                  <a href="https://facebook.com" className="text-white animate__animated animate__bounceIn" style={{ animationDelay: '0.8s' }} target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-facebook fs-3"></i>
                  </a>
                  <a href="https://twitter.com" className="text-white animate__animated animate__bounceIn" style={{ animationDelay: '1.0s' }} target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-twitter fs-3"></i>
                  </a>
                  <a href="https://instagram.com" className="text-white animate__animated animate__bounceIn" style={{ animationDelay: '1.2s' }} target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-instagram fs-3"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-5 animate__animated animate__fadeInUp" style={{ animationDelay: '0.8s' }}>
              <p className="mb-0">©️ {new Date().getFullYear()} Beauty Haven. All rights reserved.</p>
            </div>
          </div>

          {/* Footer Styles */}
          <style>
            {`
              footer.bg-dark {
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
                border-top: 5px solid #1abc9c;
              }

              footer h4 {
                font-family: 'Poppins', sans-serif;
                font-weight: 700;
                font-size: 1.8rem;
                color: #1abc9c;
                position: relative;
                margin-bottom: 1.5rem;
              }

              footer h4::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                width: 50px;
                height: 3px;
                background: #1abc9c;
                border-radius: 2px;
              }

              footer p,
              footer a.text-white {
                font-family: 'Poppins', sans-serif;
                font-size: 1rem;
                color: #ecf0f1;
                transition: color 0.3s ease;
              }

              footer a.text-white:hover {
                color: #1abc9c !important;
              }

              footer .bi {
                font-size: 1.8rem;
                transition: transform 0.3s ease, color 0.3s ease;
              }

              footer .bi:hover {
                transform: scale(1.3);
                color: #1abc9c;
              }

              @media (max-width: 767px) {
                footer .text-md-start,
                footer .text-md-end {
                  text-align: center !important;
                }

                footer .d-flex.justify-content-md-start,
                footer .d-flex.justify-content-md-end {
                  justify-content: center !important;
                }
              }
            `}
          </style>
        </footer>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          /* Existing Animations */
          @keyframes fadeInUp {
            from { opacity: 0; transform: translate3d(0, 20px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }

          @keyframes fadeInDown {
            from { opacity: 0; transform: translate3d(0, -20px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }

          @keyframes slideInLeft {
            from { opacity: 0; transform: translate3d(-50px, 0, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }

          @keyframes slideInRight {
            from { opacity: 0; transform: translate3d(50px, 0, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }

          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }

          /* New Animation */
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }

          .animate__animated {
            animation-duration: 1s;
            animation-fill-mode: both;
          }

          .animate__fadeInUp { animation-name: fadeInUp; }
          .animate__fadeInDown { animation-name: fadeInDown; }
          .animate__slideInLeft { animation-name: slideInLeft; }
          .animate__slideInRight { animation-name: slideInRight; }
          .animate__zoomIn { animation-name: zoomIn; }
          .animate__pulse { animation-name: pulse; animation-iteration-count: infinite; }
          .animate__bounceIn { animation-name: bounceIn; }

          /* General Section Styles */
          section {
            background: #ffffff;
            border-radius: 15px;
            margin: 20px 0;
            padding: 40px 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          section:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          }

          /* Section Headings */
          h2.text-primary {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-size: 2.5rem;
            background: linear-gradient(90deg, #3498db, #1abc9c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
            margin-bottom: 1.5rem;
          }

          h2.text-primary::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: #1abc9c;
            border-radius: 2px;
          }

          /* Section Paragraphs */
          p.lead {
            font-family: 'Poppins', sans-serif;
            font-size: 1.25rem;
            color: #566573;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto 1.5rem;
          }

          /* List Items */
          ul.list-unstyled li {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            width: 100%;
            max-width: 400px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          ul.list-unstyled li:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }

          ul.list-unstyled li strong {
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 1.1rem;
            color: #34495e;
          }

          ul.list-unstyled li p.text-muted {
            font-family: 'Poppins', sans-serif;
            font-size: 0.9rem;
            color: #7f8c8d;
            margin: 0;
          }

          /* Responsive Adjustments */
          @media (max-width: 767px) {
            .display-5 { font-size: 2.5rem; }
            .lead { font-size: 1.1rem; }
            ul.list-unstyled li strong { font-size: 0.95rem; }
            ul.list-unstyled li p { font-size: 0.8rem; }
            section { padding: 20px 0; margin: 10px 0; }
            h2.text-primary { font-size: 2rem; }
            ul.list-unstyled li { padding: 10px; max-width: 100%; }
          }

          @media (min-width: 768px) and (max-width: 1199px) {
            .display-5 { font-size: 3rem; }
            ul.list-unstyled li strong { font-size: 1rem; }
            ul.list-unstyled li p { font-size: 0.85rem; }
          }

          @media (min-width: 1200px) {
            .display-5 { font-size: 3.5rem; }
            ul.list-unstyled li strong { font-size: 1.05rem; }
            ul.list-unstyled li p { font-size: 0.9rem; }
          }

          @media (min-width: 1600px) {
            .container { max-width: 1500px; }
            ul.list-unstyled li strong { font-size: 1.1rem; }
            ul.list-unstyled li p { font-size: 0.95rem; }
          }

          @media (min-width: 2000px) {
            .container { max-width: 1800px; }
            .display-5 { font-size: 4rem; }
            .lead { font-size: 1.5rem; }
            ul.list-unstyled li strong { font-size: 1.2rem; }
            ul.list-unstyled li p { font-size: 1rem; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;