export const x = '';

const input = await Deno.readTextFile('./input.txt');

const lines: string[] = input.split('\n');

const solutionArray: Array<{
	left: string;
	right: string;
	commonLetter: string;
	priority: number;
}> = [];

for (const [idx, line] of lines.entries()) {
	const left = line.slice(0, line.length / 2);
	const right = line.slice(line.length / 2);
	const commonLetter = left
		.split('')
		.find((letter) => right.includes(letter));
	if (!commonLetter) {
		throw new Error(`Found no common letter: ${idx}`);
	}

	const priority =
		commonLetter.charCodeAt(0) - 96 > 0
			? commonLetter.charCodeAt(0) - 96
			: commonLetter.charCodeAt(0) - 38;

	solutionArray.push({
		left,
		right,
		commonLetter,
		priority,
	});
}
console.log(solutionArray.slice(0, 20));

const result = solutionArray.reduce((prev, item) => item.priority + prev, 0);
console.log(result);
