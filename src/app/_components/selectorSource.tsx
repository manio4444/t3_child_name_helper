import {Button, Card, CardBody, RadioGroup} from "@nextui-org/react";
import Link from "next/link";

import {type ISelectorSourceElement} from "~/app/selector/[sex]/page";
import {CustomRadio} from "~/app/_components/customRadio";
import {type IUseSelector} from "~/app/selector/[sex]/useSelector";

interface ISelectorSource {
    clearSource: IUseSelector['clearSource'];
    options: Array<ISelectorSourceElement>;
    selected: IUseSelector['source'];
    onValueChange: IUseSelector['onSourceChange'];
}

export default function SelectorSource({clearSource, options, selected, onValueChange}: ISelectorSource) {
    return (
        <Card>
            <CardBody>
                <RadioGroup
                    label="Wybierz bazę ze źródłami imion"
                    value={selected}
                    onValueChange={onValueChange}
                >
                    <CustomRadio isDisabled value="" description="Brak">{'Brak'}</CustomRadio>
                    {options.map((option) =>
                        <CustomRadio
                            key={option.index}
                            value={option.value}
                            description={option.desc}
                        >
                            {option.name ?? option.value}
                            &nbsp;
                            <Button>
                                <Link
                                    href={option.value}
                                    target="_blank"
                                >
                                    {'Otwórz plik JSON'}
                                </Link>
                            </Button>
                        </CustomRadio>
                    )}
                </RadioGroup>
                <br/>
                <Button onClick={clearSource}>clear</Button>
            </CardBody>
        </Card>
    )
}