export const x = '';

const input = await Deno.readTextFile('./input.txt');

const lines = input.split('\n');

type Point = {
	x: number;
	y: number;
};

const Head: Point = {
	x: 0,
	y: 0,
};

const Tail: Point = {
	x: 0,
	y: 0,
};

const tailHistory: Set<string> = new Set(['0,0']);

const executeCommand = (command: string, Head: Point, Tail: Point) => {
	const [direction, amount] = command.split(' ');
	for (let i = 0; i < parseInt(amount); i++) {
		switch (direction) {
			case 'U':
				Head.y += 1;
				break;
			case 'D':
				Head.y -= 1;
				break;
			case 'L':
				Head.x -= 1;
				break;
			case 'R':
				Head.x += 1;
				break;
			default:
				throw new Error(`Unknown direction: ${direction}`);
		}
		handleHead(Head, Tail);
	}
};

const handleHead = (Head: Point, Tail: Point) => {
	const moveRight = Head.x > Tail.x;
	const moveLeft = Head.x < Tail.x;
	const moveUp = Head.y > Tail.y;
	const moveDown = Head.y < Tail.y;

	if (moveRight) {
		Tail.x += 1;
	}
	if (moveLeft) {
		Tail.x -= 1;
	}
	if (moveUp) {
		Tail.y += 1;
	}
	if (moveDown) {
		Tail.y -= 1;
	}

	tailHistory.add(`${Tail.x},${Tail.y}`);
};

for (const line of lines) {
	executeCommand(line, Head, Tail);
}

console.log({
	commands: lines.length,
	tailHistory: tailHistory.size,
});
