"use client";

import { Card, CardBody, Spacer, Tab, Tabs } from "@nextui-org/react";

import SelectorSource from "~/app/_components/selectorSource";
import SelectorHistory from "~/app/_components/selectorHistory";
import SelectorSelect from "~/app/_components/selectorSelect";
import useSelector from "~/app/selector/[sex]/useSelector";
import SelectorMetaProgress from "~/app/_components/selectorMetaProgress";
import LastDecisionsCard from "~/app/_components/lastDecisionsCard";

enum SEX_ENUM {
  WOMEN = "women",
  MEN = "men",
}

export type TSex = SEX_ENUM;

export interface ISelectorProps {
  params: {
    sex: TSex;
  };
}

export type ISelectorSourceElement = {
  index: number;
  name: string;
  desc?: string;
  value: string;
};

export type ISelectorConfig = Record<
  TSex,
  {
    title: string;
    sources: Array<ISelectorSourceElement>;
  }
>;

const config: ISelectorConfig = {
  [SEX_ENUM.WOMEN]: {
    title: "Imiona żeńskie",
    sources: [
      {
        index: 0,
        name: "Imiona żeńskie nadane dzieciom w Polsce w 2023 r. - imię pierwsze",
        desc: "Źródło: api.dane.gov.pl",
        value:
          "https://api.dane.gov.pl/1.4/resources/54100,imiona-zenskie-nadane-dzieciom-w-polsce-w-2023-r-imie-pierwsze/data",
      },
    ],
  },
  [SEX_ENUM.MEN]: {
    title: "Imiona męskie",
    sources: [
      {
        index: 0,
        name: "Imiona męskie nadane dzieciom w Polsce w 2023 r. - imię pierwsze",
        desc: "Źródło: api.dane.gov.pl",
        value:
          "https://api.dane.gov.pl/1.4/resources/54099,imiona-meskie-nadane-dzieciom-w-polsce-w-2023-r-imie-pierwsze/data",
      },
    ],
  },
};

export default function SelectorPage(props: ISelectorProps) {
  const {
    apiData,
    clearDecisions,
    clearSource,
    decisions,
    getCurrentSourceConfig,
    getNextNameMeta,
    getNextNameToReviev,
    loadingApiData,
    onDecisionsChange,
    onSourceChange,
    selectedSex,
    source,
  } = useSelector(props, config);

  return (
    <main>
      <Card>
        <CardBody>
          <h4 className="pb-3 text-large font-bold">
            Wybierajka - {config[selectedSex].title}
          </h4>

          <div className="full flex flex-col">
            <Tabs aria-label="Options">
              <Tab key="selector" title="Wybieraj imię">
                <SelectorMetaProgress nextNameMeta={getNextNameMeta()} />
                <Spacer className="pb-2.5" />
                <SelectorSelect
                  currentSource={getCurrentSourceConfig()}
                  loadingApiData={loadingApiData}
                  nextNameToReviev={getNextNameToReviev()}
                  nextNameMeta={getNextNameMeta()}
                  onDecisionsChange={onDecisionsChange}
                />
                <Spacer className="pb-2.5" />
                <LastDecisionsCard
                  apiData={apiData}
                  decisions={decisions.slice(-5)}
                  loadingApiData={loadingApiData}
                  onDecisionsChange={onDecisionsChange}
                />
              </Tab>
              <Tab key="choices" title="Poprzednie decyzje">
                <SelectorHistory
                  apiData={apiData}
                  clearDecisions={clearDecisions}
                  currentSource={getCurrentSourceConfig()}
                  decisions={decisions}
                  loadingApiData={loadingApiData}
                  onDecisionsChange={onDecisionsChange}
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
  );
}
