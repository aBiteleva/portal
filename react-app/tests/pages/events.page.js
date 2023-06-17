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

    get deleteEventButton() {
        return $('#delete-event-button');
    }

    async loadEvents() {
        try {
            await this.eventsContainer.waitForDisplayed({timeout: 2000});
        } catch (e) {
            throw new Error('Не удалось загрузить события');
        }
    }

    async getEvent(element) {
        await element.waitForDisplayed({timeout: 3000});
        await element.click();
        await this.eventsLink.click();
    }

    async addEvent(name, context, component) {
        await this.addButton.click();
        await this.inputName.setValue(name);

        await this.selectContext.click();
        await context.waitForDisplayed({timeout: 3000});
        await context.click();

        await this.selectComponent.click();
        await component.waitForDisplayed({timeout: 3000});
        await component.click();

        await this.saveEventButton.click();
    }

    async deleteEvent(event) {
        const header = await $(`div=${event}`);
        await $(header).click();
        await this.deleteEventButton.click();
        await browser.pause(10000);
    }

    open() {
        return super.open('');
    }
}

module.exports = new EventsPage();
