export const x = '';

// sol: 2658

const input = await Deno.readTextFile('./input.txt');

const lines = input.split('\n');

const TAIL_LENGTH = 9;

type Point = {
    x: number;
    y: number;
};

const Head: Point = {
    x: 0,
    y: 0,
};


const tailList: Point[] = Array.from({ length: TAIL_LENGTH }).map(() => ({ x: 0, y: 0 }));

console.log(tailList)

const Tail = tailList[TAIL_LENGTH - 1];



const tailHistory: Set<string> = new Set(['0,0']);

const executeCommand = (command: string, Head: Point, Tail: Point) => {
    const [direction, amount] = command.split(' ');
    for (let i = 0; i < parseInt(amount); i++) {
        switch (direction) {
            case 'U':
                Head.y += 1;
                break;
            case 'D':
                Head.y -= 1;
                break;
            case 'L':
                Head.x -= 1;
                break;
            case 'R':
                Head.x += 1;
                break;
            default:
                throw new Error(`Unknown direction: ${direction}`);
        }
        handleTail(Head, tailList[0], false);
        for (let i = 0; i < tailList.length - 1; i++) {
            handleTail(tailList[i], tailList[i + 1], false);
        }
        console.log('loop over');
        handleTail(tailList[tailList.length - 2], Tail, true);

    }
};

const checkIfAdjacent = (Head: Point, Tail: Point) => {
    const isDiagonalAdjacent = Math.abs(Head.x - Tail.x) === 1 && Math.abs(Head.y - Tail.y) === 1;
    if (isDiagonalAdjacent) return true;

    const areNextToEachOther = Math.abs(Head.x - Tail.x) <= 1 && Math.abs(Head.y - Tail.y) <= 1;
    return areNextToEachOther;
}

const handleTail = (Head: Point, Tail: Point, isLast: boolean) => {
    if (checkIfAdjacent(Head, Tail)) return;
    const moveRight = Head.x > Tail.x;
    const moveLeft = Head.x < Tail.x;
    const moveUp = Head.y > Tail.y;
    const moveDown = Head.y < Tail.y;

    if (moveRight) {
        Tail.x += 1;
    }
    if (moveLeft) {
        Tail.x -= 1;
    }
    if (moveUp) {
        Tail.y += 1;
    }
    if (moveDown) {
        Tail.y -= 1;
    }

    if (isLast) {
        console.log('is last');
        tailHistory.add(`${Tail.x},${Tail.y}`);
    }
};

for (const line of lines) {
    executeCommand(line, Head, Tail);
}

console.log({
    commands: lines.length,
    tailHistory: tailHistory.size,
});

