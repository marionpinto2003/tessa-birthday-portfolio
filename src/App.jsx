import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Sparkles, Heart } from "lucide-react";
import "./App.css";

const years = [
  {
    year: "2015",
    title: "Early Creativity",
    description: "The early signs of Tessa’s creative world.",
    count: 3,
    folder: "/tessa/2015",
  },
  {
    year: "2019",
    title: "The Archive Grows",
    description: "Art, baking, experiments, and memories starting to pile up.",
    count: 19,
    folder: "/tessa/2019",
  },
  {
    year: "2020",
    title: "Creative Explosion",
    description: "A year full of things made, tried, baked, painted, and remembered.",
    count: 29,
    folder: "/tessa/2020",
  },
  {
    year: "2021",
    title: "The Pret Years Begin",
    description: "Hard work, responsibility, growth, and working her way up.",
    count: 8,
    folder: "/tessa/2021",
  },
  {
    year: "2026",
    title: "Still Creating",
    description: "Still making beautiful things. Still growing. Still Tessa.",
    count: 9,
    folder: "/tessa/2026",
  },
];

function imagesFor(year) {
  return Array.from({ length: year.count }, (_, i) => `${year.folder}/${i + 1}.jpg`);
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeYear, setActiveYear] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [secretOpen, setSecretOpen] = useState(false);

  const start = () => {
    setStarted(true);
    confetti({ particleCount: 140, spread: 90, origin: { y: 0.65 } });
  };

  const openYear = (year) => {
    setActiveYear(year);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
  };

  return (
    <main className="min-h-screen bg-[#fff7ed] text-[#3b2418] overflow-x-hidden">
      <AnimatePresence>
        {!started && (
          <motion.section
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#fff7ed] px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="max-w-2xl text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#9b6b54]">
                A birthday archive
              </p>
              <h1 className="text-5xl md:text-7xl font-serif leading-tight">
                Happy Birthday, Tessa ✨
              </h1>
              <p className="mt-6 text-lg md:text-xl text-[#6f4a38]">
                A little timeline of your creativity, hard work, and everything
                that makes me proud.
              </p>
              <button
                onClick={start}
                className="mt-8 rounded-full bg-[#3b2418] px-8 py-4 text-white shadow-xl hover:scale-105 transition"
              >
                Open your little world
              </button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="mx-auto max-w-6xl px-5 py-12 md:py-20">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: started ? 1 : 0, y: started ? 0 : 20 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-sm">
              <Sparkles size={16} />
              <span className="text-sm">Tap a year to open the memories</span>
            </div>
            <h2 className="mt-6 text-4xl md:text-6xl font-serif">
              Tessa’s Timeline
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#6f4a38]">
              From early creativity to art, baking, Pret years, and now.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-px bg-[#e0bfa8]" />

          <div className="space-y-14">
            {years.map((year, index) => {
              const preview = imagesFor(year).slice(0, 3);
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={year.year}
                  className={`relative grid gap-6 md:grid-cols-2 ${
                    isLeft ? "" : "md:[&>*:first-child]:col-start-2"
                  }`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute left-4 md:left-1/2 top-8 h-4 w-4 -translate-x-1/2 rounded-full bg-[#3b2418] ring-8 ring-[#fff7ed]" />

                  <button
                    onClick={() => openYear(year)}
                    className="group rounded-[2rem] bg-white/80 p-5 text-left shadow-xl backdrop-blur hover:-translate-y-1 transition"
                  >
                    <p className="text-sm uppercase tracking-[0.35em] text-[#9b6b54]">
                      {year.year}
                    </p>
                    <h3 className="mt-2 text-3xl font-serif">{year.title}</h3>
                    <p className="mt-2 text-[#6f4a38]">{year.description}</p>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {preview.map((src, i) => (
                        <img
                          key={src}
                          src={src}
                          alt={`${year.year} preview ${i + 1}`}
                          className="h-32 w-full rounded-2xl object-cover shadow-md group-hover:rotate-1 transition"
                        />
                      ))}
                    </div>

                    <p className="mt-4 text-sm font-semibold">
                      Open {year.count} memories →
                    </p>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 text-center">
          <button
            onClick={() => setSecretOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[#3b2418]/20 bg-white/70 px-5 py-3 text-sm hover:scale-105 transition"
          >
            <Heart size={16} /> p.s.
          </button>
        </div>
      </section>

      <AnimatePresence>
        {activeYear && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#3b2418]/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mx-auto max-h-[92vh] max-w-6xl overflow-y-auto rounded-[2rem] bg-[#fffaf3] p-5 md:p-8 shadow-2xl"
              initial={{ y: 40, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.96 }}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-[#9b6b54]">
                    {activeYear.year}
                  </p>
                  <h2 className="text-4xl font-serif">{activeYear.title}</h2>
                  <p className="mt-2 text-[#6f4a38]">{activeYear.description}</p>
                </div>
                <button
                  onClick={() => setActiveYear(null)}
                  className="rounded-full bg-white p-3 shadow"
                >
                  <X />
                </button>
              </div>

              <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
                {imagesFor(activeYear).map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImage(src)}
                    className="mb-4 block w-full overflow-hidden rounded-3xl bg-white p-2 shadow-md hover:scale-[1.02] transition"
                  >
                    <img
                      src={src}
                      alt={`${activeYear.year} memory ${i + 1}`}
                      className="w-full rounded-2xl object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
            onClick={() => setActiveImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={activeImage}
              alt="Selected memory"
              className="max-h-[88vh] max-w-full rounded-3xl shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {secretOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#3b2418]/60 p-5 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-2xl"
              initial={{ y: 30, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, scale: 0.95 }}
            >
              <h2 className="text-4xl font-serif">P.S. ❤️</h2>
              <p className="mt-4 text-lg text-[#6f4a38]">
                I’m really proud of you, Tessa. This little website is just a
                small way of showing how much your creativity, growth, and hard
                work deserve to be celebrated.
              </p>
              <button
                onClick={() => setSecretOpen(false)}
                className="mt-6 rounded-full bg-[#3b2418] px-6 py-3 text-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
