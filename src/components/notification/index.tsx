import { useState } from "react";
import { createPortal } from "react-dom";

import "animate.css";
import { notification } from "../../shared/utils";

export default function Notification() {
  const [openModal, setOpenModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleOpenModalNotification = () => {
    setOpenModal(true);
    setIsClosing(false);
  };

  const handleCloseModalNotification = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenModal(false);
      setIsClosing(false);
    }, 1000); // Duração da animação
  };

  const NotificationModal = () => {
    if (!openModal) return null;

    return createPortal(
      <div className="fixed inset-0 right-0 top-20 z-30 flex justify-end md:right-10  ">
        <div
          className={`animate__animated max-h-[750px] w-[490px] min-w-[490px] bg-agenda-saude-green-100 ${isClosing ? "animate__fadeOutUpBig" : "animate__fadeInDownBig"}`}
        >
          <button
            onClick={handleCloseModalNotification}
            className="absolute right-4 top-4 text-3xl transition-opacity hover:opacity-70"
          >
            ✕
          </button>

          <div className="p-6  ">
            <h2 className="mb-4 font-museo text-2xl font-bold">Notificações</h2>
          </div>
          <ul className="scroll-custom flex h-[600px] flex-col overflow-y-auto px-6">
            {notification.length > 0 ? (
              notification.map((item) => (
                <li
                  key={item.id}
                  className=" mb-2 rounded-md border border-agenda-saude-green-100 bg-agenda-saude-green-50"
                >
                  <div className=" flex w-full flex-col gap-2 p-3">
                    <p className="text-xl font-bold text-black">{item.title}</p>
                    <p className="line-clamp-3 text-base font-medium text-black">
                      {item.mensagem}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-black">Nenhuma notificação disponível</p>
            )}
          </ul>
        </div>
      </div>,
      document.body
    );
  };

  return {
    NotificationModal,
    handleOpenModalNotification,
    handleCloseModalNotification,
    openModal // opcional: exportar o estado se precisar em outro lugar
  };
}
