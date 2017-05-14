// @flow
import { NARROW_SPACE, WIDE_SPACE, NARROW_BAR, WIDE_BAR } from "../Core/Characters"

export function rect(x: number, height: number, width: number, filled: boolean): string {
	return `<rect x="${x}" y="0" width="${width}" height="${height}" fill="${filled ? "black" : "white"}"/>`
}

export function renderBarcodeToSVG(input: string, height: number, baseWidth: number): string {
	let svg = ""
	let x = 0

	for (const char of input) {
		switch (char) {
			case NARROW_SPACE:
				svg += rect(x, height, baseWidth, false)
				x += baseWidth
				break
			case WIDE_SPACE:
				svg += rect(x, height, baseWidth * 3, false)
				x += baseWidth * 3
				break
			case NARROW_BAR:
				svg += rect(x, height, baseWidth, true)
				x += baseWidth
				break
			case WIDE_BAR:
				svg += rect(x, height, baseWidth * 3, true)
				x += baseWidth * 3
				break
		}
	}

	return `<svg height="${height}" width="${x}">${svg}</svg>`
}
