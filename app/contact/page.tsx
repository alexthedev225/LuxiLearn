"use client";

import { useState, useRef, useEffect} from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Types
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: "general" | "support" | "feedback";
};
type FocusedField = keyof FormData | null;

// Neo-Brutalist Separator
const Separator = () => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
    className="w-full h-0.5 sm:h-1 bg-red-600 border-t border-b border-black dark:border-white transform skew-x-2 max-w-6xl mx-auto"
    aria-hidden="true"
  />
);

export default function ImmersiveContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<FocusedField>(null);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const headerInView = useInView(headerRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: "-50px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          type: "general",
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 mx-4 sm:mx-6 py-10">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.section ref={headerRef} className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-4 sm:mb-6"
          >
            <div
              className="inline-block border-2 border-black dark:border-white px-2 py-0.5 uppercase tracking-wide font-bold text-xs text-red-600 rounded"
              aria-label="Contact"
            >
              💌 Contact
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide mb-3 sm:mb-4"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
          >
            Contactez l'équipe <span className="text-red-600">LuxiLearn</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-sm sm:text-base font-bold max-w-md sm:max-w-lg"
            style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
          >
            Une question sur nos parcours ou une suggestion pour améliorer
            LuxiLearn ? Contactez-nous !
          </motion.p>
        </motion.section>

        <Separator />

        {/* Form */}
        <motion.section ref={formRef} className="pt-8 sm:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="border-2 border-black dark:border-white p-3 sm:p-4 grid gap-4 sm:gap-6 rounded-lg"
            >
              {/* Inputs */}
              <div className="grid lg:grid-cols-2 gap-3 sm:gap-4">
                {["name", "email"].map((field) => (
                  <motion.div
                    key={field}
                    animate={
                      focusedField === field ? { scale: 1.02 } : { scale: 1 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm sm:text-base font-bold uppercase mb-1">
                      {field === "name" ? "Nom *" : "Email *"}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field as keyof FormData]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field as FocusedField)}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full border-2 border-black dark:border-white p-2 sm:p-3 font-bold uppercase text-xs sm:text-sm bg-white dark:bg-neutral-950 rounded"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Subject */}
              <motion.div
                animate={
                  focusedField === "subject" ? { scale: 1.02 } : { scale: 1 }
                }
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm sm:text-base font-bold uppercase mb-1">
                  Sujet *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full border-2 border-black dark:border-white p-2 sm:p-3 font-bold uppercase text-xs sm:text-sm bg-white dark:bg-neutral-950 rounded"
                />
              </motion.div>

              {/* Message */}
              <motion.div
                animate={
                  focusedField === "message" ? { scale: 1.02 } : { scale: 1 }
                }
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm sm:text-base font-bold uppercase mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  required
                  className="w-full border-2 border-black dark:border-white p-2 sm:p-3 font-bold uppercase text-xs sm:text-sm bg-white dark:bg-neutral-950 resize-none rounded"
                />
              </motion.div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={submitted || isSubmitting}
                whileHover={!submitted && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!submitted && !isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full p-2 sm:p-3 font-bold uppercase text-xs sm:text-sm bg-red-600 text-white border-2 border-black dark:border-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 rounded ${
                  submitted
                    ? "cursor-default"
                    : isSubmitting
                      ? "cursor-not-allowed"
                      : ""
                }`}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      Envoyé ✅
                    </motion.span>
                  ) : isSubmitting ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      Envoi...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      Envoyer
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
