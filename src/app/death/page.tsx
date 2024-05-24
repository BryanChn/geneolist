"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tables } from "../components/table";

export default function Death() {
    const searchParams = useSearchParams();
    const country = searchParams.get("country");
    const [deaths, setDeaths] = useState([]);

    useEffect(() => {
        if (country) {
            fetch(`/api/death?country=${country}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => setDeaths(data))
                .catch((error) =>
                    console.error("Error fetching deaths:", error)
                );
        }
    }, [country]);

    return (
        <div>
            <h1>Décès en {country}</h1>
            <Tables data={deaths} />
        </div>
    );
}
