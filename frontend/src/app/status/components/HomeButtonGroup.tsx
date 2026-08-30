import Button from '@/components/Button';
import { IMonitorDocument } from '@/interfaces/monitor.interface';
import { FC, ReactElement } from 'react';
import { FaArrowDown, FaArrowUp, FaPlay } from 'react-icons/fa';
import { filter } from 'lodash';

interface HomeButtonGroupProps {
  monitors: IMonitorDocument[];
}

const HomeButtonGroup: FC<HomeButtonGroupProps> = ({ monitors }): ReactElement => {
  const count = (type: string): number => {
    let sum = 0;
    if (type === 'active') {
      sum = filter(monitors, (monitor: IMonitorDocument) => monitor.active && monitor.status === 0).length;
    }
    if (type === 'inactive') {
      sum = filter(monitors, (monitor: IMonitorDocument) => !monitor.active).length;
    }
    if (type === 'error') {
      sum = filter(monitors, (monitor: IMonitorDocument) => monitor.active && monitor.status === 1).length;
    }
    return sum;
  }

  return (
    <div className="inline-flex gap-2" role='group'>
      <Button
        label={count('active')}
        icon={<FaArrowUp className='mr-1.5 text-xs' />}
        type="button"
        className="inline-flex items-center rounded-full bg-green-50 px-3.5 py-1.5 text-sm font-medium text-green-600"
      />
      <Button
        label={count('error')}
        icon={<FaArrowDown className='mr-1.5 text-xs' />}
        type="button"
        className="inline-flex items-center rounded-full bg-red-50 px-3.5 py-1.5 text-sm font-medium text-red-600"
      />
      <Button
        label={count('inactive')}
        icon={<FaPlay className='mr-1.5 text-xs' />}
        type="button"
        className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-500"
      />
    </div>
  )
}

export default HomeButtonGroup;
