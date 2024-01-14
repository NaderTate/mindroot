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
import Select from "react-select";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { projectSchema } from "@/schemas";
import { ErrorMessage } from "@hookform/error-message";
import { FormError } from "./FormError";
import { FaPlus } from "react-icons/fa6";
import { format } from "date-fns";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CalendarDateRangePicker } from "./date-picker";
import { createProject } from "@/actions/projects";
type NewProjectFormProps = { allCategories: { id: string; name: string }[] };

export const NewProject = ({ allCategories }: NewProjectFormProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      deadline: undefined,
      categories: [],
    },
  });
  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    setError("");

    startTransition(() => {
      createProject(values).then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          reset();
          onOpenChange();
        }
      });
    });
  };
  return (
    <>
      <Button startContent={<FaPlus />} color="primary" onPress={onOpen}>
        New
      </Button>
      <Modal
        scrollBehavior="inside"
        placement="center"
        // classNames={{
        //   wrapper: "z-[9999999999]",
        //   backdrop: "z-[9999999999]",
        // }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Project
              </ModalHeader>
              <ModalBody>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <Input
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
                  <Controller
                    control={control}
                    name="categories"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        className="z-50"
                        placeholder="categories"
                        options={allCategories.map((category) => ({
                          value: category.id,
                          label: category.name,
                        }))}
                        onChange={(
                          value: { value: string; label: string }[]
                        ) => {
                          setValue(
                            "categories",
                            value.map((v) => v.value)
                          );
                          console.log(getValues("categories"));
                          // onChange(value);
                        }}
                        // value={value}
                        isMulti
                        isClearable
                      />
                    )}
                  />

                  {/* <Select
                    className="z-20"
                    placeholder="categories"
                    options={allCategories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                    isMulti
                    isClearable
                  /> */}
                  <Controller
                    control={control}
                    name="deadline"
                    render={({ field: { onChange, value } }) => (
                      <CalendarDateRangePicker
                        onSelect={(date) => {
                          onChange(date);
                        }}
                      />
                    )}
                  />

                  <FormError error={error} />
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
