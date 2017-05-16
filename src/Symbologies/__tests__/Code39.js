import {
	NARROW_BAR,
	NARROW_SPACE,
	WIDE_BAR,
	WIDE_SPACE
} from "../../Core/Characters"
import {
	encodeCode39,
	Mapping
} from "../Code39"

describe("encodeCode39", function () {
	describe("Delimiters", function () {
		it("starts the barcode with a start/stop code", function () {
			const code = encodeCode39("")
			expect(code.substr(0, 9)).toEqual(Mapping["*"])
		})

		it("ends the barcode with a start/stop code", function () {
			const code = encodeCode39("")
			expect(code.substr(-9)).toEqual(Mapping["*"])
		})
	})

	it("separates codes with a narrow space", function () {
		const code = encodeCode39("")
		expect(code.substr(9, 1)).toEqual("n")
	})

	it("matches the snapshot for the full alphabet", function () {
		const code = encodeCode39(Object.keys(Mapping).filter(it => it !== "*").sort().join(""))
		expect(code).toMatchSnapshot()
	})

	it("uppercases input strings", function () {
		const code = encodeCode39("a")
		expect(code).not.toEqual(expect.stringContaining(Mapping["-"]))
	})

	it("replaces out of range chars", function () {
		const code = encodeCode39("_")
		expect(code.substr(10,9)).toEqual(Mapping["-"])
	})

	it("replaces out of range chars with custom char", function () {
		const code = encodeCode39("_", " ")
		expect(code.substr(10,9)).toEqual(Mapping[" "])
	})

	describe("Mapping", function () {
		it("has 39 + 1 codes", function () {
			expect(Object.keys(Mapping).length).toEqual(40)
		})

		Object.keys(Mapping).map(char => {
			it(`matches the snapshot for '${char}'`, function () {
				expect(Mapping[char]).toMatchSnapshot()
			})

			it(`maps '${char}' to 5 bars`, function () {
				expect(Mapping[char].split("").filter(it => it === NARROW_BAR || it === WIDE_BAR)).toHaveLength(5)
			})

			it(`maps '${char}' to 4 spaces`, function () {
				expect(Mapping[char].split("").filter(it => it === NARROW_SPACE || it === WIDE_SPACE)).toHaveLength(4)
			})
		})
	})
})
