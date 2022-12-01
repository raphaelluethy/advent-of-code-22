export const x = '';

const input = await Deno.readTextFile('./input.txt');

const split = input.split('\n');

const maxima: number[] = [];

let max = -1;
let current = 0;
for (const line of split) {
	if (line.length == 0) {
		max = Math.max(max, current);
		maxima.push(current);
		current = 0;
		continue;
	}
	current += parseInt(line);
}
maxima.sort((a, b) => b - a);

console.log(max);
console.log(maxima[0] + maxima[1] + maxima[2]);
