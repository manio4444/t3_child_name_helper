'use client';

import {
    Card,
    CardBody,
    Tab,
    Tabs
} from "@nextui-org/react";

import SelectorSource from "~/app/_components/selectorSource";
import SelectorHistory from "~/app/_components/selectorHistory";
import SelectorSelect from "~/app/_components/selectorSelect";
import useSelector from "~/app/selector/[sex]/useSelector";

export enum SEX_ENUM {
    WOMEN = 'women',
    MEN = 'men',
}

export interface ISelectorProps {
    params: {
        sex: SEX_ENUM;
    };
}

export type ISelectorSourceElement = {
    index: number;
    name: string;
    desc?: string;
    value: string;
};

export type ISelectorConfig = {
    [key in SEX_ENUM]: {
        title: string;
        sources: Array<ISelectorSourceElement>
    };
};

const config: ISelectorConfig =
    {
        [SEX_ENUM.WOMEN]: {
            title: 'Imiona żeńskie',
            sources: [
                {
                    index: 0,
                    name: "Imiona żeńskie nadane dzieciom w Polsce w 2023 r. - imię pierwsze",
                    desc: 'Źródło: api.dane.gov.pl',
                    value: 'https://api.dane.gov.pl/1.4/resources/54100,imiona-zenskie-nadane-dzieciom-w-polsce-w-2023-r-imie-pierwsze/data',
                }
            ]
        },
        [SEX_ENUM.MEN]: {
            title: 'Imiona męskie',
            sources: [
                {
                    index: 0,
                    name: "Imiona męskie nadane dzieciom w Polsce w 2023 r. - imię pierwsze",
                    desc: 'Źródło: api.dane.gov.pl',
                    value: 'https://api.dane.gov.pl/1.4/resources/54099,imiona-meskie-nadane-dzieciom-w-polsce-w-2023-r-imie-pierwsze/data',
                }
            ]
        },
    }

export default function SelectorPage(props: ISelectorProps) {
    const {
        clearSource,
        getCurrentSourceConfig,
        getNextNameToReviev,
        loadingApiData,
        onSourceChange,
        selectedSex,
        source,
    } = useSelector(props, config);

    return (
        <main>
            <Card>
                <CardBody>
                    <h4 className="font-bold text-large pb-3">Wybierajka - {config[selectedSex].title}</h4>

                    <div className="flex full flex-col">
                        <Tabs aria-label="Options">
                            <Tab key="selector" title="Wybieraj imię">
                                <SelectorSelect
                                    currentSource={getCurrentSourceConfig()}
                                    loadingApiData={loadingApiData}
                                    nextNameToReviev={getNextNameToReviev()}
                                />
                            </Tab>
                            <Tab key="choices" title="Poprzednie decyzje">
                                <SelectorHistory
                                    currentSource={getCurrentSourceConfig()}
                                />
                            </Tab>
                            <Tab key="source" title="Źródło imion">
                                <SelectorSource
                                    clearSource={clearSource}
                                    selected={source}
                                    onValueChange={onSourceChange}
                                    options={config[selectedSex].sources}
                                />
                            </Tab>
                        </Tabs>
                    </div>
                </CardBody>
            </Card>
        </main>
    )
}