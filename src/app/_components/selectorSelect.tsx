import {Button, ButtonGroup, Card, CardBody, CardFooter, Spacer} from "@nextui-org/react";

import ErrorCard from "~/app/_components/errorCard";
import {type IApiDataItem, type INextNameMeta, type IUseSelector} from "~/app/selector/[sex]/useSelector";
import {type ISelectorSourceElement} from "~/app/selector/[sex]/page";
import LoadingCard from "~/app/_components/loadingCard";
import ProgressCard from "~/app/_components/progressCard";

interface ISelectorSelect {
    currentSource?: ISelectorSourceElement;
    loadingApiData: IUseSelector['loadingApiData'];
    nameApprove: IUseSelector['nameApprove'];
    nameDismiss: IUseSelector['nameDismiss'];
    nextNameToReviev?: IApiDataItem;
    nextNameMeta?: INextNameMeta;
}


export default function SelectorSelect({
                                           currentSource,
                                           loadingApiData,
                                           nextNameMeta,
                                           nextNameToReviev,
                                       }: ISelectorSelect) {

    if (loadingApiData) {
        return <LoadingCard desc="Ładowanie bazy imion"/>
    }
    if (!currentSource) {
        return <ErrorCard desc={'Nie wybrano źródła imion.'}/>
    }

    if (!nextNameToReviev) {
        return <ErrorCard desc={'Nie ma następnego imienia do przejrzenia.'}/>
    }

    const occurencesPercentage = nextNameMeta &&
        ((nextNameToReviev?.attributes?.col3?.val / nextNameMeta?.occurrences?.all) * 100).toFixed(2)

    return (
        <>
            <ProgressCard
                value={Number(((12 / 100) * 100).toFixed())} //TODO
            />
            <Spacer className="pb-2.5"/>
            <Card className="max-w-[400px]">
                <CardBody className="items-center">
                    <p
                        className="text-sm pt-3"
                        title={`id:\n${nextNameToReviev?.id}`}
                    >{nextNameToReviev?.attributes?.col2?.val}</p>
                    <small
                        className="text-default-500"
                        title={`count.all:
${nextNameMeta?.count.all}
count.current:
${nextNameMeta?.count.current}
occurrences.max:
${nextNameMeta?.occurrences.max}
occurrences.all:
${nextNameMeta?.occurrences.all}`}
                    >
                        wystąpień: {nextNameToReviev?.attributes?.col3?.val} ({occurencesPercentage}%)
                    </small>
                    <h4 className="font-bold text-3xl pt-4">{nextNameToReviev?.attributes?.col1?.val}</h4>
                </CardBody>
                <CardFooter>
                    <ButtonGroup className="w-full">
                        <Button className="w-full text-white" color="success">
                            Tak
                        </Button>
                        <Button className="w-full text-white" color="danger">
                            Nie
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>

    )
}