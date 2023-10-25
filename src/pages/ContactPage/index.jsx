import React from "react";
import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageService";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import useMutation from "../../hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/path";
import { subscribeService } from "../../services/subscribeService";
import { message } from "antd";
import { useState } from "react";
import ContactStore from "./ContactStore";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const { data: dataService } = useQuery(() =>
    pageService.getPageDataByName("service")
  );
  const services = dataService?.data || [];
  const navigate = useNavigate();
  const { execute } = useMutation(subscribeService.getSubscribes);

  const handleSubmitForm = (payload, callback) => {
    if (payload) {
      execute(payload, {
        onSuccess: (data) => {
          setLoading(true);
          message.success("Ban da gui yeu cau thanh cong");
          setTimeout(() => {
            navigate(PATHS.HOME);
            setLoading(false);
            callback?.();
          }, 400);
        },
        onFail: (errorData) => {
          setLoading(false);
        },
      });
    }
  };
  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact us
            </li>
          </ol>
        </div>
      </nav>
      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            backgroundImage: `url(${services?.banner || {}} )`,
          }}
        >
          <h1 className="page-title text-white">
            {dataService?.title || ""}{" "}
            <span className="text-white">{dataService?.subTitle || ""}</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <ContactInfo />
            <ContactForm
              handleSubmitForm={handleSubmitForm}
              loading={loading}
            />
          </div>
          <hr className="mt-4 mb-5" />
          <ContactStore />
        </div>
        <div id="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15677.671652456593!2d106.6603257!3d10.7792694!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752940e76e8ccb%3A0x9ed4e323c103e3d1!2sCFD%20Circle!5e0!3m2!1svi!2s!4v1685171988555!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
