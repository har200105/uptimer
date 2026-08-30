import TextAreaInput from '@/components/TextAreaInput';
import TextInput from '@/components/TextInput';
import { MonitorItemProps } from '@/interfaces/monitor.interface';
import clsx from 'clsx';
import { FC, ReactElement } from 'react';

const MonitorItem: FC<MonitorItemProps> = ({
  id,
  type,
  requiredIcon,
  topClass,
  className,
  labelStart,
  labelEnd,
  placeholder,
  inputValue,
  readonly,
  onChange
}): ReactElement => {
  return (
    <div className={topClass}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
        {labelStart}{requiredIcon && <sup className="text-red-400">*</sup>}
      </label>
      {type !== 'textarea' ? (
        <TextInput
          type={type}
          name={id}
          id={id}
          readOnly={readonly}
          className={clsx(`${className !== '' ? className : ''}`, {
            'h-11 w-full rounded-xl bg-gray-50 px-3.5 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:outline-none': !className,
            'bg-gray-100 text-gray-500': readonly
          })}
          placeholder={placeholder}
          value={inputValue}
          onChange={onChange}
        />
      ) : (
        <TextAreaInput
          rows={6}
          id={id}
          name={id}
          className={
            className
              ? className
              : 'w-full rounded-xl bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:outline-none'
          }
          placeholder={placeholder}
          value={inputValue}
          onChange={onChange}
        />
      )}
      {labelEnd && (
        <label htmlFor={labelEnd} className="mt-1 block text-xs text-gray-500">
          {labelEnd}
        </label>
      )}
    </div>
  );
};

export default MonitorItem;
