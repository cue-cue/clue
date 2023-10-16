<script context='module'>let instances = [];
const instancesController = {
  add(instance) {
    instances = [...instances, instance];
  },
  remove(instanceId) {
    instances = instances.filter(({ id }) => id !== instanceId);
  },
  closeAll(instanceId) {
    instances.forEach(({ setOpen, id }) => id !== instanceId && setOpen(false));
  }
};
</script>

<script>import { generateClassNames, outclick, randomId } from "@cluue/utils";
import TextFieldBase from "../TextField/TextFieldBase.svelte";
import Input from "../Input/Input.svelte";
import { tick, createEventDispatcher, onMount, onDestroy } from "svelte";
import TextFieldButton from "../TextField/TextFieldButton.svelte";
import icon from "@cluue/icons/line/angle-down.svg";
import clearIcon from "@cluue/icons/line/times.svg";
import { createAction } from "@cluue/utils";
let className = "";
export { className as class };
export let value = void 0;
export let open = false;
export let allowSearch = false;
export let allowClear = true;
export let searchValue = "";
export let disabled = void 0;
export let id = randomId("SelectBase");
export let use = void 0;
const dispatch = createEventDispatcher();
let baseNodeElement = void 0;
let searched = false;
let searchInputElement = void 0;
const searchController = {
  start() {
    if (allowSearch) {
      searched = true;
      tick().then(() => {
        searchInputElement?.focus();
      });
    }
  },
  stop() {
    searched = false;
  },
  clear() {
    dispatch("searchClear");
    searchValue = "";
  }
};
const inputController = {
  eventsLocked: false,
  lockEvents() {
    this.eventsLocked = true;
  },
  unlockEvents() {
    this.eventsLocked = false;
  },
  ghostCallback(callback) {
    this.lockEvents();
    const res = callback();
    this.unlockEvents();
    return res;
  },
  eventCallback(callback) {
    if (this.eventsLocked)
      return;
    return callback();
  }
};
const openHandler = {
  auto(_open) {
    this.toggle();
    if (_open) {
      this.open();
    } else {
      this.close();
    }
  },
  open() {
    dispatch("open");
    instancesController.closeAll(id);
    searchController.start();
  },
  close() {
    dispatch("close");
    searchController.stop();
    searchController.clear();
  },
  toggle() {
    dispatch("toggle");
  }
};
export const setOpen = (_open) => {
  if (_open === false && open === false)
    return;
  open = _open;
};
export const toggle = () => {
  setOpen(!open);
};
const handler = {
  arrowClick() {
    if (disabled)
      return;
    inputController.ghostCallback(() => {
      toggle();
    });
  },
  baseClick(e) {
    if (disabled)
      return;
    const target = e.target;
    if (target.contains(baseNodeElement)) {
      setOpen(true);
    }
  },
  focus() {
    if (disabled)
      return;
    inputController.eventCallback(() => {
      setOpen(true);
    });
  },
  clearClick() {
    if (disabled)
      return;
    if (searched) {
      if (!searchValue?.length && (allowClear && value)) {
        dispatch("clear");
      }
      searchController.clear();
    } else {
      dispatch("clear");
    }
  },
  outclick() {
    searchController.stop();
  },
  documentKeydown(e) {
    if (open) {
      const { code } = e;
      switch (code) {
        case "Escape": {
          e.preventDefault();
          setOpen(false);
        }
      }
    }
  }
};
onMount(() => {
  instancesController.add({
    id,
    setOpen
  });
});
onDestroy(() => {
  instancesController.remove(id);
});
$:
  openHandler.auto(open);
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

<style>:global(.ClueSelectBase) {
  cursor: pointer;
}
:global(.ClueSelectBase) :global(.ClueInput[readonly]) {
  cursor: pointer;
}
:global(.ClueSelectBase) :global(.ClueInput) {
  text-overflow: ellipsis;
}

:global(.ClueSelectBase:not([data-focused="true"])) :global(.ClueInput) {
  pointer-events: none;
}

:global(.ClueSelectBase[data-focused="true"]) {
  --clue-text-field-base-border-radius: var(--clue-size-border-radius-3) var(--clue-size-border-radius-3) 0 0;
}</style>