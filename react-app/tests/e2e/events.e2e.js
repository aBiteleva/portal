const SystemsPage = require('../pages/systems.page');
const LoginPage = require('../pages/login.page');
const EventsPage = require('../pages/events.page');

describe('Events page test', () => {
    it('load events', async () => {
        await LoginPage.open();
        await LoginPage.login('admin@admin.com', 'admin');

        await SystemsPage.loadSystems();
    });

    it('get subsystems', async () => {
        await SystemsPage.loadSystems();
        await SystemsPage.getSubsystem($('#system-element-00003'));

    });

    it('get events', async () => {
        await EventsPage.getEvent($('#system-element-00016'));
        await EventsPage.loadEvents();
    });

    it('add event', async () => {
        await EventsPage.addEvent('Новое событие', $('#react-select-2-option-1'), $('#react-select-3-option-0'));
    });

    it('delete event', async () => {
        await EventsPage.deleteEvent('Новое событие');

    });
});

