import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

export const svgSpritePlugin = (options?:Parameters<typeof createSvgSpritePlugin>[0]) => {
    return {
        ...createSvgSpritePlugin(options),
        name: 'sprite-plugin'
    }
}