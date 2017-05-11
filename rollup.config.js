const babel = require("rollup-plugin-babel")

export default {
	entry: "src/index.js",
	format: "umd",
	moduleName: "barcodejs",
	dest: "dist/barcode.js",
	plugins: [
		babel(),
	],
}
