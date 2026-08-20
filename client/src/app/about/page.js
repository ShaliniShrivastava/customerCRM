"use client";

import { useGetWebsiteContentQuery } from "../../store/api";

export default function About() {
  const { data, isLoading } = useGetWebsiteContentQuery();

  const about = data?.data?.about;

  return (
    <main className="about-page relative min-h-screen overflow-hidden bg-black px-4 pb-16 pt-24 text-white sm:px-6 sm:pt-32">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="about-glow glow-one" />
        <div className="about-glow glow-two" />
        <div className="about-glow glow-three" />

        <div className="about-grid" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.10),transparent_38%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            About CustomerCRM
          </p>

          <h1 className="golden-shine-text text-3xl font-bold text-yellow-400 sm:text-5xl">
            {isLoading
              ? "Smart CRM for Better Customer Management"
              : about?.title}
          </h1>

          <p className="mt-6 leading-8 text-gray-400">
            {isLoading
              ? "CustomerCRM is an AI-powered customer relationship management platform designed to help businesses manage leads, customers and business interactions efficiently from one place."
              : about?.description}
          </p>
        </div>

        {/* What We Offer */}
        <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Lead Management",
              text: "Create, manage, search and track leads throughout the sales process.",
            },
            {
              title: "AI Lead Analysis",
              text: "Analyze lead requirements and get useful insights for better follow-up.",
            },
            {
              title: "Customer Management",
              text: "Keep customer information organized and easily accessible.",
            },
            {
              title: "CSV Import",
              text: "Import multiple leads quickly using a simple CSV file.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="about-card relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-zinc-950/80 p-6 backdrop-blur-md"
            >
              <div className="card-shine" />

              <div className="relative z-10">
                <h2 className="text-lg font-semibold text-yellow-400">
                  {feature.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </section>

        
        <section className="about-card relative mt-16 overflow-hidden rounded-2xl border border-yellow-500/20 bg-zinc-950/80 p-6 backdrop-blur-md sm:p-10">
          <div className="card-shine" />

          <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
                Why CustomerCRM?
              </p>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Everything you need to manage your CRM
              </h2>
            </div>

            <div className="space-y-4 text-sm leading-7 text-gray-400">
              <p>
                CustomerCRM provides a centralized platform for managing leads,
                users and customer interactions.
              </p>

              <p>
                The admin dashboard provides useful statistics, lead
                management, user management and CSV import functionality.
              </p>

              <p>
                AI-powered lead analysis helps administrators understand
                requirements and plan better follow-ups.
              </p>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="mt-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
            Built for Efficiency
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            A simple and organized CRM experience
          </h2>

          <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
            {[
              {
                title: "Secure Authentication",
                text: "Role-based access keeps admin and user functionality separate.",
              },
              {
                title: "Admin Dashboard",
                text: "Monitor leads, users and important CRM statistics in one place.",
              },
              {
                title: "Easy to Use",
                text: "A clean interface makes everyday CRM tasks simple and efficient.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="about-card relative overflow-hidden rounded-xl border border-yellow-500/15 bg-white/[0.03] p-5"
              >
                <div className="card-shine" />

                <div className="relative z-10">
                  <h3 className="font-semibold text-yellow-400">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .about-page {
          isolation: isolate;
        }

        /* Background Glow */

        .about-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.18;
        }

        .glow-one {
          left: -180px;
          top: 80px;
          background: rgba(234, 179, 8, 0.7);
          animation: glow-one 18s ease-in-out infinite alternate;
        }

        .glow-two {
          right: -180px;
          top: 35%;
          background: rgba(202, 138, 4, 0.65);
          animation: glow-two 21s ease-in-out infinite alternate;
        }

        .glow-three {
          left: 40%;
          bottom: -300px;
          width: 520px;
          height: 520px;
          background: rgba(250, 204, 21, 0.35);
          animation: glow-three 24s ease-in-out infinite alternate;
        }

        /* Subtle Grid */

        .about-grid {
          position: absolute;
          inset: 0;
          opacity: 0.045;
          background-image:
            linear-gradient(
              rgba(234, 179, 8, 0.25) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(234, 179, 8, 0.25) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
          animation: grid-move 25s linear infinite;
        }

        /* Golden Heading Shine */

        .golden-shine-text {
          background: linear-gradient(
            90deg,
            #facc15,
            #fff7b2,
            #eab308,
            #fff7b2,
            #facc15
          );
          background-size: 250% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shine 4s linear infinite;
        }

        /* Cards */

        .about-card {
          transition:
            transform 0.6s ease,
            border-color 0.6s ease,
            box-shadow 0.6s ease;
        }

        .about-card:hover {
          transform: translateY(-5px);
          border-color: rgba(250, 204, 21, 0.45);
          box-shadow:
            0 15px 40px rgba(0, 0, 0, 0.45),
            0 0 25px rgba(234, 179, 8, 0.12);
        }

        /* Card Shine */

        .card-shine {
          position: absolute;
          top: -20%;
          left: -100%;
          width: 35%;
          height: 140%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.18),
            transparent
          );
          transform: skewX(-20deg);
          animation: card-shine 5s ease-in-out infinite;
          pointer-events: none;
        }

        /* Animations */

        @keyframes text-shine {
          0% {
            background-position: 0% center;
          }

          100% {
            background-position: 250% center;
          }
        }

        @keyframes card-shine {
          0% {
            left: -100%;
          }

          35% {
            left: 130%;
          }

          100% {
            left: 130%;
          }
        }

        @keyframes glow-one {
          0% {
            transform: translate(0, 0) scale(1);
          }

          100% {
            transform: translate(180px, 180px) scale(1.15);
          }
        }

        @keyframes glow-two {
          0% {
            transform: translate(0, 0) scale(1);
          }

          100% {
            transform: translate(-160px, -120px) scale(1.12);
          }
        }

        @keyframes glow-three {
          0% {
            transform: translate(-80px, 50px) scale(0.9);
          }

          100% {
            transform: translate(150px, -120px) scale(1.1);
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
          .about-glow,
          .about-grid,
          .golden-shine-text,
          .card-shine {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}