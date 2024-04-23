import Link from "next/link";
import {Button} from "@nextui-org/react";

export enum SEX_ENUM {
    WOMEN = 'women',
    MEN = 'men',
}

interface ISelectorProps {
    params: {
        sex: SEX_ENUM;
    };
}

export default function Selector(props: ISelectorProps) {
    const {params} = props;
    console.log('props', props);
    return (
        <main>
            <Button>
                <Link
                    href={params.sex === SEX_ENUM.WOMEN ?
                        "https://api.dane.gov.pl/1.4/resources/54100,imiona-zenskie-nadane-dzieciom-w-polsce-w-2023-r-imie-pierwsze/data"
                        : "https://api.dane.gov.pl/1.4/resources/54099,imiona-meskie-nadane-dzieciom-w-polsce-w-2023-r-imie-pierwsze/data"
                    }
                    target="_blank"
                >
                    API LINK
                </Link>
            </Button>

            <div>{params.sex}</div>
            <div>
                {params.sex === SEX_ENUM.WOMEN ?
                    "Imiona żeńskie nadane dzieciom w Polsce w 2023 r. - imię pierwsze"
                    : "Imiona męskie nadane dzieciom w Polsce w 2023 r. - imię pierwsze"
                }
            </div>
        </main>
    )
}