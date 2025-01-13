"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="nav fixed flex w-full items-center justify-between border-b-[1px] px-3 py-5 sm:px-10">
      <div className="flex items-center gap-[60%]">
        <h1
          className="cursor-pointer text-[18px] font-semibold"
          onClick={() => router.push("/")}
        >
          ImageKit.
        </h1>
        {pathname === "/" && (
          <ul className="xl:flex hidden gap-5 text-center text-[13px]">
            <li className="">Overview</li>
            <li className="">Features</li>
            <li className="">Support</li>
          </ul>
        )}
      </div>
      <div>
        <Button className="bg-[#8c6dfd] text-[13px] hover:opacity-50">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
