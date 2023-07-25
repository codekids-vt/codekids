import joinClasses from "@/util/joinClasses";

interface ColorMapping {
  [name: string]: string
};

const defaultClass = "tag";
const colorClasses: ColorMapping = {
  "red": "bg-red-200 text-red-500 outline-red-500",
  "yellow": "bg-yellow-200 text-yellow-500 outline-yellow-500",
  "green": "bg-green-200 text-green-500 outline-green-500",
  "blue": "bg-blue-200 text-blue-500 outline-blue-500",
  "violet": "bg-violet-200 text-violet-500 outline-violet-500",
};

function ActivityTag({
  name, color
}: {
  name: string, color?: string
}) {
  return (
    <div className={joinClasses(defaultClass, color && colorClasses[color])}>
      {name}
    </div>
  );
}

export default ActivityTag;
