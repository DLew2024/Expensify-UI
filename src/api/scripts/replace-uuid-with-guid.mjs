import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const generatedFilePath = resolve(process.cwd(), 'src/api/GeneratedDTOs.ts');

const guidImport = "import type { Guid } from '../utils/DataTypes/Guid';";

try {
	let generatedContent = await readFile(generatedFilePath, 'utf8');

	const uuidPropertyPattern =
		/(\/\*\* Format: uuid \*\/\s*\r?\n\s*[A-Za-z_$][\w$]*\??:\s*)string(\s*[;|])/g;

	generatedContent = generatedContent.replace(uuidPropertyPattern, '$1Guid$2');

	if (!generatedContent.includes(guidImport)) {
		const generatedCommentEnd = ' */';

		const generatedCommentIndex = generatedContent.indexOf(generatedCommentEnd);

		if (generatedCommentIndex >= 0) {
			const insertionIndex = generatedCommentIndex + generatedCommentEnd.length;

			generatedContent =
				`${generatedContent.slice(0, insertionIndex)}\n\n${guidImport}` +
				generatedContent.slice(insertionIndex);
		} else {
			generatedContent = `${guidImport}\n\n${generatedContent}`;
		}
	}

	await writeFile(generatedFilePath, generatedContent, 'utf8');

	console.log('Replaced generated UUID strings with Guid.');
} catch (error) {
	console.error('Failed to replace UUID strings with Guid:', error);
	process.exitCode = 1;
}
