import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "./services/Mutations";
import { CHECK_USER_IN_DB } from "./services/Queries";

export default function UserHandler({ userInfo }) {
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {}, [userInfo]);

  const {
    loading: queryLoading,
    error: queryError,
    data,
    refetch,
  } = useQuery(CHECK_USER_IN_DB, {
    variables: { where: { uid: userInfo?.uid } },
    skip: !userInfo,
  });

  console.log("Query data:", data);

  const [createUser, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_USER);

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetch]);

  useEffect(() => {
    console.log("Entered useEffect");

    if (userInfo && userInfo.metadata && !queryLoading && !queryError) {
      console.log("User exists in DB:", data?.users.length > 0);

      if (data?.users.length === 0) {
        createUser({
          variables: {
            input: [
              {
                uid: userInfo.uid,
                displayName: userInfo.displayName,
                email: userInfo.email,
                phoneNumber: userInfo.phoneNumber,
                bio: "",
                photoURL: userInfo.photoURL,
                createdAt: userInfo.metadata.creationTime,
                lastLoginAt: userInfo.metadata.lastLoginAt,
              },
            ],
          },
        })
          .then((response) => {
            console.log("User successfully created:", response.data);
            setShouldRefetch(true);
          })
          .catch((err) => {
            console.error("Error creating user:", err);
          });
      } else {
        console.log(`Welcome back ${userInfo.displayName}`);
      }
    }

    console.log("Exited useEffect");
  }, [userInfo, queryLoading, queryError, data, createUser]);

  if (queryLoading || mutationLoading) {
    console.log("Loading...");
  }

  if (queryError || mutationError) {
    console.error(
      "There was an error:",
      queryError?.message || mutationError?.message
    );
  }

  return null;
}
