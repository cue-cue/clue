import config from "./config.mjs";
import {globSync} from 'glob'
import fs from 'fs'
import sass from 'sass'

const path = `./${config.buildDir}/packages/styles/**/*.{sass,scss}`

const run = () => {
    const paths = globSync(path)
    paths.forEach(path => {
        console.log(`start ${path}`)

        const styles = sass.compile(path, {
            style: 'compressed',
        })

        fs.writeFileSync(path, styles.css)

        const newPath = path.replace(/\.[^.]+$/, '.css')
        fs.rename(path, newPath, (err) => {
            if (err) throw err
            console.log(`rename ${path} => ${newPath}`)
        })
    })
}

run()