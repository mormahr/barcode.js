// @flow
import { NARROW_SPACE, WIDE_SPACE, NARROW_BAR, WIDE_BAR } from "../Core/Characters"

export function renderBarcodeToHTML(input: string, prefix: string = "bcjs"): string {
	let html = ""

	for (const char of input) {
		switch (char) {
			case NARROW_SPACE:
				html += `<i class="${prefix}-narrow ${prefix}-space"></i>`
				break
			case WIDE_SPACE:
				html += `<i class="${prefix}-wide ${prefix}-space"></i>`
				break
			case NARROW_BAR:
				html += `<i class="${prefix}-narrow ${prefix}-bar"></i>`
				break
			case WIDE_BAR:
				html += `<i class="${prefix}-wide ${prefix}-bar"></i>`
				break
		}
	}

	return html
}

export function generateCSS(
	{ height = 100, baseWidth = 5, prefix = "bcjs" }: { height: number, baseWidth: number, prefix: string } = {},
): string {
	return `
		.${prefix}-bar, .${prefix}-space {
            height: ${height}px;
            display: inline-block;
        }

        .${prefix}-narrow {
            width: ${baseWidth}px;
        }

        .${prefix}-wide {
            width: ${baseWidth * 3}px;
        }

        .${prefix}-bar {
            background-color: black;
        }

        .${prefix}-space {
            background-color: white;
        }
	`
}
