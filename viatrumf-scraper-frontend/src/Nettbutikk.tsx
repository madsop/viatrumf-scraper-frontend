import { useEffect, useState } from "react";
import axios from "axios";
import baseurl from "./URL.ts";
import moment from "moment";
import "./Nettbutikk.css";
import Graf from "./Graf.tsx";
import { Innslag } from "./Innslag.ts";
import { trim } from "./Trim.ts";

interface Nettbutikktittel {
  namn: string;
}

function Nettbutikk({ namn }: Nettbutikktittel) {
  const [innslag, setInnslag] = useState<Innslag[]>([]);
  const [erUtdatert, setErUtdatert] = useState(false);

  useEffect(() => {
    axios.get(baseurl + "/nettbutikkar/" + namn).then((response) => {
      setInnslag(response.data);
    });
  }, [namn]);

  useEffect(() => {
    const sisteInnslag = innslag[innslag.length - 1];
    if (sisteInnslag === undefined) {
      setErUtdatert(false);
      return;
    }
    const somDato = moment(sisteInnslag.timestamp, "YYYYMMDDTHHmmssZ");
    setErUtdatert(somDato.isBefore(moment().subtract(1, "day").startOf("day")));
  }, [innslag]);

  return (
    <>
      {innslag.length && (
        <a
          href={"https://trumfnetthandel.no/" + innslag[0].href}
          target="_blank"
        >
          <h1>{trim(namn)}</h1>
        </a>
      )}
      <hr />
      {innslag.length && <div>URL: {JSON.stringify(innslag[0])}</div>}

      <Graf innslag={innslag} />

      {erUtdatert && (
        <div id="utdatert">
          Obs: Siste innslag er ikkje frå i dag. Det kan tyde at nettbutikken
          ikkje lenger er på Viatrumf.
        </div>
      )}
    </>
  );
}

export default Nettbutikk;
