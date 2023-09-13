import config from "./config.mjs";
import {globSync} from 'glob'
import fs from 'fs'
import * as sass from 'sass'

const path = `./${config.buildDir}/packages/styles/**/index.{sass,scss}`

const run = () => {
    const paths = globSync(path)
    paths.map(path => {
        console.log(`start ${path}`)

        const styles = sass.compile(path, {
            style: 'compressed',
        })
        
        fs.writeFileSync(path, styles.css)
        
        return {
            path,
            styles
        }
    }).forEach(({path}) => {
        const newPath = path.replace(/\.[^.]+$/, '.css')
        fs.rename(path, newPath, (err) => {
            if (err) throw err
            console.log(`rename ${path} => ${newPath}`)
        })
    })
}

run()