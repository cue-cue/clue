<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import TextFieldBase from '../TextField/TextFieldBase.svelte'
	import Input from '../Input/Input.svelte'
	import type { ComponentProps} from 'svelte'
	import TextFieldButton from '../TextField/TextFieldButton.svelte'
	import icon from '@clue/icons/line/angle-down.svg'

	type InputProps = ComponentProps<Input>

	interface $$Props {
		class?:string
		value?:InputProps['value']
		inputElement?:InputProps['nodeElement']
		opened?:boolean
		readonly?:boolean
	}
	
	let className = ''
	export { className as class }
	export let value:$$Props['value'] = undefined
	export let inputElement:$$Props['inputElement'] = undefined
	export let opened:$$Props['opened'] = false
	export let readonly:$$Props['readonly'] = true

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

	const setOpened = (_opened:typeof opened) => {
		opened = _opened
	}

	export const open = () => {
		setOpened(true)
	}

	export const close = () => {
		setOpened(false)
	}

	export const toggle = () => {
		setOpened(!opened)
	}

	const handler = {
		arrowClick() {
			inputController.ghostCallback(() => {
				toggle()
			})
		},
		baseClick(e:MouseEvent) {
			const target = e.target as HTMLElement
			if (target.classList.contains('ClueSelectBase')) {
				open()
			}
		},
		focus(e:FocusEvent) {
			inputController.eventCallback(() => open())
		}
	}
</script>
<TextFieldBase focused={opened} on:click class={generateClassNames(['SelectBase', className])} on:click={handler.baseClick}>
	<Input bind:nodeElement={inputElement} {readonly} bind:value on:focus={handler.focus}/>
	<svelte:fragment slot='buttons'>
		<TextFieldButton {icon} on:click={handler.arrowClick}/>
	</svelte:fragment>
</TextFieldBase>

<style lang='sass'>
	:global(.ClueSelectBase)
		cursor: pointer
		:global(.ClueInput)
			cursor: pointer
		:global(.ClueTextFieldButton)
			transition: var(--clue-transition)
			transition-property: transform
	:global(.ClueSelectBase[data-focused='true'])
		:global(.ClueTextFieldButton)
			transform: scaleY(-1)
</style>