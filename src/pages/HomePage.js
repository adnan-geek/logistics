import React from 'react';
import '../styles/main.css';
import logo from '../imgs/logo.png';
import banner from '../imgs/deliverytruck.jpg';
import fastD from '../imgs/fastdelivery.mp4';
import lgs from '../imgs/lgs.jpg';
import localD from '../imgs/localD.jpg';
import localD1 from '../imgs/localD1.jpg';


const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="homepage__header">
        <nav className="homepage__nav">
          <div className="logo"><img src={logo}/></div>
          <ul className="nav__links">
          <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#faqs">FAQs</a></li>
            <li><a href="#tracking">Tracking</a></li>
            <li><a href="#contact">Contact</a></li>

          </ul>
          <button className="cta">Get a Quote</button>
        </nav>
      </header>

    {/* Hero Section */}
        <section className="homepage__hero">
          <video className="hero__video" autoPlay loop muted>
            <source src={fastD} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero__content">
            <h1>Reliable Small Shipment Solutions</h1>
            <p>At FastLogistics, we provide efficient transportation and logistics services </p>
            <p> tailored for small shipments and local deliveries.</p>
            <button className="cta hero__cta">Learn More</button>
          </div>
        </section>


      {/* Main Section */}
      <main className="homepage__main">
       <section className='about__us'>
              <div className="company__description">
                      <h1>ADYO Logistics</h1>
                      <h2>Your Trusted Partner in Small Shipments</h2>
                      <p>
                        ADYO Logistics specializes in providing efficient transportation and logistics solutions tailored specifically for small shipments. Our mission is to streamline the delivery process for businesses, ensuring that every package reaches its destination safely and on time.
                      </p>
                      <h3>Comprehensive Solutions</h3>
                      <p>
                        We offer a full range of services, including local deliveries, logistics planning, and real-time shipment tracking. With a focus on small trucks, FastLogistics is equipped to handle the unique needs of our clients, providing them with the resources and support necessary for seamless operations.
                      </p>
                      <h3>Commitment to Excellence</h3>
                      <p>
                        At FastLogistics, we pride ourselves on our commitment to customer satisfaction. Our integrated approach ensures that all aspects of the transportation process are managed efficiently, allowing us to exceed our clients' expectations and foster long-lasting partnerships.
                      </p>
            </div>
            <div className='delivery-banner'>
                <img src={banner}/>
            </div>
       </section>
     

        <section id="services" className="services">
          <h2>Our Services</h2>
          <div className="service__list">
            <div className="service__item">
              <img src={localD1}/>
              <h3>Local Deliveries</h3>
              <p>We provide fast and reliable local delivery services, perfect for small packages and goods.</p>
            </div>
            <div className="service__item">
            <img src={localD}/>
              <h3>Small Truck Transportation</h3>
              <p>Our fleet of small trucks is ideal for efficiently handling small to medium-sized shipments within cities or between regions.</p>
            </div>
            <div className="service__item">
            <img src={lgs}/>
              <h3>Logistics Solutions</h3>
              <p>We offer comprehensive logistics services, from route planning to delivery tracking, ensuring smooth and reliable shipments.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="homepage__footer">
        <div className="footer__content">
          <div className="footer__about">
            <h4>FastLogistics</h4>
            <p>Streamlining transportation and logistics for small businesses and local deliveries.</p>
          </div>
          <div className="footer__links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer__social">
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#linkedin">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
