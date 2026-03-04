import type { FrameMasterPlugin } from "frame-master/plugin/types";
import { name, version } from "./package.json";

/**
 * Comprehensive configuration options for the frame-master SEO plugin.
 * This plugin automates the injection of critical SEO metadata, social graph tags,
 * and browser instructions into the `<head>` of your HTML document.
 *
 * Proper configuration ensures better visibility in search engine results pages (SERPs),
 * optimal social media link previews, and correct mobile rendering.
 */
export type SEOPluginOptions = {
  /**
   * The primary title of the page (`<title>`).
   * Used as the clickable headline in search engine results and displayed in the browser tab.
   * Crucial for user experience and SEO rankings.
   */
  title?: string;
  /**
   * A brief description of the page content (`<meta name="description">`).
   * Often displayed as the snippet below the title in search results.
   * A compelling description improves click-through rates (CTR) from search engines.
   */
  description?: string;
  /**
   * Keywords relevant to the page content (`<meta name="keywords">`).
   * While modern search engines largely ignore this for ranking, it can occasionally be useful
   * for internal search tools or specific platforms. Can be a comma-separated string or array of strings.
   */
  keywords?: string | string[];
  /**
   * The author or creator of the page content (`<meta name="author">`).
   * Useful for blogging, articles, and content attribution.
   */
  author?: string;
  /**
   * The canonical URL for the page (`<link rel="canonical">`).
   * Highly recommended utility to prevent duplicate content issues by explicitly telling
   * search engines which version of a URL is the "master" or preferred version.
   */
  canonical?: string;
  /**
   * Instructions for search engine crawlers (`<meta name="robots">`).
   * Controls indexing and link following. Common values: `index, follow`, `noindex, nofollow`.
   */
  robots?: string;
  /**
   * Open Graph metadata used to generate rich preview cards when links are shared
   * on platforms like Facebook, LinkedIn, Discord, and Slack.
   */
  openGraph?: {
    /** The title of your object as it should appear within the graph. Serves as the headline of the shared card. */
    title?: string;
    /** A one to two sentence description of your object. Displayed underneath the title. */
    description?: string;
    /** The canonical URL of your object that will be used as its permanent ID in the graph. */
    url?: string;
    /** The type of your object, e.g., "website" (default), "article", "video.movie". Defines how the object is categorized. */
    type?: string;
    /** An image URL which should represent your object within the graph. This is the main image shown in the link preview. */
    image?: string;
    /** If your object is part of a larger web site, the name which should be displayed for the overall site. */
    site_name?: string;
  };
  /**
   * Twitter Card metadata. Specifically formats how links look when shared on X (formerly Twitter).
   */
  twitter?: {
    /** The card type. "summary" (small image), "summary_large_image" (full width image), "app" (for mobile apps), or "player" (for media). */
    card?: "summary" | "summary_large_image" | "app" | "player";
    /** @username of the website/organization associated with the page. */
    site?: string;
    /** @username of the individual content creator/author. */
    creator?: string;
    /** Title of the content to be displayed in the card (max 70 characters). */
    title?: string;
    /** Description of the content (maximum 200 characters). Contextual text below the title. */
    description?: string;
    /** URL of the image to use in the card. Should be visually distinct and high resolution. */
    image?: string;
  };
  /**
   * The theme color of the page (`<meta name="theme-color">`).
   * Highlights the mobile browser's address bar and UI to match the brand color of your application.
   */
  themeColor?: string;
  /**
   * The character encoding of the page (`<meta charset="...">`).
   * Generally standardizes text rendering. Recommended value is "utf-8" or "UTF-8".
   */
  charset?: string;
  /**
   * The viewport settings for responsive design (`<meta name="viewport">`).
   * Controls how the page acts on mobile devices.
   * Standard utility value: "width=device-width, initial-scale=1.0".
   */
  viewport?: string;
  /**
   * Powerful utility for appending any direct HTML tags into the `<head>` of the document.
   * Useful for injecting `<script>` tags for analytics, `<link>` tags for custom fonts or icons,
   * or any `<meta>` tags not natively supported by this plugin.
   */
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
