import { FC } from "react";
import { useListWorkQuery } from "../../generated/graphql";
import LoadingOverlay from "react-loading-overlay-ts";
import { WorkCell } from "./components/WorkCell";
import { useNavigate } from "react-router-dom";

interface Props {}

export const WorkList: FC<Props> = () => {
  let navigate = useNavigate();
  const { data: workListData } = useListWorkQuery({
    variables: {
      page: 1,
      limit: 100,
    },
  });

  const render = () => {
    if (workListData) {
      return (
        <div className="fixed w-full h-screen dark:bg-gray-800 overflow-y-scroll">
          <div className="mx-auto w-content grid justify-items-center grid-rows-3 grid-flow-col">
            {workListData?.works.edges.map((data) => (
              <WorkCell
                key={data.node.id}
                work={data.node}
                onClick={() => {
                  navigate(`/${data.node.id}`);
                }}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="fixed w-full h-screen dark:bg-gray-800">
          <div className="absolute w-20 h-20 inset-2/4">
            <LoadingOverlay active={true} spinner={true} text="" />
          </div>
        </div>
      );
    }
  };

  return <div>{render()}</div>;
};
