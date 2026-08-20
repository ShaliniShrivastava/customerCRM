"use client";

import LeadTable from "../../../components/admin/LeadTable";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AdminNavbar from "../../../components/admin/AdminNavbar";

export default function LeadsPage() {
  return (
    <div className="leads-page relative flex min-h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="leads-background pointer-events-none absolute inset-0">
        <div className="purple-glow glow-one" />
        <div className="purple-glow glow-two" />
        <div className="purple-glow glow-three" />
        <div className="purple-grid" />
      </div>

      <AdminSidebar />

      <div className="relative z-10 min-w-0 flex-1">
        <AdminNavbar />

        <main className="relative min-h-screen bg-transparent px-4 pb-6 pt-24 sm:px-6 lg:px-8">
          <div className="relative z-10 mb-6 sm:mb-8">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-purple-400/70">
              Admin Panel
            </p>

            <h1 className="text-2xl font-bold text-purple-200 drop-shadow-[0_0_15px_rgba(192,132,252,0.45)]">
              Leads
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Manage and track your leads.
            </p>

            <div className="mt-3 h-px w-24 bg-gradient-to-r from-purple-500 via-purple-300 to-transparent" />
          </div>

          <div className="relative z-10 rounded-2xl border border-purple-400/20 bg-black/40 p-3 shadow-[0_0_30px_rgba(139,92,246,0.08)] backdrop-blur-md sm:p-5">
            <LeadTable />
          </div>
        </main>
      </div>

      <style>{`
        .leads-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(168, 85, 247, 0.16),
              transparent 28%
            ),
            radial-gradient(
              circle at 85% 30%,
              rgba(124, 58, 237, 0.13),
              transparent 30%
            ),
            radial-gradient(
              circle at 50% 100%,
              rgba(192, 132, 252, 0.1),
              transparent 32%
            ),
            #020203;

          animation: background-move 22s ease-in-out infinite alternate;
        }

        .purple-glow {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        .glow-one {
          left: -180px;
          top: 100px;
          background: rgba(168, 85, 247, 0.18);
          animation: glow-one 18s ease-in-out infinite alternate;
        }

        .glow-two {
          right: -180px;
          top: 35%;
          background: rgba(124, 58, 237, 0.16);
          animation: glow-two 21s ease-in-out infinite alternate;
        }

        .glow-three {
          left: 40%;
          bottom: -260px;
          width: 500px;
          height: 500px;
          background: rgba(192, 132, 252, 0.1);
          animation: glow-three 24s ease-in-out infinite alternate;
        }

        .purple-grid {
          position: absolute;
          inset: 0;
          opacity: 0.06;

          background-image:
            linear-gradient(rgba(168, 85, 247, 0.25) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(168, 85, 247, 0.25) 1px,
              transparent 1px
            );

          background-size: 70px 70px;
          animation: grid-move 28s linear infinite;
        }

        @keyframes background-move {
          0% {
            background-position: 0% 0%;
          }

          50% {
            background-position: 50% 40%;
          }

          100% {
            background-position: 100% 100%;
          }
        }

        @keyframes glow-one {
          0% {
            transform: translate(0, 0) scale(1);
          }

          100% {
            transform: translate(160px, 120px) scale(1.15);
          }
        }

        @keyframes glow-two {
          0% {
            transform: translate(0, 0) scale(1);
          }

          100% {
            transform: translate(-160px, -100px) scale(1.15);
          }
        }

        @keyframes glow-three {
          0% {
            transform: translate(-80px, 40px) scale(1);
          }

          100% {
            transform: translate(150px, -120px) scale(1.12);
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
          .leads-background,
          .purple-glow,
          .purple-grid {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
