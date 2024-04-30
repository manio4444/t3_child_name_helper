import {Card, CardBody} from "@nextui-org/react";

import ErrorCard from "~/app/_components/errorCard";
import {type IApiDataItem} from "~/app/selector/[sex]/useSelector";
import {type ISelectorSourceElement} from "~/app/selector/[sex]/page";

interface ISelectorSelect {
    currentSource?: ISelectorSourceElement;
    nextNameToReviev?: IApiDataItem;
}


export default function SelectorSelect({currentSource, nextNameToReviev}: ISelectorSelect) {

    if (!currentSource) {
        return <ErrorCard desc={'Nie wybrano źródła imion.'}/>
    }
    if (!nextNameToReviev) {
        return <ErrorCard desc={'Nie ma następnego imienia do przejrzenia.'}/>
    }

    return (
        <Card>
            <CardBody>
                {nextNameToReviev && <p>
                    <div>[{nextNameToReviev?.id}]</div>
                    <div>{nextNameToReviev?.attributes?.col1?.val}</div>
                    <div>{nextNameToReviev?.attributes?.col2?.val}</div>
                    <div>{nextNameToReviev?.attributes?.col3?.val}</div>
                </p>
                }
            </CardBody>
        </Card>
    )
}