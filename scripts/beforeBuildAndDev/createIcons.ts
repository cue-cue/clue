/* eslint-disable @typescript-eslint/ban-ts-comment */
//ts-ignore
import { camelize } from '@clue/utils/src/camelize/index.js'
import { appendFileSync, writeFileSync } from "fs"
import { globSync } from "glob"
import {clearDirectory} from '../clearDirectory.mjs'
import packageJson from "../../src/lib/packages/icons/package.json" assert {type: 'json'}

const paths = {
    icons: `src/lib/packages/icons/src/assets/**/*.svg`,
    packageJson: 'src/lib/packages/icons/package.json',
    importsFile: (group:string) => `src/lib/packages/icons/src/icons/${group}.ts`,
    importsFileDirectory: `src/lib/packages/icons/src/icons`
}

class Icon {
    group
    name
    camelizedName
    constructor(path:string) {
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
    Object.entries<Icon[]>(icons).forEach(([group, icons]) => {
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
    createImports(icons)
    addExportsInPackageJson(icons)
}

init()