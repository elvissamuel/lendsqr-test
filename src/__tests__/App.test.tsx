import '@testing-library/jest-dom';
import {render} from '@testing-library/react'
import App from '../App';


describe('Renders App', () => {

    it('Renders Todo App Title', () => {
      render(<App/>);
    })
})