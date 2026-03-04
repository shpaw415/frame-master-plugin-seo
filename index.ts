import type { FrameMasterPlugin } from "frame-master/plugin/types";
import { name, version } from "./package.json";

export type SEOPluginOptions = {
  title?: string;
  description?: string;
  keywords?: string | string[];
  author?: string;
  canonical?: string;
  robots?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    image?: string;
    site_name?: string;
  };
  twitter?: {
    card?: "summary" | "summary_large_image" | "app" | "player";
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  themeColor?: string;
  charset?: string;
  viewport?: string;
  customTags?: string[];
};

/**
 * frame-master-plugin-seo - Frame-Master Plugin
 *
 * Description: Inserts SEO parameters into the HTML Head for perfect SEO optimization.
 */
export default function frameMasterPluginSEO(
  opt: SEOPluginOptions,
): FrameMasterPlugin {
  const htmlRewriter = new HTMLRewriter().on("head", {
    element(element) {
      if (opt.charset)
        element.append(`<meta charset="${opt.charset}">\n`, { html: true });
      if (opt.viewport)
        element.append(`<meta name="viewport" content="${opt.viewport}">\n`, {
          html: true,
        });
      if (opt.title)
        element.append(`<title>${opt.title}</title>\n`, { html: true });
      if (opt.description)
        element.append(
          `<meta name="description" content="${opt.description}">\n`,
          { html: true },
        );
      if (opt.keywords) {
        const ks = Array.isArray(opt.keywords)
          ? opt.keywords.join(", ")
          : opt.keywords;
        element.append(`<meta name="keywords" content="${ks}">\n`, {
          html: true,
        });
      }
      if (opt.author)
        element.append(`<meta name="author" content="${opt.author}">\n`, {
          html: true,
        });
      if (opt.canonical)
        element.append(`<link rel="canonical" href="${opt.canonical}">\n`, {
          html: true,
        });
      if (opt.robots)
        element.append(`<meta name="robots" content="${opt.robots}">\n`, {
          html: true,
        });
      if (opt.themeColor)
        element.append(
          `<meta name="theme-color" content="${opt.themeColor}">\n`,
          { html: true },
        );

      if (opt.openGraph) {
        if (opt.openGraph.title)
          element.append(
            `<meta property="og:title" content="${opt.openGraph.title}">\n`,
            { html: true },
          );
        if (opt.openGraph.description)
          element.append(
            `<meta property="og:description" content="${opt.openGraph.description}">\n`,
            { html: true },
          );
        if (opt.openGraph.url)
          element.append(
            `<meta property="og:url" content="${opt.openGraph.url}">\n`,
            { html: true },
          );
        if (opt.openGraph.type)
          element.append(
            `<meta property="og:type" content="${opt.openGraph.type}">\n`,
            { html: true },
          );
        if (opt.openGraph.image)
          element.append(
            `<meta property="og:image" content="${opt.openGraph.image}">\n`,
            { html: true },
          );
        if (opt.openGraph.site_name)
          element.append(
            `<meta property="og:site_name" content="${opt.openGraph.site_name}">\n`,
            { html: true },
          );
      }

      if (opt.twitter) {
        if (opt.twitter.card)
          element.append(
            `<meta name="twitter:card" content="${opt.twitter.card}">\n`,
            { html: true },
          );
        if (opt.twitter.site)
          element.append(
            `<meta name="twitter:site" content="${opt.twitter.site}">\n`,
            { html: true },
          );
        if (opt.twitter.creator)
          element.append(
            `<meta name="twitter:creator" content="${opt.twitter.creator}">\n`,
            { html: true },
          );
        if (opt.twitter.title)
          element.append(
            `<meta name="twitter:title" content="${opt.twitter.title}">\n`,
            { html: true },
          );
        if (opt.twitter.description)
          element.append(
            `<meta name="twitter:description" content="${opt.twitter.description}">\n`,
            { html: true },
          );
        if (opt.twitter.image)
          element.append(
            `<meta name="twitter:image" content="${opt.twitter.image}">\n`,
            { html: true },
          );
      }

      if (opt.customTags) {
        opt.customTags.forEach((tag) =>
          element.append(tag + "\n", { html: true }),
        );
      }
    },
  });

  return {
    name,
    version,
    build: {
      buildConfig: {
        plugins: [
          {
            name: "seo",
            setup(build) {
              build.finally("html", (args) => {
                return {
                  contents: htmlRewriter.transform(args.contents as string),
                };
              });
            },
          },
        ],
      },
    },
  };
}
