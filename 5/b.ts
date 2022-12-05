export const x = '';

const input = await Deno.readTextFile('./input.txt');

const split = input.split('\n');

const emptyLineIndex = split.findIndex((line) => line === '');

const stackLines: string[] = split.slice(0, emptyLineIndex);
const stacks: string[][] = stackLines
	.pop()!
	.split(' ')
	.filter((x) => x)
	.map((_) => []);

stackLines.forEach((line) => {
	const splits = line.split('');
	for (let i = 0; i < splits.length; i += 4) {
		stacks[i / 4].push(splits.slice(i, i + 4)[1]);
	}
});

const filteredStacks = stacks.map((stack) =>
	stack.filter((x) => x !== ' ').reverse()
);

const moves = split.slice(emptyLineIndex + 1);

moves.forEach((move) => {
	const [amnt, from, to] = move
		.split(' ')
		.filter((x) => parseInt(x))
		.map((x) => parseInt(x));

	if (filteredStacks[from - 1].length < amnt)
		throw new Error('Not enough items on index ' + from);
	const cards = filteredStacks[from - 1]!.splice(-amnt, amnt);
	filteredStacks[to - 1].push(...cards);
});

console.log({ result: filteredStacks.map((stack) => stack.pop()).join('') });
