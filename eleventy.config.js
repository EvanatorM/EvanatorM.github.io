import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";

import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';

export default function (eleventyConfig) {
	//eleventyConfig.addPlugin(syntaxHighlight);

	// We can add support for TypeScript too, at the same time:
	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
		compile: function () {
			return async function (data) {
				let content = await this.defaultRenderer(data);
				return renderToStaticMarkup(content);
			};
		},
	});

	eleventyConfig.addPassthroughCopy("src/styles/global-styles.css");
	eleventyConfig.addPassthroughCopy("src/styles/coming-soon-styles.css");
	eleventyConfig.addPassthroughCopy("src/styles/prism-vsc-dark-plus.css");
	eleventyConfig.addPassthroughCopy("src/styles/doc-styles.css");
	eleventyConfig.addPassthroughCopy("src/img/logo.svg");
	eleventyConfig.addPassthroughCopy("src/docs/prism.js");
}