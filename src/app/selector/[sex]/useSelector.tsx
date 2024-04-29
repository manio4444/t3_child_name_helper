import {
    type ISelectorConfig,
    type ISelectorProps,
    type ISelectorSourceElement,
    type SEX_ENUM
} from "~/app/selector/[sex]/page";
import {useEffect, useState} from "react";

export interface IUseSelector {
    getCurrentSource: () => ISelectorSourceElement | undefined,
    onSourceChange: (value: string) => void;
    selectedSex: SEX_ENUM,
    source: string,
}

export default function useSelector(props: ISelectorProps, config: ISelectorConfig): IUseSelector {
    const [source, setSource] = useState('empty');

    const selectedSex = props.params.sex;
    const findSourceConfig = (sourceItem: ISelectorSourceElement) => sourceItem.value === source
    const getCurrentSource = () => config[selectedSex].sources.find(findSourceConfig);
    const onSourceChange = (value: string) => {
        localStorage.setItem(`selected_${selectedSex}_source`, value);
        setSource(value);
    }

    useEffect(() => {
        const source = localStorage.getItem(`selected_${selectedSex}_source`);
        if (!source) return;
        // TODO: Additional checking/error throw when source is set but does not exists in config?
        setSource(source);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        getCurrentSource,
        onSourceChange,
        selectedSex,
        source,
    }
}