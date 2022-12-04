export const x = '';

const input = await Deno.readTextFile('./input.txt');

const lines: string[] = input.split('\n');

const fullyIncluded = lines.map((line) => {
	const [first, second] = line.split(',');
	const [firstX, firstY] = first.split('-').map((x) => parseInt(x));
	const [secondX, secondY] = second.split('-').map((x) => parseInt(x));

	// 1 in 2
	if (firstX >= secondX && firstY <= secondY) {
		return true;
	}

	// 2 in 1
	if (firstX <= secondX && firstY >= secondY) {
		return true;
	}

	// rest
	return false;
});

const result = fullyIncluded.filter((x) => x).length;

console.log({ result });
