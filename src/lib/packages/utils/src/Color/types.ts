export type ColorTransferResult<T extends object, U extends string> = {
	data: T
	color: U
}
export type ColorTransfer<T extends object, U extends string> = (
	color: string,
) => ColorTransferResult<T, U>

export type ColorTransferHSL = ColorTransfer<
	{
		h: number
		s: number
		l: number
	},
	`hsl(${string}, ${string}%, ${string}%)`
>

export type ColorTransferRGB = ColorTransfer<
	{
		r: number
		g: number
		b: number
	},
	`rgb(${string}, ${string}, ${string})`
>

export type ColorTransferHEX = ColorTransfer<
	{
		r: string
		g: string
		b: string
	},
	`#${string}`
>
