import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Heart, Gift } from "lucide-react";
import "./App.css";

const years = [
  {
    year: "2000",
    title: "The Beginning",
    note: "Baby Tessa. The story starts here.",
    count: 1,
    folder: "/tessa/2000",
    cover: "/tessa/2000/1.png",
  },
  {
    year: "2015",
    title: "Early Creativity",
    note: "The first proper signs of the artist she was becoming.",
    count: 3,
    folder: "/tessa/2015",
    cover: "/tessa/2015/1.png",
  },
  {
    year: "2019",
    title: "Art & Baking Archive",
    note: "Paintings, bakes, experiments, and creative chaos.",
    count: 19,
    folder: "/tessa/2019",
    cover: "/tessa/2019/1.png",
  },
  {
    year: "2020",
    title: "Creative Explosion",
    note: "A year full of things made, tried, baked, painted, and remembered.",
    count: 29,
    folder: "/tessa/2020",
    cover: "/tessa/2020/1.png",
  },
  {
    year: "2021",
    title: "The Pret Years",
    note: "Hard work, responsibility, growth, and working her way up.",
    count: 8,
    folder: "/tessa/2021",
    cover: "/tessa/2021/1.png",
  },
  {
    year: "2026",
    title: "Still Creating",
    note: "This is all your work. Now enjoy this treat.",
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
  const [activeYear, setActiveYear] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [secretOpen, setSecretOpen] = useState(false);

  const openYear = (year) => {
    setActiveYear(year);
    confetti({ particleCount: 70, spread: 75, origin: { y: 0.7 } });
  };

  const activeGallery = activeYear ? imagesFor(activeYear) : [];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="grid min-h-screen grid-cols-1 gap-1 bg-black p-1 sm:grid-cols-2 lg:grid-cols-3">
        {years.map((item, index) => (
          <motion.button
            key={item.year}
            onClick={() => openYear(item)}
            className={`group relative min-h-[55vh] overflow-hidden bg-black text-left ${
              index === 0 || item.special ? "lg:col-span-2" : ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            <img
              src={item.cover}
              alt={item.title}
              className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-105 group-hover:opacity-70"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black opacity-0 shadow-lg transition group-hover:opacity-100">
              {item.year}
            </div>
          </motion.button>
        ))}
      </section>

      <button
        onClick={() => setSecretOpen(true)}
        className="fixed bottom-5 right-5 z-30 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-black shadow-xl transition hover:scale-105"
      >
        p.s. ❤️
      </button>

      <AnimatePresence>
        {activeYear && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mx-auto max-w-6xl rounded-[2rem] bg-[#f6efe6] p-5 text-black shadow-2xl md:p-8"
              initial={{ y: 35, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 35, scale: 0.97 }}
            >
              <div className="mb-8 flex items-start justify-between gap-5">
                <div>
                  <p className="mb-2 text-sm uppercase tracking-[0.35em] text-black/40">
                    {activeYear.year}
                  </p>
                  <h2 className="text-5xl font-semibold tracking-tight">
                    {activeYear.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-black/55">
                    {activeYear.note}
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
                <div className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#f6efe6] px-4 py-2 text-sm font-semibold">
                    <Gift size={16} /> Birthday treat
                  </div>
                  <h3 className="text-3xl font-semibold tracking-tight">
                    This is all your work. Now enjoy this treat.
                  </h3>
                  <p className="mt-3 max-w-2xl text-black/60">
                    After all the art, baking, effort, long shifts, and growth,
                    this final chapter is just to celebrate you.
                  </p>
                </div>
              )}

              <button
                onClick={() => setActiveImage(activeYear.cover)}
                className="mb-5 block w-full overflow-hidden rounded-[2rem] bg-white p-2 shadow-md"
              >
                <img
                  src={activeYear.cover}
                  alt={`${activeYear.year} cover`}
                  className="max-h-[620px] w-full rounded-[1.5rem] object-cover"
                />
              </button>

              {activeGallery.length > 0 && (
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
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-lg rounded-[2rem] bg-white p-8 text-center text-black shadow-2xl"
              initial={{ y: 30, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, scale: 0.95 }}
            >
              <Heart className="mx-auto mb-4" />
              <h2 className="text-4xl font-semibold tracking-tight">
                Happy Birthday, Tessa
              </h2>
              <p className="mt-4 text-lg leading-8 text-black/60">
                I’m really proud of you. This little website is just a small way
                of showing how much your creativity, growth, and hard work
                deserve to be celebrated.
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
