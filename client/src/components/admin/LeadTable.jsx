"use client";

import { useState } from "react";
import {
  useGetLeadsQuery,
  useDeleteLeadMutation,
  useAnalyzeLeadQuery,
} from "../../store/api";

function AIAnalysis({ leadId }) {
  const [show, setShow] = useState(false);

  const { data, isLoading } = useAnalyzeLeadQuery(leadId, {
    skip: !show,
  });

  return (
    <div>
      <button
        onClick={() => setShow(!show)}
        className="rounded-md bg-purple-300 px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-purple-400"
      >
        {show ? "Hide AI" : "✨ AI Analyze"}
      </button>

      {show && (
        <div className="mt-2 w-72 max-w-[80vw] rounded-lg border border-purple-300/30 bg-purple-950/30 p-4 text-left">
          {isLoading ? (
            <p className="text-sm text-purple-300">Analyzing...</p>
          ) : data?.data ? (
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-gray-400">Summary</p>
                <p className="text-gray-200">{data.data.summary}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Need Summary</p>
                <p className="text-gray-200">{data.data.needSummary}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Requirement Clarity</p>
                <p className="text-purple-300">
                  {data.data.requirementClarity}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Missing Information</p>

                {data.data.missingInformation?.length ? (
                  <ul className="list-disc pl-4 text-gray-300">
                    {data.data.missingInformation.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300">
                    No important information missing.
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-400">Recommended Follow-up</p>

                <p className="text-purple-300">
                  {data.data.recommendedFollowUp}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-red-400">Failed to analyze lead.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function LeadTable() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetLeadsQuery({
    search,
    status,
    page,
    limit: 10,
  });

  const [deleteLead] = useDeleteLeadMutation();

  const leads = data?.data || [];
  const pagination = data?.pagination;

  const handleSearch = () => {
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      await deleteLead(id).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Failed to delete lead");
    }
  };

  if (isLoading) {
    return (
      <p className="py-10 text-center text-purple-300">Loading leads...</p>
    );
  }

  if (error) {
    return (
      <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
        Failed to load leads.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {/* SEARCH */}
      <div className="flex flex-col gap-3 rounded-xl border border-purple-300/20 bg-purple-500/5 p-4 sm:flex-row">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Search by name, email or company..."
          className="min-w-0 flex-1 rounded-lg border border-purple-300/25 bg-black px-4 py-2 text-white outline-none placeholder:text-gray-400 focus:border-purple-400"
        />

        <button
          onClick={handleSearch}
          className="rounded-lg bg-purple-300 px-6 py-2 font-semibold text-black hover:bg-purple-400"
        >
          Search
        </button>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-purple-300/25 bg-black px-4 py-2 text-white outline-none focus:border-purple-400"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-purple-300/20 bg-purple-500/5">
        <table className="w-full min-w-[1500px]">
          <thead className="bg-purple-300/10">
            <tr>
              {[
                "Name",
                "Email",
                "Phone",
                "Company",
                "Requirement",
                "Budget",
                "Timeline",
                "Status",
                "Assigned To",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-4 text-left text-sm font-semibold text-purple-200"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-purple-300/10">
            {leads.length ? (
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="transition hover:bg-purple-500/10"
                >
                  <td className="px-4 py-4 text-sm font-medium text-white">
                    {lead.name}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400">
                    {lead.email}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400">
                    {lead.phone || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400">
                    {lead.company || "—"}
                  </td>

                  <td className="max-w-xs px-4 py-4 text-sm text-gray-300">
                    <div className="max-w-xs truncate" title={lead.requirement}>
                      {lead.requirement || "—"}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400">
                    {lead.budget || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400">
                    {lead.expectedTimeline || "—"}
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-full bg-purple-300/15 px-3 py-1 text-xs capitalize text-purple-300">
                      {lead.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400">
                    {lead.assignedTo?.name || "—"}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <AIAnalysis leadId={lead._id} />

                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="rounded-md border border-purple-400/40 px-3 py-1.5 text-xs font-medium text-purple-300 transition hover:bg-purple-400 hover:text-black"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {pagination?.totalPages > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-purple-300/20 bg-purple-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="rounded-lg border border-purple-300/30 px-3 py-2 text-sm text-purple-300 hover:bg-purple-400/20 disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage(page + 1)}
              className="rounded-lg border border-purple-300/30 px-3 py-2 text-sm text-purple-300 hover:bg-purple-400/20 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
