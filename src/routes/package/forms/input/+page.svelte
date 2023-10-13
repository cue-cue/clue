<script lang='ts'>
    import TextFieldButton from '$lib/packages/forms/src/TextField/TextFieldButton.svelte'
    import {Input, PasswordField, TextField, TextFieldBase} from '@clue/forms'
    import buttonIcon from '@clue/icons/line/activity-circle.svg'

    const icons:Record<'start' | 'end', (typeof buttonIcon | undefined)[]> = {start: [buttonIcon, buttonIcon], end: [buttonIcon, buttonIcon, buttonIcon, buttonIcon, buttonIcon]}

</script>

<h2>Input</h2>
<ul>
    <li>
        base without placeholder <br>
        <Input/>
    </li>
    <li>
        base with placeholder <br>
        <Input placeholder="Placeholder"/>
    </li>
    <li>
        base with value<br>
        <Input value='value'/>
    </li>
</ul>
<h3>multiline</h3>
<ul>
    <li>
        base without placeholder (rows: 4) <br>
        <Input multiline rows={4}/>
    </li>
    <li>
        base with placeholder <br>
        <Input multiline placeholder="Placeholder"/>
    </li>
    <li>
        base with value<br>
        <Input multiline value='value'/>
    </li>
</ul>
<hr>
<h2>TextField</h2>
<ul>
    <li>
        base without placeholder <br>
        <TextField/>
    </li>
    <li>
        base with placeholder <br>
        <TextField placeholder="Placeholder"/>
    </li>
    <li>
        base with value<br>
        <TextField value='value'/>
    </li>
    <li>
        PasswordField<br>
        <PasswordField/>
    </li>
    <li>
        base with label<br>
        <TextField value='value' label='Label'/>
    </li>
    <li>
        base with hint<br>
        <TextField value='value' hint='Hint'/>
    </li>
    <li>
        base with label and hint<br>
        <TextField value='value' label='Label' hint='Hint'/>
    </li>
    <li>
        base with helper<br>
        <TextField value='value' helper='Assistive text'/>
    </li>
    <li>
        multiple inputs<br>
        <TextField readonly helper='Assistive text' label='test'>
            <svelte:fragment slot='base' let:id>
                <TextFieldBase>
                    <Input placeholder='first' {id}/>
                    <Input placeholder='second' id={id + 'second'}/>
                </TextFieldBase>
            </svelte:fragment>
        </TextField>
    </li>
    <li>
        base with error<br>
        <TextField placeholder='Placeholder' error label='Label' helper='Assistive text'/>
    </li>
    <li>
        base with disabled<br>
        <TextField placeholder='Placeholder' disabled label='Label' helper='Assistive text'/>
        <TextField value="Value" disabled label='Label' helper='Assistive text'/>
    </li>
    <li>
        with readonly<br>
        <TextField placeholder='Placeholder' readonly label='Label' helper='Assistive text'/>
        <TextField value="Value" readonly label='Label' helper='Assistive text'/>
        <TextField multiline value="Value" readonly label='Label' helper='Assistive text'/>
    </li>
    <li>
        textarea
        <TextField multiline/>
        <br>
        <TextField multiline placeholder='Placeholder'/>
        <br>
        <TextField multiline value='Value' rows={6}/>
        <br>
        <TextField multiline value='Value' disabled/>
        <br>
        <TextField multiline value='Value' error/>
    </li>
    <li>
        Icons
        <TextField>
            <svelte:fragment slot='buttons'>
                <TextFieldButton icon={buttonIcon}/>
            </svelte:fragment>
        </TextField>
        <br>
        <TextField placeholder='Placeholder'>
            <svelte:fragment slot='buttons-start'>
                <TextFieldButton icon={buttonIcon}/>
            </svelte:fragment>
        </TextField>
        <br>
        <TextField value='Value'>
            <svelte:fragment slot='buttons-start'>
                <TextFieldButton icon={buttonIcon}/>
            </svelte:fragment>
            <svelte:fragment slot='buttons'>
                <TextFieldButton icon={buttonIcon}/>
            </svelte:fragment>
        </TextField>
        <br>
        <pre>
            {JSON.stringify(icons, null, 2)}
        </pre>
        <TextField value='Value'>
            <svelte:fragment slot='buttons-start'>
                {#each icons.start as icon, index}
                    {#if icon}
                        <TextFieldButton {icon} on:click={() => {
                            icons.start[index] = undefined
                            setTimeout(() => icons.start[index] = buttonIcon, 2000)
                        }}/>
                    {/if}
                {/each}
            </svelte:fragment>
            <svelte:fragment slot='buttons'>
                {#each icons.end as icon, index}
                    {#if icon}
                        <TextFieldButton {icon} on:click={() => {
                            icons.end[index] = undefined
                            setTimeout(() => icons.end[index] = buttonIcon, 2000)
                        }}/>
                    {/if}
                {/each}
            </svelte:fragment>
        </TextField>
    </li>
    <li>
        <h3>Size small</h3>
        <TextField value='value' label='Base' size='small'/>
        <br>
        <TextField value='value' label='Disabled' disabled size='small'/>
        <br>
        <TextField value='Value' label='With icons' size='small'>
            <svelte:fragment slot='buttons-start'>
                {#each icons.start as icon, index}
                    {#if icon}
                        <TextFieldButton {icon} on:click={() => {
                            icons.start[index] = undefined
                            setTimeout(() => icons.start[index] = buttonIcon, 2000)
                        }}/>
                    {/if}
                {/each}
            </svelte:fragment>
            <svelte:fragment slot='buttons'>
                {#each icons.end as icon, index}
                    {#if icon}
                        <TextFieldButton {icon} on:click={() => {
                            icons.end[index] = undefined
                            setTimeout(() => icons.end[index] = buttonIcon, 2000)
                        }}/>
                    {/if}
                {/each}
            </svelte:fragment>
        </TextField>
    </li>
</ul>