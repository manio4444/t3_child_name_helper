import {
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import {
  type IApiDataItem,
  type IUseSelector,
} from "~/app/selector/[sex]/useSelector";

type ILastDecisionsCard = Pick<
  IUseSelector,
  "apiData" | "decisions" | "loadingApiData" | "onDecisionsChange"
>;

export default function LastDecisionsCard({
  apiData,
  decisions,
  loadingApiData,
  onDecisionsChange,
}: ILastDecisionsCard) {
  const findNameDataById = (
    nameData: IApiDataItem,
    nameId: IApiDataItem["id"],
  ) => nameData.id === nameId;

  if (loadingApiData) {
    return null;
  }

  return (
    <Table
      className="max-w-[400px]"
      aria-label="Table with last decisions made"
    >
      <TableHeader>
        <TableColumn>Imię</TableColumn>
        <TableColumn>Decyzja</TableColumn>
      </TableHeader>
      <TableBody>
        {decisions
          ?.map((decision, index) => {
            const nameData = apiData.find((nameData) =>
              findNameDataById(nameData, decision.nameId),
            );
            return (
              <TableRow key={index}>
                <TableCell>{nameData?.attributes.col1.val}</TableCell>
                <TableCell className="float-right">
                  <Switch
                    color="success"
                    isSelected={decision.decision}
                    onValueChange={(value) =>
                      onDecisionsChange(decision.nameId, value)
                    }
                  ></Switch>
                </TableCell>
              </TableRow>
            );
          })
          .reverse()}
      </TableBody>
    </Table>
  );
}
