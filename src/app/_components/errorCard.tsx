import { Card, CardHeader, Divider } from "@nextui-org/react";
import { type PropsWithChildren } from "react";

interface IErrorCard {
  desc: string;
}

const ExclamationCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-8 w-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
    />
  </svg>
);

export default function ErrorCard({
  children,
  desc,
}: IErrorCard & PropsWithChildren) {
  return (
    <Card className="max-w-[400px] bg-red-600 text-white">
      <CardHeader className="flex gap-3">
        <ExclamationCircleIcon />
        <p className="text-sm">{desc}</p>
        <div>{children}</div>
      </CardHeader>
      <Divider />
    </Card>
  );
}
