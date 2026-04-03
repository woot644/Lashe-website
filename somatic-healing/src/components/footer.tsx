import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#2c2c2c] text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 22c4-4 8-7 8-12a8 8 0 0 0-16 0c0 5 4 8 8 12z" />
                </svg>
              </div>
              <span className="text-white font-semibold" style={{ fontFamily: "var(--font-heading)" }}>Somatic Healing Australia</span>
            </div>
            <p className="text-sm leading-relaxed">
              Australia&apos;s first dedicated directory connecting people with qualified somatic therapists and body-based healing practitioners.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Find Help</h4>
            <div className="space-y-2.5">
              <Link href="/find-a-therapist" className="block text-sm hover:text-white transition-colors">Find a Therapist</Link>
              <Link href="/about-somatic-healing" className="block text-sm hover:text-white transition-colors">What Is Somatic Healing?</Link>
              <Link href="/about-somatic-healing/types" className="block text-sm hover:text-white transition-colors">Types of Somatic Therapy</Link>
              <Link href="/about-somatic-healing/what-to-expect" className="block text-sm hover:text-white transition-colors">What to Expect in a Session</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">For Practitioners</h4>
            <div className="space-y-2.5">
              <Link href="/for-practitioners" className="block text-sm hover:text-white transition-colors">Join the Directory</Link>
              <Link href="/for-practitioners#pricing" className="block text-sm hover:text-white transition-colors">Listing Plans</Link>
              <Link href="/for-practitioners#verification" className="block text-sm hover:text-white transition-colors">Verification Process</Link>
              <Link href="/for-practitioners#faq" className="block text-sm hover:text-white transition-colors">Practitioner FAQ</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Company</h4>
            <div className="space-y-2.5">
              <Link href="/about" className="block text-sm hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="block text-sm hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy" className="block text-sm hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-sm hover:text-white transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">&copy; 2026 Somatic Healing Australia. All rights reserved.</p>
          <p className="text-xs text-white/40">
            Built by{" "}
            <a href="https://arclightdigital.com.au" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              Arclight Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
