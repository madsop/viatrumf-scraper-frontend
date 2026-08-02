import {useEffect, useState} from "react";
import axios from "axios";
import "./Nettbutikker.css";
import Nettbutikk from "./Nettbutikk.tsx";
import {backend} from "./URL.ts";
import {trim} from "./Trim.ts";

function Nettbutikker() {
    const [nettbutikker, setNettbutikker] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [valgtNettbutikk, setValgtNettbutikk] = useState<string | undefined>(
        undefined,
    );
    const [kilde, setKilde] = useState<Kilde>(Kilde.TRUMF_NETTHANDEL);

    const sort = (a: string, b: string): number => {
        if (!a) return 1;
        if (!b) return 1;
        return a.toLowerCase().localeCompare(b.toLowerCase());
    };

    useEffect(() => {
        axios
            .get(backend + "/nettbutikkar?collectionName=" + kilde)
            .then((response) => response.data.sort(sort))
            .then((data) => {
                setNettbutikker(data);
                setLoading(false);
            });
    }, [kilde]);

    useEffect(() => {
        setValgtNettbutikk(undefined)
    }, [kilde]);

    return (
        <>
            {!loading && (
                <form>
                    <input type={"radio"} id={"trumf-input"} value={Kilde.TRUMF_NETTHANDEL}
                           onChange={() => setKilde(Kilde.TRUMF_NETTHANDEL)}
                           checked={kilde === Kilde.TRUMF_NETTHANDEL}/>
                    <label htmlFor={"trumf-input"}>Trumf netthandel</label>
                    <input type={"radio"} id={"sas-input"} value={Kilde.SAS_ONLINE_SHOPPING}
                           onChange={() => setKilde(Kilde.SAS_ONLINE_SHOPPING)}
                           checked={kilde === Kilde.SAS_ONLINE_SHOPPING}/>
                    <label htmlFor={"sas-input"}>SAS Online Shopping</label>
                </form>
            )}
            {!valgtNettbutikk && (
                <>
                    <h1>{formaterKilde(kilde)}-historikk</h1>
                    <p>
                        Usikker på om {formaterKilde(kilde)}-bonusen på nettbutikken du vil handle hos har
                        gått opp, ned eller er uendra? Sjekk ved å velje butikken i
                        nedtrekkslista.
                    </p>
                </>
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
            {valgtNettbutikk && <Nettbutikk namn={valgtNettbutikk} kilde={kilde}/>}
        </>
    );
}

export default Nettbutikker;

export enum Kilde {
    TRUMF_NETTHANDEL = "TRUMF_NETTHANDEL", SAS_ONLINE_SHOPPING = "SAS_ONLINE_SHOPPING"

}

export const formaterKilde = (kilde: Kilde) => {
    if (kilde === Kilde.TRUMF_NETTHANDEL) {
        return "Trumf netthandel";
    } else if (kilde === Kilde.SAS_ONLINE_SHOPPING) {
        return "SAS Online Shopping"
    }
}