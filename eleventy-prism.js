import Prism from "prismjs";

// Languages
import "prismjs/components/prism-clike.js";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-cpp.js";
import "prismjs/components/prism-cmake.js";
import "prismjs/components/prism-diff.js";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-tsx.js";
import "prismjs/components/prism-css.js";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-markdown.js";

// Plugins
import "prismjs/plugins/highlight-keywords/prism-highlight-keywords.js";

/**
 * Custom Eleventy PrismJS Plugin
 * @param {object} eleventyConfig - Eleventy configuration object.
 */
export default function (eleventyConfig) {
  eleventyConfig.addPairedShortcode("prism", function (content, lang = "cpp") {
    if (!Prism.languages[lang]) {
      console.warn(`[Prism] Warning: Language "${lang}" not found. Falling back to plaintext.`);
      lang = "plaintext";
    }

    return `<pre class="language=${lang}"><code class="language-${lang}">${Prism.highlight(content, Prism.languages[lang], lang)}</code></pre>`;
  });

  console.log("Custom PrismJS syntax highlighting plugin loaded!");
}
