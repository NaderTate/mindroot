"use client";

import { findUser } from "@/actions/users";
import { useState, useTransition } from "react";

export const useSearchMembers = () => {
  const [searchKeywords, setSearchKeywords] = useState("");
  const [membersResults, setMembersResults] = useState<
    { id: string; name: string; email: string }[]
  >([]);
  const [isLoadingMembers, startTransitionMembers] = useTransition();

  const findMembers = (searchQuery: string) => {
    setSearchKeywords(searchQuery);
    if (searchKeywords.length < 2) {
      setMembersResults([]);
      return;
    }

    startTransitionMembers(() => {
      findUser({ keywords: searchKeywords }).then((data) => {
        data.users ? setMembersResults(data.users) : setMembersResults([]);
      });
    });
  };

  const resetSearch = () => {
    setSearchKeywords("");
    setMembersResults([]);
  };

  return {
    searchKeywords,
    setSearchKeywords,
    membersResults,
    isLoadingMembers,
    findMembers,
    resetSearch,
  };
};
