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
    const [formData, setFormData] = useState(null); // Estado para armazenar os dados do formulário

    const handlePaymentSubmit = (data) => {
        setFormData(data); // Armazena os dados do formulário
        setIsSubmitted(true); // Alterna para a área de pagamento
    };

    return (
        <div className="flex flex-col justify-center items-center w-[400px] max-h-[90%] max-w-[90%] bg-white p-6 rounded-xl shadow-lg">
            <div className={clsx("contents", { hidden: isSubmitted })}>
                <PaymentCard onSubmit={handlePaymentSubmit} />
            </div>
            <div className={clsx("contents", { hidden: !isSubmitted })}>
                <PaymentArea
                    data={formData}
                    onBack={() => setIsSubmitted(false)}
                />
            </div>
        </div>
    );
}
