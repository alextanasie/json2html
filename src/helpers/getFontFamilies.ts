// Getting all font families used accross the JSON object
// TODO also get the "fontType" so we know where we can find the font (google etc)

const getFontFamilies = (obj: any, allFonts: string[] = []) => {
    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            getFontFamilies(obj[key], allFonts);
        } else if (key === 'fontFamily' && !allFonts.includes(obj[key])) {
            allFonts.push(obj[key] as string);
        }
    }

    return allFonts.join('|');
}

export const generateFontFamilyFetchLink = (jsonDefinition: string, baseUrl: string) => {
    const families = getFontFamilies(JSON.parse(jsonDefinition));

    if (!families) return null;

    return `${baseUrl}${families}`;
}