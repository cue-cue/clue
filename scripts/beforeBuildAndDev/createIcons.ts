/* eslint-disable @typescript-eslint/ban-ts-comment */
//ts-ignore
import { camelize } from '../../src/lib/packages/utils/src/index.js'
import { appendFileSync, readFileSync, writeFileSync } from "fs"
import { globSync } from "glob"
import {clearDirectory} from '../clearDirectory.mjs'
import packageJson from "../../src/lib/packages/icons/package.json" assert {type: 'json'}
import { ViteWatcher } from '../viteWatcher.js'

const paths = {
    icons: `src/lib/packages/icons/src/assets/**/*.svg`,
    packageJson: 'src/lib/packages/icons/package.json',
    importsFile: (group:string) => `src/lib/packages/icons/src/icons/${group}.ts`,
    importsFileDirectory: `src/lib/packages/icons/src/icons`
}

class Icon {
    path
    group
    name
    camelizedName
    constructor(path:string) {
        this.path = path
        this.name = this.getNameByPath(path)
        this.camelizedName = camelize(this.name)
        this.group = this.getGroupByPath(path)
    }

    getGroupByPath(path = '') {
        return /(?<=assets\/)([\s\S]+?)(?=\/)/.exec(path)?.[0] || ''
    }

    getNameByPath(path = '') {
        return /\/([^/]+)\./.exec(path)?.[1] || ''
    }
}

const getAllIcons = () => {
    const allIcons = globSync(paths.icons)
    return allIcons.reduce<Record<string, Icon[]>>((val, path) => {
        const icon = new Icon(path)
        if (val[icon.group]) {
            val[icon.group].push(icon)
        } else {
            val[icon.group] = [icon]
        }
        return val
    }, {})
}

const createImports = (icons:ReturnType<typeof getAllIcons>) => {
    clearDirectory(paths.importsFileDirectory)
    const templates = {
        start: `import type { IIcon } from '../types/index.js'\n`,
        icon: ({name, group, camelizedName}:Icon) => `import * as _${camelizedName} from '../assets/${group}/${name}.svg'\nexport const ${camelizedName} = _${camelizedName} as IIcon\n`,
    }
    Object.entries(icons).forEach(([group, icons]) => {
        console.log(`Start create the ${group} group`)
        if (icons.length) {
            const typeFilePath = paths.importsFile(group)
            writeFileSync(typeFilePath, templates.start)
            icons.forEach((icon) => {
                console.log(`Create the ${icon.camelizedName} icon ${icon.group}`)
                appendFileSync(typeFilePath, templates.icon(icon))
            })
        }
        console.log(`End create the ${group} group`)
    })
}

const replaceColor = (icons:ReturnType<typeof getAllIcons>) => {
    console.log(`Start replace color`)
    Object.values(icons).flat().forEach(icon => {
        console.log(`Start replace ${icon.name} ${icon.path}`)
        const svg = readFileSync(icon.path, {
            encoding: 'utf8'
        })
        writeFileSync(icon.path, svg.replaceAll(/(?<=<path\b[^<>]*)\s*\bfill=(["']).*?\1/g, ` fill="currentColor"`))
        console.log(`End replace ${icon.name} ${icon.path}`)
    })
    console.log(`End replace color`)
}

const addExportsInPackageJson = (icons:ReturnType<typeof getAllIcons>) => {
    const packageJsonPath = `src/lib/packages/icons/package.json`
    
    const exports = {
        '.': packageJson.exports['.'],
        './plugin': packageJson.exports['./plugin'],
    } as typeof packageJson.exports

    Object.keys(icons).forEach((group) => {
        //@ts-ignore
        exports[`./${group}`] = `./src/icons/${group}.js`
    })

    packageJson.exports = exports

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

const init = () => {
    const icons = getAllIcons()
    replaceColor(icons)
    createImports(icons)
    addExportsInPackageJson(icons)
}

export class CreateIconsViteWatcher extends ViteWatcher {
    constructor() {
        super(globSync([
            'src/lib/packages/icons/src/assets/**/*.svg',
            'src/lib/packages/icons/src/icons/**/*.ts'
        ]), () => {
            console.log('test')
            init()
        })
    }
}

init()