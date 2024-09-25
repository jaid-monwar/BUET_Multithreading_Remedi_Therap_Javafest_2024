import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <p className="nav-logo">
            <span className="text-primary">track.</span>
          </p>
        </Link>
        <Link href="http://localhost:3006/" className="flex items-center gap-1">
          <p className="nav-logo">
            <span className="">Products</span>
          </p>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
