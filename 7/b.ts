export const x = '';
const MAX_FILE_SIZE = 70_000_000;
const SPACE_NEEDED = 30_000_000;

class File {
	path: string;
	name: string;
	fileSize: number;
	parent: Folder;
	constructor(path: string, name: string, fileSize: number, parent: Folder) {
		this.path = path;
		this.name = name;
		this.fileSize = fileSize;
		this.parent = parent;
	}
}

class Folder {
	path: string;
	name: string;
	folderSize: number;
	children: (Folder | File)[];
	parent: Folder | null;
	constructor(path: string, name: string, parent: Folder | null) {
		this.path = path;
		this.name = name;
		this.folderSize = 0;
		this.children = [];
		this.parent = parent;
	}
}

const input = await Deno.readTextFile('./input.txt');

const lines = input.split('\n');

const useCommand = (command: string, currentPath: Folder) => {
	const [cmd, args] = command.split(' ').splice(1);
	switch (cmd) {
		case 'cd':
			if (args === '..') {
				currentPath = currentPath.parent!;
			} else if (args === '/') {
				console.log('entered');
			} else {
				const doesChildExist = currentPath.children.find((child) => {
					return child.name === args;
				});

				if (doesChildExist) {
					currentPath = doesChildExist as Folder;
				} else {
					currentPath.children.push(
						new Folder(
							`${currentPath.path}${args}/`,
							args,
							currentPath
						)
					);
					currentPath = currentPath.children[
						currentPath.children.length - 1
					] as Folder;
				}
			}
			break;
		default:
			// console.log({
			// 	cmd,
			// 	args,
			// });
			break;
	}
	return currentPath;
};

const root = {
	path: '/',
	name: '/',
	folderSize: 0,
	children: [],
	parent: null,
};

let currentPath: Folder = root;

for (const line of lines) {
	if (line.charAt(0) === '$') {
		currentPath = useCommand(line.slice(1), currentPath);
	}
	if (parseInt(line.split(' ')[0])) {
		const fileSize = parseInt(line.split(' ')[0]);
		currentPath.children.push(
			new File(
				`${currentPath.path}${line.split(' ')[1]}`,
				line.split(' ')[1],
				fileSize,
				currentPath
			)
		);
	}
	if (line.split(' ')[0] === 'dir') {
		const newFolder: Folder = new Folder(
			`${currentPath.path}${line.split(' ')[1]}/`,
			line.split(' ')[1],
			currentPath
		);
		currentPath.children.push(newFolder);
	}
}

const calculateFolderSize = (folder: Folder) => {
	for (const child of folder.children) {
		if (child instanceof Folder) {
			calculateFolderSize(child);
			folder.folderSize += child.folderSize;
		} else if (child instanceof File) {
			folder.folderSize += child.fileSize;
		} else {
			console.log('other');
		}
	}
};
calculateFolderSize(root);

const getArrayOfAllFolderSizes = (folder: Folder) => {
	const arr: number[] = [];
	for (const child of folder.children) {
		if (child instanceof Folder) {
			arr.push(child.folderSize);
			arr.push(...getArrayOfAllFolderSizes(child));
		}
	}
	return arr;
};

const MAX_ALLOWED_SPACE = MAX_FILE_SIZE - SPACE_NEEDED;
const numberToMeetSpaceRequirement = Math.abs(
	MAX_ALLOWED_SPACE - root.folderSize
);

const allFolderSizes = getArrayOfAllFolderSizes(root);
const closest = Math.min(
	...allFolderSizes.filter((size) => size > numberToMeetSpaceRequirement)
);

console.log({ closest });
