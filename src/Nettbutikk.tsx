import {useEffect, useState} from "react";
import axios from "axios";
import {backend} from "./URL.ts";
import moment from "moment";
import "./Nettbutikk.css";
import Graf from "./Graf.tsx";
import {Innslag, Type} from "./Innslag.ts";
import {trim} from "./Trim.ts";
import {formatTime} from "./FormatTime.ts";
import {Kilde} from "./Nettbutikker.tsx";

interface Nettbutikktittel {
  namn: string;
  kilde: Kilde;
}

const finnKildeURL = (kilde: Kilde) => {
  if (kilde === Kilde.TRUMF_NETTHANDEL) {
    return "https://trumfnetthandel.no/";
  } else if (kilde === Kilde.SAS_ONLINE_SHOPPING) {
    return "";
  }
}

function Nettbutikk({ namn, kilde }: Nettbutikktittel) {
  const [innslag, setInnslag] = useState<Innslag[]>([]);
  const [erUtdatert, setErUtdatert] = useState(false);
  const [reverserteInnslag, setReverserteInnslag] = useState<Innslag[]>([]);

  useEffect(() => {
    axios.get(backend + "/nettbutikkar/" + namn + "?collectionName=" + kilde).then((response) => {
      setInnslag(response.data);
      setReverserteInnslag([...response.data].reverse());
    });
  }, [namn, kilde]);

  useEffect(() => {
    const sisteInnslag = reverserteInnslag[0];
    if (sisteInnslag === undefined) {
      setErUtdatert(false);
      return;
    }
    const somDato = moment(sisteInnslag.timestamp, "YYYYMMDDTHHmmssZ");
    setErUtdatert(somDato.isBefore(moment().subtract(1, "day").startOf("day")));
  }, [reverserteInnslag, kilde]);

  return (
    <>
      {innslag.length && (
        <a
          href={finnKildeURL(kilde) + innslag[0].href}
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
            {enkeltinnslag.type && formaterType(enkeltinnslag.type)}
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

function formaterType(type: Type | undefined) {
  if (type === Type.NOK) {
    return " NOK";
  } else if (type === Type.PROSENT) {
    return "%";
  } else if (type === undefined) {
    return "";
  }
}