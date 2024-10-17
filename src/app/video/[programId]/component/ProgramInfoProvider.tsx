"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useProgramQuery } from "@/hooks/useProgramQuery";
import { useVideoListQuery } from "@/hooks/useVideoQuery";

import {
  selectedProgramIdState,
  selectedProgramInfoState,
} from "@/store/program";

interface ProgramInfoProviderProps {
  programId: number;
  children: React.ReactNode;
}

function ProgramInfoProvider({
  children,
  programId,
}: ProgramInfoProviderProps) {
  const { data: programInfo, isLoading: isProgramInfoLoading } =
    useProgramQuery(programId);
  const { data: videoList, isLoading: isVideoListLoading } =
    useVideoListQuery(programId);

  const setProgramInfo = useSetRecoilState(selectedProgramInfoState);
  const setSelectedProgramId = useSetRecoilState(selectedProgramIdState);

  useEffect(() => {
    if (programInfo) {
      setSelectedProgramId(Number(programId));
      setProgramInfo({
        isInit: true,
        programId: Number(programId),
        episodeIndex: 0,
        seasonIndex: 0,
      });
    }
  }, [programId, programInfo]);

  if (isProgramInfoLoading || isVideoListLoading)
    return (
      <div className="h-screen w-full">
        <div className="flex items-center justify-center h-full">
          <div className="w-10 h-10 border-t-2 border-b-2 border-white-900 rounded-full animate-spin"></div>
        </div>
      </div>
    );

  return <>{children}</>;
}

export default ProgramInfoProvider;
