import type { Plugin, TransformResult } from 'vite'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

type Options = Parameters<typeof createSvgSpritePlugin>[0]

export class SvgSpriteIcon {
    path
    group
    name
    fileName
    constructor(path:string) {
        this.path = path
        this.group = this.#getGroup()
        this.name = this.#getName()
        this.fileName = this.#getFileName()
    }
    #getGroup() {
        return /(?<=assets\/)([\s\S]+?)(?=\/)/.exec(this.path)?.[0] || ''
    }
    #getName() {
        return this.#getFileName()
    }
    #getFileName() {
        return /\/([^/]+)\./.exec(this.path)?.[1] || ''
    }
}

const replaceCode = (code:string, path:string, pluginOptions:Options) => {
    const icon = new SvgSpriteIcon(path)
    let newCode = code

    if (icon.group) {
        newCode += `export const groupName = "${icon.group}"\n`
    }

    if (icon.name) {
        newCode += `export const name = "${icon.name}"\n`
    }

    const symbolId = pluginOptions?.symbolId?.replace('[name]', icon.name) || ''
    const newSymbolId = pluginOptions?.symbolId?.replace('[name]', `${icon.group}-${icon.name}`) || ''

    if (symbolId && newSymbolId) {
        newCode = newCode.replaceAll(symbolId, newSymbolId)
    }

    return newCode
}

export const svgSpritePlugin = (options?:Options):Plugin => {
    const include:Exclude<typeof options, undefined>['include'] = [
        '**/node_modules/**/@cluue/icons/**/assets/**/*.svg',
        ...(options?.include ? [options?.include].flat() : ['**/*.svg'])
    ]

    const resolvedOptions:Options = {
        symbolId: 'clue-[name]',
        ...options,
        include,
    }

    const {transform:defaultTransform, ...defaultPlugin} = createSvgSpritePlugin(resolvedOptions)
    
    const transform:Plugin['transform'] = async (src, filepath) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const defaultTransformRes:TransformResult = await defaultTransform?.(src, filepath)

        if (defaultTransformRes) {
            defaultTransformRes.code = replaceCode(defaultTransformRes.code, filepath, resolvedOptions)
        }

        return defaultTransformRes
    }

    return {
        ...defaultPlugin,
        transform,
        name: 'clue-icons-plugin'
    }
}