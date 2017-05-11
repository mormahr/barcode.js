import {
	WIDE_BAR,
	NARROW_BAR,
	WIDE_SPACE,
	NARROW_SPACE,
} from "./Characters"

// See https://en.wikipedia.org/wiki/Code_39
const BaseMapping = {}
const Mapping = {}
const Bars = [
	[ // 1
		WIDE_BAR,
		NARROW_BAR,
		NARROW_BAR,
		NARROW_BAR,
		WIDE_BAR,
	],
	[ // 2
		NARROW_BAR,
		WIDE_BAR,
		NARROW_BAR,
		NARROW_BAR,
		WIDE_BAR,
	],
	[ // 3
		WIDE_BAR,
		WIDE_BAR,
		NARROW_BAR,
		NARROW_BAR,
		NARROW_BAR,
	],
	[ // 4
		NARROW_BAR,
		NARROW_BAR,
		WIDE_BAR,
		NARROW_BAR,
		WIDE_BAR,
	],
	[ // 5
		WIDE_BAR,
		NARROW_BAR,
		WIDE_BAR,
		NARROW_BAR,
		NARROW_BAR,
	],
	[ // 6
		NARROW_BAR,
		WIDE_BAR,
		WIDE_BAR,
		NARROW_BAR,
		NARROW_BAR,
	],
	[ // 7
		NARROW_BAR,
		NARROW_BAR,
		NARROW_BAR,
		WIDE_BAR,
		WIDE_BAR,
	],
	[ // 8
		WIDE_BAR,
		NARROW_BAR,
		NARROW_BAR,
		WIDE_BAR,
		NARROW_BAR,
	],
	[ // 9
		NARROW_BAR,
		WIDE_BAR,
		NARROW_BAR,
		WIDE_BAR,
		NARROW_BAR,
	],
	[ // 10
		NARROW_BAR,
		NARROW_BAR,
		WIDE_BAR,
		WIDE_BAR,
		NARROW_BAR,
	]
]
const Spaces = [
	[ // +0
		NARROW_SPACE,
		WIDE_SPACE,
		NARROW_SPACE,
		NARROW_SPACE,
	],
	[ // +10
		NARROW_SPACE,
		NARROW_SPACE,
		WIDE_SPACE,
		NARROW_SPACE,
	],
	[ // +20
		NARROW_SPACE,
		NARROW_SPACE,
		NARROW_SPACE,
		WIDE_SPACE,
	],
	[ // +30
		WIDE_SPACE,
		NARROW_SPACE,
		NARROW_SPACE,
		NARROW_SPACE,
	]
]

function populate() {
	// Numbers
	for (let i = 1; i <= 9; i++) {
		BaseMapping[i.toString()] = [i-1, 0]
	}
	BaseMapping["0"] = [9,0]

	// A-J
	for (let i = "A".charCodeAt(0); i <= "J".charCodeAt(0); i++) {
		BaseMapping[String.fromCharCode(i)] = [i - "A".charCodeAt(0), 1]
	}
	// K-T
	for (let i = "K".charCodeAt(0); i <= "T".charCodeAt(0); i++) {
		BaseMapping[String.fromCharCode(i)] = [i - "K".charCodeAt(0), 2]
	}
	// U-Z
	for (let i = "U".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
		BaseMapping[String.fromCharCode(i)] = [i - "U".charCodeAt(0), 3]
	}

	BaseMapping["-"] = [6,3]
	BaseMapping["."] = [7,3]
	BaseMapping[" "] = [8,3]
	BaseMapping["*"] = [9,3]
}

function map() {
	for (const key of Object.keys(BaseMapping)) {
		const bar = BaseMapping[key][0]
		const space = BaseMapping[key][1]

		const reduction = []

		for (let i = 0; i<Spaces[space].length; i++) {
			reduction.push(Bars[bar][i])
			reduction.push(Spaces[space][i])
		}
		reduction.push(Bars[bar][Bars[bar].length - 1])

		Mapping[key] = reduction
	}
}

populate()
map()

export function encodeCode39(text) {
	return Mapping["*"].concat(NARROW_SPACE).concat(text.split("").map(it => Mapping[it].concat(NARROW_SPACE)).reduce((a, b) => a.concat(b), [])).concat(Mapping["*"])
}
