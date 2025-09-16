"use client";

interface NoClinicsPopupProps {
  onClose: () => void;
}

const NoClinicsPopup = ({ onClose }: NoClinicsPopupProps) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#EBFFFD",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        zIndex: "1000",
        width: "500px"
      }}
    >
      <p style={{ margin: "10px 0" }}>
        Não encontramos clínicas com a especialidade selecionada dentro da
        distância informada?
      </p>
      <p style={{ margin: "10px 0" }}>
        Você pode tentar novamente usando outro endereço.
      </p>
      <button
        onClick={onClose}
        style={{
          backgroundColor: "#3E31AE",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Voltar
      </button>
    </div>
  );
};

export default NoClinicsPopup;
