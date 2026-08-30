import { ReactElement, ReactNode } from 'react';

const Assertions = ({ children }: { children: ReactNode}): ReactElement => {
  return (
    <div className='mt-5'>
      <label htmlFor="assertions" className='block text-sm font-medium text-gray-700'>
        Assertions (Optional)
      </label>
      <span className='text-xs text-gray-500'>Your test is successful:</span>
      <div className='mt-2 space-y-3 rounded-xl bg-gray-50 p-4'>
        {children}
      </div>
    </div>
  )
}

export default Assertions;
