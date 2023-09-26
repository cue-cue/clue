import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

// type SVGOPlugin = Exclude<Exclude<SvgSpriteOptions['svgo'], undefined | boolean>['plugins'], undefined>[0]

export const spritePlugin = () => {
    return {
        ...createSvgSpritePlugin(),
        name: 'sprite-plugin'
    }
}

// export const svgNameReplacer:SVGOPlugin = {
//     name: 'svg-name-replacer',
//     params: {
        
//     },
//     fn: (...data) => {
//         console.log(data)
//     }
// }

