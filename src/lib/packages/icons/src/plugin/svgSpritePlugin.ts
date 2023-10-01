import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

type Options = Parameters<typeof createSvgSpritePlugin>[0]

export const svgSpritePlugin = (options?:Options) => {
    const include:Exclude<typeof options, undefined>['include'] = [
        '**/node_modules/**/@clue/icons/**/assets/**/*.svg',
        ...(options?.include ? [options?.include].flat() : ['**/*.svg'])
    ]
    return {
        ...createSvgSpritePlugin({
            symbolId: 'clue-[name]',
            ...options,
            include,
        }),
        name: 'clue-icons-plugin'
    }
}