import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../services/Queries";

const useUserProfile = (userInfo) => {
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { where: { uid: userInfo?.uid } },
  });

  const user = data?.users[0];

  return { loading, error, user };
};

export default useUserProfile;
