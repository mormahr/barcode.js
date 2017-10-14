import { renderBarcodeToSVG } from "../SVGRenderer"
import { NARROW_BAR, NARROW_SPACE, WIDE_BAR, WIDE_SPACE } from "../../Core/Characters"

describe("renderBarcodeToSVG", function() {
	it("emits as many rects as there are bars in the barcode", function() {
		const code = [NARROW_SPACE, NARROW_BAR, WIDE_SPACE, WIDE_BAR]
		expect(renderBarcodeToSVG({ encoded: code }, 100, 5).match(/<rect/g)).toHaveLength(4)
	})
})
