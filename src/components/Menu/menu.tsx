import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { menuItemProps } from './menuItem'

type onSelectCallback = (selectedIndex: string) => void
type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
    defaultIndex?: string
    className?: string
    mode?:  MenuMode
    style?: React.CSSProperties
    onSelect?: onSelectCallback
    defaultOpenMenus?: string[]
}

interface IMenuContext {
    index: string;
    onSelect?: onSelectCallback;
    mode?: MenuMode,
    defaultOpenMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
    const { className, mode, style, children, defaultIndex, defaultOpenMenus, onSelect } = props;
    const [currentActive, settActive ] = useState(defaultIndex)
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    })

    const handleClick = (index: string) => {
        settActive(index)
        if(onSelect) {
            onSelect(index)
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenMenus
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<menuItemProps>
            const { displayName } = childElement.type
            if(displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {index: index.toString()})
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenMenus: []
}

export default Menu