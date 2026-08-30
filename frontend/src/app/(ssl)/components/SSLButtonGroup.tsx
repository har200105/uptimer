import Button from '@/components/Button';
import { FC, ReactElement } from 'react';
import { FaArrowDown, FaArrowUp, FaExclamationTriangle } from 'react-icons/fa';
import { filter } from 'lodash';
import { ISSLInfo, ISSLMonitorDocument, sslDefaultInfoData } from '@/interfaces/ssl.interface';

interface SSLButtonGroupProps {
  sslMonitors: ISSLMonitorDocument[];
}

const SSLButtonGroup: FC<SSLButtonGroupProps> = ({ sslMonitors }): ReactElement => {
  const monitorInfoData = (monitor: ISSLMonitorDocument): ISSLInfo => (monitor.info ? JSON.parse(monitor.info) : sslDefaultInfoData);

  const count = (type: string): number => {
    let sum = 0;
    if (type === 'success') {
      sum = filter(sslMonitors, (monitor: ISSLMonitorDocument) => monitorInfoData(monitor).type === 'success').length;
    }
    if (type === 'danger') {
      sum = filter(sslMonitors, (monitor: ISSLMonitorDocument) => monitorInfoData(monitor).type === 'danger' || monitorInfoData(monitor).type === 'expired').length;
    }
    if (type === 'expiring soon') {
      sum = filter(sslMonitors, (monitor: ISSLMonitorDocument) => monitorInfoData(monitor).type === 'expiring soon').length;
    }
    return sum;
  }

  return (
    <div className="inline-flex items-center gap-2" role='group'>
      <Button
        label={`Valid: ${count('success')}`}
        icon={<FaArrowUp className='text-xs' />}
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3.5 py-1.5 text-xs font-medium text-green-700"
      />
      <Button
        label={`Expiring soon: ${count('expiring soon')}`}
        icon={<FaExclamationTriangle className='text-xs' />}
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3.5 py-1.5 text-xs font-medium text-yellow-700"
      />
      <Button
        label={`Expired / Invalid: ${count('danger')}`}
        icon={<FaArrowDown className='text-xs' />}
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1.5 text-xs font-medium text-red-700"
      />
    </div>
  )
}

export default SSLButtonGroup;
