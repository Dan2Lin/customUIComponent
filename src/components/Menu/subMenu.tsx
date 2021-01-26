import React, { FunctionComponentElement, useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { menuItemProps } from './menuItem'

export interface SubMenuProps {
    index?: string,
    title: string,
    className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const { index, title, className, children } = props
    const context = useContext(MenuContext)
    const openSubMenus = context.defaultOpenMenus as Array<string>
    const isOpened = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false
    const [ menuOpen, setMenuOpen ] = useState(isOpened)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    })


    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }

    let timer: any = null
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300)
    }

    const clickEvents = context.mode ==='vertical' ? {
        onClick: handleClick
    } : {}

    const hoverEvent = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('sub-menu', {
            'menu-open': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<menuItemProps>
            if(childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index} - ${i}`
                })
            } else {
                console.error('Warning: subMenu has a child which is not a MenuItem')
            }
        })

        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvent}>
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )

}

SubMenu.displayName = 'SubMenu'
export default SubMenu