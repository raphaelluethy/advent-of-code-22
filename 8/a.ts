export const x = '';

const input = await Deno.readTextFile('./input.txt');

const lines = input.split('\n');

const grid = lines.map((line) => {
	return line.split('').map((char) => parseInt(char, 10));
});

const gridWidth = grid.length;
const gridHeight = grid[0].length;

if (gridWidth !== gridHeight) throw new Error('Grid must be square');

const gridSize = gridWidth;
console.log({ gridSize });

const visible = new Array(gridSize)
	.fill(false)
	.map(() => new Array(gridSize).fill(false));

// from outside to inside on all sides

// top row
for (let i = 0; i < gridSize; i++) {
	let max = -1;
	for (let j = 0; j < gridSize; j++) {
		if (grid[i][j] > max) {
			visible[i][j] = true;
			max = grid[i][j];
		}
	}
}

// bottom row
for (let i = 0; i < gridSize; i++) {
	let max = -1;
	for (let j = gridSize - 1; j >= 0; j--) {
		if (grid[i][j] > max) {
			visible[i][j] = true;
			max = grid[i][j];
		}
	}
}

// left column
for (let j = 0; j < gridSize; j++) {
	let max = -1;
	for (let i = 0; i < gridSize; i++) {
		if (grid[i][j] > max) {
			visible[i][j] = true;
			max = grid[i][j];
		}
	}
}

// right column
for (let j = 0; j < gridSize; j++) {
	let max = -1;
	for (let i = gridSize - 1; i >= 0; i--) {
		if (grid[i][j] > max) {
			visible[i][j] = true;
			max = grid[i][j];
		}
	}
}

const count = visible.reduce((acc, row) => {
	return acc + row.filter((v) => v).length;
}, 0);

// console.log({ visible });
console.log(count);
