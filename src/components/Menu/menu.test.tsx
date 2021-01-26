import React from 'react'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    onSelect: jest.fn(),
    defaultOpenMenus: ['4']
}

const generateMenu = (props: MenuProps) => {
    return (
    <Menu {...props}>
        <MenuItem>active</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem>xyz</MenuItem>
        <SubMenu title='test-dropdown'>
            <MenuItem>dropdown 1</MenuItem>
        </SubMenu>
        <SubMenu title='open-dropdown'>
            <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
     </Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
        .sub-menu {
            display: none;
        }
        .sub-menu.menu-open {
            display: block;
        }
    `
    const style = document.createElement('style')
    style.type = "text/css"
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test menu and menuItem component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        // wrapper.container.getElementsByClassName()
        activeElement = wrapper.getByText('active')
        disabledElement  =wrapper.getByText('disabled')
    })
    it('should render correct menu and menuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })

    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('dropdown 1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('test-dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('dropdown 1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('dropdown 1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3 - 0')
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('dropdown 1')).not.toBeVisible()
        })
    })
})

describe('test menu and menuItem component at vertical mode', () => {
    beforeEach(() => {
        cleanup()
        wrapper2 = render(generateMenu(testVerProps))
        wrapper2.container.append(createStyleFile())
    })

    it('should render vertical mode when mode is set to vertical', () => {
        const menuElement = wrapper2.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })

    it('should display dropdown after click at vertical mode' , () => {
        expect(wrapper2.queryByText('dropdown 1')).not.toBeVisible()
        const dropdownElement = wrapper2.getByText('test-dropdown')
        fireEvent.click(dropdownElement)
        expect(wrapper2.getByText('dropdown 1')).toBeVisible()
        fireEvent.click(wrapper2.getByText('dropdown 1'))
        expect(testVerProps.onSelect).toHaveBeenCalledWith('3 - 0')
    })

    it('should display default sub menu when subMenu included in defaultSubMenus', () => {
        expect(wrapper2.queryByText('dropdown 2')).toBeVisible()
    })
})