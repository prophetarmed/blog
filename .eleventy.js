const CleanCSS = require("clean-css");

module.exports = function(config) {
  config.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

	config.addCollection('tagList', (collectionApi) => {
		const tagsSet = new Set()
		collectionApi.getAll().forEach((item) => {
			if (!item.data.tags) return
			item.data.tags.forEach((tag) => {
				if (tag === "post") {
					return	
				}
				tagsSet.add(tag)
			})
		})
		return tagsSet
	})

	return {
		dir: {
			input: "content",
		}
	}
}
