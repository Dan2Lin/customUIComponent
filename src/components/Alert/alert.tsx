import React from 'react'
import classnames from 'classnames'

export enum AlertType {
    success = 'success',
    default = 'default',
    danger = 'danger',
    warning = 'warning'
}

interface AlertProps {
    closable?: boolean,
    title?: string,
    alertType?: AlertType,
    children: React.ReactNode,
    onClose?: () => void
}

const Alert: React.FC<AlertProps> = (props) => {
    const { alertType, children, closable, title } = props;
    const classes = classnames('alert', {
        [`alert-${alertType}`] : alertType
    })
    return (
        <div className={classes}>
            { title && title.length > 0 && <h5>{title}</h5> }
            { closable && <span className="close">close</span>}
            <div>
                { children }
            </div>
            
        </div>
    )
}

Alert.defaultProps = {
    closable: true,
    alertType: AlertType.default,
}

export default Alert