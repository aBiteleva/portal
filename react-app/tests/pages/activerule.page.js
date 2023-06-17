const Page = require('./page');

class ActiveRulePage extends Page {
    get activeRuleContainer() {
        return $('#active-rules-container');
    }

    get activeRuleLink() {
        return $('#active-rule-link');
    }

    async loadActiveRules() {
        try {
            await this.activeRuleContainer.waitForDisplayed({timeout: 2000});
        } catch (e) {
            throw new Error('Не удалось загрузить активные правила');
        }
    }

    async getActiveRules(element) {
        await element.click();
        await this.activeRuleLink.click();
    }

    async addEvent(name, context, component) {

    }

    open() {
        return super.open('');
    }
}

module.exports = new ActiveRulePage();
