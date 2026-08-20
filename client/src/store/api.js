import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),

  tagTypes: ["Auth", "Lead", "User", "Dashboard", "Website", "Contact"],

  endpoints: (builder) => ({
    // AUTH
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(api.util.resetApiState());
        } catch (error) {}
      },
    }),

    getProfile: builder.query({
      query: () => "/users/profile",
      providesTags: ["Auth"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/users/change-password",
        method: "PUT",
        body: data,
      }),
    }),

    // DASHBOARD
    getDashboardStats: builder.query({
      query: () => "/dashboard/stats",
      providesTags: ["Dashboard"],
    }),

    // LEADS
    getLeads: builder.query({
      query: ({
        search = "",
        status = "",
        sort = "createdAt",
        order = "desc",
        page = 1,
        limit = 10,
      }) => ({
        url: "/leads",
        params: {
          search,
          status,
          sort,
          order,
          page,
          limit,
        },
      }),
      providesTags: ["Lead"],
    }),

    getMyLeads: builder.query({
      query: () => "/leads/my",
      providesTags: ["Lead"],
    }),

    getLeadById: builder.query({
      query: (id) => `/leads/${id}`,
      providesTags: ["Lead"],
    }),

    createLead: builder.mutation({
      query: (data) => ({
        url: "/leads",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lead", "Dashboard"],
    }),

    updateLead: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/leads/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Lead", "Dashboard"],
    }),

    deleteLead: builder.mutation({
      query: (id) => ({
        url: `/leads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lead", "Dashboard"],
    }),

    // FILE IMPORT
    // CSV + XLSX + PDF + JPG + JPEG + PNG
    importLeads: builder.mutation({
      query: (formData) => ({
        url: "/leads/import",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Lead", "Dashboard"],
    }),

    // API IMPORT
    importLeadsFromAPI: builder.mutation({
      query: (data) => ({
        url: "/leads/import-api",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lead", "Dashboard"],
    }),

    // USERS
    getAllUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),

    toggleUserBlock: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // WEBSITE CONTENT
    getWebsiteContent: builder.query({
      query: () => "/admin/website",
      providesTags: ["Website"],
    }),

    updateWebsiteContent: builder.mutation({
      query: (data) => ({
        url: "/admin/website",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Website"],
    }),

    // ADD FEATURE
    addFeature: builder.mutation({
      query: (data) => ({
        url: "/admin/website/features",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Website"],
    }),

    // UPDATE FEATURE
    updateFeature: builder.mutation({
      query: ({ id, title, description }) => ({
        url: `/admin/website/features/${id}`,
        method: "PUT",
        body: {
          title,
          description,
        },
      }),
      invalidatesTags: ["Website"],
    }),

    // DELETE FEATURE
    deleteFeature: builder.mutation({
      query: (id) => ({
        url: `/admin/website/features/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Website"],
    }),

    // AI
    analyzeLead: builder.query({
      query: (id) => `/ai/lead/${id}/analyze`,
    }),

    // CONTACT
    createContact: builder.mutation({
      query: (data) => ({
        url: "/admin/contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),

    getMyContacts: builder.query({
      query: () => "/admin/contact/my",
      providesTags: ["Contact"],
    }),

    getContacts: builder.query({
      query: () => "/admin/contact",
      providesTags: ["Contact"],
    }),

    replyToContact: builder.mutation({
      query: ({ id, reply }) => ({
        url: `/admin/contact/${id}/reply`,
        method: "PUT",
        body: { reply },
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,

  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,

  useGetDashboardStatsQuery,

  useGetLeadsQuery,
  useGetMyLeadsQuery,
  useGetLeadByIdQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useImportLeadsMutation,
  useImportLeadsFromAPIMutation,

  useGetAllUsersQuery,

  useAnalyzeLeadQuery,

  useGetWebsiteContentQuery,
  useUpdateWebsiteContentMutation,
  useAddFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,

  useCreateContactMutation,
  useGetMyContactsQuery,
  useGetContactsQuery,
  useReplyToContactMutation,
  useToggleUserBlockMutation,
  useDeleteUserMutation,
} = api;
