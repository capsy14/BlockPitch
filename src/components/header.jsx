import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div>
      <header className="border-b">
        <nav className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center space-x-8">
            <span className="text-xl font-bold">BlockPitch</span>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm font-medium">
                Buy Crypto
              </a>
              <a href="#" className="text-sm font-medium">
                Markets
              </a>
              <a href="#" className="text-sm font-medium">
                Exchange
              </a>
              <a href="#" className="text-sm font-medium">
                NFT/DEX
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
