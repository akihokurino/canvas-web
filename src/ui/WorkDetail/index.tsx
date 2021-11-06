import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetWorkQuery } from "../../generated/graphql";
import LoadingOverlay from "react-loading-overlay-ts";
import ReactPlayer from "react-player";

interface Props {}

export const WorkDetail: FC<Props> = () => {
  const params = useParams();
  const workId = params.work_id;

  const { data: workData } = useGetWorkQuery({
    variables: {
      id: workId ?? "",
    },
  });

  const render = () => {
    if (workData) {
      return (
        <div className="fixed w-full h-screen dark:bg-gray-800">
          <div className="mx-auto w-content flex">
            <ReactPlayer
              className="mt-2"
              url={workData.work.videoUrl}
              playing={true}
              loop={true}
              controls={false}
              muted={true}
              volume={0}
              width="350px"
              height="700px"
            />
            <div className="flex-1">
              <div className="w-full h-screen overflow-scroll grid grid-cols-6 content-start">
                {workData.work.thumbnails.map((data) => (
                  <img
                    alt=""
                    className="block w-32 rounded mx-1 my-3"
                    key={data.id}
                    src={data.imageUrl}
                  />
                ))}
              </div>
            </div>
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
