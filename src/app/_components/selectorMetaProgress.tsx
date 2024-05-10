import {Spacer} from "@nextui-org/react";

import {type INextNameMeta} from "~/app/selector/[sex]/useSelector";
import ProgressCard from "~/app/_components/progressCard";

interface ISelectorMetaProgress {
    nextNameMeta?: INextNameMeta;
}

export default function SelectorMetaProgress({nextNameMeta}: ISelectorMetaProgress) {

    if (nextNameMeta === undefined) {
        return null;
    }

    return <>
        <ProgressCard
            label={`Przejrzane ${nextNameMeta.decisions.all}/${nextNameMeta.count.all}`}
            value={Number(((nextNameMeta.decisions.all / nextNameMeta.count.all) * 100).toFixed())}
        />
        <Spacer className="pt-0 bg-rose-500"/>
        <ProgressCard
            label={`Imiona na "tak"`}
            formatOptions={{style: 'decimal'}}
            maxValue={nextNameMeta.decisions.all}
            color="success"
            classNames={{
                track: ' bg-[#f31260]'
            }}
            value={nextNameMeta.decisions.positive}
        />
    </>


}