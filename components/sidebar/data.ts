import { AiOutlineHome } from "react-icons/ai";
import { IoBriefcase } from "react-icons/io5";
import { HiSpeakerphone } from "react-icons/hi";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IconType } from "react-icons";
export const sidebarData: {
  parent: { label: string; color: string; icon: IconType; link?: string };
  children?: { label: string; link: string }[];
}[] = [
  {
    parent: {
      label: "Home",
      link: "/dashboard",
      color: "text-default-50",
      icon: AiOutlineHome,
    },
  },
  {
    parent: {
      label: "Work",
      color: "text-success-400",
      icon: IoBriefcase,
    },
    children: [
      {
        label: "Teams",
        link: "/teams",
      },
      {
        label: "Projects",
        link: "/projects",
      },
      {
        label: "Tasks",
        link: "/tasks",
      },
      {
        label: "Departments",
        link: "/departments",
      },
      {
        label: "Categories",
        link: "/categories",
      },
    ],
  },
  {
    parent: {
      label: "Marketing",
      color: "text-danger-400",
      icon: HiSpeakerphone,
    },
    children: [
      {
        label: "Leads",
        link: "/leads",
      },
      {
        label: "SWOT Analysis",
        link: "/swot-analysis",
      },
      {
        label: "Project Planning",
        link: "/project-planning",
      },
      {
        label: "Send Mail",
        link: "/send-mail",
      },
      {
        label: "Productivity Analysis",
        link: "/productivity-analysis",
      },
    ],
  },
  {
    parent: {
      label: "Financial",
      color: "text-primary-300",
      icon: RiMoneyDollarBoxLine,
    },
    children: [
      {
        label: "Invoices",
        link: "/invoices",
      },
      {
        label: "Contracts",
        link: "/contracts",
      },
      {
        label: "Budget Analysis",
        link: "/budget-analysis",
      },
    ],
  },
  {
    parent: {
      label: "Messages",
      link: "/messages",
      color: "text-secondary-500",
      icon: LuMessagesSquare,
    },
  },
  {
    parent: {
      label: "Events",
      link: "/events",
      color: "text-default-50",
      icon: FaRegCalendarAlt,
    },
  },
];
