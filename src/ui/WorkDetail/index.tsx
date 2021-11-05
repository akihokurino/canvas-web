import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetWorkQuery } from "../../generated/graphql";
import LoadingOverlay from "react-loading-overlay-ts";

interface Props {}

export const WorkDetail: FC<Props> = () => {
  const params = useParams();
  const workId = params.work_id;

  const { data: workData } = useGetWorkQuery({
    variables: {
      id: workId ?? "",
    },
  });
  console.log(workData);

  return (
    <div>
      <div>
        <p>ご入力ありがとうございました。</p>
      </div>
    </div>
  );
};
