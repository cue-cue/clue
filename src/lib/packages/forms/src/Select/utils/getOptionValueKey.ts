/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { OptionValue } from '../types.js'

export default <T extends OptionValue>(value: T, key?: string): string | number => {
	if (typeof value === 'object' && !Array.isArray(value)) {
		if (key) {
			//@ts-ignore
			return value[key]
		} else {
			//@ts-ignore
			return value.id
		}
	}
	return value as Exclude<typeof value, object>
}
