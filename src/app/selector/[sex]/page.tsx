import Link from "next/link";

interface ISelectorProps {
    params: {
        sex: string;
    };
}

export default function Selector(props: ISelectorProps) {
    const {params} = props;
    console.log('props', props);
    return (
        <main>
            <Link
                href={params.sex === "women" ?
                    "https://api.dane.gov.pl/1.4/resources/54100,imiona-zenskie-nadane-dzieciom-w-polsce-w-2023-r-imie-pierwsze/data"
                    : "https://api.dane.gov.pl/1.4/resources/54099,imiona-meskie-nadane-dzieciom-w-polsce-w-2023-r-imie-pierwsze/data"
                }
                target="_blank"
            >
                API LINK
            </Link>
            <div>{params.sex}</div>
            <div>
                {params.sex === "women" ?
                    "Imiona żeńskie nadane dzieciom w Polsce w 2023 r. - imię pierwsze"
                    : "Imiona męskie nadane dzieciom w Polsce w 2023 r. - imię pierwsze"
                }
            </div>
        </main>
    )
}