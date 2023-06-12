const LoginPage = require('../pages/login.page');

describe('Login page test', () => {
    it('auth testing', async () => {
        await LoginPage.open();

        await LoginPage.login('admin@admin.com', 'admin');
        expect(LoginPage.btnLogin).not.toBeExisting();
    });
});
