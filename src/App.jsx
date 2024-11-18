// Importando estilos e componentes necessários
import "./App.css"; // Importa o arquivo de estilos CSS para a aplicação
import PaymentCard from "./PaymentCard"; // Importa o componente PaymentCard
import PaymentArea from "./PaymentArea"; // Importa o componente PaymentArea
import { useState } from "react"; // Importa o hook useState para gerenciar estados

// Componente principal da aplicação
export default function App() {
    return (
        // Container que ocupa toda a tela, com fundo escuro e centralização do conteúdo
        <div className="w-screen h-screen bg-[url('./assets/background.png')] bg-repeat flex items-center justify-center">
            <MainContainer /> {/* Renderiza o componente MainContainer */}
        </div>
    );
}

// Componente de contêiner para centralizar o conteúdo
function MainContainer() {
    // Estado para alternar entre o conteúdo de submissão, carregamento e exibição final
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Função para iniciar a animação de carregamento e depois exibir o PaymentArea
    const handleSubmit = () => {
        setIsLoading(true); // Inicia a animação de carregamento
        setTimeout(() => {
            setIsLoading(false); // Termina a animação de carregamento
            setIsSubmitted(true); // Define que a submissão foi realizada e exibe o PaymentArea
        }, 1500); // Tempo de duração da animação (1,5 segundos)
    };

    return (
        <div className="flex flex-col justify-center items-center w-[400px] h-max max-w-[90%] bg-white p-6 rounded-xl shadow-lg">
            {isLoading ? (
                // Se estiver carregando, exibe a animação de carregamento
                <LoadingSpinner />
            ) : isSubmitted ? (
                // Se a submissão foi realizada, exibe o PaymentArea
                <PaymentArea onBack={() => setIsSubmitted(false)} />
            ) : (
                // Caso contrário, exibe o PaymentCard
                <PaymentCard onSubmit={handleSubmit} />
            )}
        </div>
    );
}

// Componente de animação de carregamento
function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-4">
            {/* Animação de carregamento usando borda circular com rotação */}
            <div className="w-6 h-6 border-2 border-t-transparent border-red-500 rounded-full animate-spin"></div>
            {/* Texto informando que está carregando */}
            <p className="ml-3 text-red-500">Carregando...</p>
        </div>
    );
}
