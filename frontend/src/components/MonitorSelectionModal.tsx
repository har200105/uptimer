import { useRouter } from "next/navigation";
import React, { FC, ReactElement } from "react";
import Button from "./Button";
import UptimeGroupBtn from "./UptimeGroupBtn";

const MONITOR_TYPES = ["HTTP", "TCP", "Redis", "MongoDB"];

type MonitorSelectionProp = {
  onClose: () => void;
};

const MonitorSelectionModal: FC<MonitorSelectionProp> = ({
  onClose,
}): ReactElement => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm">
      <div className="w-full max-w-[380px] rounded-2xl bg-white p-6 shadow-xl shadow-gray-900/10">
        <h4 className="mb-4 text-base font-semibold text-gray-900">Select Monitor Type</h4>
        <div className="mb-5">
          <UptimeGroupBtn
            buttonsText={MONITOR_TYPES}
            labelText=""
            type="string"
            onClick={(event: string) => {
              router.push(`/uptime/${event.toLowerCase()}/create`);
            }}
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="rounded-full px-4 py-1.5 text-center text-xs font-medium text-gray-500 hover:bg-gray-100"
            label="Cancel"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default MonitorSelectionModal;
