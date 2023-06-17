const Page = require('./page');

class EditorActiveRulePage extends Page {
    get editorActiveRuleContainer() {
        return $('#editor-active-rules-container');
    }

    async loadEditorActiveRule() {
        try {
            await this.editorActiveRuleContainer.waitForDisplayed({timeout: 2000});
        } catch (e) {
            throw new Error('Не удалось загрузить редакторы активных правил');
        }
    }

    async getEditorActiveRule(element) {
        await element.doubleClick();
    }

    open() {
        return super.open('');
    }
}

module.exports = new EditorActiveRulePage();
