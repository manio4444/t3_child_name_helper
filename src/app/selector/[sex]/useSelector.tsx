import {
    type ISelectorConfig,
    type ISelectorProps,
    type ISelectorSourceElement,
    type SEX_ENUM
} from "~/app/selector/[sex]/page";
import {type Dispatch, type SetStateAction, useEffect, useState} from "react";

export interface IUseSelector {
    getCurrentSource: () => ISelectorSourceElement | undefined,
    getNextNameToReviev: () => IApiDataItem | undefined,
    loadingApiData: boolean;
    onSourceChange: (value: string) => void;
    selectedSex: SEX_ENUM,
    source: string,
}

export interface IApiDataItem {
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


export default function useSelector(props: ISelectorProps, config: ISelectorConfig): IUseSelector {
    const [source, setSource] = useState('empty');
    const [apiData, setApiData] = useState<IApiDataItem[]>([]);
    const [loadingApiData, setLoadingApiData] = useState(true);

    const selectedSex = props.params.sex;
    const findSourceConfig = (sourceItem: ISelectorSourceElement) => sourceItem.value === source
    const getCurrentSource = () => config[selectedSex].sources.find(findSourceConfig);
    const onSourceChange = (value: string) => {
        localStorage.setItem(`selected_${selectedSex}_source`, value);
        setSource(value);
    }
    const setSourceFromLocalStorage = () => {
        const source = localStorage.getItem(`selected_${selectedSex}_source`);
        if (!source) return;
        // TODO: Additional checking/error throw when source is set but does not exists in config?
        setSource(source);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }
    const triggerfetchApiData = (url: string | URL | Request, setApiData: Dispatch<SetStateAction<IApiDataItem[]>>, setLoadingApiData: Dispatch<SetStateAction<boolean>>) => {
        if (!getCurrentSource()) return;

        fetch(url, {cache: 'force-cache'}).then((res) => {
            return res.json();
        }).then((res) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (res?.data && Array.isArray(res.data)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                const data: IApiDataItem[] = res?.data;
                setApiData((prevState) => [...prevState, ...data])
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (res?.links?.next && res?.links?.self !== res?.links?.last) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
                triggerfetchApiData(res.links.next, setApiData, setLoadingApiData);
            } else {
                setLoadingApiData(false);
            }
        }).catch(err => {
            console.error(err);
            setLoadingApiData(false);
        }).finally()
    }
    const filterDuplicates = (value: IApiDataItem, index: number, self: IApiDataItem[]) =>
        index === self.findIndex(i => (i.id === value.id));
    const getNextNameToReviev = () => {
        if (!apiData || loadingApiData) return;

        return apiData[Math.floor(Math.random() * apiData.length)]
    }


    useEffect(() => {
        setSourceFromLocalStorage();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!getCurrentSource()?.value) return;

        triggerfetchApiData(getCurrentSource().value, (x) => setApiData(x), (x) => setLoadingApiData(x));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source])

    useEffect(() => {
        if (loadingApiData) return;

        console.log('### apiData', apiData)
        console.log('### apiData.filter(filterDuplicates)', apiData.filter(filterDuplicates))
        const sortedApiData = apiData.filter(filterDuplicates);
        setApiData(sortedApiData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingApiData]);

    return {
        getCurrentSource,
        getNextNameToReviev,
        loadingApiData,
        onSourceChange,
        selectedSex,
        source,
    }
}