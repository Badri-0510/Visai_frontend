import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { AiOutlineShop, AiOutlineTransaction } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiReceiptFill } from "react-icons/ri";
import { SiGoogleanalytics } from "react-icons/si"; 
import controlImg from "../assets/control.png";
import logoImg from "../assets/logohead.jpeg";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TbBinaryTree2 } from "react-icons/tb";
export default function Sidebar() {
    const [open, setOpen] = useState(true);
  const Menus = [

    { title: "Products", src: MdProductionQuantityLimits,navi:"/product" },
    { title: "Bill", src: RiReceiptFill,gap:true,navi:"/bill" },
    { title: "Orders", src: AiOutlineTransaction,navi:"/orders" },
    { title: "Product Analytics", src: SiGoogleanalytics,navi:"/prodAnalytics" },
    { title: "Shop Analytics", src: AiOutlineShop,navi:"/shopAnalytics" },
    { title: "Frequent Pattern Analytics", src: TbBinaryTree2, navi: "/frequent" }
  ];
 const navigate=useNavigate();
  return (
    <div>
      {/* controller to access the sidebar */}
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-slate-700 h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src={controlImg}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
          alt="imageside"
        />
        {/* Logo for the sidebar */}
        <div className="flex gap-x-4 items-center mb-9">
          <img
            src={logoImg}
            className={`w-8 h-8 cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            } `}
            alt="imagelogo"
          />
          <h1
            className={`text-white origin-left font-bold text-2xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Visai
          </h1>
        </div>

        {/* {navigations} */}
        {Menus.map((menu, index) => (
          <div key={index} className="menu-item">
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center gap-x-4 
              ${menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
              onClick={()=>navigate(menu.navi)}
            >
              {menu.src && <menu.src className="menu-icon w-5 h-5" />}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
  
}
