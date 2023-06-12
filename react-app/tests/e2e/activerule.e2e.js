const SystemsPage = require('../pages/systems.page');
const LoginPage = require('../pages/login.page');
const ActiveRulesPage = require('../pages/activerule.page');

describe('Active rules page test', () => {
    it('login', async () => {
        await LoginPage.open();
        await LoginPage.login('admin@admin.com', 'admin');

        await SystemsPage.loadSystems();
    });

    it('get subsystems', async () => {
        await SystemsPage.loadSystems();
        await SystemsPage.getSubsystem($('#system-element-00003'));

    });

    it('get active rules', async () => {
        await ActiveRulesPage.getActiveRules($('#system-element-00016'));
        await ActiveRulesPage.loadActiveRules();
    });
});
