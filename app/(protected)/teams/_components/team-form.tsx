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
  Spinner,
} from "@nextui-org/react";
import * as z from "zod";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { teamSchema } from "@/schemas";
import { ErrorMessage } from "@hookform/error-message";
import { FormError } from "@/components/FormError";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineEditNote } from "react-icons/md";
import { createTeam } from "@/actions/teams";
import { RxCross2 } from "react-icons/rx";
import { UserCard } from "./user-card";
import { useSearchMembers } from "../_hooks/use-search-members";

type TeamFormProps = {
  team?: {
    name: string;
    members: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    }[];
  };
};

export const TeamForm = ({ team }: TeamFormProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team?.name ?? "",
      members: team?.members.map((member) => member.id) || [],
    },
  });
  const onSubmit = (values: z.infer<typeof teamSchema>) => {
    setError("");

    startTransition(() => {
      createTeam(values).then((data) => {
        data.error ? setError(data.error) : onOpenChange();
        reset();
      });
      //   category
      //     ? updateCategory(category.id, values).then((data) => {
      //         data.error ? setError(data.error) : onOpenChange();
      //       })
      //     : createCategory(values).then((data) => {
      //         data.error ? setError(data.error) : onOpenChange();
      //         reset();
      //       });
    });
  };
  const {
    findMembers,
    isLoadingMembers,
    membersResults,
    resetSearch,
    searchKeywords,
  } = useSearchMembers();

  return (
    <>
      <Button
        fullWidth={!!team}
        variant={team ? "light" : "solid"}
        size={team ? "sm" : "md"}
        className={`${team ? " flex justify-start" : " "}`}
        startContent={team ? <MdOutlineEditNote size={20} /> : <FaPlus />}
        color="primary"
        onPress={onOpen}
      >
        {team ? "Edit" : "New"}
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
                {team ? "Edit" : "New"} Team
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    autoFocus
                    defaultValue={team?.name}
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
                  <Input
                    label="Members"
                    placeholder="Search for members"
                    variant="bordered"
                    size="sm"
                    value={searchKeywords}
                    onValueChange={findMembers}
                    endContent={
                      membersResults.length > 0 ? (
                        <Button
                          variant="light"
                          radius="full"
                          isIconOnly
                          size="sm"
                          onPress={resetSearch}
                        >
                          <RxCross2 />
                        </Button>
                      ) : null
                    }
                  />
                  {membersResults.length > 0 && (
                    <div className=" overflow-auto max-h-32 w-full bg-content2 p-2 space-y-3 rounded-md">
                      {membersResults.map((member) => (
                        <UserCard {...member} />
                      ))}
                    </div>
                  )}
                  {isLoadingMembers && <Spinner />}

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
