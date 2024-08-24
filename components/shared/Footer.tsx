import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t flex-center mt-12">
      <Link className="text-lg p-3" href={"/"}>
        Eventin
      </Link>
    </footer>
  );
};

export default Footer;
