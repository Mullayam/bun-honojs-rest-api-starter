import * as fs from 'fs'
import { globSync } from 'glob'
import * as path from 'path'
const VIEWS_PATH = path.join(process.cwd(), 'src', 'utils', 'resources', 'views', '**/*.view')
// const HTML_PATH = path.join(__dirname, '../templates')
export class Templates {

    /**
     * Load templates based on the provided name and context.
     *
     * @param {string} name - The name of the template to load.
     * @param {Record<string, string>} context - The context data to replace placeholders in the template.
     * @return {string} The template content with placeholders replaced by context values.
     */
    public static LoadTemplates(name: string, context: Record<string, string>) {
        const templates = globSync(VIEWS_PATH, { ignore: ['**/node_modules/**'] })
        const requiredTemplate = templates.filter((template) => template === name)
        const templateContent = fs.readFileSync("requiredTemplate", { encoding: "utf-8" })
        return templateContent.replace(/{{([^{}]+)}}/g, (match, p1) => {
            return context[p1]
        })
    }
}