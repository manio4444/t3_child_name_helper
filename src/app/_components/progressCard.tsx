import {Card, CardHeader, Divider, Progress, type ProgressProps} from "@nextui-org/react";

export default function ProgressCard(props: ProgressProps) {

    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex">
                <Progress
                    label="Przejrzane"
                    showValueLabel
                    size="sm"
                    {...props}
                />
            </CardHeader>
            <Divider/>
        </Card>
    )
};