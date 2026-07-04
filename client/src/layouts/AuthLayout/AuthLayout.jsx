import { MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import './AuthLayout.css';

const AuthLayout = ({ children, eyebrow, title, subtitle }) => {
  return (
    <main className="auth-layout">
      {/* <section className="auth-showcase" aria-label="Chat application preview">
        <div className="showcase-toolbar">
          <MessageCircle size={22} aria-hidden="true" />
          <span>Pulse Chat</span>
        </div>
        <div className="showcase-thread">
          <div className="message-row message-row-left">
            <span className="avatar-chip">A</span>
            <p>Design review in five. I dropped the new thread here.</p>
          </div>
          <div className="message-row message-row-right">
            <p>Perfect. I will bring the deploy checklist.</p>
            <span className="avatar-chip avatar-chip-warm">R</span>
          </div>
          <div className="typing-pill">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="showcase-stats">
          <span>
            <ShieldCheck size={18} aria-hidden="true" />
            JWT secured
          </span>
          <span>
            <Sparkles size={18} aria-hidden="true" />
            Real-time ready
          </span>
        </div>
      </section> */}

      <section className="auth-card" aria-label={title}>
        <p className="auth-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
