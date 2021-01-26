import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import Alert , { AlertType, AlertProps } from './alert'

const testAlertProps: AlertProps = {
    alertType: AlertType.default,
    closable: true,
    title: 'alert title',
    children: HTMLElement,
    onClose: jest.fn()
}

const testProps: AlertProps = {
    children: HTMLElement,
    closable: false
}

describe('test alert componet', () => {
    it('should render correct default alert', () => {
        const wrapper = render(<Alert>This is a alert component</Alert>)
        const element = wrapper.getByText('This is a alert component')
        expect(element).toBeInTheDocument()
    })

    it('should render correct alert component with different props', () => {
        const wrapper = render(<Alert {...testAlertProps}>This is a alert component</Alert>)
        const element = wrapper.getByTestId("test-alert")
        const closeBtnElement = element.querySelector('.close') as HTMLElement
        fireEvent.click(closeBtnElement)
        expect(testAlertProps.onClose).toBeCalled()
    })

    it('should render no close btn alert component with closable equal false', () => {
        cleanup()
        const wrapper = render(<Alert {...testProps}>alert</Alert>)
        const element = wrapper.getByTestId("test-alert")
        const closeBtnElement = element.querySelector('.close')
        expect(closeBtnElement).not.toBeInTheDocument()
    })
})