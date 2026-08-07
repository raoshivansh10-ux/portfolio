import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Instagram, 
  ArrowUp, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';
import { SectionReveal } from '../ui/SectionReveal';
import { AnimatedText } from '../ui/AnimatedText';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playClickSound();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Portfolio Message / Thought from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage / Thought:\n${formData.message}`
    );
    const mailtoUri = `mailto:raoshivansh10@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.7 },
      });

      window.location.href = mailtoUri;
    }, 900);
  };

  const scrollToTop = () => {
    soundFx.playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { label: 'Gmail', href: 'mailto:raoshivansh10@gmail.com', icon: Mail, color: 'hover:text-[#F598F2]' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin, color: 'hover:text-[#38BDF8]' },
    { label: 'GitHub', href: 'https://github.com', icon: Github, color: 'hover:text-[#10B981]' },
    { label: 'Instagram', href: 'https://instagram.com', icon: Instagram, color: 'hover:text-[#F598F2]' },
  ];

  return (
    <SectionReveal>
      <footer id="contact" className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background Ambient Lights */}
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F598F2]/20 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-[#38BDF8]/15 rounded-full blur-[160px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#F598F2]/30 text-xs font-mono text-[#F598F2] uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5 text-[#F598F2]" />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="font-clash text-4xl sm:text-7xl font-bold tracking-tight text-white">
            <AnimatedText text="LET'S BUILD" mode="chars" className="mr-3" />
            <AnimatedText 
              text="TOGETHER" 
              mode="chars" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#F598F2] via-[#38BDF8] to-[#10B981]"
            />
          </h2>
          <AnimatedText 
            text="Have an exciting project, internship opportunity, or AI idea? Drop a message below!" 
            mode="words"
            as="p"
            className="max-w-2xl mt-4 font-sans text-slate-300 text-sm sm:text-base"
          />
        </div>

        {/* Main Glass Contact Form Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Contact Info & Socials (5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-mono text-xs text-[#F598F2] uppercase tracking-wider block mb-2">
                Direct Email
              </span>
              <h3 className="font-clash text-2xl font-bold text-white mb-4">
                Get in Touch Directly
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                I respond promptly to all messages regarding engineering roles, AI projects, and freelance creative development.
              </p>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-slate-200">
                  <Mail className="w-4.5 h-4.5 text-[#F598F2] shrink-0" />
                  <a href="mailto:raoshivansh10@gmail.com" className="hover:text-white transition-colors">
                    raoshivansh10@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div>
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-3">
                Connect & Socials
              </span>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((soc, idx) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={idx}
                      href={soc.href}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => soundFx.playHoverSound()}
                      className={`p-3 rounded-2xl glass-panel border border-white/10 text-slate-300 ${soc.color} transition-all duration-300 transform hover:scale-110`}
                      title={soc.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative">
            {isSubmitted ? (
              <div className="h-full py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#F598F2]/20 text-[#F598F2] flex items-center justify-center border border-[#F598F2]/40 shadow-[0_0_30px_#F598F2]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-clash text-2xl font-bold text-white">
                  Message Sent Successfully!
                </h3>
                <p className="font-sans text-sm text-slate-300 max-w-md">
                  Thank you for reaching out! Shivansh will get back to your email within 24 hours.
                </p>
                <button
                  onClick={() => {
                    soundFx.playClickSound();
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-figtree font-semibold text-[#F598F2] border border-white/10"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Shivansh Yadav"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-slate-100 placeholder-slate-500 outline-none focus:border-[#F598F2] focus:ring-1 focus:ring-[#F598F2] transition-all font-sans text-sm"
                    />
                  </motion.div>

                  <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-slate-100 placeholder-slate-500 outline-none focus:border-[#F598F2] focus:ring-1 focus:ring-[#F598F2] transition-all font-sans text-sm"
                    />
                  </motion.div>
                </div>

                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="space-y-2"
                >
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    Project Details / Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, idea, or role opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-slate-100 placeholder-slate-500 outline-none focus:border-[#F598F2] focus:ring-1 focus:ring-[#F598F2] transition-all font-sans text-sm resize-none"
                  />
                </motion.div>

                <motion.button
                  variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => soundFx.playHoverSound()}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F598F2] via-[#38BDF8] to-[#10B981] text-black font-figtree font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(245,152,242,0.4)] hover:shadow-[0_0_50px_rgba(245,152,242,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <Sparkles className="w-5 h-5 animate-spin text-black" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 text-black" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </div>
        </div>

        {/* Gradient Line Separator */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F598F2]/40 to-transparent mb-8" />

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#F598F2] to-[#38BDF8] p-[1px]">
              <div className="w-full h-full bg-black rounded-lg flex items-center justify-center font-clash font-bold text-[10px] text-white">
                SY
              </div>
            </div>
            <span>© 2026 Shivansh Yadav. All rights reserved.</span>
          </div>

          {/* Back to Top */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHoverSound()}
            className="flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-white/10 hover:border-[#F598F2]/40 text-[#F598F2] transition-colors shadow-lg"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </footer>
    </SectionReveal>
  );
};
