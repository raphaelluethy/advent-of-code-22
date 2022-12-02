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

enum StrategyEnum {
	LOOSE,
	DRAW,
	WIN,
}

const getEnum = (value: string): RPSEnum | StrategyEnum => {
	switch (value) {
		case 'A':
			return RPSEnum.ROCK;
		case 'B':
			return RPSEnum.PAPER;
		case 'C':
			return RPSEnum.SCISSORS;
		case 'X':
			return StrategyEnum.LOOSE;
		case 'Y':
			return StrategyEnum.DRAW;
		case 'Z':
			return StrategyEnum.WIN;
		default:
			throw new Error('Invalid input');
	}
};

const getChoice = (player: StrategyEnum, computer: RPSEnum) => {
	switch (player) {
		case StrategyEnum.LOOSE:
			if (computer === RPSEnum.ROCK) {
				return RPSEnum.SCISSORS;
			}
			if (computer === RPSEnum.PAPER) {
				return RPSEnum.ROCK;
			}
			if (computer === RPSEnum.SCISSORS) {
				return RPSEnum.PAPER;
			}
		case StrategyEnum.DRAW:
			return computer;
		case StrategyEnum.WIN:
			if (computer === RPSEnum.ROCK) {
				return RPSEnum.PAPER;
			}
			if (computer === RPSEnum.PAPER) {
				return RPSEnum.SCISSORS;
			}
			if (computer === RPSEnum.SCISSORS) {
				return RPSEnum.ROCK;
			}
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
	const player = getChoice(
		getEnum(playerChoice) as StrategyEnum,
		computer as RPSEnum
	);

	const winner = getWinner(player as RPSEnum, computer as RPSEnum);

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
