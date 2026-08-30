import Button from "@/components/Button";
import Link from "next/link";
import React, { FC, ReactElement } from "react";

interface FormButtonsProps {
  href: string;
  buttonLabel: string;
}

const FormButtons: FC<FormButtonsProps> = ({
  href,
  buttonLabel,
}): ReactElement => {
  return (
    <div className="mt-6 flex items-center justify-end gap-2">
      <Link
        href={href}
        className="rounded-full px-4 py-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none"
      >
        Cancel
      </Link>
      <Button
        type="submit"
        label={buttonLabel}
        className="rounded-xl bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
      />
    </div>
  );
};

export default FormButtons;
