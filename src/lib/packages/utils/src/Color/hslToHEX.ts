import type { ColorTransferHEX } from './types.js'

export const hslToHEX: ColorTransferHEX = (hsl: string) => {
	// eslint-disable-next-line prefer-const
	let [h, s, l] = (hsl.match(/\((.*)\)/)?.[1] || '')
		.replace(/[\s%]/g, '')
		.split(',')
		.map((val) => parseFloat(val))

	if (l > 100) {
		l = 100
	} else if (l < 0) {
		l = 0
	}

	s /= 100
	l /= 100

	const c = (1 - Math.abs(2 * l - 1)) * s
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
	const m = l - c / 2
	let r = 0
	let g = 0
	let b = 0

	if (0 <= h && h < 60) {
		r = c
		g = x
		b = 0
	} else if (60 <= h && h < 120) {
		r = x
		g = c
		b = 0
	} else if (120 <= h && h < 180) {
		r = 0
		g = c
		b = x
	} else if (180 <= h && h < 240) {
		r = 0
		g = x
		b = c
	} else if (240 <= h && h < 300) {
		r = x
		g = 0
		b = c
	} else if (300 <= h && h < 360) {
		r = c
		g = 0
		b = x
	}
	// Having obtained RGB, convert channels to hex
	const colorData = {
		r: Math.round((r + m) * 255).toString(16),
		g: Math.round((g + m) * 255).toString(16),
		b: Math.round((b + m) * 255).toString(16),
	}

	Object.entries(colorData).forEach(([key, value]) => {
		if (value.length === 1) {
			colorData[key as keyof typeof colorData] = '0' + value
		}
	})

	return {
		data: colorData,
		color: `#${colorData.r}${colorData.g}${colorData.b}`,
	}
}
