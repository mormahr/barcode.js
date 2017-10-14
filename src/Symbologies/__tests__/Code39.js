import { NARROW_BAR, NARROW_SPACE, WIDE_BAR, WIDE_SPACE } from "../../Core/Characters"
import { encodeCode39, Mapping } from "../Code39"

describe("encodeCode39", function() {
	describe("Delimiters", function() {
		it("starts the barcode with a start/stop code", function() {
			const code = encodeCode39("").encoded
			expect(code.slice(0, 9)).toEqual(Mapping["*"])
		})

		it("ends the barcode with a start/stop code", function() {
			const code = encodeCode39("").encoded
			expect(code.slice(-9)).toEqual(Mapping["*"])
		})
	})

	it("separates codes with a narrow space", function() {
		const code = encodeCode39("").encoded
		expect(code.slice(9, 10)).toEqual([NARROW_SPACE])
	})

	it("matches the snapshot for the full alphabet", function() {
		const code = encodeCode39(
			Object.keys(Mapping)
				.filter(it => it !== "*")
				.sort()
				.join(""),
		).encoded
		expect(code).toMatchSnapshot()
	})

	it("uppercases input strings", function() {
		const code = encodeCode39("a").encoded
		expect(code.slice(10, 19)).toEqual(Mapping["A"])
	})

	it("replaces out of range chars", function() {
		const code = encodeCode39("_").encoded
		expect(code.slice(10, 19)).toEqual(Mapping["-"])
	})

	it("replaces out of range chars with custom char", function() {
		const code = encodeCode39("_", " ").encoded
		expect(code.slice(10, 19)).toEqual(Mapping[" "])
	})

	describe("Mapping", function() {
		it("has 44 codes", function() {
			expect(Object.keys(Mapping).length).toEqual(44)
		})

		Object.keys(Mapping).map(char => {
			it(`matches the snapshot for '${char}'`, function() {
				expect(Mapping[char]).toMatchSnapshot()
			})

			it(`maps '${char}' to 5 bars`, function() {
				expect(Mapping[char].filter(it => it === NARROW_BAR || it === WIDE_BAR)).toHaveLength(5)
			})

			it(`maps '${char}' to 4 spaces`, function() {
				expect(Mapping[char].filter(it => it === NARROW_SPACE || it === WIDE_SPACE)).toHaveLength(4)
			})
		})
	})
})
