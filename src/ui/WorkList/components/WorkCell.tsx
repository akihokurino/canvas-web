import { FC } from "react";
import { F_WorkFragment } from "../../../generated/graphql";

interface Props {
  work: F_WorkFragment;
  onClick: () => void;
}

export const WorkCell: FC<Props> = ({ work, onClick }) => {
  return (
    <div className="w-96 h-64 px-1 py-2">
      <button
        className="block bg-white w-full h-full rounded p-2 cursor-pointer"
        onClick={onClick}
      >
        <div className="text-left text-xl font-bold leading-snug text-gray-800">
          {work.id}
        </div>
        <div className="flex">
          {shuffle(work.thumbnails)
            .slice(0, 3)
            .map((data) => (
              <img
                alt=""
                className="flex-1 block w-1/4 rounded mx-1 my-3"
                key={data.id}
                src={data.imageUrl}
              />
            ))}
        </div>
      </button>
    </div>
  );
};

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
