# Next.js + ES Modules

Starting with [Next.js 12](https://nextjs.org/12), we have built-in support for [ES Modules](https://nodejs.org/docs/latest/api/esm.html). ES Modules bring an official, standardized module system to JavaScript. They're supported by all major browsers as well as Node.js.

## URL Imports

[Next.js 12](https://nextjs.org/12) also includes experimental support for importing ES Modules through URLs – no install or separate build step required.

The Markdown content on this page is retrieved from GitHub using `fetch` in `getStaticProps`. Then, it uses [Marked](https://marked.js.org/) to parse and transform Markdown to HTML, while syntax highlighting with [highlight.js](https://highlightjs.org/).

```jsx
// pages/index.js

import marked from 'https://cdn.skypack.dev/marked';
import hljs from 'https://cdn.skypack.dev/highlight.js';

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
```

The HTML content is then returned to the default export React component in the file.

We can also use HTTP imports on the client. For example, we can show [confetti](https://cdn.skypack.dev/canvas-confetti) when the page loads.

```jsx
// pages/index.js

import { useEffect } from 'react';
import Head from 'next/head';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

export default function Home({ content }) {
  useEffect(() => {
    confetti();
  }, []);

  return (
    <>
      <Head>
        <title>Next.js + ESM URL Imports</title>
        <meta name="description" content="Imports packages from any URL." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
```

URL imports allow you to use *any* package directly through a URL. This enables Next.js to process remote HTTP(S) resources exactly like local dependencies.

If a URL import is detected, Next.js will generate a `next.lock` file to track remote resources. URL imports are cached locally to ensure you can still work offline. Next.js supports both client and server URL imports.

To opt-in, add the allowed URL prefixes inside `next.config.js`:

```js
module.exports = {
  experimental: {
    urlImports: ['https://cdn.skypack.dev'],
  },
};
```

Then, you can import modules directly from URLs:

```js
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
```

Any CDN that serves ES modules will work, including:

- [Skypack](https://skypack.dev/)
- [esm.sh](https://esm.sh/)
- [jsDelivr](https://www.jsdelivr.com/)
- [JSPM](https://jspm.org/)
- [unpkg](https://unpkg.com/)

You can also import ES Modules from tools like [Framer](https://www.framer.com/docs/guides/sharing-code/):

```jsx
import { useFriendData } from 'https://framer.com/m/framer/framer-motion.js';

export default function Friends(props) {
  const friends = useFriendData();

  return (
    <div>
      {friends.map((friend) => (
        <div>{friend.name}</div>
      ))}
    </div>
  );
}
```

## Deploy on Vercel

Start using ESM with Next.js by deploying to [Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fleerob%2Fesm).

For more information, [watch our demo](https://www.youtube.com/watch?v=_WNeAubn92U) from Next.js Conf and [check out the documentation](https://nextjs.org/docs/api-reference/next.config.js/url-imports).

