import React , { useState } from 'react'
import classnames from 'classnames'

export enum AlertType {
    success = 'success',
    default = 'default',
    danger = 'danger',
    warning = 'warning'
}

export interface AlertProps {
    closable?: boolean,
    title?: string,
    alertType?: AlertType,
    children: React.ReactNode,
    onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Alert: React.FC<AlertProps> = (props) => {
    const { alertType, children, closable, title, onClose } = props;
    const [closed, setClosed] = useState(false)
    const classes = classnames('alert', {
        [`alert-${alertType}`] : alertType
    })

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        setClosed(true)
        onClose?.(e)
    }
    return closed 
           ? null 
           : (
            <div className={classes} data-testid="test-alert">
                { title && title.length > 0 && <h5>{title}</h5> }
                { closable && <span className="close" onClick={handleClose}>close</span>}
                <div> {children} </div>
            </div>    
        )
}

Alert.defaultProps = {
    closable: true,
    alertType: AlertType.default,
}

export default Alert