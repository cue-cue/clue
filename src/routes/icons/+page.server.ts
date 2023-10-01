import { globSync } from "glob"

export const load = () => {
    return {
        allIconsPath: globSync('src/lib/packages/icons/src/assets/**/*.svg').map(path => path.replace('src', '../..'))
    }
}