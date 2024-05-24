import { image } from "@nextui-org/theme";
import { Cards } from "../components/cards";

export default function Country() {
    const countries = [
        { name: "France", imageUrl: "/assets/france.png" },
        { name: "Tunisie", imageUrl: "/assets/tunisie.png" },
    ];
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1>Choisisez un Pays</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {countries.map((country) => (
                    <Cards
                        key={country.name}
                        country={country.name}
                        imageUrl={country.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
}
