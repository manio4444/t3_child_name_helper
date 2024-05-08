import {type Dispatch, type SetStateAction, useEffect, useState} from "react";

import {
    type ISelectorConfig,
    type ISelectorProps,
    type ISelectorSourceElement,
    type SEX_ENUM
} from "~/app/selector/[sex]/page";

export interface IUseSelector {
    clearSource: () => void;
    getCurrentSourceConfig: () => ISelectorSourceElement | undefined,
    getNextNameMeta: () => INextNameMeta | undefined,
    getNextNameToReviev: () => IApiDataItem | undefined,
    loadingApiData: boolean;
    nameApprove: (id: IApiDataItem['id']) => void;
    nameDismiss: (id: IApiDataItem['id']) => void;
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

export interface INextNameMeta {
    count: {
        all: number;
        current: number;
    },
    occurrences: {
        max: number;
        all: number;
    }
}

export default function useSelector(props: ISelectorProps, config: ISelectorConfig): IUseSelector {
    const [source, setSource] = useState('');
    const [apiData, setApiData] = useState<IApiDataItem[]>([]);
    const [loadingApiData, setLoadingApiData] = useState(true);

    const selectedSex = props.params.sex;
    const findSourceConfig = (sourceItem: ISelectorSourceElement) => sourceItem.value === source
    const getCurrentSourceConfig = () => config[selectedSex].sources.find(findSourceConfig);
    const onSourceChange = (value: string) => {
        localStorage.setItem(`selected_${selectedSex}_source`, value);
        setSource(value);
    }
    const clearSource = () => onSourceChange('');
    const setSourceFromLocalStorage = () => {
        const source = localStorage.getItem(`selected_${selectedSex}_source`);
        if (!source) return;
        // TODO: Additional checking/error throw when source is set but does not exists in config?
        setSource(source);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }
    const triggerfetchApiData = (url: string | URL | Request, setApiData: Dispatch<SetStateAction<IApiDataItem[]>>, setLoadingApiData: Dispatch<SetStateAction<boolean>>) => {
        if (!getCurrentSourceConfig()) return;

        setLoadingApiData(true);
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

    const getNextNameMeta = () => {
        if (!apiData || loadingApiData) return;

        return {
            count: {
                all: apiData.length,
                current: 0, //TODO: temp
            },
            occurrences: {
                max: Math.max(...apiData.map(o => o.attributes.col3.val)),
                all: apiData.reduce((acc, cur) => acc + cur.attributes.col3.val, 0),
            }
        }
    }
    const nameApprove = (id: IApiDataItem['id']) => {
        return;
    }
    const nameDismiss = (id: IApiDataItem['id']) => {
        return;
    }


    useEffect(() => {
        setSourceFromLocalStorage();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (source === '') {
            setLoadingApiData(false);
            return;
        }
        if (!getCurrentSourceConfig()?.value) {
            console.error('cant find config for current source');
            //TODO handle Error because cant find config for current source
            setLoadingApiData(false);
            return;
        }

        triggerfetchApiData(getCurrentSourceConfig().value, (x) => setApiData(x), (x) => setLoadingApiData(x));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source])

    useEffect(() => {
        if (loadingApiData) return;

        const sortedApiData = apiData.filter(filterDuplicates);
        console.log('### sortedApiData.length', sortedApiData.length)
        setApiData(sortedApiData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingApiData]);

    return {
        clearSource,
        getCurrentSourceConfig,
        getNextNameMeta,
        getNextNameToReviev,
        loadingApiData,
        nameApprove,
        nameDismiss,
        onSourceChange,
        selectedSex,
        source,
    }
}