import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Button, { ButtonProps, ButtonType , ButtonSize} from './button'

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: ButtonType.default,
    btnSize: ButtonSize.large,
    className: 'test-custom'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test button component' , () => {
    it('should render the correct default button component', () => {
        const wrapper = render(<Button {...defaultProps}>Button</Button>)
        const element = wrapper.getByText('Button') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })

    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Button</Button>)
        const element = wrapper.getByText('Button')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-default btn-lg test-custom')
    })

    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button btnType={ButtonType.link} href="http://yummy">Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-link')
        expect(element).toHaveAttribute('href', 'http://yummy')
    })

    it('should render the disabled button component when set the disabled to true', () => {
        const wrapper = render(<Button { ...disabledProps }>disabled</Button>)
        const element = wrapper.getByText('disabled') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})
