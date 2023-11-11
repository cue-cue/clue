<script lang='ts'>
	import { Cell, Select, Period, Disabled, Calendar } from "$lib/packages/calendar/core/src"
	import { getAllMinutesByDate } from "$lib/packages/calendar/utils/src"
	import {Button} from "@cluue/base"
    import dayjs from 'dayjs'
    
    let selected:any = undefined

    const periods:Period[] = [
        new Period({
            days: [0,1,2,3],
            start: 30 * 5,
            end: 30 * 12
        }),
        new Period({
            days: [0,1,2,3],
            start: 30 * 18,
            end: 30 * 30
        }),
        new Period({
            days: [4],
            start: 0,
            end: 1440
        }),
        new Period({
            days: [5],
            start: 0,
            end: 600
        }),
        new Period({
            days: [5],
            start: 1200,
            end: 1440
        }),
    ]

    const calendar = new Calendar({
        step: 30,
        periods,
        disabled: [
            new Disabled({
                from: dayjs().startOf('day').add(23.5, 'hours').toDate(),
                to: dayjs().startOf('day').add(24, 'hours').toDate()
            })
        ]
    })

    const select = new Select({
        calendar,
        on: {
            set(value) {
                selected = value
            }
        },
        options: {
            allowBetweenDays: true
        }
    })

    const onClick = () => {
        console.log({
            // cellList
        })
    }

    const onCellClick = (event:MouseEvent, cell:Cell) => {
        
        select.select(cell, {
            mode: event.shiftKey ? 'range' : 'single'
        })
    }

</script>

<h2>Calendar Core</h2>
{JSON.stringify(selected)} <br>
<Button on:click={onClick}>Test Calendar (console)</Button>

<ul style="display: flex">
    {#each [-1,0,1,2,3,4,5] as day}
        {@const date = dayjs().startOf('day').add(day, 'day').toDate()}
        <li>
            <h5>{date.toDateString()}</h5>
            <ul style='list-style: none; padding: 0'>
                {#each calendar.createCellList({
                    date
                }).cells as cell}
                    <li>
                        <Button
                            size='small'
                            on:click={(e) => onCellClick(e, cell)}
                            type={selected && select.check(cell) ? 'primary' : 'ghost'}
                            disabled={calendar.isDisabled(cell).disabled}
                        >
                            <small>{getAllMinutesByDate(cell.from)}</small> {dayjs(cell.from).format('HH:mm')} - <small>{getAllMinutesByDate(cell.to)}</small> {dayjs(cell.to).format('HH:mm')}
                        </Button>
                    </li>
                {/each}
            </ul>
        </li>
    {/each}
</ul>

<h5>periods</h5>
<pre>{JSON.stringify(periods, null, 2)}</pre>