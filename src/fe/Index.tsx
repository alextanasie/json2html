import React from "react";
import { getJsx } from "../helpers/html.helpers";
import { generateFontFamilyFetchLink } from "../helpers/getFontFamilies";

// note: this is a minimal setup, clearly we should take html/head/body out into a parent component etc
export function Index({ jsonDefinition }: { jsonDefinition: string }) {
    const generatedJsx = getJsx(jsonDefinition);
    const fontRepo = process.env.FONT_REPO;

    // fontRepo can't be null, if we ensure on build time that env is set correctly
    const fontsUrl = generateFontFamilyFetchLink(jsonDefinition, fontRepo!);

    return (
        <html>
            <head>
                {
                    fontsUrl && <link rel="stylesheet" type="text/css" href={fontsUrl} />
                }
            </head>
            <body style={resetStyles}>
                <div className="banner-container">
                    {generatedJsx}
                </div>
            </body>
        </html>
    )
}

// Reset styles
const resetStyles = {
    margin: 0,
    padding: 0,
    border: 0,
    fontSize: '100%',
    font: 'inherit',
    verticalAlign: 'baseline',
    display: 'block',
    lineHeight: 1,
};