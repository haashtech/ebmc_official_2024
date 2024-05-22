import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function Testimonials() {
  const testimonialsData = [
    {
      id: 1,
      image: 'kareem.jpeg',
      quote:
        "I am delighted to share my positive experience with Etihad Business & Management LLC. Their team's expertise and proactive approach to my business's financial needs have been outstanding. The personalized service makes them a reliable partner.",
      name: 'Kareem',
      company: 'Stop N Shop Center LLC',
      stars: [1, 1, 1, 1, 2],
    },
    {
      id: 2,
      image: 'ashkar tharakath.jpeg',
      quote:
        "I can't speak highly enough about the exceptional service I received from Etihad Business & Management LLC. Their team's expertise and dedication have been instrumental in managing my business finances effectively.",
      name: 'Ashkar Tharakath',
      company: 'Managing Partner Eazy Pack Group-UAE',
      stars: [1, 1, 1, 1, 2],
    },
    {
      id: 3,
      image: 'jashim.jpeg',
      quote:
        "I am thrilled to share my positive experience with Etihad Business & Management LLC. From the start, their team exhibited a level of professionalism and expertise that surpassed my expectations. Their proactive approach to addressing financial challenges and personalized service sets them apart.",
      name: 'Jashim',
      company: 'X A Gold LLC',
      stars: [1, 1, 1, 2, 2],
    },
    {
      id: 4,
      image: 'saeed.jpeg',
      quote:
        "Choosing Etihad Business & Management LLC has been a game-changer for my business. Their team's proficiency in navigating financial complexities and offering strategic insights has been invaluable.",
      name: 'Saeed',
      company: '',
      stars: [1, 1, 1, 1, 1],
    },
    {
      id: 5,
      image: 'abdulazeez.jpeg',
      quote:
        "Etihad Business & Management LLC have been instrumental in optimizing my business finances. Their expertise, proactive solutions, and personalized service make them stand out. Clear communication and a commitment to excellence make them my top choice. Highly recommend!",
      name: 'Abdul Azeez',
      company: 'Shifa Al Jazeera Medical Center LLC',
      stars: [1, 1, 1, 1, 1],
    },
  ];

  const sliderSettings = {
   
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    loop: true,
  };

  return (
    <div className="testimonial-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <div className="testimonial-heading" style={{paddingTop:'25px'}}>
              <span className="font-16 font-outfit weight-500 lineh-16 color36 d-inline-block consultingspan margin-b20">
                Testimonials
              </span>
              <h1 className="font-outfit font-44 lineh-52 color37 weight-600 margin-b20">
                Some love words from clients
              </h1>
            </div>
          </div>
        </div>
        <div className="row  column">
          <div className="col-lg-12">
            <Slider {...sliderSettings}>
              {testimonialsData.map((testimonial) => (
                <div className="testimonial-item" key={testimonial.id}>
                  <div className="quote-icon">
                    <img src="assets/images/icons/quito2.png" alt="" />
                  </div>
                  <div className="star-list">
                    <ul>
                      {testimonial.stars.map((star, index) => (
                        <li key={index}>
                          <span className={index === 4 ? 'color33' : 'color-24'}>
                            <i className="fa-solid fa-star" />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="testimonial-text">
                    {testimonial.quote}
                  </p>
                  <div className="divider"></div>
                  <div className="author-info">
                    <div className="author-image">
                      <img 
                        src={`assets/images/testimonial_imgs/testimonial_imgs/${testimonial.image}`}
                        alt=""
                      />
                    </div>
                    <div className="author-details">
                      <h1 className="author-name">
                        {testimonial.name}
                      </h1>
                      <p className="author-company">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
