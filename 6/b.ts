export const x = '';

const input = await Deno.readTextFile('./input.txt');

const chars = input.split('');

let result = -1;

for (let i = 13; i < chars.length; i++) {
	const prevFourChars = chars.slice(i - 13, i + 1);
	console.log({ prevFourChars });
	const set = new Set(prevFourChars);
	console.log({ set });
	result = set.size === 14 ? i : -1;
	if (result !== -1) {
		break;
	}
}
console.log({ result: result + 1, char: chars[result] });
