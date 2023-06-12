const SystemsPage = require('../pages/systems.page');
const LoginPage = require('../pages/login.page');

describe('System page test', () => {
    it('load systems', async () => {
        await LoginPage.open();
        await LoginPage.login('admin@admin.com', 'admin');

        await SystemsPage.loadSystems();
    });

    it('get subsystems', async () => {

        await SystemsPage.loadSystems();
        await SystemsPage.getSubsystem($('#system-element-00003'));

    });
});
