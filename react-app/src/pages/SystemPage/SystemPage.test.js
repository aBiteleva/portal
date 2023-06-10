import {render, screen} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import axios from 'axios';
import App from '../../App';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../../portal-react-angular-react-app';

// jest.mock('axios');

describe('System page test', () => {
    test('Routing test', () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>);
        const eventsLink = screen.getByTestId('events-link');
        const activeRulesLink = screen.getByTestId('active-rules-link');
        userEvent.click(eventsLink);
        expect(screen.getByTestId('events-page')).toBeInTheDocument();
    });
});
