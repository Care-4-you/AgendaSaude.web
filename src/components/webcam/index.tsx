"use client";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "../ui/button";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export default function useDialogWebCam() {
  const [openModal, setOpenModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleOpenModalWebCam = () => {
    setOpenModal(true);
  };

  const handleCloseModalWebCam = () => {
    setOpenModal(false);
  };

  const DialogComponentWebCam = () => {
    const webcamRef = useRef<Webcam | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    const handleUserMedia = () => {
      setIsCameraReady(true);
    };

    const capture = useCallback(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setPreview(imageSrc);
      }
      setIsCameraReady(false);
    }, [webcamRef]);

    const confirmCapture = () => {
      if (preview) {
        setCapturedImage(preview);
      }
      handleCloseModalWebCam();
      setPreview(null);
      setIsCameraReady(false);
    };

    const retakePhoto = () => {
      setPreview(null);
      setIsCameraReady(true);
    };

    const handleModalChange = (open: boolean) => {
      setOpenModal(open);
      if (!open) {
        setPreview(null);
        setIsCameraReady(false);
      }
    };

    return (
      <Dialog open={openModal} onOpenChange={handleModalChange}>
        <DialogContent className="flex !min-h-80  !max-w-2xl flex-col items-center justify-center gap-6 !rounded-3xl bg-[#EBFFFD] !p-8 !px-7">
          {!isCameraReady && !preview && (
            <div className="flex items-center justify-center">
              <p className="text-lg font-medium">Carregando câmera...</p>
            </div>
          )}
          {preview && (
            <div className="flex flex-col items-center gap-4">
              <Image
                src={preview}
                alt="Preview"
                className="max-w-full rounded-md border"
                width={1280}
                height={720}
              />
              <div className="flex gap-4">
                <Button
                  onClick={retakePhoto}
                  type="button"
                  variant="outline"
                  size="lg"
                  className="font-poppins text-lg font-semibold"
                >
                  Tirar novamente
                </Button>
                <Button
                  onClick={confirmCapture}
                  type="button"
                  variant="default"
                  size="lg"
                  className="bg-agenda-saude-purple-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100 hover:bg-agenda-saude-purple-100/90"
                >
                  Confirmar foto
                </Button>
              </div>
            </div>
          )}
          <div
            style={{ display: isCameraReady && !preview ? "block" : "none" }}
          >
            <Webcam
              audio={false}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              mirrored
              width={1280}
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
            />
          </div>
          {isCameraReady && !preview && (
            <footer className="">
              <Button
                onClick={capture}
                type="button"
                variant="default"
                size="lg"
                className=" bg-agenda-saude-purple-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100 hover:bg-agenda-saude-purple-100/90"
              >
                Capturar foto
              </Button>
            </footer>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  return {
    DialogComponentWebCam,
    handleOpenModalWebCam,
    handleCloseModalWebCam,
    capturedImage,
    setCapturedImage
  };
}
