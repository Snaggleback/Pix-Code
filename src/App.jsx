// Importando estilos e componentes necessários
import "./App.css";
import PaymentCard from "./PaymentCard";
import PaymentArea from "./PaymentArea";
import { useState } from "react";
import clsx from "clsx";

// Componente principal da aplicação
export default function App() {
    return (
        <div className="w-screen h-screen bg-zinc-900 flex items-center justify-center">
            <MainContainer />
        </div>
    );
}

// Componente de contêiner para centralizar o conteúdo
function MainContainer() {
    const [isSubmitted, setIsSubmitted] = useState(false); // Estado para alternar entre conteúdo

    return (
        <div className="flex flex-col justify-center items-center w-[400px] max-h-[90%] max-w-[90%] bg-white p-6 rounded-xl shadow-lg">
            {isSubmitted ? (
                <PaymentArea onBack={() => setIsSubmitted(false)} />
            ) : (
                <PaymentCard onSubmit={() => setIsSubmitted(true)} />
            )}
        </div>
    );
}
