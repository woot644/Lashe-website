export interface Practitioner {
  slug: string;
  fullName: string;
  credentials: string;
  practiceName: string;
  photo: string | null;
  location: {
    address: string;
    suburb: string;
    city: string;
    state: string;
    postcode: string;
    lat: number;
    lng: number;
  };
  aboutMe: string;
  modalities: string[];
  helpsWithTags: string[];
  sessionTypes: "in-person" | "telehealth" | "both";
  sessionLength: string;
  feeRange: { min: number; max: number };
  bookingMethod: "url" | "enquiry";
  bookingUrl?: string;
  qualifications: string;
  whyIDoThisWork: string;
  professionalMemberships: string[];
  gender: "female" | "male" | "non-binary";
  availability: "accepting" | "waitlist" | "full";
  listingTier: "free" | "premium" | "featured";
  verified: boolean;
  rating: number;
  reviewCount: number;
}

export const experiences = [
  "Anxiety that lives in my body",
  "Tension and pain with no medical cause",
  "Feeling disconnected or numb",
  "Trauma responses",
  "Chronic stress and burnout",
  "Emotional overwhelm",
  "Difficulty regulating emotions",
  "Grief held in the body",
];

export const modalities = [
  "Somatic Experiencing (SE)",
  "Sensorimotor Psychotherapy",
  "Trauma Release Exercises (TRE)",
  "Body Psychotherapy",
  "Somatic Trauma Therapy",
  "Polyvagal-Informed Therapy",
  "EMDR with Somatic Integration",
  "Breathwork",
  "Myofascial Release",
];

