import { useEffect, useState } from "react";
import axios from "axios";
import { backend } from "./URL.ts";
import moment from "moment";
import "./Nettbutikk.css";
import Graf from "./Graf.tsx";
import { Innslag } from "./Innslag.ts";
import { trim } from "./Trim.ts";
import { formatTime } from "./FormatTime.ts";

interface Nettbutikktittel {
  namn: string;
}

function Nettbutikk({ namn }: Nettbutikktittel) {
  const [innslag, setInnslag] = useState<Innslag[]>([]);
  const [erUtdatert, setErUtdatert] = useState(false);
  const [reverserteInnslag, setReverserteInnslag] = useState<Innslag[]>([]);

  useEffect(() => {
    axios.get(backend + "/nettbutikkar/" + namn).then((response) => {
      setInnslag(response.data);
      setReverserteInnslag(response.data.reverse());
    });
  }, [namn]);

  useEffect(() => {
    const sisteInnslag = reverserteInnslag[0];
    if (sisteInnslag === undefined) {
      setErUtdatert(false);
      return;
    }
    const somDato = moment(sisteInnslag.timestamp, "YYYYMMDDTHHmmssZ");
    console.log(somDato);
    console.log(moment().subtract(1, "day").startOf("day"));
    setErUtdatert(somDato.isBefore(moment().subtract(1, "day").startOf("day")));
  }, [reverserteInnslag]);

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

      <Graf innslag={innslag} />

      <select id="datapunkter">
        {reverserteInnslag.map((enkeltinnslag) => (
          <option
            value={enkeltinnslag.timestamp}
            key={enkeltinnslag.namn + enkeltinnslag.timestamp}
          >
            {formatTime(enkeltinnslag.timestamp) + ": " + enkeltinnslag.verdi}
          </option>
        ))}
      </select>

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
