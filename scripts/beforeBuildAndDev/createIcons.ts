/* eslint-disable @typescript-eslint/ban-ts-comment */
//ts-ignore
import { camelize } from '../../src/lib/packages/utils/src/index.js'
import { SvgSpriteIcon } from '../../src/lib/packages/icons/src/plugin/svgSpritePlugin.js'
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
    mainType: `src/lib/packages/icons/src/types/index.ts`,
    moduleType: `src/lib/packages/icons/src/types/module.d.ts`,
    iconsList: `src/routes/icons/iconsList.ts`,
}

class Icon extends SvgSpriteIcon {
    camelizedName
    constructor(path:string) {
        super(path)
        this.camelizedName = camelize(this.name)
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
        start: `/* eslint-disable @typescript-eslint/ban-ts-comment */\nimport type { ClueSvgIconData } from '../index.js'\n`,
        icon: ({fileName, group, camelizedName}:Icon) => `//@ts-ignore\nimport * as _${camelizedName} from '../assets/${group}/${fileName}.svg'\nexport const ${camelizedName} = _${camelizedName} as ClueSvgIconData\n`,
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
        writeFileSync(icon.path, svg.replace(/(?<=<path\b[^<>]*)\s*\bfill=(["']).*?\1/g, ` fill="currentColor"`))
    })
}


const replaceFileNames = (icons:IconGroups) => {
    Object.values(icons).flat().forEach(icon => {
        const oldPath = icon.path
        console.log(icon, {group: icon.group, name: icon.name})
        const newPath = oldPath.replace(icon.fileName, `${icon.group}${icon.name}`)
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
        exports[`./${group}/*`] = {
            import: `./src/assets/${group}/*`,
            types: "./svg/types/module.d.ts"
        }
    })

    packageJson.exports = exports

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

const genTypes = {
    replaceTemplates(icons:IconGroups,file:string, inner = false) {
        const tab = inner ? '\t' : ''

        const groupsType = this.genGroups(icons).type
        const namesType = this.genNames(icons).type

        let newFile = file.replace(
            /(?<=\/\/IconGroups-template)([\s\S]+?)(?=\/\/IconGroups-template)/gi,
            `\n${tab}${groupsType.replace('\n', `\n${tab}`).replace('}', `${tab}}`)}\n${tab}`
        )
        if (namesType) {
            newFile = newFile.replace(/(?<=\/\/IconNames-template)([\s\S]+?)(?=\/\/IconNames-template)/gi, `\n${tab}${namesType}\n${tab}`)
        }

        return newFile
    },
    all(icons:IconGroups) {
        let mainTypeFile = readFileSync(paths.mainType, 'utf8')
        let moduleTypeFile = readFileSync(paths.moduleType, 'utf-8')

        mainTypeFile = this.replaceTemplates(icons, mainTypeFile, false)
        moduleTypeFile = this.replaceTemplates(icons, moduleTypeFile, true)

        writeFileSync(paths.mainType, mainTypeFile)
        writeFileSync(paths.moduleType, moduleTypeFile)
    },
    genGroups(icons:IconGroups) {
        const res:Record<string, string> = {}

        Object.entries(icons).forEach(([group, icons]) => {
            res[group] = icons.map(icon => `'${icon.name}'`).join(' | ')
        })
        return {
            groups: res,
            type: `type IconGroups = ${JSON.stringify(res, null, 2).replace(new RegExp('"', 'gi'), '')}`
        }
    },
    genNames(icons:IconGroups) {
        let res:string[] = []
        Object.entries(icons).forEach(([group, icons]) => {
            res = [...res, ...(icons.map(icon => `${'`'}${'${T}'}${group}-${icon.name}${'`'}`))]
        })
        return {
            names: res,
            type: `type IconNames<T extends string = 'clue-'> = ${res.join(' | ')}`
        }
    }
}

const createGetAllIconsInRoutes = (icons:IconGroups) => {
    const templates = {
        iconImport: ({name, group}:Icon) => `export * as ${camelize(`${group} ${name}`)} from '@clue/icons/${group}/${name}.svg'\n`
    }
    
    let res = ''

    Object.values(icons).flat().forEach(icon => {
        res += templates.iconImport(icon)
    })

    writeFileSync(paths.iconsList, res)
}

const init = () => {
    const icons = getAllIcons()
    console.log(`Start createIcons (length:${Object.entries(icons).map(([group, icons]) => `${group}: ${icons.length}`).join(' | ')})`)
    // replaceFileNames(icons)
    // icons = getAllIcons()
    replaceColor(icons)
    // createImports(icons)
    genTypes.all(icons)
    createGetAllIconsInRoutes(icons)
    // genTypes.names(icons)
    addExportsInPackageJson(icons)
}

export class CreateIconsViteWatcher extends ViteWatcher {
    constructor() {
        super(globSync([
            'src/lib/packages/icons/src/assets/**/*.svg'
        ]), () => {
            init()
        })
    }
}

init()