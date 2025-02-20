import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";
import pluginTOC  from "eleventy-plugin-nesting-toc";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import mardownItPrism from "markdown-it-prism";

import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

import eleventyPrism from "./eleventy-prism.js";

export default function (eleventyConfig) {
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

	eleventyConfig.addPlugin(pluginTOC, {
		tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	});
	eleventyConfig.setLibrary("md",
		markdownIt({
			html: true,
			linkify: true,
			typographer: true,
		}).use(markdownItAnchor, {}).use(mardownItPrism)
	);

	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.addPlugin(eleventyPrism);

	eleventyConfig.addPassthroughCopy("src/styles/global-styles.css");
	eleventyConfig.addPassthroughCopy("src/styles/coming-soon-styles.css");
	eleventyConfig.addPassthroughCopy("src/styles/doc-styles.css");
	eleventyConfig.addPassthroughCopy("src/styles/code-styles.css");
	eleventyConfig.addPassthroughCopy("src/img/logo.svg");
	eleventyConfig.addPassthroughCopy("src/img/logo-voxel.svg");
	eleventyConfig.addPassthroughCopy("CNAME");
}