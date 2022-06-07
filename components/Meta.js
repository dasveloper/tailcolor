import Head from 'next/head';

function Meta({
  description, noIndex, title, canonical,
}) {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <title>{title}</title>
      {canonical && <link rel="canonical" href={url + canonical} />}
      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  );
}

Meta.defaultProps = {
  author: '',
  description: '',
  keywords: '',
  noIndex: false,
};

export default Meta;
