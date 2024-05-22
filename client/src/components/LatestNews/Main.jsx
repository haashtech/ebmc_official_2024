import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

function Main() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/user/viewnewses");
        // console.log(response.data);

        const sortedNews = response.data.news.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        const formattedNews = sortedNews.map((newsItem) => ({
          ...newsItem,
          date: new Date(newsItem.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        }));

        setNews(formattedNews);
      } catch (err) {
        console.error("Error in fetching data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <>
        <div className="welcomeabout-area">
          <div className="row">
            <div className="col-lg-12">
              <div className="welcomeaboiut2 text-center">
                <h1 className="font-lora font-60 lineh-64 weight-500 color margin-b24">
                  Latest News
                </h1>
                <p className="font-20 weight-500 font-ks lineh-20 color">
                  <a href="/news" className="color">
                    Home
                  </a>
                  <span>
                    <i className="fa-solid fa-angle-right" />
                  </span>
                  Latest News
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*===== WElCOME END=======*/}
        {/*===== BLOG 3 STARTS=======*/}

        <div className="container" style={{ marginTop: "65px" }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="blog2-author-area"></div>
            </div>
            <div>
              <div className="row" style={{ marginTop: "0px" }}>
                <div className="service-authors5 text-center margin-b60 mb-0">
                  <span className="font-16 font-outfit weight-500 lineh-16 color36 d-inline-block consultingspan margin-b20">
                    Latest News
                  </span>
                  {/* <h1 className="font-outfit font-44 lineh-52 color37 weight-600 margin-b20">
              Latest Update!
              </h1> */}
                </div>
              </div>
              {news && news.length > 0 ? (
                news.map((item) => (
                  <div
                    key={news._id}
                    className="blog2-ahtuor2 blog2inner"
                    style={{ marginBottom: "20px" }}
                  >
                    <div className="blog-date-list margin-b">
                      <img
                        style={{ marginBottom: "15px" }}
                        src="assets/images/icons/daterane.png"
                        alt=""
                      />
                      <div className="font-12 lineh-16 font-outfit weight-300 color-17">
                        <h1 className="font-20 font-outfit color-17 lineh-20 weight-50 margin-b14">
                          {item.date}{" "}
                          {/* Replace with the actual property name from your data */}
                        </h1>
                      </div>
                    </div>
                    <div>
                      <h1 className="font-20 font-outfit color-17 lineh-20 weight-600 margin-b14">
                        {item.title}{" "}
                        {/* Replace with the actual property name from your data */}
                      </h1>
                    </div>
                    <p className="font-16 font-outfit lineh-26 weight-400 color-17 margin-b24">
                      {item.description}{" "}
                      {/* Replace with the actual property name from your data */}
                    </p>
                    <a
                      href="/news"
                      className="font-16 font-outfit weight-700 color-17 lineh-26 d-inline-block learn-more"
                    >
                      <span></span>
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-center" style={{ height: "200px" }}>
                  <h2>No News Available</h2>
                  <p>Check back later for more updates.</p>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center"></div>
          </div>
        </div>
      </>
    </>
  );
}

export default Main;
