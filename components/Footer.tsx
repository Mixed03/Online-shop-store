"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faTiktok,
  faPinterest,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-grey-2 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-col justify-between px-4">
        <div className="flex-1 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Who Are We</h2>
          <p className="mb-4">
            Our goal is to help you create one-of-a-kind looks that make you
            stand out from the crowd.
          </p>
          <h2 className="text-2xl font-bold mb-4 py-5">Contact</h2>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={() =>
                openLink("https://web.facebook.com/Maximum.screen")
              }
              aria-label="Facebook"
              className="focus:outline-none"
            >
              <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
            </button>
            <button
              onClick={() => openLink("https://www.instagram.com")}
              aria-label="Instagram"
              className="focus:outline-none"
            >
              <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
            </button>
            <button
              onClick={() => openLink("https://www.whatsapp.com")}
              aria-label="WhatsApp"
              className="focus:outline-none"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
            </button>
            <button
              onClick={() => openLink("https://www.tiktok.com/@maximum_store6")}
              aria-label="TikTok"
              className="focus:outline-none"
            >
              <FontAwesomeIcon icon={faTiktok} className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() =>
              openLink("https://maps.app.goo.gl/CnQacfCDHEBq6zaG6")
            }
            aria-label="TikTok"
            className="focus:outline-none my-5 hover:underline"
          >
            <p>Thadeua Rd, Chomcheng, Sisattank, Vientiane</p>
          </button>
          <hr className="my-4" />
          <p className="py-4">© 2024 Maximum Store.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
