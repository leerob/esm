import { useEffect } from 'react';
import Head from 'next/head';
import marked from 'https://cdn.skypack.dev/marked';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import hljs from 'https://cdn.skypack.dev/highlight.js';

export default function Home({ content }) {
  useEffect(() => {
    confetti();
  }, []);

  return (
    <>
      <Head>
        <title>Next.js + ESM URL Imports</title>
        <meta
          name="description"
          content="Learn how to use ES Modules with Next.js, including using URL imports to fetch packages from JavaScript CDNs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}

export async function getStaticProps() {
  const rawContent = await fetch(
    'https://gist.githubusercontent.com/leerob/24f71f388c4ec31d7f69c55f5e695598/raw/3831b8c2d8680db1ab53b4caeef208637dec9836/esm.md'
  );
  const markdown = await rawContent.text();

  marked.setOptions({
    highlight: function (code, language) {
      return hljs.highlight(code, { language }).value;
    },
  });

  return {
    props: {
      content: marked(markdown),
    },
  };
}
