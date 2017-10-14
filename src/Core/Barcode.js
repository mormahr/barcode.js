// @flow

import type { SymbologySymbol } from "./Characters"

export interface Barcode<T: SymbologySymbol> {
	encoded: T[];
	plainTextContent: string;
}
