import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-16 bg-white shadow-md sticky top-0 left-0 flex justify-between items-center px-6 z-10">
      <Link href="/" className="font-bold text-2xl text-gray-900">Real Estate Agent</Link>
      <nav className="flex gap-6 font-medium text-emerald-500 text-base">
        <Link href="/buy" className="hover:text-emerald-700 transition-colors duration-300">Buy</Link>
        <Link href="/sell" className="hover:text-emerald-700 transition-colors duration-300">Sell</Link>
        <Link href="/rent" className="hover:text-emerald-700 transition-colors duration-300">Rent</Link>
        {/* <Link href="/profile" className="hover:text-emerald-700 transition-colors duration-300">Profile</Link> */}
        <Link href="/login" className="hover:text-emerald-700 transition-colors duration-300">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
