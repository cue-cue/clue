<script lang='ts'>
    import {Input, PasswordField, TextField, TextFieldBase} from '@clue/base'
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
        base with TextFieldValue<br>
        <TextField value='value'>
            Text value (manual)
        </TextField>
    </li>
    <li>
        base with label<br>
        <TextField value='value' label='Label'/>
    </li>
    <li>
        base with helper<br>
        <TextField value='value' helper='Assistive text'/>
    </li>
    <li>
        multiple inputs<br>
        <TextField helper='Assistive text' label='test'>
            <svelte:fragment slot='base'>
                <TextFieldBase>
                    <Input placeholder='first'/>
                    <Input placeholder='second'/>
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
        base with disabled and the TextFieldValue<br>
        <TextField disabled label='Label' helper='Assistive text'>
            Text value (manual)
        </TextField>
    </li>
    <li>
        base with readonly<br>
        <TextField placeholder='Placeholder' readonly label='Label' helper='Assistive text'/>
        <TextField value="Value" readonly label='Label' helper='Assistive text'/>
        base with disabled and the TextFieldValue<br>
        <TextField readonly label='Label' helper='Assistive text'>
            Text value (manual)
        </TextField>
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
</ul>