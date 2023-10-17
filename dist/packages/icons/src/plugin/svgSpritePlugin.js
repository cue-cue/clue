import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
export class SvgSpriteIcon {
    path;
    group;
    name;
    fileName;
    constructor(path) {
        this.path = path;
        this.group = this.#getGroup();
        this.name = this.#getName();
        this.fileName = this.#getFileName();
    }
    #getGroup() {
        return /(?<=assets\/)([\s\S]+?)(?=\/)/.exec(this.path)?.[0] || '';
    }
    #getName() {
        return this.#getFileName();
    }
    #getFileName() {
        return /\/([^/]+)\./.exec(this.path)?.[1] || '';
    }
}
const replaceCode = (code, path, pluginOptions) => {
    const icon = new SvgSpriteIcon(path);
    let newCode = code;
    if (icon.group) {
        newCode += `export const groupName = "${icon.group}"\n`;
    }
    if (icon.name) {
        newCode += `export const name = "${icon.name}"\n`;
    }
    const symbolId = pluginOptions?.symbolId?.replace('[name]', icon.name) || '';
    const newSymbolId = pluginOptions?.symbolId?.replace('[name]', `${icon.group}-${icon.name}`) || '';
    if (symbolId && newSymbolId) {
        newCode = newCode.replaceAll(symbolId, newSymbolId);
    }
    return newCode;
};
export const svgSpritePlugin = (options) => {
    const include = [
        '**/node_modules/**/@clue/icons/**/assets/**/*.svg',
        ...(options?.include ? [options?.include].flat() : ['**/*.svg'])
    ];
    const resolvedOptions = {
        symbolId: 'clue-[name]',
        ...options,
        include,
    };
    const { transform: defaultTransform, ...defaultPlugin } = createSvgSpritePlugin(resolvedOptions);
    const transform = async (src, filepath) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const defaultTransformRes = await defaultTransform?.(src, filepath.replace('.svg?clue', '.svg'));
        if (defaultTransformRes) {
            defaultTransformRes.code = replaceCode(defaultTransformRes.code, filepath, resolvedOptions);
        }
        return defaultTransformRes;
    };
    return {
        ...defaultPlugin,
        transform,
        name: 'clue-icons-plugin'
    };
};
