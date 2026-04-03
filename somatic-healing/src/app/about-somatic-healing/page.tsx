import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is Somatic Healing? | Somatic Healing Australia",
  description:
    "Somatic therapy helps your body release what words alone cannot reach. Learn what somatic healing is, how it differs from talk therapy, and whether it might help you.",
};

const therapyTypes = [
  {
    name: "Somatic Experiencing (SE)",
    description:
      "Developed by Dr Peter Levine, SE works with the body\u2019s natural ability to recover from overwhelming experiences. Rather than revisiting traumatic events in detail, SE helps you notice and gently release the survival energy that your nervous system is still holding. Sessions are typically gentle and may involve guided attention to physical sensations, small movements, and breathing.",
  },
  {
    name: "Sensorimotor Psychotherapy",
    description:
      "This approach combines talk therapy with careful attention to your body\u2019s physical experience — your posture, gestures, movement, and sensation. It is particularly effective for trauma, attachment difficulties, and emotional patterns that feel stuck. A sensorimotor psychotherapist helps you notice what your body does when certain feelings arise, and works with those patterns directly.",
  },
  {
    name: "Trauma Release Exercises (TRE)",
    description:
      "TRE involves a series of simple exercises designed to activate your body\u2019s natural tremoring mechanism — a built-in way of releasing deep muscular tension. Many people describe it as finally letting go of something they did not know they were carrying. TRE can be done individually or in groups, and once learned, can be practised on your own.",
  },
  {
    name: "Body Psychotherapy",
    description:
      "Body psychotherapy works with the relationship between your emotional life and your physical experience. Sessions may include conversation, body awareness exercises, breath work, and gentle guided movement. It is effective for a wide range of concerns, from chronic tension and anxiety to emotional disconnection and relationship difficulties.",
  },
];

const signs = [
  "You carry persistent tension in your body — jaw, shoulders, stomach, chest — that does not have a clear medical cause",
  "Anxiety shows up physically: racing heart, tight chest, churning stomach, or a feeling of being constantly on edge",
  "You feel emotionally numb, shut down, or disconnected from your body",
  "You have experienced trauma — whether a single event or ongoing stress — that talking about has not fully resolved",
  "Grief, loss, or emotional pain feels like it has settled into your body",
  "You feel stuck in patterns you cannot think your way out of",
  "Talk therapy has been helpful but has not addressed everything",
  "You notice your body reacting before your mind catches up — flinching, bracing, freezing, or shutting down",
];

