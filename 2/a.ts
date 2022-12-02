export const x = '';

const input = await Deno.readTextFile('./input.txt');
const score = {
	player: 0,
	computer: 0,
};

enum RPSEnum {
	ROCK = 1,
	PAPER = 2,
	SCISSORS = 3,
}

const getEnum = (value: string): RPSEnum => {
	switch (value) {
		case 'A':
		case 'X':
			return RPSEnum.ROCK;
		case 'B':
		case 'Y':
			return RPSEnum.PAPER;
		case 'C':
		case 'Z':
			return RPSEnum.SCISSORS;
		default:
			throw new Error('Invalid input');
	}
};

const getWinner = (player: RPSEnum, computer: RPSEnum) => {
	if (player === computer) {
		return 'draw';
	}
	if (player === RPSEnum.ROCK) {
		if (computer === RPSEnum.PAPER) {
			return 'computer';
		}
		return 'player';
	}
	if (player === RPSEnum.PAPER) {
		if (computer === RPSEnum.SCISSORS) {
			return 'computer';
		}
		return 'player';
	}
	if (player === RPSEnum.SCISSORS) {
		if (computer === RPSEnum.ROCK) {
			return 'computer';
		}
		return 'player';
	}
};

const split = input.split('\n');

for (const line of split) {
	const [computerChoice, playerChoice] = line.split(' ');
	const computer = getEnum(computerChoice);
	const player = getEnum(playerChoice);
	const winner = getWinner(player, computer);
	if (winner === 'player') {
		score.player += 6;
	}
	if (winner === 'computer') {
		score.computer += 6;
	}

	if (winner === 'draw') {
		score.player += 3;
		score.computer += 3;
	}

	score.player += player;
	score.computer += computer;
}

console.log(score);
