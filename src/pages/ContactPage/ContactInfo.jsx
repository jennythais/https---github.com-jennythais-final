import React from "react";
import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageService";

const ContactInfo = () => {
  const { data: dataService } = useQuery(() =>
    pageService.getPageDataByName("service")
  );
  const services = dataService?.data || [];

  return (
    <div className="col-lg-6 mb-2 mb-lg-0">
      <h2 className="title mb-1">{services?.title || ""}</h2>
      <p className="mb-3">{services?.description || ""}</p>
      <div className="row">
        <div className="col-sm-7">
          <div className="contact-info">
            <h3>The Office</h3>
            <ul className="contact-list">
              <li>
                <i className="icon-map-marker" /> {services?.address || ""}
              </li>
              <li>
                <i className="icon-phone" />
                <a href="tel:#">{services?.phone}</a>
              </li>
              <li>
                <i className="icon-envelope" />
                <a href="mailto:#">{services?.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="contact-info">
            <h3>The Office</h3>
            <ul className="contact-list">
              <li>
                <i className="icon-clock-o" />
                <span className="text-dark">{services?.working || ""}</span>
              </li>
              <li>
                <i className="icon-calendar" />
                <span className="text-dark">
                  {services?.workingSunday || ""}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
