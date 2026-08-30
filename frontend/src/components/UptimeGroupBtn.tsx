import { IFrequency } from '@/utils/utils';
import { toLower } from 'lodash';
import React, { FC, ReactElement, useState } from 'react';

export type UptimeBtnItem = string | IFrequency;

interface UptimeGroupBtnProps {
  buttonsText: UptimeBtnItem[];
  labelText: string;
  type: string;
  selectedItem?: string;
  onClick?: (data: string) => void;
}

const UptimeGroupBtn: FC<UptimeGroupBtnProps> = ({ buttonsText, labelText, type, selectedItem, onClick }): ReactElement => {
  const [active, setActive] = useState<string>('');

  const setSelectedItem = (data: string | IFrequency, active: string): string => {
    if (type === 'string' && typeof data === 'string' && (active === toLower(data) || toLower(selectedItem) === toLower(data))) {
      return 'bg-gray-900 text-white';
    }
    if (type === 'object' && typeof data !== 'string' && (active === toLower(`${data.value}`) || toLower(selectedItem) === toLower(`${data.value}`))) {
      return 'bg-gray-900 text-white';
    }
    return 'text-gray-600 bg-gray-100 hover:bg-gray-200';
  }

  return (
    <div className="flex flex-col">
      {labelText && (
        <label htmlFor='group' className='block mb-2 text-sm font-medium text-gray-700'>
          {labelText}
        </label>
      )}
      <div className='flex flex-wrap gap-2'>
        {buttonsText.map((data: string | IFrequency, index: number) => (
          <div
            key={index}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium ${setSelectedItem(data, active)}`}
            onClick={() => {
              if (type === 'string' && typeof data === 'string') {
                onClick!(data);
                setActive(toLower(data.toString()));
              }
              if (type !== 'string' && typeof data !== 'string') {
                onClick!(`${data.value}`);
                setActive(toLower(`${data.value}`));
              }
            }}
          >
            {type === 'string' && typeof data === 'string' ? data : typeof data !== 'string' ? data.name : ''}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UptimeGroupBtn;
