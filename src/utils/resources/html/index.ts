import { Templates } from '@/app/libs/load-templates'
import { html, raw } from 'hono/html'
class DisplayContent {

  renderHtml(content: string, context: Record<string, string>) {
    const name = 'John &quot;Johnny&quot; Smith'
    return html`<p>I'm ${raw(name)}.</p>`
  }
}
const htmlContentInstance = new DisplayContent()

export const renderHtml = (content: string, context: Record<string, string>) => htmlContentInstance.renderHtml(content, context)
export const renderTemplate = (name: string, context: Record<string, string>) => Templates.LoadTemplates(name, context)