/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";

import { Button, Navbar } from "flowbite-react";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser, FaSearch } from "react-icons/fa";

function NavBar() {
  const navigate = useNavigate();

  const nav_link = [
    {
      path: "/",
      display: "HOME",
    },
    {
      path: "/shop",
      display: "SHOP",
    },
    {
      path: "/",
      display: "ABOUT US",
    },
  ];

  return (
    <Navbar rounded>
      <Navbar.Brand href="/" className=" gap-3">
        <img src={logo} className="h-10" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-primary">
          ECOBUDDi
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button
          className=" bg-orange-500 h-fit text-white text-center rounded-md font-bold hidden md:block"
          onClick={() => navigate("/login")}
        >
          LIST ITEM
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {nav_link.map((item, index) => (
          <Navbar.Link
            href={item.path}
            active
            key={index}
            className=" text-secondary hover:text-primary"
          >
            {item.display}
          </Navbar.Link>
        ))}
        <Button className=" bg-orange-500 h-fit text-white text-center md:hidden rounded-md font-bold" onClick={() => navigate("/login")}>LIST ITEM</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavBar;
