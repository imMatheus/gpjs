import path from 'path'
import chalk from 'chalk'
import fs from 'fs'

function main() {
    const MAX_LEVEL = 1
    let level = 0
    const goBacks = []

    try {
        while (level < MAX_LEVEL) {
            const jsonFilePath = path.join(
                process.cwd(),
                ...goBacks,
                './package.json'
            )
            if (fs.existsSync(jsonFilePath)) {
                const { scripts } = JSON.parse(fs.readFileSync(jsonFilePath))
                const keys = Object.keys(scripts)

                keys.forEach((key) => {
                    console.log(key + ':', chalk.green(scripts[key]))
                })
                break
            } else {
                goBacks.push('../')
                level++
            }
        }
    } catch (error) {
        console.log(chalk.red('Could not find package.json file'))
    }
}

main()
