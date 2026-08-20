"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "../store/api";
import { setUser, clearUser } from "../store/authSlice";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetProfileQuery();

  useEffect(() => {
    if (isLoading) return;

    if (data?.data) {
      dispatch(setUser(data.data));
    } else if (isError || !data?.data) {
      dispatch(clearUser());
    }
  }, [data, isLoading, isError, dispatch]);

  return children;
}
