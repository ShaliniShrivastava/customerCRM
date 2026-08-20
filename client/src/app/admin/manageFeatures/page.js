"use client";

import { useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import {
  useGetWebsiteContentQuery,
  useAddFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} from "../../../store/api";

export default function ManageFeatures() {
  const { data, isLoading } = useGetWebsiteContentQuery();

  const [addFeature, { isLoading: adding }] = useAddFeatureMutation();
  const [updateFeature, { isLoading: updating }] = useUpdateFeatureMutation();
  const [deleteFeature, { isLoading: deleting }] = useDeleteFeatureMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const features = data?.data?.features || [];

  const handleAddFeature = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Title and description are required.");
      return;
    }

    try {
      await addFeature({
        title: title.trim(),
        description: description.trim(),
      }).unwrap();

      setTitle("");
      setDescription("");

      alert("Feature added successfully.");
    } catch (error) {
      alert(error?.data?.message || "Failed to add feature.");
    }
  };

  const handleEdit = (feature) => {
    setEditingId(feature._id);
    setEditTitle(feature.title);
    setEditDescription(feature.description);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleUpdateFeature = async (id) => {
    if (!editTitle.trim() || !editDescription.trim()) {
      alert("Title and description are required.");
      return;
    }

    try {
      await updateFeature({
        id,
        title: editTitle.trim(),
        description: editDescription.trim(),
      }).unwrap();

      setEditingId(null);
      setEditTitle("");
      setEditDescription("");

      alert("Feature updated successfully.");
    } catch (error) {
      alert(error?.data?.message || "Failed to update feature.");
    }
  };

  const handleDeleteFeature = async (id) => {
    if (!confirm("Are you sure you want to delete this feature?")) {
      return;
    }

    try {
      await deleteFeature(id).unwrap();

      alert("Feature deleted successfully.");
    } catch (error) {
      alert(error?.data?.message || "Failed to delete feature.");
    }
  };

  return (
    <div className="manage-features-page relative flex min-h-screen overflow-hidden bg-black">
      {/* BACKGROUND */}
      <div className="features-background pointer-events-none absolute inset-0">
        <div className="purple-glow glow-one" />
        <div className="purple-glow glow-two" />
        <div className="purple-grid" />
      </div>

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <div className="relative z-10 min-w-0 flex-1">
        <AdminNavbar />

        <main className="relative min-h-screen bg-transparent px-4 pb-8 pt-24 sm:px-6 lg:px-8">
          <div className="relative z-10 mx-auto max-w-6xl">
            {/* HEADER */}
            <div className="mb-8">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-purple-400/70">
                Admin Panel
              </p>

              <h1 className="text-2xl font-bold text-purple-200 sm:text-3xl">
                Manage Features
              </h1>

              <p className="mt-1 text-sm text-white/50">
                Add, edit or remove features displayed on the public website.
              </p>

              <div className="mt-3 h-px w-32 bg-gradient-to-r from-purple-500 via-purple-300 to-transparent" />
            </div>

            {/* ADD FEATURE */}
            <section className="manage-box rounded-2xl border border-purple-400/20 bg-black/50 p-5 backdrop-blur-md sm:p-6">
              <h2 className="mb-5 text-xl font-semibold text-purple-300">
                Add Feature
              </h2>

              <form onSubmit={handleAddFeature} className="space-y-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Feature title"
                  className="manage-input w-full rounded-lg border border-purple-400/20 bg-black/70 px-4 py-3 text-white outline-none transition"
                />

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Feature description"
                  rows="4"
                  className="manage-input w-full resize-none rounded-lg border border-purple-400/20 bg-black/70 px-4 py-3 text-white outline-none transition"
                />

                <button
                  type="submit"
                  disabled={adding}
                  className="rounded-lg bg-purple-300 px-6 py-3 font-semibold text-black transition hover:bg-purple-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {adding ? "Adding..." : "Add Feature"}
                </button>
              </form>
            </section>

            {/* EXISTING FEATURES */}
            <section className="manage-box mt-8 rounded-2xl border border-purple-400/20 bg-black/50 p-5 backdrop-blur-md sm:p-6">
              <h2 className="mb-5 text-xl font-semibold text-purple-300">
                Existing Features
              </h2>

              {isLoading ? (
                <p className="text-purple-300">Loading features...</p>
              ) : features.length === 0 ? (
                <p className="text-sm text-white/50">
                  No features available.
                </p>
              ) : (
                <div className="space-y-4">
                  {features.map((feature) => (
                    <div
                      key={feature._id}
                      className="manage-feature-item rounded-xl border border-purple-400/10 bg-black/70 p-5 transition hover:border-purple-400/25"
                    >
                      {editingId === feature._id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Feature title"
                            className="manage-input w-full rounded-lg border border-purple-400/20 bg-black px-4 py-3 text-white outline-none"
                          />

                          <textarea
                            value={editDescription}
                            onChange={(e) =>
                              setEditDescription(e.target.value)
                            }
                            rows="4"
                            placeholder="Feature description"
                            className="manage-input w-full resize-none rounded-lg border border-purple-400/20 bg-black px-4 py-3 text-white outline-none"
                          />

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateFeature(feature._id)
                              }
                              disabled={updating}
                              className="rounded-lg bg-purple-300 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-purple-200 disabled:opacity-50"
                            >
                              {updating ? "Updating..." : "Update"}
                            </button>

                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              disabled={updating}
                              className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-purple-300">
                              {feature.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-white/50">
                              {feature.description}
                            </p>
                          </div>

                          <div className="flex shrink-0 gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(feature)}
                              disabled={deleting || updating}
                              className="rounded-lg border border-purple-400/30 px-4 py-2 text-sm font-semibold text-purple-300 transition hover:border-purple-400 hover:bg-purple-500/10 disabled:opacity-40"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteFeature(feature._id)
                              }
                              disabled={deleting || updating}
                              className="rounded-lg border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-40"
                            >
                              {deleting ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      <style>{`
        .features-background {
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(168, 85, 247, 0.14),
              transparent 28%
            ),
            radial-gradient(
              circle at 85% 30%,
              rgba(124, 58, 237, 0.11),
              transparent 30%
            ),
            #020203;
        }

        .purple-glow {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          filter: blur(90px);
        }

        .glow-one {
          left: -180px;
          top: 100px;
          background: rgba(168, 85, 247, 0.16);
          animation: glow-one 18s ease-in-out infinite alternate;
        }

        .glow-two {
          right: -180px;
          top: 45%;
          background: rgba(124, 58, 237, 0.14);
          animation: glow-two 21s ease-in-out infinite alternate;
        }

        .purple-grid {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image:
            linear-gradient(rgba(168, 85, 247, 0.2) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(168, 85, 247, 0.2) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
          animation: grid-move 28s linear infinite;
        }

        /* REMOVE GLOBAL GOLD EFFECT ONLY FROM THIS PAGE */

        .manage-features-page .manage-box {
          border-color: rgba(168, 85, 247, 0.2) !important;
          box-shadow: none !important;
        }

        .manage-features-page .manage-input {
          border-color: rgba(168, 85, 247, 0.2) !important;
          box-shadow: none !important;
        }

        .manage-features-page .manage-input:focus {
          border-color: rgba(168, 85, 247, 0.6) !important;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.1) !important;
        }

        .manage-features-page .manage-feature-item {
          border-color: rgba(168, 85, 247, 0.1) !important;
          box-shadow: none !important;
        }

        @keyframes glow-one {
          from {
            transform: translate(0, 0);
          }

          to {
            transform: translate(160px, 120px) scale(1.15);
          }
        }

        @keyframes glow-two {
          from {
            transform: translate(0, 0);
          }

          to {
            transform: translate(-160px, -100px) scale(1.15);
          }
        }

        @keyframes grid-move {
          from {
            transform: translate(0, 0);
          }

          to {
            transform: translate(70px, 70px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .purple-glow,
          .purple-grid {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}