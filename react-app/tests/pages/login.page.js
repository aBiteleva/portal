const Page = require('./page');

class LoginPage extends Page {
    get inputEmail () {
        return $('#email');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnLogin () {
        return $('#login-button');
    }

    async login (email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    open () {
        return super.open('');
    }
}

module.exports = new LoginPage();
