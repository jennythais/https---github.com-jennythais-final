import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageService";

const AboutPage = () => {
  const { data: pageData } = useQuery(() =>
    pageService.getPageDataByName("about us")
  );
  const { data: homeData } = useQuery(() =>
    pageService.getPageDataByName("home")
  );
  const brands = homeData?.data?.brands || [];

  console.log("data", pageData);
  const about = pageData?.data || [];
  console.log("about", about);
  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={PATHS.HOME}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              About us
            </li>
          </ol>
        </div>
      </nav>
      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            backgroundImage: `url(${about?.banner || {}})`,
          }}
        >
          <h1 className="page-title text-white">
            {pageData?.title || ""}{" "}
            <span className="text-white">{pageData?.subTitle}</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h2 className="title">{about?.title1 || ""}</h2>
              <p>{about?.description1}</p>
            </div>
            <div className="col-lg-6">
              <h2 className="title">{about?.title2}</h2>
              <p>
                {""}
                {about?.description2}
                {""}
              </p>
            </div>
          </div>
          <div className="mb-5" />
        </div>
        <div className="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <h2 className="title">{about?.title3}</h2>
                <p className="lead text-primary mb-3">
                  {""}
                  {about?.description3}
                  {""}
                </p>
              </div>
              <div className="col-lg-6 offset-lg-1">
                <div className="about-images">
                  <img
                    src={about?.image1 || {}}
                    alt
                    className="about-img-front"
                  />
                  <img
                    src={about?.image2 || {}}
                    alt
                    className="about-img-back"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="brands-text">
                <h2 className="title">{about?.titleBrand || ""}</h2>
                <p>{about?.descriptionBrand || ""}</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="brands-display">
                <div className="row justify-content-center">
                  {brands?.map((brand, index) => {
                    return (
                      <div className="col-6 col-sm-4">
                        <a href="#" className="brand" key={index}>
                          <img src={brand} alt="Brand Name" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2" />
      </div>
    </main>
  );
};

export default AboutPage;
