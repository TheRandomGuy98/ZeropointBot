
export const cleanse = (str: string) => {
    return str
        .replace(`\`\`\``, `\\\`\\\`\\\``)
        .replace(`\``, `\\\``)
        .replace(`||`, `\\|\\|`)
        .replace(`_`, `\\_`)
        .replace(`***`, `\\*\\*\\*`)
        .replace(`**`, `\\*\\*`)
        .replace(`*`, `\\*`);
};
