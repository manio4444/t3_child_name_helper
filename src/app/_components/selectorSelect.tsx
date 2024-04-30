import {Card, CardBody} from "@nextui-org/react";

import ErrorCard from "~/app/_components/errorCard";
import {type IApiDataItem} from "~/app/selector/[sex]/useSelector";
import {type ISelectorSourceElement} from "~/app/selector/[sex]/page";
import LoadingCard from "~/app/_components/loadingCard";

interface ISelectorSelect {
    currentSource?: ISelectorSourceElement;
    loadingApiData: boolean;
    nextNameToReviev?: IApiDataItem;
}


export default function SelectorSelect({currentSource, loadingApiData, nextNameToReviev}: ISelectorSelect) {

    if (loadingApiData) {
        return <LoadingCard desc="LOADING DATA"/>
    }
    if (!currentSource) {
        return <ErrorCard desc={'Nie wybrano źródła imion.'}/>
    }
    if (!nextNameToReviev) {
        return <ErrorCard desc={'Nie ma następnego imienia do przejrzenia.'}/>
    }

    return (
        <Card>
            <CardBody>
                {nextNameToReviev && <div>
                    <p>[{nextNameToReviev?.id}]</p>
                    <p>{nextNameToReviev?.attributes?.col1?.val}</p>
                    <p>{nextNameToReviev?.attributes?.col2?.val}</p>
                    <p>{nextNameToReviev?.attributes?.col3?.val}</p>
                </div>
                }
            </CardBody>
        </Card>
    )
}