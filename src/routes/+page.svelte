<script lang='ts'>
    import {Input, TextField} from '@clue/base'
</script>

<div>
    <main>
        <hr>
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
        </ul>
        <hr>
    </main>
</div>