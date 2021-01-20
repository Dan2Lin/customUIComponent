import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
    large = 'lg',
    small = 'sm'
}

export enum ButtonType {
    default = 'default',
    success = 'success',
    primary = 'primary',
    danger = 'danger',
    link = 'link',
    disabled = 'disabled'
}

interface BaseButtonProps {
    className?: string,
    btnSize?: string,
    btnType?: string,
    disabled?: boolean,
    children: React.ReactNode,
    href?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<BaseButtonProps & NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
    const { className, btnSize, btnType, disabled, children, href, ...restProps } = props;

    const classes = classNames('btn', className, {
        [`btn-${btnType}`] : btnType,
        [`btn-${btnSize}`] : btnSize,
        'disabled': (btnType === ButtonType.link) && disabled
    })

    if(btnType === ButtonType.link && href) {
        return (
            <a 
                className={classes}
                href={href}
                {...restProps}
            > 
                {children}
            </a>
        )
    } else {
        return (
            <button 
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.default 
}

export default Button