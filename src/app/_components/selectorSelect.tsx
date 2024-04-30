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
    const [loading, setLoading] = useState(true);

    const filterDuplicates = (value: ISelectorSelectApiData, index: number, self: ISelectorSelectApiData[]) =>
        index === self.findIndex(i => (i.id === value.id));


    useEffect(() => {
        if (!currentSource) return;

        console.log('### currentSource', currentSource)

        const triggerfetchApiData = (url: string | URL | Request, setApiData: Dispatch<SetStateAction<ISelectorSelectApiData[]>>, setLoading: Dispatch<SetStateAction<boolean>>) => {
            fetch(url, {cache: 'force-cache'}).then((res) => {
                return res.json();
            }).then((res) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (res?.data && Array.isArray(res.data)) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                    const data: ISelectorSelectApiData[] = res?.data;
                    setApiData((prevState) => [...prevState, ...data])
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (res?.links?.next && res?.links?.self !== res?.links?.last) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
                    triggerfetchApiData(res.links.next, setApiData, setLoading);
                } else {
                    setLoading(false);
                }
            }).catch(err => {
                console.error(err);
                setLoading(false);
            }).finally()
        }
        setApiData([]);
        triggerfetchApiData(currentSource.value, (x) => setApiData(x), (x) => setLoading(x));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if (loading) return;

        console.log('### apiData', apiData)
        console.log('### apiData.filter(filterDuplicates)', apiData.filter(filterDuplicates))
        const sortedApiData = apiData.filter(filterDuplicates);
        setApiData(sortedApiData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);


    if (!currentSource) {
        return <ErrorCard desc={'Nie wybrano źródła imion.'}/>
    }

    return (
        <Card>
            <CardBody>
                <p>count: {apiData.length}</p>

                {apiData.length && apiData.map((item, index) => (
                    <>
                        <p>[{index}] {item?.attributes?.col1?.val} {item?.attributes?.col2?.val} {item?.attributes?.col3?.val}</p>

                    </>
                ))}
            </CardBody>
        </Card>
    )
}