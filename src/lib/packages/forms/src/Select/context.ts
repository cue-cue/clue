/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from '@cluue/utils'
import type { ComponentProps } from 'svelte'
import type { Writable } from 'svelte/store'
import type { Select } from './index.js'
import type { ISelectOptionListCoreData } from './types.js'

type Data = Writable<Pick<ComponentProps<Select<any, any, any, any>>, 'open'>>

export const context = new Context<Data>('Select')

export const selectOptionListCoreContext = new Context<
	Writable<{ data: ISelectOptionListCoreData<any>[] }>
>('SelectOptionListCore')
