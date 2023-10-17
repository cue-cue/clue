import { readFileSync, writeFileSync } from 'fs'

const init = () => {
    console.log("START packageTemplates")

    const pnpmWorkspaceData = readFileSync('./.packageTemplates/pnpm-workspace.yaml', 'utf8')
    const packageJsonData = readFileSync('./.packageTemplates/package.json', 'utf8')

    writeFileSync('./dist/pnpm-workspace.yaml', pnpmWorkspaceData)
    writeFileSync('./dist/package.json', packageJsonData)
}

init()