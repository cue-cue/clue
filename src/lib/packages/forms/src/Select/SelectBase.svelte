<script lang="ts" context='module'>
	interface ISearchController {
		start: () => void,
		stop: () => void,
		clear: () => void
	}

	interface Instance {
		id: string
		setOpen: (open:boolean) => void
	}

	let instances:Instance[] = []

	const instancesController = {
		add(instance:Instance) {
			instances = [...instances, instance]
		},
		remove(instanceId:Instance['id']) {
			instances = instances.filter(({id}) => id !== instanceId)
		},
		closeAll(instanceId:Instance['id']) {
			instances.forEach(({setOpen, id}) => id !== instanceId &&  setOpen(false))
		}
	}
</script>

<script lang='ts'>
	import {generateClassNames, outclick, randomId, type ActionListParams} from '@cluue/utils'
	import TextFieldBase from '../TextField/TextFieldBase.svelte'
	import Input from '../Input/Input.svelte'
	import { tick, type ComponentProps, createEventDispatcher, onMount, onDestroy} from 'svelte'
	import TextFieldButton from '../TextField/TextFieldButton.svelte'
	import icon from '@cluue/icons/line/angle-down.svg?clue'
	import clearIcon from '@cluue/icons/line/times.svg?clue'
	import { createAction } from '@cluue/utils'

	type InputProps = ComponentProps<Input>
	type TextFieldBaseProps = ComponentProps<TextFieldBase>

	interface $$Events {
		click: MouseEvent
		close: CustomEvent<undefined>
		open: CustomEvent<undefined>
		toggle: CustomEvent<undefined>
		searchClear: CustomEvent<undefined>
		clear: CustomEvent<undefined>
	}

	interface $$Props extends Pick<TextFieldBaseProps, 'disabled' | 'readonly' | 'error' | 'name'> {
		class?:string
		value?:InputProps['value']
		open?:boolean
		allowSearch?:boolean
		allowClear?:boolean
		searchValue?:string
		id?:string
		use?:ActionListParams
	}
	
	let className = ''
	export { className as class }
	export let value:$$Props['value'] = undefined
	export let open:$$Props['open'] = false
	export let allowSearch:$$Props['allowSearch'] = false
	export let allowClear:$$Props['allowClear'] = true
	export let searchValue:$$Props['searchValue'] = ''
	export let disabled:$$Props['disabled'] = undefined
	export let id:Exclude<$$Props['id'], undefined> = randomId('SelectBase')
	export let use:$$Props['use'] = undefined

	const dispatch = createEventDispatcher()

	let baseNodeElement:ComponentProps<TextFieldBase>['nodeElement'] = undefined

	let searched = false
	let searchInputElement:InputProps['nodeElement'] = undefined

	const searchController:ISearchController = {
		start() {
			if (allowSearch) {
				searched = true
				tick().then(() => {
					searchInputElement?.focus()
				})
			}
		},
		stop() {
			searched = false
		},
		clear() {
			dispatch('searchClear')
			searchValue = ''
		}
	}

	const inputController = {
		eventsLocked: false,
		lockEvents() {
			this.eventsLocked = true
		},
		unlockEvents() {
			this.eventsLocked = false
		},
		ghostCallback(callback:Function) {
			this.lockEvents()
			const res = callback()
			this.unlockEvents()
			return res
		},
		eventCallback(callback:Function) {
			if (this.eventsLocked) return
			return callback()
		}
	}

	const openHandler = {
		auto(_open:typeof open) {
			this.toggle()
			if (_open) {
				this.open()
			} else {
				this.close()
			}
		},
		open() {
			dispatch('open')
			instancesController.closeAll(id)
			searchController.start()
		},
		close() {
			dispatch('close')
			searchController.stop()
			searchController.clear()
		},
		toggle() {
			dispatch('toggle')
		}
	}

	export const setOpen = (_open:typeof open) => {
		if (_open === false && open === false) return
		open = _open
	}
	export const toggle = () => {
		setOpen(!open)
	}

	const handler = {
		arrowClick() {
			if (disabled) return

			inputController.ghostCallback(() => {
				toggle()
			})
		},
		baseClick(e:MouseEvent) {
			if (disabled) return

			const target = e.target as HTMLElement
			if (target.contains(baseNodeElement as Node)) {
				setOpen(true)
			}
		},
		focus() {
			if (disabled) return

			inputController.eventCallback(() => {
				setOpen(true)
			})
		},
		clearClick() {
			if (disabled) return

			if (searched) {
				if (!searchValue?.length && (allowClear && value)) {
					dispatch('clear')
				}
				searchController.clear()
			} else {
				dispatch('clear')
			}
		},
		outclick() {
			searchController.stop()
		},
		documentKeydown(e:KeyboardEvent) {
			if (open) {
				const {code} = e
				switch(code) {
					case 'Escape': {
						e.preventDefault()
						setOpen(false)
					}
				}
			}
		}
	}

	onMount(() => {
		instancesController.add({
			id,
			setOpen
		})
	})

	onDestroy(() => {
		instancesController.remove(id)
	})

	$: openHandler.auto(open)
</script>

<svelte:document on:keydown={handler.documentKeydown}/>

<TextFieldBase
	class={generateClassNames(['SelectBase', className])}
	focused={open}
	use={[
		...(use || []),
		createAction('outclick', outclick, {
			handler: handler.outclick
		})
	]}
	{disabled}
	bind:nodeElement={baseNodeElement}
	on:click={handler.baseClick}
	on:click
	{...$$restProps}
>
	{#if searched}
		<Input
			placeholder={value}
			{disabled}
			{id}
			bind:value={searchValue}
			bind:nodeElement={searchInputElement}
		/>
	{:else}
		<Input
			readonly
			{disabled}
			{id}
			bind:value
			on:focus={handler.focus}
		/>
	{/if}
	<svelte:fragment slot='buttons'>
		{#if !disabled}
			<TextFieldButton {icon} on:click={handler.arrowClick} reverse={open ? 'y' : undefined}/>
		{/if}
		{#if searchValue?.length || (allowClear && value)}
			<TextFieldButton icon={clearIcon} width={20} on:click={handler.clearClick}/>
		{/if}
	</svelte:fragment>
</TextFieldBase>

<style lang='sass'>
	:global(.ClueSelectBase)
		cursor: pointer
		:global(.ClueInput[readonly])
			cursor: pointer
		:global(.ClueInput)
			text-overflow: ellipsis
	:global(.ClueSelectBase:not([data-focused='true']))
		:global(.ClueInput)
			pointer-events: none
	:global(.ClueSelectBase[data-focused='true'])
		--clue-text-field-base-border-radius: var(--clue-size-border-radius-3) var(--clue-size-border-radius-3) 0 0
</style>