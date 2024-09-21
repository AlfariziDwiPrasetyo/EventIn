import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t flex-center mt-12">
      <Link className="font-semibold text-muted-foreground p-3 " href={"/"}>
        Eventin © 2024
      </Link>
    </footer>
  );
};

export default Footer;
