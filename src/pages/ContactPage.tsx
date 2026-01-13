import { PageProps } from "../types/PageTypes";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { RollingText } from "../components/RollingText";

export const ContactPage = ({ onHomePage }: PageProps) => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus("success");
      if (form.current) form.current.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-section" id="contact-section">
      {submitStatus === "success" ? (
        <div
          className="contact-layout contact-layout-success"
          role="status"
          aria-live="polite"
        >
          <h2>Merci&nbsp;!</h2>
          <p className="thank-you-message">
            Je vous recontacterai dès que possible.
          </p>
          <div className="contact-btn-div">
            <button
              type="button"
              className="submit-button home-button message-sent"
              onClick={onHomePage}
              aria-label="Retourner à la page d'accueil"
            >
              <RollingText text="Page d'accueil" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="contact-title">Contact</h2>
          <form
            ref={form}
            className="contact-layout"
            onSubmit={handleSubmit}
            aria-label="Formulaire de contact"
          >
            <label htmlFor="user_name" className="sr-only">
              Votre nom
            </label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              placeholder="Votre nom"
              className="contact-input name-input"
              required
              aria-required="true"
            />

            <label htmlFor="user_email" className="sr-only">
              Votre adresse email
            </label>
            <input
              id="user_email"
              name="user_email"
              type="email"
              placeholder="Votre email"
              className="contact-input email-input"
              required
              aria-required="true"
            />

            <label htmlFor="subject" className="sr-only">
              Objet du message
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Objet du message"
              className="contact-input object-input"
              required
              aria-required="true"
            />

            <label htmlFor="message" className="sr-only">
              Votre message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Votre message"
              className="contact-textarea"
              rows={8}
              required
              aria-required="true"
            />

            <div className="contact-btn-div">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                aria-label={
                  isSubmitting ? "Envoi en cours" : "Envoyer le message"
                }
              >
                {isSubmitting ? "Envoi..." : <RollingText text="Envoyer" />}
              </button>
              <button
                type="button"
                className="submit-button home-button"
                onClick={onHomePage}
                aria-label="Retourner à la page d'accueil"
              >
                <RollingText text="Page d'accueil" />
              </button>
            </div>
            {submitStatus === "error" && (
              <p
                className="submit-status error"
                role="alert"
                aria-live="assertive"
              >
                Erreur lors de l'envoi. Veuillez réessayer.
              </p>
            )}
          </form>

          <nav className="social-links" aria-label="Réseaux sociaux">
            <a
              href="https://www.linkedin.com/in/rémi-asselin/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn - Ouvre dans un nouvel onglet"
            >
              <img src="/linkedin.webp" alt="" role="presentation" />
            </a>
            <a
              href="https://github.com/RemiAsselin42"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub - Ouvre dans un nouvel onglet"
            >
              <img src="/github.webp" alt="" role="presentation" />
            </a>
            <a
              href="https://www.pappers.fr/entreprise/983775214"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pappers - Ouvre dans un nouvel onglet"
            >
              <img src="/pappers.webp" alt="" role="presentation" />
            </a>
          </nav>
        </>
      )}
    </div>
  );
};

ContactPage.pageId = 4;
