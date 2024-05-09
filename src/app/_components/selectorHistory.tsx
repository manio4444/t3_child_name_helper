import {Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

import ErrorCard from "~/app/_components/errorCard";
import {type IApiDataItem, type IUseSelector} from "~/app/selector/[sex]/useSelector";
import LoadingCard from "~/app/_components/loadingCard";
import type {ISelectorSourceElement} from "~/app/selector/[sex]/page";

interface ISelectorHistory extends Pick<IUseSelector, "apiData" | "decisions" | "loadingApiData"> {
    currentSource?: ISelectorSourceElement;
}

export default function SelectorHistory({apiData, currentSource, decisions, loadingApiData}: ISelectorHistory) {
    const findNameDataById = (nameData: IApiDataItem, nameId: IApiDataItem['id']) => nameData.id === nameId;

    if (loadingApiData) {
        return <LoadingCard desc="Ładowanie bazy imion"/>
    }

    if (!currentSource) {
        return <ErrorCard desc={'Nie wybrano źródła imion.'}/>
    }

    if (!decisions) {
        return <ErrorCard desc={'Nie znaleziono żadnych decyzji tak/nie dotyczących imion.'}/>
    }

    return (
        <Card>
            <CardBody>
                <h4 className="font-bold text-lg pb-3">Ostatnie decyzje</h4>

                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Imię</TableColumn>
                        <TableColumn>?</TableColumn>
                        <TableColumn>Data decyzji</TableColumn>
                        <TableColumn>Godzina decyzji</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {decisions?.reverse().map((decision, index) => {
                            const nameData = apiData.find(nameData => findNameDataById(nameData, decision.nameId));
                            const decisionDate = new Date(decision.dateChange);
                            return (
                                <TableRow key={index}>
                                    <TableCell>{nameData?.attributes.col1.val}</TableCell>
                                    <TableCell>{decision.decision ? "✔" : "❌"}</TableCell>
                                    <TableCell>{decisionDate.toLocaleDateString()}</TableCell>
                                    <TableCell>{decisionDate.toLocaleTimeString()}</TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>

                <h4 className="font-bold text-lg pb-3 pt-4">Wszystkie imiona</h4>

                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Imię</TableColumn>
                        <TableColumn>Płeć</TableColumn>
                        <TableColumn>Ilość wystąpień</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {apiData?.map(nameData => (
                            <TableRow key={nameData.id}>
                                <TableCell>{nameData.attributes.col1.val}</TableCell>
                                <TableCell>{nameData.attributes.col2.val}</TableCell>
                                <TableCell>{nameData.attributes.col3.val}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    )
}