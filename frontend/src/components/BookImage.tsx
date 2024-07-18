import { Dispatch, SetStateAction } from "react";
import { HokieBirdColoring } from "../components/HokieBirdColor";
import { HokieBirdMap } from "../components/HokieBirdMap";
import { HokieBirdIfCondition } from "../components/HokieBirdIfCondition";
import { PythonTutor } from "../components/PythonTutor";
import { DataTypesIntro } from "../components/MisconceptionComponents/DataTypesIntro";
import { IntsAndBools } from "../components/MisconceptionComponents/IntsAndBools";
import { VariableAssignment } from "../components/MisconceptionComponents/VariableAssignment";
import { Strings } from "../components/MisconceptionComponents/Strings";
import { Sequencing } from "../components/MisconceptionComponents/Sequencing";
import { IfStatementIntro } from "../components/MisconceptionComponents/IfStatementIntro";
import { ConditionalOperators } from "../components/MisconceptionComponents/ConditionalOperators";
import { LogicalOperators } from "../components/MisconceptionComponents/LogicalOperators";
import { IfStatements } from "../components/MisconceptionComponents/IfStatements";
import { LifeOfMoose } from "../components/MisconceptionComponents/LifeOfMoose/LifeOfMoose";
import { MooseMilestone } from "../components/MisconceptionComponents/LifeOfMoose/MooseMilestone";
import { MooseDr } from "../components/MisconceptionComponents/LifeOfMoose/MooseDr";
import { MooseChallengingYear } from "../components/MisconceptionComponents/LifeOfMoose/MooseChallengingYear";
import { MooseThankYou } from "../components/MisconceptionComponents/LifeOfMoose/MooseThankYou";
import { BuyDonut } from "../components/MisconceptionComponents/FlowchartsBook/BuyDonut";
import { BuyMultiple } from "../components/MisconceptionComponents/FlowchartsBook/BuyMultiple";
import { MultipleConditions } from "../components/MisconceptionComponents/FlowchartsBook/MultipleConditions";
import { ChangingCondition } from "../components/MisconceptionComponents/FlowchartsBook/ChangingCondition";
import { InputActivity } from "../components/InputActivity";
import { FoodTruckActivity } from "../components/FoodTruckActivity";
import { Page } from "../api";
import { SelectImageActivity } from "./SelectImage";
import BinaryConverter from "./BinaryConverter";
import { CostarColoring } from "./CostarColoring";
import { ElementPlacement } from "./Computer_IO";
import { ClothingActivity } from "./ClothingActivity";
import BookRushHour from "./BookRushHour";
import { ImageQuestion } from "./ImageQuestion";
import { DragMultiChoice } from "./DragMultiChoice";
import CodeStepFlowchart from "./CodeStepFlowchart";

export function BookImage({
  image,
  page,
  setAllowNext,
}: {
  image: string;
  page: Page;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const isImage = image && image.includes(".");

  return (
    <div className="h-full overflow-y-scroll flex flex-col items-center w-full">
      {isImage && (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <img
            src={image}
            alt="book"
            width={600}
            height={600}
            className="object-contain max-w-full max-h-full"
          />
        </div>
      )}
      {image === "HokieBirdActivity" && (
        <HokieBirdColoring props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "tutor" && <PythonTutor props={page?.props} />}
      {image === "HokieBirdMazeActivity" && (
        <HokieBirdMap props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "CostarColoring" && (
        <CostarColoring props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "Computer_IO" && (
        <ElementPlacement props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "HokieBirdIfConditionActivity" && (
        <HokieBirdIfCondition props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "DataTypesIntro" && <DataTypesIntro />}
      {image === "IntsAndBools" && (
        <IntsAndBools props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "VariableAssignment" && (
        <VariableAssignment props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "Strings" && (
        <Strings props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "Sequencing" && <Sequencing setAllowNext={setAllowNext} />}
      {image === "IfStatementIntro" && <IfStatementIntro />}
      {image === "ConditionalOperators" && (
        <ConditionalOperators props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "LogicalOperators" && (
        <LogicalOperators props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "IfStatements" && (
        <IfStatements props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "LifeOfMoose" && (
        <LifeOfMoose props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "MooseMilestone" && (
        <MooseMilestone props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "MooseDr" && (
        <MooseDr props={page.props} setAllowNext={setAllowNext} />
      )}
      {image === "MooseChallengingYear" && (
        <MooseChallengingYear props={page.props} setAllowNext={setAllowNext} />
      )}
      {image === "MooseThankYou" && <MooseThankYou />}
      {image === "BuyDonut" && <BuyDonut setAllowNext={setAllowNext} />}
      {image === "BuyMultiple" && (
        <BuyMultiple props={page.props} setAllowNext={setAllowNext} />
      )}
      {image === "MultipleConditions" && (
        <MultipleConditions props={page.props} setAllowNext={setAllowNext} />
      )}
      {image === "ChangingCondition" && (
        <ChangingCondition props={page.props} setAllowNext={setAllowNext} />
      )}
      {image === "InputActivity" && (
        <InputActivity props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "FoodTruckActivity" && (
        <FoodTruckActivity props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "SelectImageActivity" && (
        <SelectImageActivity props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "BinaryConverter" && (
        <BinaryConverter props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "ClothingActivity" && (
        <ClothingActivity props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "BookRushHour" && (
        <BookRushHour props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "ImageQuestion" && (
        <ImageQuestion props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "DragMultiChoice" && (
        <DragMultiChoice props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "CodeStepFlowchart" && (
        <CodeStepFlowchart props={page?.props} setAllowNext={setAllowNext} />
      )}
    </div>
  );
}
