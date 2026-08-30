import { FC, ReactElement } from 'react';

const HomeSkeleton: FC = (): ReactElement => {
  return (
    <div className="relative h-screen min-h-screen p-5 md:p-8">
      <div className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex gap-2" role="group">
          {[1, 2, 3].map((_, index: number) => (
            <div key={index} className="h-8 w-16 animate-pulse rounded-full bg-gray-100" />
          ))}
        </div>
        <div className="h-9 w-36 animate-pulse rounded-xl bg-gray-100" />
      </div>
      <div className="flex flex-col items-start gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="h-9 w-20 animate-pulse rounded-xl bg-gray-100" />
        <div className="flex flex-col gap-2 lg:w-full lg:flex-row lg:justify-end">
          <div className="h-9 w-36 animate-pulse rounded-full bg-gray-100" />
          <div className="h-9 w-44 animate-pulse rounded-full bg-gray-100" />
          <div className="h-11 w-full animate-pulse rounded-xl bg-gray-100 lg:w-[260px]" />
        </div>
      </div>
      <div className="my-5 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-xs font-medium uppercase tracking-wide text-gray-400">
            <tr>
              {[...Array(7).keys()].map((_, index: number) => (
                <th key={index} scope="col" className="px-5 py-4">
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-100"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[...Array(10).keys()].map((_, index: number) => (
              <tr key={index}>
                {[...Array(7).keys()].map((__, cellIndex: number) => (
                  <td key={cellIndex} className="px-5 py-4">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-100"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeSkeleton;
