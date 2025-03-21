import { PageProps } from "../types/PageTypes";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

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
        <div className="contact-layout contact-layout-success">
          <h3 className="thank-you-message">Merci !</h3>
          <p className="thank-you-message">
            Je vous recontacterai dès que possible.
          </p>
          <div className="contact-btn-div">
            <button
              type="button"
              className="submit-button home-button message-sent"
              onClick={onHomePage}
            >
              Page d'accueil
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="contact-title">Contact</h2>
          <form ref={form} className="contact-layout" onSubmit={handleSubmit}>
            <input
              name="user_name"
              type="text"
              placeholder="Votre nom"
              className="contact-input name-input"
              required
            />
            <input
              name="user_email"
              type="email"
              placeholder="Votre email"
              className="contact-input email-input"
              required
            />
            <input
              name="subject"
              type="text"
              placeholder="Objet du message"
              className="contact-input object-input"
              required
            />
            <textarea
              name="message"
              placeholder="Votre message"
              className="contact-textarea"
              rows={8}
              required
            />

            <div className="contact-btn-div">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi..." : "Envoyer"}
              </button>
              <button
                type="button"
                className="submit-button home-button"
                onClick={onHomePage}
              >
                Page d'accueil
              </button>
            </div>
            {submitStatus === "error" && (
              <p className="submit-status error">
                Erreur lors de l'envoi. Veuillez réessayer.
              </p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

ContactPage.pageId = 4;