export const practitioners: Practitioner[] = [
  {
    slug: "sarah-mitchell",
    fullName: "Dr Sarah Mitchell",
    credentials: "Clinical Psychologist, SE Practitioner",
    practiceName: "Embodied Psychology Sydney",
    photo: null,
    location: {
      address: "Level 3, 45 Oxford Street",
      suburb: "Darlinghurst",
      city: "Sydney",
      state: "NSW",
      postcode: "2010",
      lat: -33.8784,
      lng: 151.2153,
    },
    aboutMe:
      "I work with people who have tried talking about their problems and found it helpful — but not enough. Many of my clients come to me after years of traditional therapy, still carrying tension, anxiety, or a sense of being stuck that words alone have not shifted.\n\nMy approach is gentle and collaborative. Together, we pay attention to what your body is doing — the places you hold tension, the patterns your nervous system has learned, the way your breath changes when certain topics come up. From there, we work with those patterns directly, helping your body find its way back to a sense of safety and ease.\n\nI am particularly experienced with trauma, anxiety that shows up physically, and the kind of emotional shutdown that makes you feel disconnected from yourself and others.",
    modalities: ["Somatic Experiencing (SE)", "Polyvagal-Informed Therapy"],
    helpsWithTags: [
      "Anxiety that lives in my body",
      "Trauma responses",
      "Feeling disconnected or numb",
      "Difficulty regulating emotions",
    ],
    sessionTypes: "both",
    sessionLength: "50 minutes",
    feeRange: { min: 200, max: 260 },
    bookingMethod: "url",
    bookingUrl: "https://example.com/book/sarah-mitchell",
    qualifications:
      "Doctor of Psychology (Clinical), University of Sydney. Somatic Experiencing Practitioner (SEP), certified through the Somatic Experiencing Trauma Institute. Level 2 trained in Sensorimotor Psychotherapy. Member of the Australian Psychological Society (APS).",
    whyIDoThisWork:
      "I became a somatic therapist because I saw too many clients stuck in a loop — understanding their trauma intellectually but still feeling it in their body every day. The body deserves to be part of the conversation.",
    professionalMemberships: [
      "Australian Psychological Society (APS)",
      "SE Australia",
    ],
    gender: "female",
    availability: "accepting",
    listingTier: "featured",
    verified: true,
    rating: 4.9,
    reviewCount: 27,
  },
  {
    slug: "james-chen",
    fullName: "James Chen",
    credentials: "Somatic Experiencing Practitioner",
    practiceName: "Body First Therapy",
    photo: null,
    location: {
      address: "Suite 12, 88 Chapel Street",
      suburb: "Windsor",
      city: "Melbourne",
      state: "VIC",
      postcode: "3181",
      lat: -37.8563,
      lng: 144.9914,
    },
    aboutMe:
      "I help people who are running on empty. The ones who push through, manage everything, hold it together — until they cannot. Chronic stress, burnout, and the tension patterns that come with years of overriding what your body is telling you are what I work with most.\n\nSessions with me are not about lying on a couch and analysing your childhood. We work with what is happening in your body right now. I will help you notice where you brace, where you disconnect, and what your nervous system needs to settle. It is practical, grounded work — and most people feel a shift within the first few sessions.\n\nI also work with people who have experienced trauma but may not identify with the word. If something happened that your body has not moved past, we can work with that.",
    modalities: ["Somatic Experiencing (SE)", "Breathwork"],
    helpsWithTags: [
      "Chronic stress and burnout",
      "Tension and pain with no medical cause",
      "Trauma responses",
      "Emotional overwhelm",
    ],
    sessionTypes: "in-person",
    sessionLength: "60 minutes",
    feeRange: { min: 150, max: 180 },
    bookingMethod: "enquiry",
    qualifications:
      "Somatic Experiencing Practitioner (SEP), certified through SE Australia. Graduate Diploma in Counselling, Monash University. Certificate IV in Training and Assessment. Ongoing professional development in polyvagal theory and trauma-informed care.",
    whyIDoThisWork:
      "I burned out in my corporate career at 32. Somatic therapy was the thing that finally helped me understand what my body had been trying to tell me for years. Now I help others find that same relief.",
    professionalMemberships: ["SE Australia", "PACFA"],
    gender: "male",
    availability: "accepting",
    listingTier: "premium",
    verified: true,
    rating: 4.8,
    reviewCount: 19,
  },
  {
    slug: "emma-warrington",
    fullName: "Emma Warrington",
    credentials: "Sensorimotor Psychotherapist",
    practiceName: "Grounded Healing Brisbane",
    photo: null,
    location: {
      address: "14 Latrobe Terrace",
      suburb: "Paddington",
      city: "Brisbane",
      state: "QLD",
      postcode: "4064",
      lat: -27.4594,
      lng: 153.0132,
    },
    aboutMe:
      "I specialise in working with people who carry grief, trauma, and emotional pain that has settled deep into their body. Many of my clients describe a feeling of heaviness, numbness, or disconnection — as though part of them has shut down to cope.\n\nIn our sessions, I create a safe, unhurried space where you can begin to reconnect with your body at your own pace. Sensorimotor Psychotherapy combines talk therapy with careful attention to your physical experience — your posture, movement, breath, and sensation. This is not about forcing anything. It is about listening to what your body already knows.\n\nI have particular experience working with complex trauma, grief, and dissociation. I also work with people navigating significant life transitions who feel emotionally or physically stuck.",
    modalities: [
      "Sensorimotor Psychotherapy",
      "Somatic Trauma Therapy",
      "Polyvagal-Informed Therapy",
    ],
    helpsWithTags: [
      "Grief held in the body",
      "Trauma responses",
      "Feeling disconnected or numb",
      "Emotional overwhelm",
    ],
    sessionTypes: "both",
    sessionLength: "60 minutes",
    feeRange: { min: 180, max: 220 },
    bookingMethod: "url",
    bookingUrl: "https://example.com/book/emma-warrington",
    qualifications:
      "Master of Counselling, Queensland University of Technology. Level 3 certified in Sensorimotor Psychotherapy (Sensorimotor Psychotherapy Institute, USA). Trained in Complex Trauma treatment. Registered Clinical Member, PACFA.",
    whyIDoThisWork:
      "After my own experience with grief that lived in my body for years, I discovered that healing does not always come through words. I want to offer that same possibility to others.",
    professionalMemberships: ["PACFA", "Sensorimotor Psychotherapy Institute"],
    gender: "female",
    availability: "waitlist",
    listingTier: "featured",
    verified: true,
    rating: 5.0,
    reviewCount: 14,
  },
  {
    slug: "michael-torres",
    fullName: "Dr Michael Torres",
    credentials: "Psychologist, TRE Provider",
    practiceName: "West Coast Body Therapy",
    photo: null,
    location: {
      address: "Suite 4, 120 Hay Street",
      suburb: "Subiaco",
      city: "Perth",
      state: "WA",
      postcode: "6008",
      lat: -31.9470,
      lng: 115.8260,
    },
    aboutMe:
      "I work with people who are tired of feeling tense, wired, or shut down — and ready to try something different. My practice combines psychology with TRE (Trauma Release Exercises) and somatic approaches, which means we work with both your mind and your body.\n\nTRE involves a series of simple exercises that help your body release deep muscular tension. Many people describe it as finally letting go of something they did not even know they were holding. I combine this with talk-based therapy to help you understand your patterns and build practical skills for managing stress and emotional regulation.\n\nI see a lot of men in my practice — people who are not comfortable with traditional therapy but know something needs to shift. If that sounds like you, this is a judgement-free space.",
    modalities: [
      "Trauma Release Exercises (TRE)",
      "Body Psychotherapy",
      "EMDR with Somatic Integration",
    ],
    helpsWithTags: [
      "Chronic stress and burnout",
      "Tension and pain with no medical cause",
      "Difficulty regulating emotions",
      "Trauma responses",
    ],
    sessionTypes: "in-person",
    sessionLength: "50 minutes",
    feeRange: { min: 210, max: 250 },
    bookingMethod: "enquiry",
    qualifications:
      "Doctor of Psychology (Clinical), University of Western Australia. Certified TRE Provider (TRE Australia). EMDR trained (EMDRAA accredited). Registered Psychologist, AHPRA.",
    whyIDoThisWork:
      "I spent years doing traditional CBT before discovering somatic approaches. The difference I saw in my clients — and in myself — was undeniable. The body has so much wisdom if we learn to listen.",
    professionalMemberships: [
      "Australian Psychological Society (APS)",
      "TRE Australia",
      "EMDRAA",
    ],
    gender: "male",
    availability: "accepting",
    listingTier: "premium",
    verified: true,
    rating: 4.7,
    reviewCount: 11,
  },
  {
    slug: "priya-sharma",
    fullName: "Priya Sharma",
    credentials: "Somatic Therapist, Counsellor",
    practiceName: "Inner Ground Therapy",
    photo: null,
    location: {
      address: "78 Unley Road",
      suburb: "Unley",
      city: "Adelaide",
      state: "SA",
      postcode: "5061",
      lat: -34.9480,
      lng: 138.6050,
    },
    aboutMe:
      "I work with people who feel like something in them is stuck — even if they cannot name exactly what it is. You might notice it as a knot in your stomach, a heaviness in your chest, or a feeling of being on guard all the time. These are not just feelings. They are your body telling you something needs attention.\n\nMy approach blends somatic therapy with trauma-informed counselling. We work at a pace that feels safe for you, paying attention to both your story and your body's response to it. There is no pressure to talk about anything you are not ready for — sometimes the body leads, sometimes words do.\n\nI particularly enjoy working with people who are navigating anxiety, emotional overwhelm, and the lasting effects of difficult life experiences.",
    modalities: [
      "Somatic Trauma Therapy",
      "Polyvagal-Informed Therapy",
      "Breathwork",
    ],
    helpsWithTags: [
      "Anxiety that lives in my body",
      "Emotional overwhelm",
      "Feeling disconnected or numb",
      "Grief held in the body",
    ],
    sessionTypes: "both",
    sessionLength: "60 minutes",
    feeRange: { min: 140, max: 170 },
    bookingMethod: "url",
    bookingUrl: "https://example.com/book/priya-sharma",
    qualifications:
      "Master of Counselling, University of South Australia. Certified Somatic Trauma Therapist. Trained in Polyvagal Theory applications. Registered member, Australian Counselling Association (ACA).",
    whyIDoThisWork:
      "I grew up in a culture where you did not talk about pain — you just carried it. Somatic therapy showed me there was another way, and I want to make that accessible to everyone.",
    professionalMemberships: [
      "Australian Counselling Association (ACA)",
      "PACFA",
    ],
    gender: "female",
    availability: "accepting",
    listingTier: "premium",
    verified: true,
    rating: 4.9,
    reviewCount: 22,
  },
  {
    slug: "ben-mcallister",
    fullName: "Ben McAllister",
    credentials: "Body Psychotherapist",
    practiceName: "Embodied Therapy Hobart",
    photo: null,
    location: {
      address: "22 Murray Street",
      suburb: "Hobart",
      city: "Hobart",
      state: "TAS",
      postcode: "7000",
      lat: -42.8821,
      lng: 147.3272,
    },
    aboutMe:
      "I am a body psychotherapist, which means I work with the connection between your emotional life and your physical experience. If you have ever noticed that stress goes straight to your shoulders, or that anxiety makes your stomach churn, or that sadness feels like a weight pressing down on you — that is the territory I work in.\n\nMy sessions are a mix of conversation, body awareness, and gentle guided movement. We pay attention to what comes up in your body as we talk, and work with it directly. This might mean noticing a clenched fist, a shallow breath, or a sudden urge to move — and exploring what it means.\n\nI work with adults of all ages and backgrounds. You do not need to have experienced trauma to benefit from body psychotherapy — it is effective for anyone who wants a deeper connection with themselves.",
    modalities: ["Body Psychotherapy", "Breathwork"],
    helpsWithTags: [
      "Tension and pain with no medical cause",
      "Feeling disconnected or numb",
      "Chronic stress and burnout",
      "Difficulty regulating emotions",
    ],
    sessionTypes: "in-person",
    sessionLength: "60 minutes",
    feeRange: { min: 130, max: 160 },
    bookingMethod: "enquiry",
    qualifications:
      "Graduate Diploma in Body Psychotherapy, Melbourne Institute of Experiential and Creative Arts Therapy. Bachelor of Psychology (Honours), University of Tasmania. Registered Counsellor, ACA.",
    whyIDoThisWork:
      "The body never lies. I find it endlessly rewarding to help people discover what their body has been trying to say — and to finally be heard.",
    professionalMemberships: [
      "Australian Counselling Association (ACA)",
      "EABP (European Association for Body Psychotherapy)",
    ],
    gender: "male",
    availability: "accepting",
    listingTier: "free",
    verified: true,
    rating: 4.6,
    reviewCount: 8,
  },
];
