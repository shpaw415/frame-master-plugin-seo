# frame-master-plugin-seo

A Frame-Master plugin to automatically inject SEO parameters and meta tags into the `<head>` of your HTML output for perfect SEO optimization.

## Installation

```bash
bun add frame-master-plugin-seo
```

## Usage

```typescript
import type { FrameMasterConfig } from "frame-master/server/types";
import seoPlugin from "frame-master-plugin-seo";

const config: FrameMasterConfig = {
  HTTPServer: { port: 3000 },
  plugins: [
    seoPlugin({
      title: "My Awesome Site",
      description: "This is a flawlessly optimized Frame-Master site.",
      keywords: ["Frame-Master", "SEO", "Optimization", "Plugin"],
      author: "Jane Doe",
      canonical: "https://myawesomesite.com",
      robots: "index, follow",
      themeColor: "#ffffff",
      openGraph: {
        title: "My Awesome Site",
        description: "This is a flawlessly optimized Frame-Master site.",
        url: "https://myawesomesite.com",
        type: "website",
        image: "https://myawesomesite.com/og-image.jpg",
        site_name: "My Awesome Site",
      },
      twitter: {
        card: "summary_large_image",
        site: "@myawesomesite",
        creator: "@janedoe",
        title: "My Awesome Site",
        description: "This is a flawlessly optimized Frame-Master site.",
        image: "https://myawesomesite.com/twitter-image.jpg",
      },
      customTags: [
        '<meta name="google-site-verification" content="your-verification-code">',
      ],
    }),
  ],
};

export default config;
```

## Features

- **Standard SEO Tags**: Automatically injects `title`, `description`, `keywords`, `author`, `canonical` links, algorithms/bots tracking via `robots`, and more.
- **Social Media Readiness**: Full support for Open Graph tags (Facebook, LinkedIn, etc.) and Twitter Cards for rich link previews.
- **Mobile Optimization**: Configurable `viewport` and `themeColor` tags.
- **Customizable**: Allows defining generic `customTags` to inject any arbitrary script or meta fields easily.

## License

MIT
