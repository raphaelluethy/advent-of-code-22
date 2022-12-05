export const x = "";

const input = await Deno.readTextFile("./input.txt");

const split = input.split("\n");

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

const newMax = Math.max(
  ...input.split("\n\n").map((blocks) =>
    blocks.split("\n").map((x) => parseInt(x)).reduce((a, b) => a + b, 0)
  ),
);

console.log({ max, newMax });
