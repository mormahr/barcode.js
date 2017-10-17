// @flow

import type { SymbologySymbol, TwoWidthSymbologySymbol } from "./Characters"

export interface Barcode<T: SymbologySymbol> {
	encoded: T[];
	plainTextContent: string;
}

export type TwoWidthBarcode = Barcode<TwoWidthSymbologySymbol>
