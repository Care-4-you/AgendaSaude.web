"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";

interface Contact {
  id?: number;
  name: string;
  phone?: string;
  mobile?: string;
  crm?: string;
  email?: string;
  cpf?: string;
  photo: string;
  createdAt?: string;
}

interface AlphabeticalContactListProps {
  contacts: Contact[];
  className?: string;
  onContactClick?: (contact: Contact) => void;
}

export function AlphabeticalContactList({
  contacts,
  className,
  onContactClick
}: AlphabeticalContactListProps) {
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const groupedContacts = useMemo(() => {
    const groups: Record<string, Contact[]> = {};

    contacts.forEach((contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(contact);
    });

    // Ordena as letras alfabeticamente
    const sortedLetters = Object.keys(groups).sort();

    return sortedLetters.map((letter) => ({
      letter,
      contacts: groups[letter].sort((a, b) => a.name.localeCompare(b.name))
    }));
  }, [contacts]);

  // Fechar todos os popovers no scroll
  useEffect(() => {
    const handleScroll = () => {
      setOpenPopovers({});
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePopoverChange = (contactKey: string, open: boolean) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [contactKey]: open
    }));
  };

  return (
    <div
      ref={containerRef}
      className={cn("rounded-lg bg-transparent p-4 ", className)}
    >
      {groupedContacts.length > 0 ? (
        groupedContacts.map((group, groupIndex) => (
          <div key={group.letter} className={cn(groupIndex > 0 && "mt-6")}>
            <div className="my-2 flex max-h-96 items-center gap-2 overflow-y-auto">
              <span className="text-sm font-bold text-white">
                {group.letter}
              </span>
              <div className="h-px flex-1 bg-slate-600" />
            </div>
            <ul className="mt-2 space-y-1">
              {group.contacts.map((contact, contactIndex) => {
                const contactKey = `${group.letter}-${contactIndex}`;
                return (
                  <Popover
                    key={contact.id ?? contactKey}
                    open={openPopovers[contactKey] || false}
                    onOpenChange={(open) =>
                      handlePopoverChange(contactKey, open)
                    }
                  >
                    <li
                      key={contact.id ?? contactKey}
                      className={cn(
                        "cursor-pointer text-sm text-slate-300 transition-colors hover:text-white flex  items-center",
                        onContactClick &&
                          "-mx-2 rounded px-2 py-1 hover:bg-slate-700/50"
                      )}
                      
                    >
                      <PopoverTrigger className="flex  w-full items-center justify-start gap-2  py-1">
                        <Avatar className="size-10">
                          <AvatarImage
                            src={contact.photo}
                            alt="Foto do perfil"
                            className="object-cover object-center "
                          />
                          <AvatarFallback className="bg-slate-00 text-slate-300">
                            {contact.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start justify-center ">
                          <p className="text-sm font-medium">{contact.name}</p>
                          {contact.crm && (
                            <p className="text-xs text-slate-300">
                              {contact.crm}
                            </p>
                          )}
                        </div>
                      </PopoverTrigger>
                      {!contact.crm && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Bookmark
                              size={21}
                              className=" -rotate-90 fill-current text-agenda-saude-green-100"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Adicionado pela clinica</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </li>
                    <PopoverContent className="flex  max-w-md flex-col  gap-4 border-none bg-agenda-saude-green-100 p-4">
                      <div className="flex w-full items-center gap-3 border-b-2 border-slate-300 pb-4">
                        <Avatar className="size-16">
                          <AvatarImage
                            src={contact.photo}
                            alt="Foto do perfil"
                            className="object-cover object-center "
                          />
                          <AvatarFallback className="bg-slate-00 text-slate-300">
                            {contact.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start ">
                          <p className="text-sm text-white ">{contact.name}</p>
                        </div>
                      </div>
                      <ul className="flex flex-col justify-start gap-0.5">
                        <li>
                          <Label className="text-sm font-semibold text-white">
                            Telefone:
                          </Label>
                          <p className="font-poppins text-base text-white ">
                            {contact.phone}
                          </p>
                        </li>
                        <li>
                          <Label className="text-sm font-semibold text-white  ">
                            Celular:
                          </Label>
                          <p className="font-poppins text-base text-white ">
                            {contact.mobile}
                          </p>
                        </li>
                        <li>
                          <Label className="text-sm font-semibold text-white ">
                            Email:
                          </Label>
                          <p className="font-poppins text-base text-white ">
                            {contact.email}
                          </p>
                        </li>

                        <li>
                          <Label className="text-sm font-semibold text-white ">
                            {contact.crm ? "CRM:" : "CPF:"}
                          </Label>
                          <p className="font-poppins text-base text-white ">
                            {contact.crm ? contact.crm : contact.cpf}
                          </p>
                        </li>

                        {contact.crm && (
                          <li>
                            <Label className="text-sm font-semibold text-white ">
                              Data de criação:
                            </Label>
                            <p className="font-poppins text-base text-white ">
                              {contact.createdAt}
                            </p>
                          </li>
                        )}
                      </ul>
                      {contact.crm && (
                        <Button
                          type="submit"
                          variant="default"
                          size="lg"
                          className=" bg-agenda-saude-purple-200 font-poppins text-lg text-agenda-saude-blue-100  hover:bg-agenda-saude-purple-200/90"
                        >
                          Desvincular
                        </Button>
                      )}
                    </PopoverContent>
                  </Popover>
                );
              })}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-center text-white">Nenhum contato encontrado.</p>
      )}
    </div>
  );
}