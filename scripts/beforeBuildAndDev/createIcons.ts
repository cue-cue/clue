/* eslint-disable @typescript-eslint/ban-ts-comment */
//ts-ignore
import { camelize } from '../../src/lib/packages/utils/src/index.js'
import { readFileSync, renameSync, writeFileSync } from "fs"
import { globSync } from "glob"
import {clearDirectory} from '../clearDirectory.mjs'
import packageJson from "../../src/lib/packages/icons/package.json" assert {type: 'json'}
import { ViteWatcher } from '../viteWatcher.js'

const paths = {
    icons: `src/lib/packages/icons/src/assets/**/*.svg`,
    packageJson: 'src/lib/packages/icons/package.json',
    importsFile: (group:string) => `src/lib/packages/icons/src/icons/${group}.ts`,
    importsFileDirectory: `src/lib/packages/icons/src/icons`,
    groupsType: `src/lib/packages/icons/src/types/groups.ts`,
    namesType: `src/lib/packages/icons/src/types/names.ts`
}

class Icon {
    path
    camelizedName
    constructor(path:string) {
        this.path = path
        this.camelizedName = camelize(this.name)
    }

    get group() {
        return /(?<=assets\/)([\s\S]+?)(?=\/)/.exec(this.path)?.[0] || ''
    }

    get name() {
        let name = this.fullName

        if (name.startsWith(`${this.group}-`)) {
            name = name.replaceAll(`${this.group}-`, '')
        }

        return name
    }

    get fullName() {
        return /\/([^/]+)\./.exec(this.path)?.[1] || ''
    }
}

type IconGroups = Record<string, Icon[]>

const getAllIcons = () => {
    const allIcons = globSync(paths.icons)
    return allIcons.reduce<IconGroups>((val, path) => {
        const icon = new Icon(path)
        if (val[icon.group]) {
            val[icon.group].push(icon)
        } else {
            val[icon.group] = [icon]
        }
        return val
    }, {})
}

const createImports = (icons:IconGroups) => {
    console.log(`Start create imports`)
    clearDirectory(paths.importsFileDirectory)

    const res:Record<string, string> = {}

    const templates = {
        start: `/* eslint-disable @typescript-eslint/ban-ts-comment */\nimport type { SvgIconData } from './index.js'\n`,
        icon: ({fullName, group, camelizedName}:Icon) => `//@ts-ignore\nimport * as _${camelizedName} from '../assets/${group}/${fullName}.svg'\nexport const ${camelizedName} = _${camelizedName} as SvgIconData\n`,
    }

    Object.entries(icons).forEach(([group, icons]) => {
        if (icons.length) {
            const typeFilePath = paths.importsFile(group)
            res[typeFilePath] = `${res[typeFilePath] || ''}${templates.start}`

            icons.forEach((icon) => {
                res[typeFilePath] = `${res[typeFilePath] || ''}${templates.icon(icon)}`
            })
        }
    })

    Object.entries(res).forEach(([path, data]) => {
        writeFileSync(path, data)
    })
}

const replaceColor = (icons:IconGroups) => {
    console.log(`Start replace color`)
    Object.values(icons).flat().forEach(icon => {
        const svg = readFileSync(icon.path, {
            encoding: 'utf8'
        })
        writeFileSync(icon.path, svg.replaceAll(/(?<=<path\b[^<>]*)\s*\bfill=(["']).*?\1/g, ` fill="currentColor"`))
    })
}


const replaceFileNames = (icons:IconGroups) => {
    Object.values(icons).flat().forEach(icon => {
        const oldPath = icon.path
        console.log(icon, {group: icon.group, name: icon.name})
        const newPath = oldPath.replace(icon.fullName, `${icon.group}-${icon.name}`)
        renameSync(oldPath, newPath)
    })
}

const addExportsInPackageJson = (icons:IconGroups) => {
    console.log(`Start add a exports in the package.json`)
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

const genTypes = {
    async groups(icons:IconGroups) {
        const res:Record<string, string> = {}

        Object.entries(icons).forEach(([group, icons]) => {
            res[group] = icons.map(icon => `'${icon.name}'`).join(' | ')
        })

        writeFileSync(paths.groupsType, `export type IconGroups = ${JSON.stringify(res, null, 2).replaceAll('"', '')}`)
    },
    async names(icons:IconGroups) {
        let res:string[] = []
        Object.entries(icons).forEach(([group, icons]) => {
            res = [...res, ...(icons.map(icon => `'${group}:${icon.name}'`))]
        })
        writeFileSync(paths.namesType, `export type IconNames = ${res.join(' | ')}`)
    }
}

const init = () => {
    const icons = getAllIcons()
    console.log(`Start createIcons (length:${Object.entries(icons).map(([group, icons]) => `${group}: ${icons.length}`).join(' | ')})`)
    replaceFileNames(icons)
    replaceColor(icons)
    createImports(icons)
    genTypes.groups(icons)
    genTypes.names(icons)
    addExportsInPackageJson(icons)
}

export class CreateIconsViteWatcher extends ViteWatcher {
    constructor() {
        super(globSync([
            'src/lib/packages/icons/src/assets/**/*.svg',
            'src/lib/packages/icons/src/icons/**/*.ts'
        ]), () => {
            console.log('test')
            // init()
        })
    }
}

init()