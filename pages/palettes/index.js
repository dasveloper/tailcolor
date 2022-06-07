import { readFileData } from '@utils/fileReader';
import PalettePreview from '@components/PalettePreview';
import { paginate } from '@utils/pages';
import Link from 'next/link';
import Nav from '@components/Nav';
import Footer from '@components/Footer';
import Meta from '@components/Meta';

export default function Home({
  data, pages, page, total,
}) {
  return (
    <div className="min-h-screen">
      <Meta
        title="Thousands of Tailwind color palettes | Tailcolor"
        description="Browse thousands of custom Tailwind color palettes to use in your Tailwind CSS project, or crete your own."
        canonical="/palettes"
      />
      <Nav />
      <main className="max-w-7xl mx-auto py-8 px-6">
        <section>
          <div className="pb-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Browse all Tailwind color palettes
            </h1>
          </div>
          <p className="mt-4 text-base text-gray-500">
            Get inspiration from over
            {' '}
            <strong>{total}</strong>
            {' '}
            Tailwind CSS color palettes or
            {' '}
            <Link href="/"><a className="underline">generate your own</a></Link>
            .
          </p>
          <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((r) => <PalettePreview key={r} color={r} />)}
          </div>
          <nav
            className="mt-4 bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Page
                {' '}
                <span className="font-medium">{page}</span>
                {' '}
                of
                {' '}
                <span className="font-medium">{pages}</span>
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              {page > 1 && (
              <Link href={{
                query: {
                  page: +page - 1,
                },
              }}
              >
                <a
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </a>
              </Link>
              )}
              {page < pages && (
              <Link href={{
                query: {
                  page: +page + 1,
                },
              }}
              >
                <a
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </a>
              </Link>
              )}
            </div>
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { page = 1 } = context.query;
  const colors = readFileData('colors.txt').reverse();

  const paginationData = paginate(colors, 30, page);

  return {
    props: { ...paginationData },
  };
};
