import Button from '@/components/Button';
import { ISSLMonitorDocument, SSLModalDataProp } from '@/interfaces/ssl.interface';
import clsx from 'clsx';
import { FC, ReactElement } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useSSLInfoModal } from '../hooks/useSSLInfoModal';

type SSLInfoModalProp = { monitor: ISSLMonitorDocument; onClose: () => void };

const SSLInfoModal: FC<SSLInfoModalProp> = ({ monitor, onClose }): ReactElement => {
  const {
    sslInfo,
    hostInfo,
    subjectInfo,
    issuerInfo,
    validityInfo,
    formatDate
  } = useSSLInfoModal(monitor);

  const renderMessage = (): JSX.Element => {
    if (sslInfo.type === 'success') {
      return <>{`The certificate is valid until ${formatDate(sslInfo.info.validTo!)}`}</>
    }
    if (sslInfo.type === 'expiring soon') {
      return <>{`The certificate will expire in ${sslInfo.info.daysLeft} day(s).`}</>
    }
    return <>{'The certificate is either expired or invalid.'}</>
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl shadow-gray-900/10">
        <div className="mb-4">
          <h4 className="text-base font-semibold text-gray-900">SSL Certificate Details</h4>
        </div>
        <div className="flex w-full items-center gap-2 text-left text-sm text-gray-600">
          <FaCheckCircle
            className={clsx('text-sm', {
              'text-green-500': sslInfo.type === 'success',
              'text-red-500': sslInfo.type === 'danger' || sslInfo.type === '--' || sslInfo.type === 'expired',
              'text-yellow-500': sslInfo.type === 'expiring soon'
            })}
          />
          <div>
            {renderMessage()}
          </div>
        </div>
        <div className="my-4 rounded-xl bg-gray-50 p-4">
          <div className="grid w-full grid-cols-1 gap-4 border-b border-gray-100 pb-4 md:grid-cols-2">
            {CertInfo({ title: 'Host', body: hostInfo })}
            {CertInfo({ title: 'Subject', body: subjectInfo })}
          </div>
          <div className="grid w-full grid-cols-1 gap-4 pt-4 md:grid-cols-2">
            {CertInfo({ title: 'Issuer', body: issuerInfo })}
            {CertInfo({ title: 'Validity', body: validityInfo })}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            className="rounded-full px-4 py-1.5 text-center text-xs font-medium text-gray-500 hover:bg-gray-100"
            label="Close"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

const CertInfo = ({ title, body }: {title: string, body: SSLModalDataProp[]}): ReactElement => {
  return (
    <div className="max-h-48 overflow-y-auto">
      <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">{title}</div>
      {body.map((data: SSLModalDataProp, index: number) => (
        <div key={index} className="flex justify-between gap-2 border-b border-gray-100 py-1.5 text-xs last:border-b-0">
          <div className="text-gray-500">{data.key}:</div>
          <div className="text-right text-gray-800">{data.value}</div>
        </div>
      ))}
    </div>
  );
};

export default SSLInfoModal;
