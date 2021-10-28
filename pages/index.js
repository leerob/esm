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
    'https://raw.githubusercontent.com/leerob/esm/main/README.md'
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
