import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";

import ErrorCard from "~/app/_components/errorCard";
import {
  type IApiDataItem,
  type INextNameMeta,
  type IUseSelector,
} from "~/app/selector/[sex]/useSelector";
import { type ISelectorSourceElement } from "~/app/selector/[sex]/page";
import LoadingCard from "~/app/_components/loadingCard";

interface ISelectorSelect {
  currentSource?: ISelectorSourceElement;
  loadingApiData: IUseSelector["loadingApiData"];
  nextNameToReviev?: IApiDataItem;
  nextNameMeta?: INextNameMeta;
  onDecisionsChange: IUseSelector["onDecisionsChange"];
}

export default function SelectorSelect({
  currentSource,
  loadingApiData,
  nextNameMeta,
  nextNameToReviev,
  onDecisionsChange,
}: ISelectorSelect) {
  if (loadingApiData) {
    return <LoadingCard desc="Ładowanie bazy imion" />;
  }
  if (!currentSource) {
    return <ErrorCard desc={"Nie wybrano źródła imion."} />;
  }

  if (!nextNameToReviev) {
    return <ErrorCard desc={"Nie ma następnego imienia do przejrzenia."} />;
  }

  const occurencesPercentage =
    nextNameMeta &&
    (
      (nextNameToReviev?.attributes?.col3?.val /
        nextNameMeta?.occurrences?.all) *
      100
    ).toFixed(2);

  return (
    <Card className="max-w-[400px]">
      <CardBody className="items-center">
        <p className="pt-3 text-sm" title={`id:\n${nextNameToReviev?.id}`}>
          {nextNameToReviev?.attributes?.col2?.val}
        </p>
        <small
          className="text-default-500"
          title={`count.all:
${nextNameMeta?.count.all}
decisions.all:
${nextNameMeta?.decisions.all}
decisions.positive:
${nextNameMeta?.decisions.positive}
occurrences.max:
${nextNameMeta?.occurrences.max}
occurrences.all:
${nextNameMeta?.occurrences.all}`}
        >
          wystąpień: {nextNameToReviev?.attributes?.col3?.val} (
          {occurencesPercentage}%)
        </small>
        <h4 className="pt-4 text-3xl font-bold">
          {nextNameToReviev?.attributes?.col1?.val}
        </h4>
      </CardBody>
      <CardFooter>
        <ButtonGroup className="w-full">
          <Button
            className="w-full text-white"
            color="success"
            onClick={() => onDecisionsChange(nextNameToReviev.id, true)}
          >
            Tak
          </Button>
          <Button
            className="w-full text-white"
            color="danger"
            onClick={() => onDecisionsChange(nextNameToReviev.id, false)}
          >
            Nie
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
