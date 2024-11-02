import clsx from "clsx";

// Componente genérico de botão
export default function GenericButton({
    type = "button", // Definindo um tipo padrão para o botão
    className,
    children,
    ...props
}) {
    return (
        <button
            type={type}
            className={clsx(
                "w-full text-white bg-zinc-950 p-4 rounded-lg mt-4",
                className,
            )}
            aria-label={children ? undefined : "Botão genérico"} // Acessibilidade: fornece um rótulo se não houver texto
            {...props}
        >
            {children}{" "}
            {/* Renderiza qualquer conteúdo filho passado para o botão */}
        </button>
    );
}
