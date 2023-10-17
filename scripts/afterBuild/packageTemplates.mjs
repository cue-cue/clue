import { readFileSync, writeFileSync } from 'fs'
import packageJson from '../../distTemplates/package.json' assert {type: "json"}

const init = () => {
    console.log("START moveDistTemplates")
    const newPackageJson = packageJson
    writeFileSync('./dist/package.json', JSON.stringify(newPackageJson, null, 2))

    const pnpmWorkspaceData = readFileSync('./distTemplates/pnpm-workspace.yaml', 'utf8')

    writeFileSync('./dist/pnpm-workspace.yaml', pnpmWorkspaceData)
}

init()