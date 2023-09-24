interface BotaoProps {
  texto: string;
}

export default function Botao({ texto }: BotaoProps) {
  return (
    <button className="w-full rounded bg-green-700 p-2 font-bold text-white">
      {texto}
    </button>
  );
}
