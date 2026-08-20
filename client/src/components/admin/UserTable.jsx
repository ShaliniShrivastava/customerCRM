"use client";

import {
  useGetAllUsersQuery,
  useToggleUserBlockMutation,
  useDeleteUserMutation,
} from "../../store/api";

export default function UserTable() {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const [toggleUserBlock] = useToggleUserBlockMutation();
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.data || [];

  const handleBlock = async (id) => {
    try {
      await toggleUserBlock(id).unwrap();
    } catch (error) {
      alert(error?.data?.message || "Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id).unwrap();
    } catch (error) {
      alert(error?.data?.message || "Failed to delete user");
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-purple-300/20 bg-purple-500/5 p-6 text-center shadow-[0_0_25px_rgba(168,85,247,0.06)] backdrop-blur-md sm:p-8">
        <p className="text-purple-300">Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-center text-red-400 sm:p-6">
        Failed to load users.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-purple-300/20 bg-purple-500/5 shadow-[0_0_25px_rgba(168,85,247,0.06)] backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px]">
          <thead className="border-b border-purple-300/10 bg-purple-300/10">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold text-purple-200 sm:px-6">
                Name
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-purple-200 sm:px-6">
                Email
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-purple-200 sm:px-6">
                Role
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-purple-200 sm:px-6">
                Status
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-purple-200 sm:px-6">
                Joined
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-purple-200 sm:px-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-purple-300/10">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="transition-colors duration-300 hover:bg-purple-500/10"
                >
                  <td className="px-4 py-4 text-sm font-medium text-white sm:px-6">
                    {user.name}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400 sm:px-6">
                    {user.email}
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    <span className="rounded-full bg-purple-300/15 px-3 py-1 text-xs font-medium capitalize text-purple-300">
                      {user.role || "user"}
                    </span>
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.isBlocked
                          ? "bg-red-500/15 text-red-400"
                          : "bg-green-500/15 text-green-400"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400 sm:px-6">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    {user.role === "admin" ? (
                      <span className="text-xs text-purple-300">Protected</span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBlock(user._id)}
                          className={`rounded-md px-3 py-2 text-xs font-semibold ${
                            user.isBlocked
                              ? "bg-green-500/15 text-green-400 hover:bg-green-500/25"
                              : "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25"
                          }`}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>

                        <button
                          onClick={() => handleDelete(user._id)}
                          className="rounded-md bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/25"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