export default function AboutSomaticHealing() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What Is Somatic Healing?
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            If something in your body feels stuck, tense, or unresolved — and talking about it has not been enough — somatic therapy may be what you are looking for.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Opening */}
          <div className="prose-custom space-y-5 text-[var(--text-secondary)] leading-relaxed mb-16">
            <p>
              You might not have a name for what you are feeling. Maybe it is a tightness in your chest that never fully goes away. A jaw that clenches in your sleep. A constant feeling of being braced for something, even when nothing is wrong. Or maybe it is the opposite — a numbness, a disconnection, a sense that you are watching your own life from a distance.
            </p>
            <p>
              These are not signs that something is wrong with you. They are signs that your body is holding onto something it has not yet been able to release.
            </p>
            <p className="text-lg font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
              Somatic therapy works directly with your body — not just your thoughts — to help release what is stuck.
            </p>
            <p>
              The word &ldquo;somatic&rdquo; comes from the Greek word <em>soma</em>, meaning &ldquo;body.&rdquo; Somatic therapies are a family of approaches that recognise a simple truth: stress, trauma, grief, and emotional pain do not just live in your mind. They settle into your muscles, your breath, your posture, your nervous system. And sometimes, the most effective way to shift them is to work with the body directly.
            </p>
          </div>

          {/* How It Differs */}
          <div className="mb-16">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              How Is It Different from Talk Therapy?
            </h2>
            <div className="space-y-5 text-[var(--text-secondary)] leading-relaxed">
              <p>
                Talk therapy — like CBT, psychotherapy, or counselling — works primarily through conversation. You talk about what happened, explore your thoughts and beliefs, and develop strategies for managing your emotions. For many people, this is genuinely helpful.
              </p>
              <p>
                But sometimes, understanding a problem is not enough to resolve it. You might understand exactly why you feel anxious, and still feel your chest tighten every morning. You might have processed a difficult experience intellectually, but still flinch when something reminds you of it. That is because your body has its own memory, separate from your conscious mind.
              </p>
              <p>
                Somatic therapy works with that body memory. Instead of only asking &ldquo;What are you thinking?&rdquo; a somatic therapist also asks &ldquo;What are you noticing in your body right now?&rdquo; They help you pay attention to sensations, tension patterns, breath, and movement — and work with those directly.
              </p>
              <p>
                This is not an either/or choice. Many somatic therapists integrate conversation with body-based work. And many people find that somatic therapy is most powerful alongside or after talk therapy, addressing what words alone could not reach.
              </p>
            </div>
          </div>

          {/* Session Image */}
          <div className="mb-16 rounded-2xl overflow-hidden relative aspect-[16/7]">
            <Image
              src="/images/session.png"
              alt="A warm therapy room where a somatic therapy session is taking place"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          {/* What Happens in a Session */}
          <div className="mb-16">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What Happens in a Somatic Therapy Session?
            </h2>
            <div className="space-y-5 text-[var(--text-secondary)] leading-relaxed">
              <p>
                Every practitioner is different, and there is no single &ldquo;somatic therapy session.&rdquo; But here is what you might expect:
              </p>
              <p>
                You will usually start by talking — about what brought you in, what you have been experiencing, and what you are hoping for. Your therapist will listen, and they will also be paying attention to your body: your posture, your breathing, any tension or stillness they notice.
              </p>
              <p>
                At some point, your therapist may invite you to notice what is happening in your body. &ldquo;Where do you feel that?&rdquo; &ldquo;What happens in your chest when you talk about that?&rdquo; &ldquo;Can you notice the tension in your shoulders right now?&rdquo; This is not about performing or doing it right. It is simply about turning your attention inward.
              </p>
              <p>
                From there, the work might involve guided breathing, gentle movement, shifts in posture, or simply staying with a sensation and noticing what happens. Some approaches involve light touch (always with your consent). Others are entirely verbal but body-focused.
              </p>
              <p>
                Sessions are typically gentle. You will not be pushed to relive traumatic experiences or do anything that feels unsafe. A good somatic therapist works at your pace and helps you build the capacity to be with your experience without becoming overwhelmed.
              </p>
            </div>
          </div>

          {/* Signs */}
          <div className="mb-16">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Signs That Somatic Therapy Might Help
            </h2>
            <div className="space-y-3">
              {signs.map((sign) => (
                <div key={sign} className="flex items-start gap-3 bg-cream rounded-lg p-4">
                  <CheckCircle size={18} className="text-aqua shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--text-secondary)]">{sign}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Types of Somatic Therapy */}
          <div className="mb-16">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Types of Somatic Therapy
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              There are several different approaches within the somatic therapy family. They share a common foundation — working with the body — but each has its own methods and focus.
            </p>
            <div className="space-y-6">
              {therapyTypes.map((type) => (
                <div key={type.name} className="bg-white rounded-xl border border-[var(--border)] p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    {type.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-aqua-50 rounded-2xl p-8 sm:p-12 text-center">
            <h2
              className="text-2xl font-bold text-[var(--text-primary)] mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to find a practitioner?
            </h2>
            <p className="text-[var(--text-secondary)] mb-6 max-w-lg mx-auto">
              Browse verified somatic therapists across Australia. Search by location, what you are experiencing, or how you would like to meet.
            </p>
            <Link
              href="/find-a-therapist"
              className="inline-flex items-center gap-2 gold-btn font-medium px-8 py-3 rounded-lg"
            >
              Find a Therapist <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
