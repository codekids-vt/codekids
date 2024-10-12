import React, { useState } from "react";
import useSound from "use-sound";
import { useAuth } from "../context/AuthContext";
import { handleInteraction } from "../util/interaction";

interface IInputOutputActivityProps {
  showIOLabels: boolean;
  question: string | undefined;
  options: { text: string; image: string }[];
  width: number;
  height: number;
}

export function InputOutputActivity({
  props,
  setAllowNext,
}: {
  props: IInputOutputActivityProps | any;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { question, options, showIOLabels } = props;
  const [selectedShirt, setSelectedShirt] = useState<string | null>(null);
  const [playCorrectSound] = useSound("/sounds/correct.wav", { volume: 0.5 });
  const { user } = useAuth();
  const startTime = new Date().getTime();
  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split("/").filter((segment) => segment);
  const bookID = parseInt(pathSegments[1], 10);
  const pageID = parseInt(pathSegments[2], 10);
}