import { useEffect, useState } from "react";
import axios from "axios";
import "./Nettbutikker.css";
import Nettbutikk from "./Nettbutikk.tsx";
import { backend } from "./URL.ts";
import { trim } from "./Trim.ts";

function Nettbutikker() {
  const [nettbutikker, setNettbutikker] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [valgtNettbutikk, setValgtNettbutikk] = useState<string | undefined>(
    undefined,
  );

  const sort = (a: string, b: string): number => {
    if (!a) return 1;
    if (!b) return 1;
    return a.toLowerCase().localeCompare(b.toLowerCase());
  };

  useEffect(() => {
    axios
      .get(backend + "/nettbutikkar")
      .then((response) => response.data.sort(sort))
      .then((data) => {
        setNettbutikker(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Historikk for nettbutikkar på Viatrumf</h1>
      {!valgtNettbutikk && (
        <p>
          Usikker på om Viatrumf-bonusen på nettbutikken du vil handle hos har
          gått opp, ned eller er uendra? Sjekk ved å velje butikken i
          nedtrekkslista.
        </p>
      )}
      {loading && <h2>Laster...</h2>}
      {!loading && (
        <select
          defaultValue={"Velg"}
          value={valgtNettbutikk}
          onChange={(e) => setValgtNettbutikk(e.target.value)}
        >
          <option value="Velg" disabled>
            Velg nettbutikk
          </option>
          {nettbutikker.map((nettbutikk) => (
            <option value={nettbutikk} key={nettbutikk}>
              {trim(nettbutikk)}
            </option>
          ))}
        </select>
      )}
      {valgtNettbutikk && (
        <button onClick={() => setValgtNettbutikk(valgtNettbutikk)}>
          <img id="reloadIcon" src="../public/reload-icon.png" alt="reload" />
        </button>
      )}
      {valgtNettbutikk && <Nettbutikk namn={valgtNettbutikk} />}
    </>
  );
}
export default Nettbutikker;
