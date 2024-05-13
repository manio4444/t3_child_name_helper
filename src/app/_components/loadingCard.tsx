import { Card, CardHeader, Divider } from "@nextui-org/react";
import { type PropsWithChildren } from "react";

interface ILoadingCard {
  desc?: string;
}

export default function LoadingCard({
  children,
  desc,
}: ILoadingCard & PropsWithChildren) {
  return (
    <Card>
      <CardHeader className="flex gap-3">
        <span className="CNH_spinner" />
        <p className="text-sm">{desc ?? "Loading"}</p>
        <div>{children}</div>
      </CardHeader>
      <Divider />
    </Card>
  );
}
