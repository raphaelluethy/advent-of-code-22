export const x = '';

const input = await Deno.readTextFile('./input.txt');

const lines: string[] = input.split('\n');

const solutionArray: number[] = [];

for (let i = 0; i < lines.length; i += 3) {
	const first = lines[i];
	const second = lines[i + 1];
	const third = lines[i + 2];

	const commonLetter = first
		.split('')
		.find((letter) => second.includes(letter) && third.includes(letter));

	if (!commonLetter) {
		throw new Error(`Found no common letter: ${i}`);
	}

	const priority =
		commonLetter.charCodeAt(0) - 96 > 0
			? commonLetter.charCodeAt(0) - 96
			: commonLetter.charCodeAt(0) - 38;

	solutionArray.push(priority);
}

const result = solutionArray.reduce((prev, curr) => prev + curr, 0);
console.log({ result });
