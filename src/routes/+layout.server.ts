import { globSync } from 'glob'
import type { ServerLoad } from "@sveltejs/kit"
import { readFileSync } from "fs"

export const ssr = true

export const load:ServerLoad = () => {

    const pathToColorScss = globSync('src/lib/packages/styles/**/generators/color.scss')[0]

    let colorGeneratorScss = ''
    
    if (pathToColorScss) {
        colorGeneratorScss = readFileSync(pathToColorScss, 'utf8')
    }
    return {
        colorGeneratorScss
    }
}