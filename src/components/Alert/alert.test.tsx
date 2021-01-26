import React from 'react'
import { render } from '@testing-library/react'
import Alert , { AlertType, AlertProps } from './alert'

const testAlertProps: AlertProps = {
    alertType: AlertType.default,
    closable: true,
    title: 'alert title',
    children: HTMLElement
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
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('alert-default')
    })

    it('should render no close btn alert compoent with closable equal true', () => {
        const wrapper = render(<Alert {...testAlertProps}>This is a alert component</Alert>)
        // const titleElement = wrapper.container.getElementsByTagName('H5')
        const closeBtnElement =  wrapper.getByText('close')
        // expect(titleElement).toBeInTheDocument()
        expect(closeBtnElement).toBeInTheDocument()
    })
})