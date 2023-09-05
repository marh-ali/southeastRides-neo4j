import { useMutation } from "@apollo/client";
import { UPDATE_USER_DISPLAY_NAME } from "./Mutations";

export const updateDisplayName = (
  uid,
  newDisplayName,
  setGlobalDisplayName
) => {
  const [updateDisplayName] = useMutation(UPDATE_USER_DISPLAY_NAME, {
    onCompleted: (data) => {
      setGlobalDisplayName(data.updateUsers.users[0].displayName);
    },
  });

  updateDisplayName({
    variables: {
      where: { uid },
      update: { displayName: newDisplayName },
    },
  });
};
