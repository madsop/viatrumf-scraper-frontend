import { useEffect, useState } from "react"
import axios from 'axios'
import baseurl from "./URL.ts"

interface Nettbutikktittel {
    namn: string
}

interface Innslag {
    href: string,
    kategori: string | undefined,
    namn: string,
    popularitet: Number,
    timestamp: string,
    verdi: string
}

function Nettbutikk({ namn } : Nettbutikktittel) {
    
    const [innslag, setInnslag] = useState<Innslag[]>([])

    useEffect(() => {
        axios.get(baseurl + '/nettbutikkar/' + namn).then(response => {
            setInnslag(response.data)})},
         [namn]
    )

    const trim = (input: string): string => {
        return input
        .replace(/%/g, '')
        .replace(/kr/g, '')
        .replace(' ', '')
        .replace(',', '.')
    }

    return (
        <>
        {innslag.length && 
        <a href={"https://trumfnetthandel.no/" + innslag[0].href} target="_blank"><h1>{ trim(namn) }</h1></a>}
        {namn}
        {innslag.length && <div>
            URL: {JSON.stringify(innslag[0])}
        </div>}
        </>
    )
}

export default Nettbutikk