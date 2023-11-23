import config from '../config.mjs'
import postcssConfig from '../../postcss.config.js'
import { globSync } from 'glob'
import fs from 'fs'
import * as sass from 'sass'
import postcss from 'postcss'

const path = `./${config.buildDir}/packages/styles/**/index.{sass,scss}`

const run = async () => {
	const paths = globSync(path)
	paths
		.map((path) => {
			console.log(`start ${path}`)

			const styles = sass.compile(path, {
				style: 'compressed'
			})

			let css = styles.css

			fs.writeFileSync(path, css)

			return {
				path,
				css
			}
		})
		.forEach(({ path, css }) => {
			const newPath = path.replace(/\.[^.]+$/, '.css')
			fs.rename(path, newPath, (err) => {
				if (err) throw err
				postcss(postcssConfig.plugins)
					.process(css)
					.then((res) => {
						fs.writeFileSync(newPath, res.css)
					})
				console.log(`rename ${path} => ${newPath}`)
			})
		})
}

run()
