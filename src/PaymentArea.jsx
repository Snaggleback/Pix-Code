import GenericButton from "./GenericButton";
import ReadOnlyInput from "./ReadOnlyInput";
import PIXCode from "../PIXCode";
import { formatCurrency } from "./CurrencyInput";
import { QRious } from "react-qrious";
import { FaPix } from "react-icons/fa6";

// Componente para exibir a área de pagamento
export default function PaymentArea({ data, onBack }) {
    const firstName = data?.name.trim() || "";
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
        <div className="text-center space-y-4 w-full flex flex-col break-words">
            <h1 className="text-2xl font-bold mt-2">Valeu {firstName}!</h1>
            <h2 className="text-sm font-bold text-zinc-400">
                Pix gerado no valor de R$ {formatCurrency(value * 100)}
            </h2>
            <div className="relative">
                <QRious value={copyPastePix} size={250} className="m-auto" />
                <div className="absolute inset-0 w-full h-full flex">
                    <FaPix className="m-auto w-14 h-14 bg-white p-3 text-orange-500"></FaPix>
                </div>
            </div>
            <p className="text-zinc-700 text-sm">
                Este código Pix pode ser pago quando quiser e quanto quiser.
            </p>
            <h2 className="text-lg font-bold">Pix Copia e Cola</h2>
            <ReadOnlyInput defaultValue={copyPastePix} />
            <GenericButton className="w-full" onClick={onBack}>
                Voltar
            </GenericButton>
        </div>
    );
}
