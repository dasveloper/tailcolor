/* eslint-disable jsx-a11y/label-has-associated-control */
import PalettePreview from '@components/PalettePreview';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Nav from '@components/Nav';
import Footer from '@components/Footer';

import Link from 'next/link';
import Meta from '@components/Meta';
import redis from '@utils/redis';

export default function Home({ mostRecent, total }) {
  const [color, setColor] = useState('#ffffff');
  const router = useRouter();
  const onSubmit = async () => {
    const res = await fetch('/api/colors', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ color }),
    });
    if (res.status !== 200) toast.error('Could not create palette');
    const data = await res.json();

    router.push(`/palettes/${data.color}`);
  };
  return (
    <div className="min-h-screen">
      <Meta
        title="Tailcolor | Tailwind Color Palette Generator"
        description="Generate a custom Tailwind color palette from a single color. Tailwind with create all the variations you need for your color palette and output your custom Tailwind config file."
      />
      <Nav />
      <main className="max-w-7xl mx-auto py-8 px-6">
        <section className="lg:grid lg:grid-cols-12 lg:gap-8 py-12">
          <div className="text-center max-w-2xl x-auto lg:col-span-6 lg:text-left lg:flex lg:flex-col lg:justify-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:leading-none lg:text-5xl xl:text-6xl">
              Tailwind CSS color palette generator
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Generate all the
              {' '}
              <a target="_blank" rel="noopener nofollow noreferrer" className="hover:font-bold" href="https://www.youtube.com/watch?v=O9MvdMqKvpU">
                colors of the
                {' '}
                <span className="text-gray-900 font-medium">Tail</span>
                wind
              </a>
              . Simply choose a color from the color picker and click &apos;Create palette&apos; to generate a ready to use color palette for you Tailwind project.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Over
              {' '}
              <span className="font-medium text-gray-900">
                {total}
                {' '}
                palettes
              </span>
              {' '}
              generated
            </div>
            <div>
              <Link href="/palettes">
                <a className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                  Browse all palettes
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
            <div className="w-full flex flex-col items-center">
              <div className="responsive w-full max-w-md">
                <label htmlFor="hex" className="block text-sm font-medium text-gray-700">
                  Hex Value
                </label>
                <div className="mt-1 mb-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">#</span>
                  </div>
                  <HexColorInput
                    name="hex"
                    type="text"
                    id="hex"
                    color={color}
                    onChange={setColor}
                    size={1}
                    className="focus:ring-gray-200 focus:border-gray-200 block w-full pl-8 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <HexColorPicker color={color} onChange={setColor} />
              </div>
              <button
                onClick={onSubmit}
                type="button"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
              >
                Create palette
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="mt-12 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold leading-7 text-gray-900 sm:text-xl sm:truncate">
              Most recent Tailwind color palettes
            </h2>
          </div>
          <p className="mt-4 text-base text-gray-500">
            These related color palettes are generated by taking the HSV of the color
            and shifting it into multiple different colors. They would be a good jumping off point for generating all of the color palettes you will need.
          </p>
          <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mostRecent.map((r) => <PalettePreview key={r} color={r} />)}
          </div>
          <div className="text-center">
            <Link href="/palettes">
              <a className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                Browse all palettes
              </a>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const mostRecent = await redis.lrange('colors', 0, 11);
  const total = await redis.llen('colors');

  return {
    props: { mostRecent, total },
    revalidate: 10,
  };
};
