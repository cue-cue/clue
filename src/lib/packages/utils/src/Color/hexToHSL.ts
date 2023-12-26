import type { ColorTransferHSL } from './types.js'

export const hexToHSL: ColorTransferHSL = (hex: string) => {
	let normalizedHex = hex.replace(/#/g, '')

	if (normalizedHex.length === 3) {
		normalizedHex = normalizedHex
			.split('')
			.map((normalizedHex) => {
				return normalizedHex + normalizedHex
			})
			.join('')
	}
	const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(normalizedHex) || []

	const r = parseInt(result[1], 16) / 255
	const g = parseInt(result[2], 16) / 255
	const b = parseInt(result[3], 16) / 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)

	let s = (max + min) / 2
	let l = s
	let h = s

	if (max == min) {
		h = s = 0
	} else {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / d + 2
				break
			case b:
				h = (r - g) / d + 4
				break
		}
		h /= 6
	}
	s = s * 100
	s = Math.round(s)
	l = l * 100
	l = Math.round(l)
	h = Math.round(360 * h)

	return {
		data: {
			h,
			s,
			l,
		},
		color: `hsl(${String(h)}, ${String(s)}%, ${String(l)}%)`,
	}
}
