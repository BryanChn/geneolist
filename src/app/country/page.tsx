"use client";
import { Cards } from "../components/cards";

export default function Country() {
    const countries = [
        // { name: "France", imageUrl: "/assets/france.png" },
        { name: "Tunisie", imageUrl: "/assets/tunisie.png" },
        { name: "Algerie", imageUrl: "/assets/algerie.png" },
        { name: "Maroc", imageUrl: "/assets/maroc.png" },
    ];
    return (
        <div className="flex flex-col items-center mt-16">
            <h1 className="text-3xl font-bold text-center mb-10 text-emerald-400">
                Choisissez un Pays
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {countries.map((country) => (
                    <div key={country.name} className="flex justify-center">
                        <Cards
                            country={country.name}
                            imageUrl={country.imageUrl}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
