"use client";

import { useState } from "react";
import {
  useGetContactsQuery,
  useReplyToContactMutation,
} from "../../../store/api";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AdminNavbar from "../../../components/admin/AdminNavbar";

export default function AdminContactsPage() {
  const { data, isLoading, isError } = useGetContactsQuery();

  const [replyToContact, { isLoading: replying }] = useReplyToContactMutation();

  const [activeContact, setActiveContact] = useState(null);
  const [replyText, setReplyText] = useState("");

  const contacts = data?.data || [];

  const handleReply = async (id) => {
    if (!replyText.trim()) {
      alert("Please enter a reply.");
      return;
    }

    try {
      await replyToContact({
        id,
        reply: replyText.trim(),
      }).unwrap();

      setReplyText("");
      setActiveContact(null);

      alert("Reply sent successfully.");
    } catch (err) {
      alert(err?.data?.message || "Failed to send reply. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen bg-black text-white">
      <AdminSidebar />

      <section className="min-w-0 flex-1">
        <AdminNavbar />

        <article className="min-h-screen bg-black px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-purple-300 sm:text-3xl">
              Contact Messages
            </h1>

            <p className="mt-2 text-sm text-white/50">
              View customer messages and reply to them.
            </p>
          </header>

          {isLoading && (
            <p className="rounded-xl border border-purple-500/20 bg-zinc-950 p-6 text-center text-white/50">
              Loading messages...
            </p>
          )}

          {isError && !isLoading && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
              Failed to load contact messages.
            </p>
          )}

          {!isLoading && !isError && contacts.length === 0 && (
            <p className="rounded-xl border border-purple-500/20 bg-zinc-950 p-6 text-center text-white/50">
              No contact messages found.
            </p>
          )}

          {!isLoading && !isError && contacts.length > 0 && (
            <section className="space-y-5">
              {contacts.map((contact) => (
                <article
                  key={contact._id}
                  className="rounded-xl border border-purple-500/20 bg-zinc-950 p-5 sm:p-6"
                >
                  <header className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-semibold text-purple-300">
                        {contact.user?.name || contact.name}
                      </h2>

                      <p className="mt-1 text-sm text-white/40">
                        {contact.user?.email || contact.email}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs capitalize ${
                        contact.status === "replied"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-yellow-400/10 text-yellow-400"
                      }`}
                    >
                      {contact.status || "pending"}
                    </span>
                  </header>

                  <p className="mt-5 text-sm leading-6 text-white/70">
                    {contact.message}
                  </p>

                  <p className="mt-2 text-xs text-white/30">
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>

                  {contact.reply && (
                    <section className="mt-5 border-l-2 border-purple-400 bg-purple-400/5 p-4">
                      <p className="text-xs font-semibold text-purple-300">
                        Admin Reply
                      </p>

                      <p className="mt-2 text-sm text-white/70">
                        {contact.reply}
                      </p>
                    </section>
                  )}

                  {activeContact !== contact._id && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveContact(contact._id);
                        setReplyText(contact.reply || "");
                      }}
                      className="mt-5 rounded-lg bg-purple-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-purple-300"
                    >
                      {contact.reply ? "Edit Reply" : "Reply"}
                    </button>
                  )}

                  {activeContact === contact._id && (
                    <section className="mt-5">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={4}
                        placeholder="Write your reply..."
                        className="w-full resize-none rounded-lg border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-purple-400/60"
                      />

                      <div className="mt-3 flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveContact(null);
                            setReplyText("");
                          }}
                          disabled={replying}
                          className="rounded-lg border border-white/10 px-5 py-2.5 text-sm text-white/60 hover:bg-white/5"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={() => handleReply(contact._id)}
                          disabled={replying || !replyText.trim()}
                          className="rounded-lg bg-purple-400 px-5 py-2.5 text-sm font-semibold text-black hover:bg-purple-300 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {replying ? "Sending..." : "Send Reply"}
                        </button>
                      </div>
                    </section>
                  )}
                </article>
              ))}
            </section>
          )}
        </article>
      </section>
    </main>
  );
}
