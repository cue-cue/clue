<script lang="ts">
	import { Period, Calendar, Disabled, Select, Cell, Block } from '@cluue/calendar-core'
	import { getAllMinutesByDate } from '@cluue/calendar-utils'
	import { Button } from '@cluue/base'
	import dayjs from 'dayjs'
	import { BLOCKS } from './blocks.js'

	let selected: Select['selected'] = undefined

	const periods: Period[] = [
		new Period({
			days: [0, 1, 2, 3, 4, 5, 6],
			start: 30 * 6,
			end: 30 * 12
		})
		// new Period({
		//     days: [0,1,2,3],
		//     start: 30 * 18,
		//     end: 30 * 30
		// }),
		// new Period({
		//     days: [4],
		//     start: 0,
		//     end: 1440
		// }),
		// new Period({
		//     days: [5],
		//     start: 0,
		//     end: 600
		// }),
		// new Period({
		//     days: [5],
		//     start: 1200,
		//     end: 1440
		// }),
	]

	const platformPeriods: Period[] = [
		{
			days: ['Sa'],
			start: 480,
			end: 1080
		},
		{
			days: ['Fr'],
			start: 900,
			end: 1425
		},
		{
			days: ['Th', 'We'],
			start: 195,
			end: 1260
		},
		{
			days: ['Mo', 'Tu'],
			start: 90,
			end: 1380
		}
	].map((data) => new Period(data))

	const calendar = new Calendar({
		step: 30,
		// blocks: BLOCKS.map((block) => new Block({ from: new Date(block.from), to: new Date(block.to) }))
		blocks: [
			// new Block({
			// 	from: dayjs().startOf('day').add(20, 'hours').toDate(),
			// 	to: dayjs().startOf('day').add(24, 'hours').toDate()
			// }),
			// new Block({
			// 	from: dayjs().startOf('day').add(4, 'hours').toDate(),
			// 	to: dayjs().startOf('day').add(6, 'hours').toDate()
			// }),
			// new Block({
			// 	from: dayjs().startOf('day').add(8, 'hours').toDate(),
			// 	to: dayjs().startOf('day').add(10, 'hours').toDate()
			// }),
			// new Block({
			// 	from: dayjs().startOf('day').add(1, 'day').add(4, 'hours').toDate(),
			// 	to: dayjs().startOf('day').add(1, 'day').add(9, 'hours').toDate()
			// }),
			new Block({
				from: dayjs().startOf('day').add(1, 'day').add(1, 'hours').toDate(),
				to: dayjs().startOf('day').add(1, 'day').add(66, 'hours').toDate()
			})
		]
		// periods: periods
		// disabled: [
		//     new Disabled({
		//         from: dayjs().startOf('day').add(23.5, 'hours').toDate(),
		//         to: dayjs().startOf('day').add(24, 'hours').toDate()
		//     })
		// ]
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
			// minTimeLength: 60,
			// fixTimeLength: 120
		}
	})

	const onClick = () => {
		console.log({
			// cellList
		})
	}

	const onCellClick = (event: MouseEvent, cell: Cell) => {
		console.log(cell, calendar, calendar.isDisabled(cell))
		select.select(cell, {
			mode: event.shiftKey ? 'range' : 'single'
		})
	}

	$: cells = (date: Date) => {
		const cells = calendar.createCellList({ date }).cells
		return Block.addToCellList(calendar.blocks, cells)
	}
</script>

<h2>Calendar Core</h2>
{JSON.stringify(selected)} <br />
<Button on:click={onClick}>Test Calendar (console)</Button>

<ul style="display: flex">
	{#each [-1, 0, 1, 2, 3, 4, 5] as day}
		{@const date = dayjs().startOf('day').add(day, 'day').toDate()}
		<li>
			<h5>{date.toDateString()}</h5>
			<ul style="list-style: none; padding: 0">
				{#each cells(date) as cell}
					<li>
						<Button
							size="small"
							on:click={(e) => {
								onCellClick(e, cell)
								console.log(cells(date))
							}}
							type={calendar.isBlockDisabled(cell).result ? 'primary' : 'ghost'}
						>
							<small>{getAllMinutesByDate(cell.from)}</small>
							{dayjs(cell.from).format('HH:mm')} - <small>{getAllMinutesByDate(cell.to)}</small>
							{dayjs(cell.to).format('HH:mm')}
						</Button>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<h5>periods</h5>
<pre>{JSON.stringify(calendar.periods, null, 2)}</pre>

<h5>blocks</h5>
<pre>{JSON.stringify(calendar.blocks, null, 2)}</pre>
