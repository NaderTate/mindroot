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
import { CateogoryForm } from "./category-form";
import ConfirmDelete from "./confirm-delete";
import { deleteCategory } from "@/actions/categories";

type CategoryCardProps = {
  category: Category & { _count: { projects: number } };
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <>
      <Card className="w-52">
        <Dropdown
          size="sm"
          placement="bottom-end"
          classNames={{ content: "min-w-[120px]" }}
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
              <CateogoryForm category={category} />
            </DropdownItem>
            <DropdownItem className="p-0" key="delete">
              <ConfirmDelete
                id={category.id}
                deleteAction={deleteCategory}
                label={category.name}
              />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <CardBody>
          <h1>
            {category.name}{" "}
            <span className="text-xs">({category._count.projects})</span>
          </h1>
        </CardBody>
      </Card>
    </>
  );
};
