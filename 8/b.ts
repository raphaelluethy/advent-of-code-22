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

const viewScoreMap = new Array(gridSize)
	.fill(0)
	.map(() => new Array(gridSize).fill(false));

// from outside to inside on all sides

const maxScoresArray: {
	score: number;
	i: number;
	j: number;
}[] = [];

const getViewScoresForPoint = (treeHeight: number, trees: number[]) => {
	if (trees.every((tree) => tree < treeHeight))
		return trees.length > 0 ? trees.length : 1;

	for (let i = 0; i < trees.length; i++) {
		if (trees[i] >= treeHeight) {
			return i + 1;
		}
	}
	return 0;
};

for (let i = 0; i < gridSize; i++) {
	for (let j = 0; j < gridSize; j++) {
		const topScores = getViewScoresForPoint(
			grid[i][j],
			grid[i].slice(0, j).reverse() // since we go upwards, array would normally be downwards
		);
		const bottomScores = getViewScoresForPoint(
			grid[i][j],
			grid[i].slice(j + 1, gridSize)
		);
		const leftScores = getViewScoresForPoint(
			grid[i][j],
			grid
				.map((row) => row[j])
				.slice(0, i)
				.reverse() // since we go from left to right
		);
		const rightScores = getViewScoresForPoint(
			grid[i][j],
			grid.map((row) => row[j]).slice(i + 1, gridSize)
		);

		const score = topScores * bottomScores * leftScores * rightScores;
		viewScoreMap[i][j] = score;
		maxScoresArray.push({ score, i, j });
	}
}

const highestViewScoreFromMap = viewScoreMap.reduce((acc, row) => {
	return Math.max(acc, ...row);
}, 0);

console.log({ highestViewScoreFromMap });
