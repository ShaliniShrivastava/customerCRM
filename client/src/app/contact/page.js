"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  useGetMyContactsQuery,
  useCreateContactMutation,
} from "../../store/api";

export default function Contact() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading } = useGetMyContactsQuery(undefined, {
    skip: !user,
  });

  const [createContact, { isLoading: sending }] = useCreateContactMutation();
  const [message, setMessage] = useState("");

  const contacts = data?.data || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/login?redirect=/contact");
      return;
    }

    if (!message.trim()) return;

    try {
      await createContact({ message: message.trim() }).unwrap();
      setMessage("");
    } catch (err) {
      alert(
        err?.data?.message || "Unable to send your message. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-yellow-400 sm:text-4xl">
            Contact Us
          </h1>

          <p className="mt-4 text-gray-400">
            Have a question? Chat with our team here.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-yellow-500/20 bg-zinc-950">
          <div className="flex h-[500px] flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
              {isLoading ? (
                <p className="text-center text-gray-500">Loading messages...</p>
              ) : contacts.length === 0 ? (
                <div className="flex h-full items-center justify-center text-gray-500">
                  Start a conversation with our team.
                </div>
              ) : (
                contacts.map((contact) => (
                  <div key={contact._id}>
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-yellow-400 px-4 py-3 text-sm text-black">
                        {contact.message}
                        <p className="mt-2 text-[10px] opacity-60">
                          {new Date(contact.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {contact.reply && (
                      <div className="mt-3 flex justify-start">
                        <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-yellow-500/20 bg-black px-4 py-3 text-sm text-gray-200">
                          <p className="mb-1 text-xs font-semibold text-yellow-400">
                            Admin
                          </p>

                          {contact.reply}

                          <p className="mt-2 text-[10px] text-gray-500">
                            {contact.status}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-yellow-500/10 p-4 sm:p-5"
            >
              <div className="flex items-end gap-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="2"
                  required
                  placeholder="Type your message..."
                  className="flex-1 resize-none rounded-xl border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400"
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? "..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
