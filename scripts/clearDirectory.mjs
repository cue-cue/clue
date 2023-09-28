import { readdir, unlink } from "fs";
import { join } from "path";

export const clearDirectory = (directory = '') => {
    console.log(`Clear directory ${directory}`)
    readdir(directory, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          unlink(join(directory, file), err => {
            if (err) throw err;
          });
        }
    })
}