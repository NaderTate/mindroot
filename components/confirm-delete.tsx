"use client";

import { useTransition } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { MdDeleteOutline } from "react-icons/md";

type Props = {
  id: string;
  label: string;
  deleteAction: Function;
};

export default function ConfirmDelete({ id, label, deleteAction }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <Button
        fullWidth
        variant="light"
        color="danger"
        size="sm"
        className="flex justify-start"
        startContent={<MdDeleteOutline size={20} />}
        onPress={onOpen}
      >
        Delete
      </Button>
      <Modal
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          wrapper: "z-[9999999999]",
          backdrop: "z-[9999999999]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-xl font-semibold">
                  {label} will be deleted{" "}
                </h1>
                <h3 className="font-thin text-sm">
                  this action is irreversible{" "}
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-10">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    isDisabled={isPending}
                    isLoading={isPending}
                    color="primary"
                    onPress={() => {
                      startTransition(() => {
                        deleteAction(id).then(() => {
                          onClose();
                        });
                      });
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
