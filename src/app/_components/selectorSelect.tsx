import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import {Card, CardBody} from "@nextui-org/react";

import {type ISelectorSourceElement} from "~/app/selector/[sex]/page";
import ErrorCard from "~/app/_components/errorCard";

interface ISelectorSelect {
    currentSource?: ISelectorSourceElement;
}

interface ISelectorSelectApiData {
    "relationships": {
        "resource": {
            "links": {
                "related": string
            },
            "data": {
                "id": string,
                "type": "resource"
            }
        }
    },
    "type": "row",
    "id": string,
    "attributes": {
        "col2": {
            "repr": string,
            "val": string
        },
        "col1": {
            "repr": string,
            "val": string
        },
        "col3": {
            "repr": number,
            "val": number
        }
    }
}

export default function SelectorSelect({currentSource}: ISelectorSelect) {
    const [apiData, setApiData] = useState<ISelectorSelectApiData[]>([]);

    useEffect(() => {
        if (!currentSource) return;

        console.log('### currentSource', currentSource)

        const triggerfetchApiData = (url: string | URL | Request, setApiData: Dispatch<SetStateAction<ISelectorSelectApiData[]>>) => {
            console.log('### triggerfetchApiData(url)', url);
            fetch(url, {cache: 'force-cache'}).then((res) => {
                return res.json();
            }).then((res) => {
                // console.log('### res', res)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (res?.data && Array.isArray(res.data)) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                    const data: ISelectorSelectApiData[] = res?.data;
                    setApiData((prevState) => {
                            return [...prevState, ...data]
                        }
                    )
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (!res?.links) return;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (!res?.links?.next) return;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (res?.links?.self === res?.links?.last) return;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
                // console.log('#### res.links.next', res.links.next);
                triggerfetchApiData(res.links.next, setApiData);
            }).catch(err => {
                console.error(err);
            }).finally()
        }

        setApiData([]);
        triggerfetchApiData(currentSource.value, (x) => setApiData(x));


        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if (!currentSource) {
        return <ErrorCard desc={'Nie wybrano źródła imion.'}/>
    }

    return (
        <Card>
            <CardBody>
                content
            </CardBody>
        </Card>
    )
}