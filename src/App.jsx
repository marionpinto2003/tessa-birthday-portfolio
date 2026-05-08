import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Heart, Gift, Sparkles } from "lucide-react";
import "./App.css";

const years = [
  {
    year: "2000",
    title: "The Beginning",
    subtitle: "Baby Tessa enters the story.",
    description: "No masterpieces yet, but the creative chaos had officially begun.",
    count: 1,
    folder: "/tessa/2000",
    cover: "/tessa/2000/1.png",
  },
  {
    year: "2015",
    title: "Early Creativity",
    subtitle: "The first proper signs.",
    description: "One of the early chapters where Tessa’s creativity started showing properly.",
    count: 3,
    folder: "/tessa/2015",
    cover: "/tessa/2015/1.png",
  },
  {
    year: "2019",
    title: "The Archive Grows",
    subtitle: "Art, baking, experiments.",
    description: "Paintings, bakes, experiments, and the start of a real creative collection.",
    count: 19,
    folder: "/tessa/2019",
    cover: "/tessa/2019/1.png",
  },
  {
    year: "2020",
    title: "Creative Explosion",
    subtitle: "She made a lot.",
    description: "This year clearly had no shortage of ideas — art, baking, experimenting, and making things just because she could.",
    count: 29,
    folder: "/tessa/2020",
    cover: "/tessa/2020/1.png",
  },
  {
    year: "2021",
    title: "The Pret Years Begin",
    subtitle: "Hard work era.",
    description: "A new chapter of hard work, early mornings, pressure, and growth. This part matters because she worked her way up.",
    count: 8,
    folder: "/tessa/2021",
    cover: "/tessa/2021/1.png",
  },
  {
    year: "2026",
    title: "Still Creating",
    subtitle: "Birthday chapter.",
    description: "Still baking, still creating, still becoming more herself — and still making things worth celebrating.",
    count: 9,
    folder: "/tessa/2026",
    cover: "/tessa/2026/1.png",
    special: true,
  },
];

function imagesFor(item) {
  if (item.count <= 1) return [];
  return Array.from(
    { length: item.count - 1 },
    (_, i) => `${item.folder}/${i + 2}.jpg`
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeYear, setActiveYear] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [secretOpen, setSecretOpen] = useState(false);

  const start = () => {
    setStarted(true);
    confetti({ particleCount: 160, spread: 100, origin: { y: 0.65 } });
  };

  const openYear = (year) => {
    setActiveYear(year);
    confetti({ particleCount: 55, spread: 70, origin: { y: 0.75 } });
  };

  const activeGallery = activeYear ? imagesFor(activeYear) : [];

  return (
    <main className="min-h-screen bg-[#f8f4ec] text-[#141414]">
      <AnimatePresence>
        {!started && (
          <motion.section
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#f8f4ec] px-6"
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="mb-5 text-xs uppercase tracking-[0.45em] text-black/50">
                A birthday archive
              </p>
              <h1 className="text-6xl font-semibold tracking-tight md:text-8xl">
                Tessa
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-black/60">
                A little visual timeline of your creativity, hard work, growth,
                and everything that makes me proud.
              </p>
              <button
                onClick={start}
                className="mt-9 rounded-full bg-black px-8 py-4 text-white shadow-xl transition hover:scale-105"
              >
                Open the archive ✨
              </button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#f8f4ec]/80 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="text-xl font-semibold tracking-tight">Tessa</span>
          </button>

          <button
            onClick={() => setSecretOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm transition hover:bg-black hover:text-white"
          >
            <Heart size={15} /> p.s.
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12 md:py-20">
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-black/45">
              Happy Birthday
            </p>
            <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
              A timeline of everything you became.
            </h2>
          </div>

          <p className="max-w-xl text-lg leading-8 text-black/55">
            From baby Tessa, to early creativity, to art, baking, Pret, and now —
            each year opens into its own little collection.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {years.map((item, index) => (
            <motion.button
              key={item.year}
              onClick={() => openYear(item)}
              className={`group relative overflow-hidden rounded-[2rem] bg-black text-left shadow-xl ${
                index === 0 || item.special ? "md:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
            >
              <div className="relative h-[430px] md:h-[540px]">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-75"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black">
                  {item.year}
                </div>

                {item.special && (
                  <div className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black">
                    <Gift size={16} /> Birthday treat
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white/60">
                    {item.subtitle}
                  </p>
                  <h3 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                    {item.description}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
                    Open {item.count} memories →
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeYear && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-black/70 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mx-auto max-w-7xl rounded-[2rem] bg-[#f8f4ec] p-5 shadow-2xl md:p-8"
              initial={{ y: 40, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.97 }}
            >
              <div className="mb-8 flex items-start justify-between gap-5">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.45em] text-black/45">
                    {activeYear.year}
                  </p>
                  <h2 className="text-5xl font-semibold tracking-tight">
                    {activeYear.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-black/55">
                    {activeYear.description}
                  </p>
                </div>

                <button
                  onClick={() => setActiveYear(null)}
                  className="rounded-full bg-white p-3 shadow transition hover:scale-105"
                >
                  <X />
                </button>
              </div>

              {activeYear.special && (
                <div className="mb-8 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#f8f4ec] px-4 py-2 text-sm font-semibold">
                    <Sparkles size={16} /> For 2026
                  </div>
                  <h3 className="text-3xl font-semibold tracking-tight">
                    This is all your work. Now enjoy this treat.
                  </h3>
                  <p className="mt-3 max-w-2xl text-black/60">
                    After all the art, baking, effort, long shifts, and growth —
                    this final chapter is just to celebrate you.
                  </p>
                </div>
              )}

              <button
                onClick={() => setActiveImage(activeYear.cover)}
                className="mb-6 block w-full overflow-hidden rounded-[2rem] bg-white p-2 shadow-md transition hover:scale-[1.01]"
              >
                <img
                  src={activeYear.cover}
                  alt={`${activeYear.year} cover`}
                  className="max-h-[620px] w-full rounded-[1.5rem] object-cover"
                />
              </button>

              {activeGallery.length > 0 ? (
                <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
                  {activeGallery.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setActiveImage(src)}
                      className="mb-4 block w-full overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-md transition hover:scale-[1.015]"
                    >
                      <img
                        src={src}
                        alt={`${activeYear.year} memory ${i + 2}`}
                        className="w-full rounded-[1.1rem] object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="rounded-[2rem] bg-white p-6 text-black/60 shadow-sm">
                  This chapter starts with one photo.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={() => setActiveImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={activeImage}
              alt="Selected memory"
              className="max-h-[90vh] max-w-full rounded-[2rem] shadow-2xl"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {secretOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur"
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
              <h2 className="text-4xl font-semibold tracking-tight">P.S. ❤️</h2>
              <p className="mt-4 text-lg leading-8 text-black/60">
                I’m really proud of you, Tessa. This little website is just a
                small way of showing how much your creativity, growth, and hard
                work deserve to be celebrated.
              </p>
              <button
                onClick={() => setSecretOpen(false)}
                className="mt-7 rounded-full bg-black px-6 py-3 text-white"
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
