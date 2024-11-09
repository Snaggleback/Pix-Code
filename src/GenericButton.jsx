import clsx from "clsx"; // Importando a biblioteca clsx para gerenciar classes dinâmicas

// Componente genérico de botão
export default function GenericButton({
    type = "button", // Definindo o tipo do botão, com valor padrão "button" caso não seja passado
    className, // Classe adicional para personalização do botão
    children, // Conteúdo filho do botão (texto ou outros elementos)
    ...props // Outras propriedades adicionais passadas para o botão
}) {
    return (
        <button
            type={type} // Definindo o tipo do botão (ex.: "button", "submit", "reset")
            className={clsx(
                "w-full text-white bg-zinc-950 p-4 rounded-lg mt-4", // Classes padrão do botão
                className, // Adiciona classes extras fornecidas pela prop `className`
            )}
            aria-label={children ? undefined : "Botão genérico"} // Acessibilidade: define um rótulo acessível se não houver conteúdo (children)
            {...props} // Passa quaisquer outras props (como onClick, disabled, etc.) para o botão
        >
            {children}{" "}
            {/* Renderiza o conteúdo filho passado para o botão, que pode ser texto ou componentes */}
        </button>
    );
}
