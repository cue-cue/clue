<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import LabelName from './LabelName.svelte'

	interface $$Props {
		class?:string
		slots?:{
			label?:boolean
			desc?:boolean
		}
	}

	interface $$Slots {
		default: {}
		label: {
			component: typeof LabelName
		}
		desc: {}
	}
	
	let className = ''
	export { className as class }
	export let slots:$$Props['slots'] = undefined
	
</script>

<div class={generateClassNames(['Label', className])}>
	<div class={generateClassNames(['Label__main'])} data-clue-checkbox-field-hover-trigger data-clue-label-name-hover-trigger>
		<slot/>
		{#if $$slots.label && (slots?.label ?? true)}
			<slot name='label' component={LabelName}/>
		{/if}
	</div>
	{#if $$slots.desc && (slots?.desc ?? true)}
		<slot name='desc'/>
	{/if}
</div>

<style lang='sass'>
	.ClueLabel
		&__main
			display: flex
			align-items: center
			pointer-events: none
			> :global(*)
				pointer-events: auto
			:global(.ClueLabelName)
				margin-left: 8px
</style>