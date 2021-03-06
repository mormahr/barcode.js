// @flow
export opaque type WideBar = "W"
export const WIDE_BAR: WideBar = "W"

export opaque type NarrowBar = "N"
export const NARROW_BAR: NarrowBar = "N"

export opaque type WideSpace = "w"
export const WIDE_SPACE: WideSpace = "w"

export opaque type NarrowSpace = "n"
export const NARROW_SPACE: NarrowSpace = "n"

export type TwoWidthSymbologySymbol = WideBar | NarrowBar | WideSpace | NarrowSpace
export type SymbologySymbol = TwoWidthSymbologySymbol
