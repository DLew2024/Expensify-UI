import fs from 'node:fs';

const sourceFile = './src/api/GeneratedOpenApi.ts';
const outputFile = './src/api/GeneratedDTOs.ts';

const content = fs.readFileSync(sourceFile, 'utf8');

const schemasMatch = content.match(/schemas:\s*\{([\s\S]*?)^\s{4}\};/m);

if (!schemasMatch) {
	throw new Error('Could not find schemas in GeneratedOpenApi.ts');
}

const schemasContent = schemasMatch[1];

const schemaRegex = /^\s{8}(["\w\s]+):\s*(\{[\s\S]*?^\s{8}\}|[^;\n]+);/gm;

const schemas = new Map();

for (const match of schemasContent.matchAll(schemaRegex)) {
	const name = match[1].replaceAll('"', '').trim();
	const definition = match[2].trim();

	schemas.set(name, definition);
}

const dtoNames = [...schemas.keys()].filter((name) => name.endsWith('DTO'));

const dependencyNames = new Set();

function cleanDefinition(definition) {
	let cleaned = definition;

	cleaned = cleaned.replace(/components\["schemas"\]\["([^"]+)"\]/g, (_, schemaName) => {
		dependencyNames.add(schemaName);
		return schemaName;
	});

	// UUID -> Guid
	cleaned = cleaned.replace(
		/(\/\*\*\s*Format:\s*uuid\s*\*\/\s*[\w$]+\??:\s*)(null\s*\|\s*)?string/g,
		(_, prefix, nullable) => `${prefix}${nullable ?? ''}Guid`,
	);

	// Numeric OpenAPI types -> number
	cleaned = cleaned.replace(/number\s*\|\s*string/g, 'number');

	return cleaned;
}

const dtoExports = dtoNames.map((name) => {
	const definition = schemas.get(name);

	if (!definition) {
		throw new Error(`Missing schema definition for ${name}`);
	}

	return `export type ${name} = ${cleanDefinition(definition)};`;
});

// Only include non-DTO dependencies that DTOs actually reference.
const dependencyExports = [...dependencyNames]
	.filter((name) => !name.endsWith('DTO'))
	.map((name) => {
		const definition = schemas.get(name);

		if (!definition) {
			throw new Error(`Missing dependency schema definition for ${name}`);
		}

		return `export type ${name} = ${cleanDefinition(definition)};`;
	});

const output = `/* AUTO-GENERATED - DO NOT EDIT */

import type { Guid } from '../utils/DataTypes/Guid';

${dependencyExports.join('\n\n')}

${dtoExports.join('\n\n')}
`;

fs.writeFileSync(outputFile, output);

console.log(`Generated ${dtoExports.length} DTOs and ${dependencyExports.length} dependencies.`);

// Remove temporary OpenAPI file.
fs.unlinkSync(sourceFile);
