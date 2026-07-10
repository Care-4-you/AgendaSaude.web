import { useState } from "react";
import { createPortal } from "react-dom";

import "animate.css";
import { notification } from "../../shared/utils";
import { Button } from "../ui/button";

export default function Notification() {
  const [openModal, setOpenModal] = useState<boolean>();
  const [isClosing, setIsClosing] = useState<boolean>();
  const [notifications, setNotifications] = useState(notification || []);

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

  const handleCloseNotificationImmediate = (id: number) => {
    //setNotifications((prevNotifications) => prevNotifications.filter((item) => item.id !== id));
    setIsClosing(false);
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
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <li
                  key={item.id}
                  className=" mb-2 rounded-xl border border-agenda-saude-green-50 bg-agenda-saude-green-50"
                >
                  <div className=" relative flex w-full flex-col gap-2 px-4 py-5">
                    <button
                      type="button"
                      onClick={() => handleCloseNotificationImmediate(item.id)}
                      className="text-md absolute right-4 top-4 transition-opacity hover:opacity-70"
                    >
                      ✕
                    </button>

                    <p className="text-base font-semibold text-black">
                      {item.title}
                    </p>
                    <p className="line-clamp-3 font-poppins text-xs font-medium text-stone-800">
                      {item.mensagem}
                    </p>
                    {item.confimation && (
                      <div className="top-3 flex w-full items-end justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-2 border-agenda-saude-green-50 px-7 py-2"
                        >
                          Não
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-agenda-saude-purple-300 px-7 py-2 hover:bg-agenda-saude-purple-300"
                        >
                          Sim
                        </Button>
                      </div>
                    )}
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
