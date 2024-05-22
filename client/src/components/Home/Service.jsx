import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const Service = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [show, setShow] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (service) => {
    setSelectedService(service);
    setShow(true);
  };

  const servicesData = [
    {
      id: 1,
      image: '/assets/images/service_imgs/tex.png',
      title: 'Corporate Tax Registration Filing',
      description:
        'Corporate Tax Registration Filing ensures businesses comply with tax laws, optimize liabilities, and maintain financial transparency.',
    },
    {
      id: 2,
      image: '/assets/images/service_imgs/aml.png',
      title: 'AML/CFT Screening Solutions',
      description:
        'AML Screening validates customer data against watchlists, ensuring compliance and detecting potential money laundering.',
    },
    {
      id: 3,
      image: '/assets/images/service_imgs/vat.png',
      title: 'VAT Registration Filing',
      description:
        'VAT Registration Filing: Essential for businesses to legally register for Value Added Tax and submit regular filings, ensuring compliance and transparent financial reporting.',
    },
    {
      id: 4,
      image: '/assets/images/service_imgs/paper-analysis.png',
      title: 'ERP and Accounting Software Implementation',
      description:
        'ERP and Accounting Software Implementation streamlines operations, enhances efficiency, ensures accurate financial management, and fosters seamless collaboration, empowering real-time insights for informed decision-making.',
    },
    {
      id: 5,
      image: '/assets/images/service_imgs/RBI Reporting made simpler with FinCluez - profinch.png',
      title: 'Internal Auditing',
      description:
        'Internal Auditing also plays a crucial role in risk management by assessing and mitigating potential threats. Additionally, it fosters transparency within the organization, enhancing accountability and overall governance.',
    },
    {
      id: 6,
      image: '/assets/images/service_imgs/Accounting stock photo_ Image of economy, currency, bills - 1868862.png',
      title: 'Accounting Structure Making',
      description:
        'Designing an accounting structure organizes financial data systematically for accurate reporting and informed decision-making, supporting overall business success.',
    },
    {
      id: 7,
      image: '/assets/images/service_imgs/finance.webp',
      title: 'Financial Audit',
      description:
        'A financial audit is an independent review of a company\'s financial information for accuracy and compliance, giving stakeholders confidence in its reliability.',
    },
    {
      id: 8,
      image: '/assets/images/service_imgs/staff training.webp ',
      title: 'Staff Training',
      description:
        'Staff training is the targeted process of improving employees\' skills and knowledge for better job performance, leading to increased productivity and organizational success.',
    },
    {
      id: 9,
      image: '/assets/images/service_imgs/business-man-financial-inspector-secretary-making-report-calculating-checking-balance-internal-revenue-service-inspector-checking-document-audit-concept.webp',
      title: 'Financial Analysis',
      description:
        'Financial analysis evaluates a business\'s performance using tools like statements and ratios. It assesses profitability, stability, and risks, aiding informed decisions and attracting investors.',
    },
    {
      id: 10,
      image: '/assets/images/service_imgs/CPA Insurance for Accountants_ Cost, Coverage & Providers.png',
      title: 'Financial Statement',
      description:
        'A financial statement is a brief record summarizing a business\'s financial status, including income, expenses, and assets, for quick analysis and decision-making.',
    },
    {
      id: 11,
      image: '/assets/images/service_imgs/month end.png',
      title: 'Month-End Close Out',
      description:
        'Month-End Close: Monthly financial wrap-up, reconciling accounts and closing temporary ones for accurate statements, supporting decisions and compliance.',
    },
    {
      id: 12,
      image: '/assets/images/service_imgs/liquidity.png',
      title: 'Liquidation Reports',
      description:
        'Liquidation reports summarize the business liquidation process, covering the liquidator\'s appointment, assets, creditors, finances, expenses, and proceeds distribution for stakeholders and legal compliance.',
    },
    {
      id: 13,
      image: '/assets/images/service_imgs/revenue-operations-concept.png',
      title: 'Revenue Certificates',
      description:
        'Revenue certificates: Govt-issued funds for projects, investors earn fixed returns, funding public initiatives.',
    },
    {
      id: 14,
      image: '/assets/images/service_imgs/managment.png',
      title: 'Management Reports',
      description:
        'Management reports provide essential information for decision-making. Generated regularly, they offer insights into financial performance, operations, and strategy, aiding leaders in informed decision-making and goal alignment.',
    },
  ];

  return (
    <div className="service5-section-area section-padding1">
      <img src="/assets/images/elementor/elementor26.png" alt="" className="elementoe5" />
      <div className="container" style={{marginTop:'60px'}}>
        <div className="row">
          <div className="col-lg-6 m-auto">
            <div className="service-authors5 text-center margin-b60 mb-0">
              <span className="font-16 font-outfit weight-500 lineh-16 color36 d-inline-block consultingspan margin-b20">
                Services
              </span>
              <h1 className="font-outfit font-44 lineh-52 color37 weight-600 margin-b20">
                What we do!
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          {servicesData.map((service, index) => (
            <div className="col-lg-4" key={index}>
              <div className="service5-box5area margin-b30">
                <div className="service5img">
                  <img src={service.image} alt="" />
                </div>
                <div className="servicetextimg">
                  <div
                    className="font-outfit font-22 lineh-22 weight-600 color37 d-inline-block margin-b "
                   
                  >
                    {service.title}
                  </div>
                  <p className="font-outfit font-16 lineh-20 weight-400 color38 margin-b16 text-justify">
                    {`${service.description.substring(0, 100)}... `}
                    <span style={{color:'blue',cursor:'pointer'}}
                      className="view-more-link"
                      onClick={() => handleShow(service)} 
                    >
                      Read More
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Individual Service Modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedService ? selectedService.title : ''}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedService ? selectedService.description : ''}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Service;
