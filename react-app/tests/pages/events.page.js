const Page = require('./page');

class EventsPage extends Page {
    get eventsContainer() {
        return $('#events-container');
    }

    get eventsLink() {
        return $('#events-link');
    }

    get addButton() {
        return $('#add-event');
    }

    get inputName() {
        return $('#events-input-name');
    }

    get selectContext() {
        return $('#events-select-context');
    }

    get selectComponent() {
        return $('#events-select-component');
    }

    get saveEventButton() {
        return $('#save-event-button');
    }

    get selectContextDropdown() {
        return $('#events-select-context_list');
    }

    async loadEvents() {
        try {
            await this.eventsContainer.waitForDisplayed({timeout: 2000});
        } catch (e) {
            throw new Error('Не удалось загрузить события');
        }
    }

    async getEvent(element) {
        await element.click();
        await this.eventsLink.click();
    }

    async addEvent(name, context, component) {
        await this.addButton.click();
        await this.inputName.setValue(name);
        await this.selectContext.click();

        // await this.selectComponent.addValue(component);

        // await this.saveEventButton.click();


        // await $('/html/body/div[4]/div/div/div[1]/div[2]').waitForDisplayed({timeout: 3000});
        // await $('/html/body/div[4]/div/div/div[1]/div[2]').click();

        // await context.waitForDisplayed({timeout: 3000});
        // await context.click();
        //*[@id="events-select-context_list"]

    }


    open() {
        return super.open('');
    }
}

module.exports = new EventsPage();
