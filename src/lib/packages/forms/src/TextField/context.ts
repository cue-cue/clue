import { Context } from '@cluue/utils'
import type { ComponentProps } from 'svelte'
import type { Writable } from 'svelte/store'
import type TextField from './TextField.svelte'
import type { TextFieldBase } from './index.js'

type Data = Writable<Pick<ComponentProps<TextField>, 'error' | 'disabled' | 'id'>>

export const context = new Context<Data>('TextField')

export const textFieldButtonsContext = new Context<Writable<{ count: number; mounted: boolean }>>(
	'TextFieldButtons',
)

export const textFieldBaseContext = new Context<
	Writable<{
		size: ComponentProps<TextFieldBase>['size']
	}>
>('TextFieldBase')
