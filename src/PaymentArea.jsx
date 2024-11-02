import GenericButton from "./GenericButton";
import ReadOnlyInput from "./ReadOnlyInput";
import PIXCode from "../PIXCode";
import { QRious } from "react-qrious";
import pixLogo from "./assets/pix-logo.png";

// Componente para exibir a área de pagamento
export default function PaymentArea({ data, onBack }) {
    const firstName = PIXCode.formatText(data?.name) || "";
    const value = data?.value || 0;
    const message = data?.message || "";

    const pixCode = new PIXCode(
        "d5d4dbee-b1eb-4c8b-82b7-7fd1acb519b2",
        "random",
        value,
        "Italo S Luz",
        "",
        message,
    );

    const copyPastePix = pixCode.generate();

    return (
        <div className="text-center space-y-4 w-full flex flex-col">
            <h1 className="text-2xl font-bold text-green-600 mt-2">
                Obrigado {firstName}!
            </h1>
            <p className="text-zinc-700 text-sm">
                Este código Pix é de uso geral e não tem data de validade.
            </p>
            <div className="relative">
                <QRious value={copyPastePix} size={250} className="m-auto" />
                <div className="absolute inset-0 w-full h-full flex">
                    <img
                        src={pixLogo}
                        alt="Logo PIX"
                        className="m-auto w-12 h-12 bg-white p-1.5"
                    />
                </div>
            </div>
            <h2 className="text-lg font-bold">Pix Copia e Cola</h2>
            <ReadOnlyInput defaultValue={copyPastePix} />
            <GenericButton className="w-full" onClick={onBack}>
                Voltar
            </GenericButton>
        </div>
    );
}
