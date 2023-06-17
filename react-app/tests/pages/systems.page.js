const Page = require('./page');

class SystemsPage extends Page {
    get systemsContainer () {
        return $('#systems-container');
    }

    get systemElement() {
        return $('#system-element-00003');
    }

    async loadSystems () {
        try {
            await this.systemsContainer.waitForDisplayed({timeout: 2000});
        } catch (e) {
            throw new Error('Не удалось загрузить системы');
        }
    }

    async getSubsystem (element) {
        await element.doubleClick();
        await this.systemsContainer.waitForDisplayed({timeout: 2000});
    }

    open () {
        return super.open('');
    }
}

module.exports = new SystemsPage();
