"use client";

import { useEffect } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useGetDashboardStatsQuery } from "../../store/api";

export default function AdminDashboard() {
  const { data, isLoading, isError } = useGetDashboardStatsQuery();

  useEffect(() => {
    document.body.classList.add("admin-mode");
    return () => document.body.classList.remove("admin-mode");
  }, []);

  const stats = data?.data;

  const cards = [
    {
      title: "Total Leads",
      value: stats?.totalLeads ?? 0,
    },
    {
      title: "New Leads",
      value: stats?.newLeads ?? 0,
    },
    {
      title: "Converted Leads",
      value: stats?.convertedLeads ?? 0,
    },
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
    },
  ];

  return (
    <ProtectedRoute role="admin">
      <div className="admin-scrollbar admin-dashboard relative flex min-h-screen overflow-y-auto overflow-x-hidden bg-black">
        {/* ANIMATED PURPLE BACKGROUND */}

        <div className="admin-background pointer-events-none absolute inset-0">
          {/* Main moving gradient */}
          <div className="moving-gradient" />

          {/* Large purple glowing orbs */}
          <div className="purple-orb orb-one" />
          <div className="purple-orb orb-two" />
          <div className="purple-orb orb-three" />

          {/* Soft moving light beams */}
          <div className="light-beam beam-one" />
          <div className="light-beam beam-two" />

          {/* Subtle grid */}
          <div className="purple-grid" />

          {/* Small center glow */}
          <div className="center-glow" />
        </div>

        {/* SIDEBAR */}

        <AdminSidebar />

        {/* MAIN CONTENT */}

        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <AdminNavbar />

          <main className="relative flex-1 bg-transparent px-4 pb-8 pt-28 sm:px-6 lg:px-8">
            <div className="relative z-10">
              {/* Dashboard Heading */}

              <div className="mb-8">
                <p className="mb-1 text-sm font-medium uppercase tracking-[0.25em] text-purple-400/70">
                  Admin Panel
                </p>

                <h2 className="text-xl font-bold text-purple-200 drop-shadow-[0_0_18px_rgba(192,132,252,0.45)] sm:text-2xl">
                  Dashboard Overview
                </h2>

                <div className="mt-3 h-px w-32 bg-gradient-to-r from-purple-500 via-purple-300 to-transparent opacity-70" />
              </div>

              {/* Error */}

              {isError && (
                <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400 backdrop-blur-md">
                  Failed to load dashboard data.
                </p>
              )}

              {/* DASHBOARD CARDS */}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {cards.map((card, index) => (
                  <div
                    key={card.title}
                    className="admin-card group relative overflow-hidden rounded-2xl border border-purple-400/20 bg-black/55 p-5 backdrop-blur-xl sm:p-6"
                    style={{
                      animationDelay: `${index * 0.18}s`,
                    }}
                  >
                    {/* Card shine */}

                    <div className="card-shine pointer-events-none absolute inset-y-0 -left-[120%] w-[65%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-purple-200/20 to-transparent" />

                    {/* Small top glow */}

                    <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-purple-500/10 blur-3xl transition-all duration-700 group-hover:bg-purple-400/20" />

                    {/* Card content */}

                    <div className="relative z-10">
                      <p className="text-sm font-medium text-white/55">
                        {card.title}
                      </p>

                      <h3 className="mt-3 text-3xl font-bold text-purple-200 drop-shadow-[0_0_15px_rgba(192,132,252,0.45)]">
                        {isLoading ? "..." : card.value}
                      </h3>

                      {/* Bottom animated line */}

                      <div className="mt-5 h-[2px] w-0 rounded-full bg-gradient-to-r from-purple-500 via-purple-300 to-transparent transition-all duration-1000 ease-out group-hover:w-full" />
                    </div>
                  </div>
                ))}
              </div>

              {/* LOWER DECORATIVE AREA */}

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="admin-info-box relative overflow-hidden rounded-2xl border border-purple-400/10 bg-black/30 p-6 backdrop-blur-md">
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

                  <div className="relative z-10">
                    <p className="text-xs uppercase tracking-[0.2em] text-purple-400/60">
                      CRM Overview
                    </p>

                    <h3 className="mt-2 text-lg font-semibold text-white/90">
                      Manage your customer relationships
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
                      Monitor leads, users and conversions from your admin
                      dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* PAGE SPECIFIC ANIMATIONS */}

        <style>{`
          :global(body.admin-mode::-webkit-scrollbar) {
            width: 10px;
          }

          :global(body.admin-mode::-webkit-scrollbar-track) {
            background: #020203;
          }

          :global(body.admin-mode::-webkit-scrollbar-thumb) {
            background: #a855f7;
            border-radius: 10px;
          }

          :global(body.admin-mode::-webkit-scrollbar-thumb:hover) {
            background: #c084fc;
          }

          .admin-scrollbar::-webkit-scrollbar {
            width: 10px;
          }

          .admin-scrollbar::-webkit-scrollbar-track {
            background: #020203;
          }

          .admin-scrollbar::-webkit-scrollbar-thumb {
            background: #a855f7;
            border-radius: 10px;
          }

          .admin-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #c084fc;
          }

          
            //  MAIN BACKGROUND
         

          .admin-background {
            position: absolute;
            inset: 0;
            overflow: hidden;
            background: #020203;
          }

          .moving-gradient {
            position: absolute;
            inset: -50%;
            width: 200%;
            height: 200%;

            background:
              radial-gradient(
                circle at 18% 18%,
                rgba(168, 85, 247, 0.32),
                transparent 22%
              ),
              radial-gradient(
                circle at 78% 20%,
                rgba(126, 34, 206, 0.25),
                transparent 25%
              ),
              radial-gradient(
                circle at 82% 78%,
                rgba(139, 92, 246, 0.28),
                transparent 24%
              ),
              radial-gradient(
                circle at 25% 82%,
                rgba(192, 132, 252, 0.18),
                transparent 25%
              ),
              linear-gradient(
                135deg,
                #020203 0%,
                #0b0412 25%,
                #030205 50%,
                #10051a 75%,
                #020203 100%
              );

            background-size: 120% 120%;

            animation: background-flow 28s ease-in-out infinite alternate;
          }

         
            //  PURPLE ORBS
         

          .purple-orb {
            position: absolute;

            width: 430px;
            height: 430px;

            border-radius: 50%;

            filter: blur(90px);

            mix-blend-mode: screen;

            pointer-events: none;
          }

          .orb-one {
            left: -190px;
            top: 80px;

            background: rgba(168, 85, 247, 0.28);

            animation: orb-one 22s ease-in-out infinite alternate;
          }

          .orb-two {
            right: -190px;
            top: 28%;

            background: rgba(124, 58, 237, 0.25);

            animation: orb-two 25s ease-in-out infinite alternate;
          }

          .orb-three {
            left: 38%;
            bottom: -300px;

            width: 560px;
            height: 560px;

            background: rgba(192, 132, 252, 0.18);

            animation: orb-three 28s ease-in-out infinite alternate;
          }

         
            //  CENTER GLOW
        

          .center-glow {
            position: absolute;

            width: 420px;
            height: 420px;

            left: 45%;
            top: 40%;

            border-radius: 50%;

            background: radial-gradient(
              circle,
              rgba(139, 92, 246, 0.08),
              transparent 70%
            );

            filter: blur(90px);

            animation: center-glow 20s ease-in-out infinite alternate;
          }

         
            //  LIGHT BEAMS
        

          .light-beam {
            position: absolute;

            width: 900px;
            height: 2px;

            border-radius: 50%;

            background: linear-gradient(
              90deg,
              transparent,
              rgba(168, 85, 247, 0.08),
              rgba(216, 180, 254, 0.65),
              rgba(168, 85, 247, 0.08),
              transparent
            );

            box-shadow:
              0 0 15px rgba(168, 85, 247, 0.45),
              0 0 40px rgba(168, 85, 247, 0.18);
          }

          .beam-one {
            left: -350px;
            top: 35%;

            transform: rotate(25deg);

            animation: beam-one 20s ease-in-out infinite alternate;
          }

          .beam-two {
            right: -350px;
            top: 68%;

            transform: rotate(-25deg);

            animation: beam-two 23s ease-in-out infinite alternate;
          }

         
            //  PURPLE GRID
         

          .purple-grid {
            position: absolute;
            inset: 0;

            opacity: 0.08;

            background-image:
              linear-gradient(rgba(168, 85, 247, 0.18) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(168, 85, 247, 0.18) 1px,
                transparent 1px
              );

            background-size: 75px 75px;

            mask-image: linear-gradient(
              to bottom,
              black,
              rgba(0, 0, 0, 0.45),
              transparent
            );

            animation: grid-flow 25s linear infinite;
          }

        
            //  DASHBOARD CARDS
        

          .admin-card {
            opacity: 0;

            animation: card-enter 1.1s ease-out forwards;

            transition:
              transform 0.8s ease,
              border-color 0.8s ease,
              box-shadow 0.8s ease,
              background 0.8s ease;
          }

          .admin-card:hover {
            transform: translateY(-7px);

            border-color: rgba(192, 132, 252, 0.5);

            background: rgba(10, 5, 18, 0.75);

            box-shadow:
              0 15px 45px rgba(0, 0, 0, 0.55),
              0 0 35px rgba(168, 85, 247, 0.15);
          }

          .admin-card:hover .card-shine {
            animation: card-shine 1.6s ease-in-out;
          }

         
            //  INFO BOXES
       

          .admin-info-box {
            transition:
              border-color 0.7s ease,
              box-shadow 0.7s ease,
              transform 0.7s ease;
          }

          .admin-info-box:hover {
            transform: translateY(-4px);

            border-color: rgba(168, 85, 247, 0.25);

            box-shadow:
              0 10px 35px rgba(0, 0, 0, 0.35),
              0 0 25px rgba(139, 92, 246, 0.07);
          }

         
            //  BACKGROUND FLOW
         

          @keyframes background-flow {
            0% {
              transform: translate(-5%, -3%) rotate(0deg) scale(1);

              background-position: 0% 0%;
            }

            50% {
              transform: translate(3%, 2%) rotate(1deg) scale(1.035);

              background-position: 50% 40%;
            }

            100% {
              transform: translate(-2%, 4%) rotate(-1deg) scale(1.07);

              background-position: 100% 100%;
            }
          }

          
            //  ORB ONE
          

          @keyframes orb-one {
            0% {
              transform: translate(0, 0) scale(1);
            }

            50% {
              transform: translate(180px, 80px) scale(1.12);
            }

            100% {
              transform: translate(70px, 220px) scale(0.95);
            }
          }

         
            //  ORB TWO
         

          @keyframes orb-two {
            0% {
              transform: translate(0, 0) scale(1);
            }

            50% {
              transform: translate(-180px, -80px) scale(1.12);
            }

            100% {
              transform: translate(-60px, 140px) scale(0.95);
            }
          }

          
            //  ORB THREE
     

          @keyframes orb-three {
            0% {
              transform: translate(-80px, 60px) scale(1);
            }

            50% {
              transform: translate(140px, -120px) scale(1.12);
            }

            100% {
              transform: translate(260px, 30px) scale(0.92);
            }
          }

          
            //  CENTER GLOW
         

          @keyframes center-glow {
            0% {
              transform: translate(-80px, 30px) scale(0.9);

              opacity: 0.35;
            }

            50% {
              transform: translate(100px, -70px) scale(1.1);

              opacity: 0.6;
            }

            100% {
              transform: translate(180px, 100px) scale(0.85);

              opacity: 0.3;
            }
          }

          
            //  BEAM ONE
         

          @keyframes beam-one {
            0% {
              transform: translateX(-220px) rotate(25deg);

              opacity: 0.12;
            }

            50% {
              opacity: 0.45;
            }

            100% {
              transform: translateX(550px) rotate(25deg);

              opacity: 0.12;
            }
          }

          
            //  BEAM TWO
         

          @keyframes beam-two {
            0% {
              transform: translateX(250px) rotate(-25deg);

              opacity: 0.1;
            }

            50% {
              opacity: 0.4;
            }

            100% {
              transform: translateX(-550px) rotate(-25deg);

              opacity: 0.1;
            }
          }

         
            //  GRID
         

          @keyframes grid-flow {
            from {
              transform: translate(0, 0);
            }

            to {
              transform: translate(75px, 75px);
            }
          }

         
            //  CARD ENTRY
         

          @keyframes card-enter {
            from {
              opacity: 0;

              transform: translateY(25px);
            }

            to {
              opacity: 1;

              transform: translateY(0);
            }
          }

         
            //  CARD SHINE
         

          @keyframes card-shine {
            0% {
              left: -120%;
            }

            100% {
              left: 130%;
            }
          }

          
            //  REDUCED MOTION
         

          @media (prefers-reduced-motion: reduce) {
            .moving-gradient,
            .purple-orb,
            .light-beam,
            .purple-grid,
            .center-glow,
            .admin-card {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}
