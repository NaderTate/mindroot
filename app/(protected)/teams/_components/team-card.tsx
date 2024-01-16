"use client";
"use client";
import { Card, CardBody } from "@nextui-org/react";
import { Category } from "@prisma/client";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
} from "@nextui-org/react";
import { SlOptions } from "react-icons/sl";

import ConfirmDelete from "@/components/confirm-delete";

import { TeamForm } from "./team-form";
import { deleteTeam } from "@/actions/teams";
import { RiTeamLine } from "react-icons/ri";
import { MdDataSaverOff } from "react-icons/md";

type TeamCardProps = {
  team: {
    id: string;
    name: string;
    _count: { projects: number };
    members: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    }[];
  };
};

export const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <>
      <Card className="w-52 relative">
        <Dropdown
          size="sm"
          placement="bottom-end"
          classNames={{
            content: "min-w-[120px]",
            trigger: "absolute top-0 right-0",
          }}
        >
          <DropdownTrigger className="m-auto mr-0">
            <Button isIconOnly size="sm" variant="light">
              <SlOptions />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            hideSelectedIcon
            closeOnSelect={false}
            aria-label="Category actions"
            variant="flat"
          >
            <DropdownItem className="p-0" key="edit">
              <TeamForm team={team} />
            </DropdownItem>
            <DropdownItem className="p-0" key="delete">
              <ConfirmDelete
                id={team.id}
                deleteAction={deleteTeam}
                label={team.name}
              />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <CardBody>
          <h1 className="text-lg font-semibold">{team.name}</h1>
          <div className="flex items-center gap-2">
            <RiTeamLine />
            <h3 className="text-sm">{team.members.length} members</h3>
          </div>
          <div className="flex items-center gap-2">
            <MdDataSaverOff />
            <h3 className="text-sm">{team._count.projects} projects</h3>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
