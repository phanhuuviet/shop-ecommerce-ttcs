import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({
    children,
    value,
    onChange,
    labelText,
    id = 'email',
    type = 'text',
    placeholder,
    className,
    labelClassName,
    inline = false,
    rectangle = false,
    required = false,
}) {
    const classes = cx('input', {
        inline,
        [className]: className,
    });

    const labelClasses = cx({
        [labelClassName]: labelClassName,
    });

    const inputClasses = cx('input-field', { rectangle });

    if (!placeholder) {
        placeholder = 'Enter your ' + id;
    }

    if (!labelText) {
        labelText = id.charAt(0).toUpperCase() + id.slice(1);
    }

    return (
        <div className={classes}>
            <label className={labelClasses} htmlFor={id || ''}>
                {labelText}
                {required && <span className={cx('icon-asterisk')}>*</span>}
            </label>
            {children ? (
                children
            ) : (
                <input
                    value={value}
                    className={inputClasses}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                />
            )}
        </div>
    );
}

export default Input;
