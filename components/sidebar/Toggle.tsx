import { Button, cn } from "@nextui-org/react";
import { useSidebar } from "@/store/use-sidebar";

import { FaChevronLeft } from "react-icons/fa6";

function Toggle() {
  const { collapsed } = useSidebar((state) => state);

  return (
    <div className="h-screen">
      <Button
        radius="full"
        isIconOnly
        size="sm"
        onPress={() => useSidebar.setState({ collapsed: !collapsed })}
        className={cn(
          "z-50 aspect-square bg-default-800 absolute -right-4 top-8 sm:top-0 bottom-0 sm:m-auto transition-transform duration-300",
          collapsed && "rotate-180 -right-5"
        )}
      >
        <FaChevronLeft className="text-success-500" />
      </Button>
    </div>
  );
}

export default Toggle;
