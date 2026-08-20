"use client";

import { useState } from "react";
import {
  useImportLeadsMutation,
  useImportLeadsFromAPIMutation,
} from "../../../store/api";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AdminNavbar from "../../../components/admin/AdminNavbar";

export default function ImportPage() {
  const [file, setFile] = useState(null);
  const [apiUrl, setApiUrl] = useState("");

  const [importLeads, { isLoading: fileLoading }] = useImportLeadsMutation();

  const [importLeadsFromAPI, { isLoading: apiLoading }] =
    useImportLeadsFromAPIMutation();

  const allowedExtensions = [
    ".csv",
    ".xlsx",
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const fileName = selectedFile.name.toLowerCase();

    const isAllowed = allowedExtensions.some((extension) =>
      fileName.endsWith(extension),
    );

    if (!isAllowed) {
      setFile(null);
      e.target.value = "";

      alert(
        "Only CSV, Excel (.xlsx), PDF, JPG, JPEG, PNG and WEBP files are supported.",
      );

      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setFile(null);
      e.target.value = "";

      alert("File size must not exceed 10 MB.");

      return;
    }

    setFile(selectedFile);
  };

  // FILE IMPORT
  const handleFileImport = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await importLeads(formData).unwrap();

      alert(
        `${response.message}\n\nImported: ${response.imported}\nSkipped: ${response.skipped}\nInvalid: ${response.invalid}`,
      );

      setFile(null);

      const fileInput = document.getElementById("leadFile");

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      alert(err?.data?.message || "Failed to import leads.");
    }
  };

  // API IMPORT
  const handleAPIImport = async () => {
    if (!apiUrl.trim()) {
      alert("Please enter an API URL.");
      return;
    }

    try {
      const response = await importLeadsFromAPI({
        apiUrl: apiUrl.trim(),
      }).unwrap();

      alert(
        `${response.message}\n\nImported: ${response.imported}\nSkipped: ${response.skipped}\nInvalid: ${response.invalid}`,
      );

      setApiUrl("");
    } catch (err) {
      alert(err?.data?.message || "Failed to import leads from API.");
    }
  };

  const getFileIcon = () => {
    if (!file) return "📁";

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".csv")) return "📊";
    if (fileName.endsWith(".xlsx")) return "📗";
    if (fileName.endsWith(".pdf")) return "📕";

    if (
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg") ||
      fileName.endsWith(".png") ||
      fileName.endsWith(".webp")
    ) {
      return "🖼️";
    }

    return "📄";
  };

  const isLoading = fileLoading || apiLoading;

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        <AdminNavbar />

        <main className="min-h-screen bg-black px-4 pb-8 pt-24 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* HEADER */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-purple-300 sm:text-3xl">
                Import Leads
              </h1>

              <p className="mt-2 text-sm text-white/50">
                Import leads from files or an external API.
              </p>
            </div>

            {/* FILE IMPORT */}
            <div className="rounded-2xl border border-purple-500/20 bg-zinc-950 p-5 shadow-[0_0_30px_rgba(139,92,246,0.08)] sm:p-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  Import From File
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Upload a file containing lead information.
                </p>
              </div>

              {/* FILE SELECT */}
              <label
                htmlFor="leadFile"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-purple-500/30 bg-black px-4 py-10 text-center transition-all duration-300 hover:border-purple-400 hover:bg-purple-400/5 sm:px-6 sm:py-12"
              >
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                  {getFileIcon()}
                </div>

                <p className="font-medium text-purple-300">
                  Click to select a file
                </p>

                <p className="mt-2 text-sm text-white/40">
                  CSV, XLSX, PDF, JPG, JPEG, PNG or WEBP
                </p>

                <p className="mt-1 text-xs text-white/30">
                  Maximum file size: 10 MB
                </p>

                <input
                  id="leadFile"
                  type="file"
                  accept=".csv,.xlsx,.pdf,.jpg,.jpeg,.png,.webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* SELECTED FILE */}
              {file && (
                <div className="mt-5 flex flex-col gap-3 rounded-lg border border-purple-500/20 bg-purple-500/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="text-2xl">{getFileIcon()}</span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-purple-300">
                        {file.name}
                      </p>

                      <p className="mt-1 text-xs text-white/40">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);

                      const fileInput = document.getElementById("leadFile");

                      if (fileInput) {
                        fileInput.value = "";
                      }
                    }}
                    className="self-start text-sm text-red-400 transition hover:text-red-300 sm:self-auto"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* IMPORT BUTTON */}
              <button
                type="button"
                onClick={handleFileImport}
                disabled={!file || isLoading}
                className="mt-6 w-full rounded-lg bg-purple-400 px-5 py-3 font-semibold text-black transition-all duration-300 hover:bg-purple-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {fileLoading ? "Importing..." : "Import Leads"}
              </button>
            </div>

            {/* API IMPORT */}
            <div className="mt-8 rounded-2xl border border-purple-500/20 bg-zinc-950 p-5 shadow-[0_0_30px_rgba(139,92,246,0.08)] sm:p-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  Import From API
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Import lead data from an external API that returns JSON.
                </p>
              </div>

              <input
                type="url"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://example.com/api/leads"
                className="w-full rounded-lg border border-purple-500/20 bg-black px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-purple-400/60"
              />

              <button
                type="button"
                onClick={handleAPIImport}
                disabled={!apiUrl.trim() || isLoading}
                className="mt-4 w-full rounded-lg border border-purple-400/40 bg-purple-500/10 px-5 py-3 font-semibold text-purple-300 transition-all duration-300 hover:bg-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {apiLoading ? "Importing From API..." : "Import From API"}
              </button>

              <p className="mt-3 text-xs leading-5 text-white/30">
                The API should return lead data containing fields such as name,
                email and requirement.
              </p>
            </div>

            {/* SUPPORTED TYPES */}
            <div className="mt-8 rounded-2xl border border-purple-500/10 bg-zinc-950 p-5 sm:p-6">
              <h3 className="mb-4 font-semibold text-purple-300">
                Supported Import Sources
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-purple-500/10 bg-black p-3">
                  <p className="font-medium text-white">📊 CSV</p>

                  <p className="mt-1 text-xs text-white/40">
                    Multiple lead records
                  </p>
                </div>

                <div className="rounded-lg border border-purple-500/10 bg-black p-3">
                  <p className="font-medium text-white">📗 Excel</p>

                  <p className="mt-1 text-xs text-white/40">
                    .xlsx multiple lead records
                  </p>
                </div>

                <div className="rounded-lg border border-purple-500/10 bg-black p-3">
                  <p className="font-medium text-white">📕 PDF</p>

                  <p className="mt-1 text-xs text-white/40">
                    Lead information extracted from text
                  </p>
                </div>

                <div className="rounded-lg border border-purple-500/10 bg-black p-3">
                  <p className="font-medium text-white">🖼️ Images</p>

                  <p className="mt-1 text-xs text-white/40">
                    JPG, JPEG, PNG and WEBP using OCR
                  </p>
                </div>

                <div className="rounded-lg border border-purple-500/10 bg-black p-3 sm:col-span-2">
                  <p className="font-medium text-white">🔗 API</p>

                  <p className="mt-1 text-xs text-white/40">
                    External JSON API containing lead information
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-white/40">
                CSV and Excel files should contain columns such as name, email,
                phone, company, requirement, budget, expectedTimeline and
                status.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
