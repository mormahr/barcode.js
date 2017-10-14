// @flow
import { NARROW_SPACE, WIDE_SPACE, NARROW_BAR, WIDE_BAR } from "../Core/Characters"
import type { TwoWidthSymbologySymbol } from "../Core/Characters"
import type { Barcode, TwoWidthBarcode } from "../Core/Barcode"

const NARROW_WIDTH = 1
const WIDE_WIDTH = 3

export function rect(x: number, wide: boolean, filled: boolean): string {
	return `<rect x="${x}" y="0" width="${wide ? WIDE_WIDTH : NARROW_WIDTH}" height="1" fill="${filled
		? "black"
		: "white"}"/>`
}

export function renderBarcodeToSVG(
	input: TwoWidthBarcode,
	{ width, height }: { width?: number, height?: number } = {},
): string {
	let svg = ""
	let x = 0

	for (const char of input.encoded) {
		switch (char) {
			case NARROW_SPACE:
				svg += rect(x, false, false)
				x += NARROW_WIDTH
				break
			case WIDE_SPACE:
				svg += rect(x, true, false)
				x += WIDE_WIDTH
				break
			case NARROW_BAR:
				svg += rect(x, false, true)
				x += NARROW_WIDTH
				break
			case WIDE_BAR:
				svg += rect(x, true, true)
				x += WIDE_WIDTH
				break
		}
	}

	let options = [`xmlns="http://www.w3.org/2000/svg"`, `viewBox="0 0 ${x} 1"`, `preserveAspectRatio="none"`]
	if (width) {
		options.push(`width="${width}"`)
	}
	if (height) {
		options.push(`height="${height}"`)
	}

	return `<svg ${options.join(" ")}>${svg}</svg>`
}
