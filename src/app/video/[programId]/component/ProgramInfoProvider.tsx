"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useProgramQuery } from "@/hooks/useProgramQuery";
import { useVideoListQuery } from "@/hooks/useVideoQuery";

import {
  selectedProgramIdState,
  selectedProgramInfoState,
} from "@/store/program";
import Loading from "@/components/loading/Loading";

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
        programInfo,
      });
    }
  }, [programId, programInfo]);

  if (isProgramInfoLoading || isVideoListLoading) return <Loading />;

  return <>{children}</>;
}

export default ProgramInfoProvider;
