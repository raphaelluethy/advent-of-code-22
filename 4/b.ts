export const x = '';

const input = await Deno.readTextFile('./input.txt');

const lines: string[] = input.split('\n');

const fullyIncluded = lines.map((line) => {
	const [first, second] = line.split(',');
	const [firstX, firstY] = first.split('-').map((x) => parseInt(x));
	const [secondX, secondY] = second.split('-').map((x) => parseInt(x));

	const firstRange = Array.from(
		Array<number>(firstY - firstX + 1),
		(_, n) => n + firstX
	);
	const secondRange = Array.from(
		Array<number>(secondY - secondX + 1),
		(_, n) => n + secondX
	);

	const intersection = firstRange.filter((x) => secondRange.includes(x));

	return intersection.length > 0;
});

const result = fullyIncluded.filter((x) => x).length;

console.log({ result });
