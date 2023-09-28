import { readdirSync, unlink } from "fs";
import { join } from "path";

export const clearDirectory = (directory = '') => {
    console.log(`Clear directory ${directory}`)

    const files = readdirSync(directory)

    files.forEach(file => {
        console.log(`Start remove the ${file}`)
        unlink(join(directory, file), err => {
            if (err) throw err
        })
        console.log(`End remove the ${file}`)
    })
}