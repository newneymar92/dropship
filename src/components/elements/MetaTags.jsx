import Head from "next/head";

const MetaTags = ({ title }) => {
  return (
    <Head>
      {/* Basic metas */}
      <meta charSet="utf-8" />
      <meta name="robots" content="noindex, follow" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content="lngoude" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta
        property="og:image"
        content="https://lngoude.com/images/bg/bg-image-12.jpg"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <title>lngoude</title>
    </Head>
  );
};

export default MetaTags;
