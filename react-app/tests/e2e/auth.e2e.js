const AuthPage = require('../pages/auth.page');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await AuthPage.open();

        await AuthPage.login('admin@admin.com', 'admin!');
        expect(AuthPage.btnLogin).not.toBeExisting();
    });
});
