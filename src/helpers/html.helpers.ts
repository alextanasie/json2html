import { JsonButtonProperties, JsonDesign, JsonImageProperties, JsonTextProperties, JsonTextSlateConfigChildren, JsonTextSlateConfigNode } from '../types/jsonDesign.types';
import parse from 'html-react-parser';

export const getStylesForParentComponent = (data: JsonDesign): string => {
    // TODO mistake? backgroundColor type does not contain properties that are part of the example json
    // for example: scolor only exists on JsonBackgroundSolid, but JsonBackgroundSolid does not contain borderColor and others. neither the extensions of it.
    // having to cast backgroundColor as any

    // TODO add needed safety checks. What if the targeted properties are not there?
    const { width, height } = data.properties;
    const backgroundColor = data.properties.backgroundColor as any;
    const styles = `
        width: ${width}px;
        height: ${height}px;
        background: ${backgroundColor?.scolor || 'inherit'};
        border: ${!backgroundColor?.borderColor ? 'none' : '1px solid ' + backgroundColor.borderColor};
        position: relative;
    `;

    return cleanStyles(styles);
}

const generateParentComponent = (data: JsonDesign): string => {
    const styles = getStylesForParentComponent(data);
    return `<div id="parent" style="${styles}">`;
}

export const generateInlineStylesForButton = (props: JsonButtonProperties): string => {
    const { width, height } = props;
    const background = props.backgroundColor as any;

    const styles = `
        position: absolute;
        top: ${props.y}px;
        left: ${props.x}px;
        width: ${width}px;
        height: ${height}px; 
        background: ${background.scolor};
        border: ${background.useBorder ? '1px solid ' + background.borderColor : "none"};
        font: ${props.labelStyle.fontWeight} ${props.labelStyle.fontSize}px \'${props.labelStyle.fontFamily || 'Arial'}\';
        color: ${props.labelStyle.color};
        cursor: pointer;
    `;
    return cleanStyles(styles);

}

const generateInlineStylesForText = (props: JsonTextProperties): string => {
    const textAlignment = props.alignment === 'center' ? 'center' : 'left';

    return `text-align: ${textAlignment};`
};

export const generateInlineStylesForImage = (props: JsonImageProperties): string => {
    const src = constructImageSrc(props);
    const transform = constructImageTransform(props);
    const size = constructSize(props);

    // TODO strip out of empty properties resulting in ; ; ; 
    const styles = `
        background-image: url(${src});
        background-position: ${props.contentOffsetX}% ${props.contentOffsetY}%;
        background-size: cover;
        ${size}
        ${transform}
        position: absolute;
        top: ${props.y}px;
        left: ${props.x}px;
    `;

    return cleanStyles(styles);
}

const constructImageSrc = (props: JsonImageProperties): string => {
    // TODO have a dynamic base URL
    return !props?.url ? '' : `https://d2gla4g2ia06u2.cloudfront.net/assets/media/${props.url}`;
};

const constructImageTransform = (props: JsonImageProperties): string => {
    return `transform: rotate(${props.rotation ? props.rotation + 'deg' : '0'});`;
    // TODO add the following to the above string. Check properties.
    // scale(${props.scaleX}, ${props.scaleY}) translate(${props.contentOffsetX}px, ${props.contentOffsetY}px
};

const constructSize = (props: JsonImageProperties): string => {
    return `width: ${props.width || 0}px; height: ${props.height || 0}px;`;
    // TODO add the following to the above string. Check properties.
    // scale(${props.scaleX}, ${props.scaleY}) translate(${props.contentOffsetX}px, ${props.contentOffsetY}px
};

const generateTextNode = (node: JsonTextSlateConfigNode): string => {
    if (node.type === 'paragraph') {
        const child = node.children[0] as JsonTextSlateConfigChildren;
        const styles = constructStylesForParagraphChild(child);
        // Maybe something like this would be better, but the types are not corresponding
        // return `<p>${node.children.map((child) => generateTextNode(child)).join('')}</p>`;

        return `<p style="${styles}">${child.text}</p>`;
    }

    return '';
}

const constructStylesForParagraphChild = (child: JsonTextSlateConfigChildren): string => {
    // note: where does font size come from, for text? it has an initialFontSize on parent but that's not corresponding to the actual size
    return `
        font: ${child.fontSettings.fontWeight} ${child.fontSize || '32px'} \'${child.fontSettings.fontFamily || 'Arial'}\';
        color: ${child.color};
        font-family: ${child.fontSettings.fontFamily || 'Arial'};
    `;
};

const cleanStyles = (styles: string): string => {
    return styles.replace(/\s+/g, ' ').trim();
}

// where is useBannerEntireArea in types?
export const createHTML = (data: string): string | React.JSX.Element | React.JSX.Element[] => {
    const jsonData = JSON.parse(data);

    let html = generateParentComponent(jsonData.banner);

    for (const element of jsonData.banner.elements[0].elements) {
        // Check the layerType and generate the corresponding HTML element
        switch (element.layerType) {
            case 'image': {
                const props = element.properties as JsonImageProperties;
                const styles = generateInlineStylesForImage(props);
                html += `<div title="${props.originalName}" style="${styles}"></div>\n`;
                break;
            }
            case 'button':
                const props = element.properties as JsonButtonProperties;
                const styles = generateInlineStylesForButton(props);

                html += `<button style="${styles}">${props.buttonLabel}</button>\n`;
                break;
            case 'text': {
                const props = element.properties as JsonTextProperties;
                const styles = generateInlineStylesForText(props);

                html += `<div style="${styles}">
                    ${props.config.nodes.map((node) => generateTextNode(node))}
                </div>\n`;

                break;
            }
        }
    }

    html += '</div>';

    const generatedJsx = parse(html);

    return generatedJsx;
};
