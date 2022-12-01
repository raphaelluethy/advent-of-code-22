export const x = '';

const input = await Deno.readTextFile('./input.txt');

const split = input.split('\n');

let max = -1;
let current = 0;
for (const line of split) {
	if (line.length == 0) {
		max = Math.max(max, current);
		current = 0;
		continue;
	}
	current += parseInt(line);
}

console.log(max);
