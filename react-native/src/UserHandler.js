import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "./services/Mutations";
import { CHECK_USER_IN_DB } from "./services/Queries";

export default function UserHandler({ userInfo }) {
  const [shouldRefetch, setShouldRefetch] = useState(false); // New state to control refetching

  // Log userInfo state
  useEffect(() => {}, [userInfo]);

  // Query to check if user exists
  const {
    loading: queryLoading,
    error: queryError,
    data,
    refetch, // Include refetch method for manual refetching
  } = useQuery(CHECK_USER_IN_DB, {
    variables: { where: { uid: userInfo?.uid } },
    skip: !userInfo, // Skip the query if userInfo is null or undefined
  });

  // Log query data
  console.log("Query data:", data);

  // Mutation to create a new user
  const [createUser, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_USER);

  useEffect(() => {
    if (shouldRefetch) {
      refetch(); // Manually refetch the query if shouldRefetch is true
      setShouldRefetch(false); // Reset refetch flag
    }
  }, [shouldRefetch, refetch]);

  // Main effect to handle user creation
  useEffect(() => {
    console.log("Entered useEffect"); // Log entry point

    if (userInfo && userInfo.metadata && !queryLoading && !queryError) {
      // Check if user exists in the database
      console.log("User exists in DB:", data?.users.length > 0); // Log user existence before mutation

      if (data?.users.length === 0) {
        // User doesn't exist, create a new one
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
            setShouldRefetch(true); // Trigger a refetch after successful mutation
          })
          .catch((err) => {
            console.error("Error creating user:", err);
          });
      } else {
        // User already exists
        console.log(`Welcome back ${userInfo.displayName}`);
      }
    }

    console.log("Exited useEffect"); // Log exit point
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
