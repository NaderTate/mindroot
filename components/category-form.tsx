"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import * as z from "zod";
import { useState, useTransition } from "react";
import { Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySchema } from "@/schemas";
import { createCategory, updateCategory } from "@/actions/categories";
import { ErrorMessage } from "@hookform/error-message";
import { FormError } from "./FormError";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineEditNote } from "react-icons/md";

type CateogoryFormProps = { category?: Category };

export const CateogoryForm = ({ category }: CateogoryFormProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
    },
  });
  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    setError("");

    startTransition(() => {
      category
        ? updateCategory(category.id, values).then((data) => {
            data.error ? setError(data.error) : onOpenChange();
          })
        : createCategory(values).then((data) => {
            data.error ? setError(data.error) : onOpenChange();
            reset();
          });
    });
  };
  return (
    <>
      <Button
        fullWidth={!!category}
        variant={category ? "light" : "solid"}
        size={category ? "sm" : "md"}
        className={`${category ? " flex justify-start" : " "}`}
        startContent={category ? <MdOutlineEditNote size={20} /> : <FaPlus />}
        color="primary"
        onPress={onOpen}
      >
        {category ? "Edit" : "New"}
      </Button>
      <Modal
        classNames={{
          wrapper: "z-[9999999999]",
          backdrop: "z-[9999999999]",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {category ? "Edit" : "New"} Category
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    defaultValue={category?.name}
                    {...register("name")}
                    label="Name"
                    variant="bordered"
                    size="sm"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm text-left w-full">
                        {message}
                      </p>
                    )}
                  />
                  <FormError error={error} />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isPending}
                    isDisabled={isPending}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
