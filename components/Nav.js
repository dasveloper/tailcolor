import Image from 'next/image';
import Link from 'next/link';

function Nav() {
  return (
    <header className="max-w-7xl mx-auto py-4 px-6 flex justify-between">
      <Link href="/">
        <a className="hidden md:block">
          <Image src="/logo.svg" width={180} height={50} alt="Tailcolor logo" />
        </a>
      </Link>
      <Link href="/">
        <a className="md:hidden">
          <Image src="/logo-sm.svg" width={50} height={50} alt="Tailcolor logo" />
        </a>
      </Link>
      <div className="flex space-x-4 items-center">
        <Link href="/palettes">
          <a className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
            Browse all
          </a>
        </Link>
        <Link href="/">
          <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
            New palette
          </a>
        </Link>
      </div>
    </header>
  );
}
export default Nav;
