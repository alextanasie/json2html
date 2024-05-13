import { getStylesForParentComponent, generateInlineStylesForButton, generateInlineStylesForImage } from '../src/helpers/html.helpers';
import { JsonImageProperties } from '../src/types/jsonDesign.types';

describe('getStylesForParentComponent', () => {
    it('should generate styles when all properties are present', () => {
        const data: any = {
            properties: {
                width: 100,
                height: 200,
                backgroundColor: {
                    scolor: '#ffffff',
                    borderColor: '#000000'
                }
            }
        };
        const styles = getStylesForParentComponent(data);
        expect(styles).toBe(`width: 100px; height: 200px; background: #ffffff; border: 1px solid #000000; position: relative;`);
    });

    // TODO this should happen if properties are empty. currently we don't treat this case.

    // it('should generate default styles when properties are empty', () => {
    //     const data: any = {
    //         properties: {}
    //     };
    //     const styles = getStylesForParentComponent(data);
    //     expect(styles).toBe(undefined);
    // });
});


describe('generateInlineStylesForButton', () => {
    it('should generate styles when all properties are present', () => {
        const data: any = {
            x: 10,
            y: 20,
            width: 100,
            height: 200,
            backgroundColor: {
                scolor: '#ffffff',
                useBorder: true,
                borderColor: '#000000'
            },
            labelStyle: {
                color: '#000000',
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: 'Arial'
            },
            buttonLabel: 'Test Button'
        };
        const styles = generateInlineStylesForButton(data);
        expect(styles).toBe(`position: absolute; top: 20px; left: 10px; width: 100px; height: 200px; background: #ffffff; border: 1px solid #000000; font: bold 14px 'Arial'; color: #000000; cursor: pointer;`);
    });

    it('should generate styles without border when useBorder is false', () => {
        // note here I would expect JsonButtonProperties to work fine, but stuck with any
        const data: any = {
            x: 10,
            y: 20,
            width: 100,
            height: 200,
            backgroundColor: {
                scolor: '#ffffff',
                useBorder: false,
                borderColor: '#000000'
            },
            labelStyle: {
                color: '#000000',
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: 'Arial'
            },
            buttonLabel: 'Test Button'
        };
        const styles = generateInlineStylesForButton(data);
        expect(styles).toBe(`position: absolute; top: 20px; left: 10px; width: 100px; height: 200px; background: #ffffff; border: none; font: bold 14px 'Arial'; color: #000000; cursor: pointer;`);
    });
});

describe('generateInlineStylesForImage', () => {
    it('should generate styles when all properties are present', () => {
        // note here I would expect JsonImageProperties to work fine, but stuck with any
        const props: any = {
            x: 10,
            y: 20,
            width: 100,
            height: 200,
            contentOffsetX: 50,
            contentOffsetY: 50,
            rotation: 22
        };
        const styles = generateInlineStylesForImage(props);
        expect(styles).toBe(`background-image: url(); background-position: 50% 50%; background-size: cover; width: 100px; height: 200px; transform: rotate(22deg); position: absolute; top: 20px; left: 10px;`);
    });

    it('should generate styles when some properties are missing', () => {
        const props: Partial<JsonImageProperties> = {
            x: 10,
            y: 20,
            width: 100,
            contentOffsetX: 50,
            // height is missing
            // contentOffsetY is missing
        };
        const styles = generateInlineStylesForImage(props as JsonImageProperties);
        expect(styles).toBe(`background-image: url(); background-position: 50% undefined%; background-size: cover; width: 100px; height: 0px; transform: rotate(0); position: absolute; top: 20px; left: 10px;`);
    });
});
