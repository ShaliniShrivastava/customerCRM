"use client";

import { useEffect, useState } from "react";
import {
  useGetWebsiteContentQuery,
  useUpdateWebsiteContentMutation,
  useAddFeatureMutation,
  useDeleteFeatureMutation,
  useGetContactsQuery,
  useReplyToContactMutation,
} from "../../../store/api";

export default function WebsitePage() {
  const { data, isLoading } = useGetWebsiteContentQuery();

  const [updateWebsiteContent, { isLoading: saving }] =
    useUpdateWebsiteContentMutation();

  const [addFeature, { isLoading: addingFeature }] = useAddFeatureMutation();

  const [deleteFeature, { isLoading: deletingFeature }] =
    useDeleteFeatureMutation();

  const { data: contactData } = useGetContactsQuery();

  const [replyToContact, { isLoading: replying }] = useReplyToContactMutation();

  const contacts = contactData?.data || [];

  const [reply, setReply] = useState({});
  const [message, setMessage] = useState("");

  const [newFeature, setNewFeature] = useState({
    title: "",
    description: "",
  });

  const [content, setContent] = useState({
    home: {
      title: "",
      description: "",
    },
    about: {
      title: "",
      description: "",
    },
    features: [],
  });

  useEffect(() => {
    if (data?.data) {
      setContent(data.data);
    }
  }, [data]);

  const updateHome = (field, value) => {
    setContent({
      ...content,
      home: {
        ...content.home,
        [field]: value,
      },
    });
  };

  const updateAbout = (field, value) => {
    setContent({
      ...content,
      about: {
        ...content.about,
        [field]: value,
      },
    });
  };

  const updateFeature = (index, field, value) => {
    const features = [...content.features];

    features[index] = {
      ...features[index],
      [field]: value,
    };

    setContent({
      ...content,
      features,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await updateWebsiteContent(content).unwrap();
      setMessage("Website content updated successfully.");
    } catch (error) {
      setMessage(error?.data?.message || "Failed to update content.");
    }
  };

  // ADD FEATURE
  const handleAddFeature = async () => {
    if (!newFeature.title.trim() || !newFeature.description.trim()) {
      setMessage("Feature title and description are required.");
      return;
    }

    try {
      await addFeature({
        title: newFeature.title.trim(),
        description: newFeature.description.trim(),
      }).unwrap();

      setNewFeature({
        title: "",
        description: "",
      });

      setMessage("Feature added successfully.");
    } catch (error) {
      setMessage(error?.data?.message || "Failed to add feature.");
    }
  };

  // DELETE FEATURE
  const handleDeleteFeature = async (id) => {
    if (!confirm("Are you sure you want to delete this feature?")) return;

    try {
      await deleteFeature(id).unwrap();
      setMessage("Feature deleted successfully.");
    } catch (error) {
      setMessage(error?.data?.message || "Failed to delete feature.");
    }
  };

  const handleReply = async (id) => {
    if (!reply[id]?.trim()) return;

    try {
      await replyToContact({
        id,
        reply: reply[id],
      }).unwrap();

      setReply({
        ...reply,
        [id]: "",
      });
    } catch (error) {
      alert(error?.data?.message || "Failed to send reply.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24 text-center text-purple-300">
        Loading website content...
      </div>
    );
  }

  return (
    <main className="website-admin relative min-h-screen overflow-hidden bg-black px-4 pb-10 pt-24 text-white sm:px-6 lg:px-8">
      {/* BACKGROUND */}
      <div className="website-bg pointer-events-none absolute inset-0">
        <div className="website-orb orb-one" />
        <div className="website-orb orb-two" />
        <div className="website-orb orb-three" />

        <div className="website-grid" />

        <div className="website-light light-one" />
        <div className="website-light light-two" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-purple-400/70">
            Admin Panel
          </p>

          <h1 className="mt-1 text-2xl font-bold text-purple-200 drop-shadow-[0_0_18px_rgba(168,85,247,0.35)] sm:text-3xl">
            Website Content
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Manage the content displayed on your public website.
          </p>

          <div className="mt-4 h-px w-32 bg-gradient-to-r from-purple-500 via-purple-300 to-transparent" />
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* HOME */}
          <section className="website-card rounded-2xl border border-purple-400/20 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.7)]" />

              <h2 className="text-xl font-semibold text-purple-300">Home</h2>
            </div>

            <div className="space-y-4">
              <input
                value={content.home.title}
                onChange={(e) => updateHome("title", e.target.value)}
                placeholder="Home title"
                className="admin-input w-full rounded-lg border border-purple-400/20 bg-black/70 px-4 py-3 text-white outline-none transition focus:border-purple-400"
              />

              <textarea
                value={content.home.description}
                onChange={(e) => updateHome("description", e.target.value)}
                rows="4"
                placeholder="Home description"
                className="admin-input w-full resize-none rounded-lg border border-purple-400/20 bg-black/70 px-4 py-3 text-white outline-none transition focus:border-purple-400"
              />
            </div>
          </section>

          {/* ABOUT */}
          <section className="website-card rounded-2xl border border-purple-400/20 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.7)]" />

              <h2 className="text-xl font-semibold text-purple-300">About</h2>
            </div>

            <div className="space-y-4">
              <input
                value={content.about.title}
                onChange={(e) => updateAbout("title", e.target.value)}
                placeholder="About title"
                className="admin-input w-full rounded-lg border border-purple-400/20 bg-black/70 px-4 py-3 text-white outline-none transition focus:border-purple-400"
              />

              <textarea
                value={content.about.description}
                onChange={(e) => updateAbout("description", e.target.value)}
                rows="5"
                placeholder="About description"
                className="admin-input w-full resize-none rounded-lg border border-purple-400/20 bg-black/70 px-4 py-3 text-white outline-none transition focus:border-purple-400"
              />
            </div>
          </section>

          {/* FEATURES */}
          <section className="website-card rounded-2xl border border-purple-400/20 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.7)]" />

                <h2 className="text-xl font-semibold text-purple-300">
                  Features
                </h2>
              </div>

              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                {content.features.length} Features
              </span>
            </div>

            {/* EXISTING FEATURES */}
            <div className="space-y-4">
              {content.features.map((feature, index) => (
                <div
                  key={feature._id || index}
                  className="feature-box rounded-xl border border-purple-400/10 bg-black/60 p-4 transition duration-500 hover:border-purple-400/30 hover:bg-purple-950/10"
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1">
                      <input
                        value={feature.title || ""}
                        onChange={(e) =>
                          updateFeature(index, "title", e.target.value)
                        }
                        placeholder="Feature title"
                        className="admin-input w-full rounded-lg border border-purple-400/20 bg-black/70 px-4 py-3 text-white outline-none transition focus:border-purple-400"
                      />

                      <textarea
                        value={feature.description || ""}
                        onChange={(e) =>
                          updateFeature(index, "description", e.target.value)
                        }
                        rows="3"
                        placeholder="Feature description"
                        className="admin-input mt-3 w-full resize-none rounded-lg border border-purple-400/20 bg-black/70 px-4 py-3 text-white outline-none transition focus:border-purple-400"
                      />
                    </div>

                    {/* DELETE */}
                    <div className="flex items-start">
                      <button
                        type="button"
                        onClick={() => handleDeleteFeature(feature._id)}
                        disabled={deletingFeature || !feature._id}
                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white hover:shadow-[0_0_18px_rgba(239,68,68,0.25)] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {deletingFeature ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ADD FEATURE */}
            <div className="mt-6 rounded-xl border border-purple-400/20 bg-purple-500/5 p-4">
              <h3 className="mb-4 font-semibold text-purple-300">
                Add New Feature
              </h3>

              <div className="space-y-3">
                <input
                  value={newFeature.title}
                  onChange={(e) =>
                    setNewFeature({
                      ...newFeature,
                      title: e.target.value,
                    })
                  }
                  placeholder="Feature title"
                  className="admin-input w-full rounded-lg border border-purple-400/20 bg-black px-4 py-3 text-white outline-none transition focus:border-purple-400"
                />

                <textarea
                  value={newFeature.description}
                  onChange={(e) =>
                    setNewFeature({
                      ...newFeature,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  placeholder="Feature description"
                  className="admin-input w-full resize-none rounded-lg border border-purple-400/20 bg-black px-4 py-3 text-white outline-none transition focus:border-purple-400"
                />

                <button
                  type="button"
                  onClick={handleAddFeature}
                  disabled={addingFeature}
                  className="rounded-lg bg-purple-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] disabled:opacity-50"
                >
                  {addingFeature ? "Adding..." : "+ Add Feature"}
                </button>
              </div>
            </div>
          </section>

          {/* MESSAGE */}
          {message && (
            <p className="rounded-xl border border-purple-400/20 bg-purple-500/10 p-3 text-sm text-purple-300">
              {message}
            </p>
          )}

          {/* SAVE */}
          <button
            type="submit"
            disabled={saving}
            className="save-button relative overflow-hidden rounded-lg bg-purple-500 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.25)] transition hover:bg-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.45)] disabled:opacity-50"
          >
            <span className="relative z-10">
              {saving ? "Saving..." : "Save Changes"}
            </span>

            <span className="save-shine" />
          </button>
        </form>

        {/* CUSTOMER MESSAGES */}
        <section className="website-card mt-8 rounded-2xl border border-purple-400/20 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.7)]" />

            <h2 className="text-xl font-semibold text-purple-300">
              Customer Messages
            </h2>
          </div>

          {contacts.length === 0 ? (
            <p className="text-sm text-white/50">No customer messages yet.</p>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className="feature-box rounded-xl border border-purple-400/10 bg-black/60 p-4 transition hover:border-purple-400/30"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium text-white">
                      {contact.user?.name || contact.name}
                    </p>

                    <span className="text-xs capitalize text-purple-300">
                      {contact.status}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-white/50">
                    {contact.user?.email || contact.email}
                  </p>

                  <p className="mt-4 text-sm text-gray-300">
                    {contact.message}
                  </p>

                  {contact.reply && (
                    <div className="mt-4 rounded-lg border border-purple-400/10 bg-purple-500/10 p-3">
                      <p className="text-xs font-semibold text-purple-300">
                        Admin Reply
                      </p>

                      <p className="mt-1 text-sm text-gray-300">
                        {contact.reply}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <input
                      value={reply[contact._id] || ""}
                      onChange={(e) =>
                        setReply({
                          ...reply,
                          [contact._id]: e.target.value,
                        })
                      }
                      placeholder="Write a reply..."
                      className="admin-input flex-1 rounded-lg border border-purple-400/20 bg-black px-4 py-2.5 text-sm text-white outline-none transition focus:border-purple-400"
                    />

                    <button
                      type="button"
                      onClick={() => handleReply(contact._id)}
                      disabled={replying || !reply[contact._id]?.trim()}
                      className="rounded-lg bg-purple-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {replying ? "Sending..." : "Reply"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .website-admin {
          background: #020203;
        }

        .website-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .website-orb {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          filter: blur(100px);
        }

        .orb-one {
          left: -180px;
          top: 80px;
          background: rgba(168, 85, 247, 0.18);
          animation: orbMoveOne 20s ease-in-out infinite alternate;
        }

        .orb-two {
          right: -180px;
          top: 35%;
          background: rgba(124, 58, 237, 0.16);
          animation: orbMoveTwo 24s ease-in-out infinite alternate;
        }

        .orb-three {
          left: 35%;
          bottom: -300px;
          background: rgba(192, 132, 252, 0.12);
          animation: orbMoveThree 26s ease-in-out infinite alternate;
        }

        .website-grid {
          position: absolute;
          inset: 0;
          opacity: 0.045;
          background-image:
            linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px);
          background-size: 70px 70px;
          animation: gridMove 30s linear infinite;
        }

        .website-light {
          position: absolute;
          width: 800px;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(192, 132, 252, 0.5),
            transparent
          );
        }

        .light-one {
          top: 30%;
          left: -400px;
          transform: rotate(20deg);
          animation: lightMoveOne 18s ease-in-out infinite alternate;
        }

        .light-two {
          top: 70%;
          right: -400px;
          transform: rotate(-20deg);
          animation: lightMoveTwo 22s ease-in-out infinite alternate;
        }

        .website-card {
          animation: cardAppear 0.8s ease-out both;
          transition:
            border-color 0.6s ease,
            box-shadow 0.6s ease,
            transform 0.6s ease;
        }

        .website-card:hover {
          transform: translateY(-2px);
          border-color: rgba(168, 85, 247, 0.35);
          box-shadow: 0 10px 40px rgba(168, 85, 247, 0.08);
        }

        .save-button {
          animation: buttonGlow 3s ease-in-out infinite;
        }

        .save-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 45%;
          height: 100%;
          transform: skewX(-20deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.45),
            transparent
          );
          animation: buttonShine 4s ease-in-out infinite;
        }

        @keyframes orbMoveOne {
          0% {
            transform: translate(0, 0) scale(1);
          }

          100% {
            transform: translate(220px, 180px) scale(1.15);
          }
        }

        @keyframes orbMoveTwo {
          0% {
            transform: translate(0, 0) scale(1);
          }

          100% {
            transform: translate(-200px, -140px) scale(1.1);
          }
        }

        @keyframes orbMoveThree {
          0% {
            transform: translate(-80px, 50px) scale(1);
          }

          100% {
            transform: translate(180px, -120px) scale(1.12);
          }
        }

        @keyframes gridMove {
          from {
            transform: translate(0, 0);
          }

          to {
            transform: translate(70px, 70px);
          }
        }

        @keyframes lightMoveOne {
          0% {
            transform: translateX(-250px) rotate(20deg);
            opacity: 0.1;
          }

          50% {
            opacity: 0.5;
          }

          100% {
            transform: translateX(700px) rotate(20deg);
            opacity: 0.1;
          }
        }

        @keyframes lightMoveTwo {
          0% {
            transform: translateX(250px) rotate(-20deg);
            opacity: 0.1;
          }

          50% {
            opacity: 0.45;
          }

          100% {
            transform: translateX(-700px) rotate(-20deg);
            opacity: 0.1;
          }
        }

        @keyframes cardAppear {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes buttonShine {
          0% {
            left: -100%;
          }

          45%,
          100% {
            left: 130%;
          }
        }

        @keyframes buttonGlow {
          0%,
          100% {
            box-shadow: 0 0 15px rgba(168, 85, 247, 0.2);
          }

          50% {
            box-shadow:
              0 0 25px rgba(168, 85, 247, 0.4),
              0 0 45px rgba(168, 85, 247, 0.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .website-orb,
          .website-grid,
          .website-light,
          .website-card,
          .save-button,
          .save-shine {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
