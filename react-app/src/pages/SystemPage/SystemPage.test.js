import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import * as reduxHooks from 'react-redux';
import App from '../../App';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../../portal-react-angular-react-app';

// jest.mock('react-redux');

describe('System page test', () => {
    test('Routing test', async () => {
        const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

        render(<Provider store={store}>
                <App/>
            </Provider>);

        const inputEmail = screen.getByTestId('email-input');
        const inputPassword = screen.getByTestId('password-input');
        const loginButton = screen.getByTestId('login-button');
        fireEvent.input(inputEmail, {
            target: {
                value: 'admin@admin.com'
            }
        });
        expect(screen.getByDisplayValue('admin@admin.com')).toBeInTheDocument();

        fireEvent.input(inputPassword, {
            target: {
                value: 'admin'
            }
        });
        expect(screen.getByDisplayValue('admin')).toBeInTheDocument();

        const dispatch = jest.fn();
        mockedDispatch.mockReturnValue(dispatch);
        fireEvent.click(loginButton);
        expect(dispatch).toHaveBeenCalledTimes(1);

        screen.debug();
    });
});
