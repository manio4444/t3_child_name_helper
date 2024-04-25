'use client';

import {useEffect, useState} from "react";
import {
    Card,
    CardBody,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tabs
} from "@nextui-org/react";

import SelectorSource from "~/app/_components/selectorSource";

export enum SEX_ENUM {
    WOMEN = 'women',
    MEN = 'men',
}

interface ISelectorProps {
    params: {
        sex: SEX_ENUM;
    };
}
export type ISelectorConfig = {
    [key in SEX_ENUM]: {
        title: string;
        sources: Array<{
            index: number;
            name: string;
            desc?: string;
            value: string;
        }>
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
    const selectedSex = props.params.sex;
    const [source, setSource] = useState('empty');

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

    return (
        <main>
            <Card>
                <CardBody>
                    <h4 className="font-bold text-large pb-3">Wybierajka - {config[selectedSex].title}</h4>

                    <div className="flex full flex-col">
                        <Tabs aria-label="Options">
                            <Tab key="selector" title="Wybieraj imię">
                                <Card>
                                    <CardBody>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab key="choices" title="Poprzednie decyzje">
                                {/*<SelectorHistory*/}
                                {/*    currentSource={config.find(findSourceConfig)}*/}
                                {/*/>*/}
                                <Table aria-label="Example static collection table">
                                    <TableHeader>
                                        <TableColumn>NAME</TableColumn>
                                        <TableColumn>ROLE</TableColumn>
                                        <TableColumn>STATUS</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key="1">
                                            <TableCell>Tony Reichert</TableCell>
                                            <TableCell>CEO</TableCell>
                                            <TableCell>Active</TableCell>
                                        </TableRow>
                                        <TableRow key="2">
                                            <TableCell>Zoey Lang</TableCell>
                                            <TableCell>Technical Lead</TableCell>
                                            <TableCell>Paused</TableCell>
                                        </TableRow>
                                        <TableRow key="3">
                                            <TableCell>Jane Fisher</TableCell>
                                            <TableCell>Senior Developer</TableCell>
                                            <TableCell>Active</TableCell>
                                        </TableRow>
                                        <TableRow key="4">
                                            <TableCell>William Howard</TableCell>
                                            <TableCell>Community Manager</TableCell>
                                            <TableCell>Vacation</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Tab>
                            <Tab key="source" title="Źródło imion">
                                <SelectorSource
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