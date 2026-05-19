export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface Benefit {
  label: string;
  iconName: string; // references lucide icon names
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: 'cosmetic' | 'general' | 'restorative' | 'emergency' | 'orthodontics' | 'pediatric';
  icon: string; // Emoji for simple rendering, or we can map Lucide icons
  iconName: string; // Lucide icon name for premium cards
  shortDescription: string;
  heroImage: string;
  overview: string;
  benefits: Benefit[];
  process: ProcessStep[];
  faq: FAQItem[];
  relatedSlugs: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  type: 'doctor' | 'hygienist' | 'admin';
  photo: string;
  shortBio: string;
  fullBio: string[];
  credentials: string[];
  specialties: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  treatmentType: 'veneers' | 'whitening' | 'invisalign' | 'implants' | 'restorative' | 'general';
  treatmentLabel: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  consentId: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category: 'oral-health' | 'cosmetic' | 'patient-stories' | 'news';
  categoryLabel: string;
  excerpt: string;
  readingTimeMinutes: number;
  mainImage: string;
  authorId: string;
  toc: string[];
  body: string[]; // multi-paragraph detailed clinical text
}

// -------------------------------------------------------------
// CLINIC DATA CONFIG
// -------------------------------------------------------------
export const clinicSettings = {
  practiceName: "Aventura Dental Arts",
  phone: "(305) 555-0128",
  phoneRaw: "3055550128",
  email: "hello@aventuradentalarts.com",
  address: {
    street: "1234 Premium Way, Suite 100",
    city: "Aventura",
    state: "FL",
    zip: "33180",
  },
  hours: [
    { day: "Monday", hours: "8:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "8:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "8:00 AM - 5:00 PM" },
    { day: "Thursday", hours: "8:00 AM - 5:00 PM" },
    { day: "Friday", hours: "8:00 AM - 2:00 PM" },
    { day: "Saturday - Sunday", hours: "Closed" },
  ],
  socials: {
    instagram: "https://instagram.com/aventuradentalarts",
    facebook: "https://facebook.com/aventuradentalarts",
    google: "https://google.com/maps",
  }
};

// -------------------------------------------------------------
// SERVICES MOCK DATA
// -------------------------------------------------------------
export const servicesData: ServiceItem[] = [
  {
    id: "s1",
    title: "Cosmetic Dentistry",
    slug: "cosmetic",
    category: "cosmetic",
    icon: "✨",
    iconName: "Sparkles",
    shortDescription: "Crafting beautiful, high-contrast, natural-looking smiles through veneers, advanced whitening, and smile makeovers.",
    heroImage: "https://images.unsplash.com/photo-1598256989800-fea5a18a9926?q=80&w=1200&auto=format&fit=crop",
    overview: "Cosmetic dentistry at Aventura Dental Arts is where restorative science meets visual artistry. Guided by the principle of 'restrained luxury', we design custom smiles that complement your unique facial features, skin tone, and character. We avoid standard artificial designs, focusing instead on texture, opacity, and natural shade variations to create veneers and makeovers that look completely authentic.",
    benefits: [
      { label: "Bespoke Design", iconName: "Palette", description: "Every smile is customized to complement your facial structure, profile, and personality." },
      { label: "Minimal Prep Veneers", iconName: "Shield", description: "Preserving as much of your natural tooth structure as possible using ultra-thin porcelain." },
      { label: "Artistic Shade Matching", iconName: "Eye", description: "Expertly blending translucent colors to mimic natural tooth enamel perfectly." },
      { label: "Long-Term Durability", iconName: "Gem", description: "We use premium, high-strength dental ceramic engineered to resist staining and wear." }
    ],
    process: [
      { stepNumber: 1, title: "Aesthetic Consultation", description: "A detailed visual diagnosis of your smile, utilizing digital scanning, close-up photography, and facial mapping to map your treatment goals." },
      { stepNumber: 2, title: "Digital 3D Smile Design", description: "We create a physical and digital wax-up mockup of your proposed smile. You get to 'test-drive' the look and feel in your mouth before any treatment begins." },
      { stepNumber: 3, title: "Micro-Preparation & Bonding", description: "Minimal preparation of the enamel, followed by the meticulous bonding of ultra-thin, hand-crafted porcelain shells by Dr. Rostova." },
      { stepNumber: 4, title: "Aftercare & Final Polish", description: "A final refinement, bite optimization check, and a customized preservation guard to protect your investment for decades." }
    ],
    faq: [
      { question: "How long do porcelain veneers typically last?", answer: "With excellent oral hygiene and regular preventive care, premium porcelain veneers can easily last 15 to 20 years or more. We construct them using elite-grade biocompatible ceramics that resist staining and wear." },
      { question: "Is the porcelain veneer procedure painful?", answer: "Not at all. The procedure is performed under local anesthesia to ensure complete comfort. For minimal-prep or no-prep veneers, the discomfort is practically zero, and recovery is instantaneous." },
      { question: "Will my custom veneers look artificial or too white?", answer: "Never at Aventura Dental Arts. We specialize in natural aesthetic balance. Dr. Rostova hand-picks multi-layered ceramic shades with appropriate translucent edges to replicate how light passes through natural teeth." },
      { question: "Can I eat and drink normally after getting veneers?", answer: "Yes, once the permanent veneers are bonded. Modern bonding agents are incredibly strong. You should avoid biting directly into hard objects like ice or hard candy, just as you would with natural teeth." }
    ],
    relatedSlugs: ["general", "restorative", "orthodontics"]
  },
  {
    id: "s2",
    title: "General Dentistry",
    slug: "general",
    category: "general",
    icon: "🦷",
    iconName: "Shield",
    shortDescription: "Comprehensive, preventive, and systemic care designed to maintain your health in a calm, state-of-the-art environment.",
    heroImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    overview: "General dentistry is the core foundation of lifelong oral and systemic health. We offer advanced dental hygiene, detailed microscopic examinations, and personalized preventive protocols. By looking beyond simple cavities, we address the relationship between your oral microbiome and your overall health, offering treatment in an environment of calm and clinical superiority.",
    benefits: [
      { label: "Systemic Focus", iconName: "Heart", description: "Evaluating the complex linkages between oral bacterial health and overall physical well-being." },
      { label: "Painless Cleaning", iconName: "Wind", description: "Utilizing advanced piezoelectric guided biofilm therapy for highly comfortable, deep cleaning." },
      { label: "Early Detection", iconName: "Search", description: "Leveraging digital microscopic cameras and AI diagnostics to discover issues before they worsen." },
      { label: "Non-Toxic Materials", iconName: "Leaf", description: "Using strictly biocompatible, BPA-free, and mercury-free composite resins for all treatments." }
    ],
    process: [
      { stepNumber: 1, title: "Comprehensive Diagnostics", description: "Ultra-low-dose digital X-rays, 3D intraoral scans, oral cancer screening, and detailed microscopic periodontal evaluation." },
      { stepNumber: 2, title: "Biofilm Guided Therapy", description: "Soft, warm-water air polishing that removes plaque and bacterial build-up painlessly without scraping enamel." },
      { stepNumber: 3, title: "Personalized Prevention Plan", description: "A tailored home-care regimen outlining specific nutritional, bacterial, and cleaning guidelines to keep your teeth in perfect health." }
    ],
    faq: [
      { question: "How often should I schedule a professional cleaning and exam?", answer: "For most patients, we recommend a routine checkup and clinical cleaning every 6 months. For individuals with a history of periodontal disease, we may advise a customized 3 to 4-month schedule." },
      { question: "What is Biofilm Guided Therapy?", answer: "It is a Swiss-engineered preventive technology that uses a warm spray of air, water, and specialized erythritol powder to gently clean teeth and gums. It is far more comfortable than traditional ultrasonic scaling." },
      { question: "Are your fillings mercury-free?", answer: "Yes, absolutely. We are a strictly mercury-free, biomimetic practice. We only use premium composite resins and ceramic inlays that structurally fuse with the natural tooth and contain zero toxins." }
    ],
    relatedSlugs: ["cosmetic", "restorative", "pediatric"]
  },
  {
    id: "s3",
    title: "Restorative Care",
    slug: "restorative",
    category: "restorative",
    icon: "🛡️",
    iconName: "Layers",
    shortDescription: "Reclaiming tooth structure, alignment, and full function through advanced implantology, premium crowns, and biomimetic bonding.",
    heroImage: "https://images.unsplash.com/photo-1579684389782-64d84b5e905d?q=80&w=1200&auto=format&fit=crop",
    overview: "Restorative care at Aventura Dental Arts uses the highest-tier clinical advancements to reconstruct missing, fractured, or compromised teeth. Through biomimetic principles, we replicate the natural structure, flexibility, and physical mechanics of natural teeth. From single ceramic dental implants to custom-milled monolithic zirconia crowns, our treatments restore full chewing comfort, structural integrity, and aesthetic harmony.",
    benefits: [
      { label: "Biomimetic Strength", iconName: "Activity", description: "Treatments designed to mimic the natural mechanics and flex of real teeth." },
      { label: "Premium Materials", iconName: "Award", description: "Only utilizing top-tier ceramic materials such as lithium disilicate (E.max) and premium zirconia." },
      { label: "3D Guided Implants", iconName: "Target", description: "Surgical placement of titanium or ceramic implants guided by advanced 3D computer planning." },
      { label: "Zero Metal Shadows", iconName: "Sun", description: "Completely metal-free crowns and restorations to avoid dark margins along the gum line." }
    ],
    process: [
      { stepNumber: 1, title: "3D Bone & Tissue Scan", description: "High-resolution cone-beam CT (CBCT) imaging to visualize the bone architecture, nerve pathways, and surrounding structures." },
      { stepNumber: 2, title: "Custom CAD/CAM Modeling", description: "Digital design of your implant or crown restoration, precisely aligned down to the micron for a perfect bite." },
      { stepNumber: 3, title: "Minimally Invasive Treatment", description: "Computer-guided surgical placement or conservative tooth preparation to maximize healthy tissue retention." },
      { stepNumber: 4, title: "Ceramic Restoration Placement", description: "Affixing your hand-glazed ceramic crown or implant restoration, immediately returning full strength to your smile." }
    ],
    faq: [
      { question: "What are the primary benefits of dental implants over traditional bridges?", answer: "Dental implants act as artificial roots, preserving jawbone density and avoiding the need to shave down adjacent healthy teeth. They are structurally independent, highly durable, and look and function exactly like natural teeth." },
      { question: "How long does a dental implant process take?", answer: "Typically, the entire process takes between 3 to 6 months. This allows the implant to securely integrate with the jawbone (osseointegration) before we attach the custom ceramic crown. Temporary aesthetic solutions are provided during this time." },
      { question: "What is a biomimetic restoration?", answer: "Biomimetic dentistry means 'mimicking nature'. Instead of aggressively drilling away tooth structure for a traditional crown, we conservatively rebuild the tooth layer-by-layer using materials that match the physical properties of natural enamel and dentin." }
    ],
    relatedSlugs: ["cosmetic", "general", "emergency"]
  },
  {
    id: "s4",
    title: "Emergency Services",
    slug: "emergency",
    category: "emergency",
    icon: "⚡",
    iconName: "Zap",
    shortDescription: "Rapid, compassionate diagnostic and therapeutic care for severe pain, tooth fractures, and acute dental infections.",
    heroImage: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1200&auto=format&fit=crop",
    overview: "Dental emergencies can be alarming and highly painful. Aventura Dental Arts provides rapid response care for acute trauma, severe toothaches, infections, and broken restorations. Our clinical protocols prioritize instant pain relief, infection control, and diagnostic speed. We reserve dedicated daily appointment slots to guarantee fast service when you need it most.",
    benefits: [
      { label: "Immediate Relief", iconName: "Smile", description: "Fast-acting comfort protocols to relieve acute pain, dental sensitivity, and pressure." },
      { label: "Same-Day Bookings", iconName: "Clock", description: "Dedicated emergency time blocks available every single day to ensure prompt care." },
      { label: "Advanced Anesthetics", iconName: "ShieldAlert", description: "Painless computerized injection systems that numb the target area instantly." },
      { label: "Trauma Reconstruction", iconName: "Wrench", description: "Comprehensive restoration of broken, chipped, or displaced teeth." }
    ],
    process: [
      { stepNumber: 1, title: "Priority Triage", description: "Immediate evaluation of symptoms over the phone or online, followed by a guaranteed express appointment slot." },
      { stepNumber: 2, title: "Targeted Diagnostics", description: "Focused digital X-rays and localized testing to pinpoint the source of pain or structural damage within minutes." },
      { stepNumber: 3, title: "Comfort & Treatment", description: "Administering local anesthetics or mild sedation, followed by definitive repair (root canal therapy, bonding, or extraction if needed) to solve the problem." }
    ],
    faq: [
      { question: "What should I do if a permanent tooth is completely knocked out?", answer: "Time is absolutely critical. Retrieve the tooth, hold it by the crown (never the root), gently rinse it with water if dirty, and try to reinsert it into the socket. If that is not possible, place it in a cup of milk or saliva and call us immediately. Teeth treated within 30-60 minutes have a high survival rate." },
      { question: "How do I know if my toothache is an actual emergency?", answer: "If your pain is constant, severe, keeps you awake at night, is accompanied by swelling in your gums or face, or a fever, it is a dental emergency that requires immediate clinical evaluation." },
      { question: "Do you offer emergency root canals?", answer: "Yes. When the inner nerve of a tooth becomes inflamed or infected, a root canal is the most effective way to eliminate severe pain and save the tooth. We perform this procedure using painless, microscopic techniques." }
    ],
    relatedSlugs: ["restorative", "general", "orthodontics"]
  },
  {
    id: "s5",
    title: "Orthodontics",
    slug: "orthodontics",
    category: "orthodontics",
    icon: "💫",
    iconName: "Compass",
    shortDescription: "Discreet and precise tooth alignment using premium clear aligner technologies customized to fit your busy life.",
    heroImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop",
    overview: "Orthodontic treatment is about much more than just straight teeth. Properly aligned teeth reduce wearing, prevent periodontal bacteria collection, and optimize your overall bite forces. Aventura Dental Arts specializes in advanced clear aligner therapies (like Invisalign), which align your smile invisibly, comfortably, and up to 50% faster than traditional braces.",
    benefits: [
      { label: "100% Invisible", iconName: "EyeOff", description: "Ultra-clear medical-grade polyurethane aligners that are virtually undetectable." },
      { label: "Removable Comfort", iconName: "Sparkles", description: "Easily remove aligners to eat, brush, and floss normally, keeping hygiene high." },
      { label: "Digital Predictions", iconName: "Tv", description: "Pre-visualize your exact alignment journey step-by-step using our 3D software." },
      { label: "Fewer Office Visits", iconName: "Calendar", description: "Optimized alignment checkups scheduled every 6 to 8 weeks, saving you time." }
    ],
    process: [
      { stepNumber: 1, title: "3D Digital Scan", description: "We take a highly accurate 3D model of your mouth in under 5 minutes using our state-of-the-art iTero intraoral scanner." },
      { stepNumber: 2, title: "Custom Aligner Fabrication", description: "Dr. Rostova customizes your movement vectors, and a series of custom clear trays are manufactured specifically for your treatment." },
      { stepNumber: 3, title: "Wearing Your Aligners", description: "You will wear each aligner tray for 20-22 hours a day, switching to the next set in the sequence every 1 to 2 weeks." },
      { stepNumber: 4, title: "Retainer Preservation", description: "After alignment is complete, we provide custom clear retainers to prevent any shifting, keeping your new smile aligned forever." }
    ],
    faq: [
      { question: "How long does Invisalign treatment usually take?", answer: "The typical treatment time ranges from 6 to 18 months, depending on the complexity of the alignment. Minor adjustments can sometimes be completed in as little as 4 to 6 months." },
      { question: "Is clear aligner therapy painful?", answer: "You will feel a sensation of pressure and minor soreness for the first day or two after starting a new aligner tray. This is completely normal and indicates that the teeth are safely migrating into their target positions." },
      { question: "Can I drink coffee or tea with the aligners in?", answer: "We advise removing your clear aligners before drinking hot beverages (which can warp the plastic) or dark liquids like coffee, tea, or red wine, which can stain the clear aligner material." }
    ],
    relatedSlugs: ["cosmetic", "general", "pediatric"]
  },
  {
    id: "s6",
    title: "Pediatric Dentistry",
    slug: "pediatric",
    category: "pediatric",
    icon: "🧸",
    iconName: "Baby",
    shortDescription: "Gentle, educational, and fun dental care designed to establish early habits and premium oral health for children.",
    heroImage: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=1200&auto=format&fit=crop",
    overview: "We believe a child's early dental experiences shape their view of oral health for the rest of their life. Our pediatric program centers on trust, education, and gentle care. We explain every clinical step using child-friendly language, turning a standard dentist appointment into a fun, zero-stress adventure.",
    benefits: [
      { label: "Comfort First", iconName: "HeartHandshake", description: "A highly welcoming environment designed to prevent dental anxiety before it starts." },
      { label: "Fun Education", iconName: "BookOpen", description: "Interactive brushing demonstrations and child-friendly clinical explanations." },
      { label: "BPA-Free Sealants", iconName: "ShieldCheck", description: "Ultra-safe protective coatings placed on deep chewing surfaces to prevent cavities." },
      { label: "Growth Monitoring", iconName: "TrendingUp", description: "Tracking jaw development early to guide airway health and prevent alignment issues." }
    ],
    process: [
      { stepNumber: 1, title: "Gentle Introduction", description: "We show the child our tools, call them fun names (like the 'teeth tickler'), and let them sit in the chair to feel comfortable." },
      { stepNumber: 2, title: "Comfort Examination", description: "A quick, pain-free review of the teeth, gums, jaw relationship, and oral hygiene habits." },
      { stepNumber: 3, title: "Smooth Cleaning & Fluoride", description: "Gentle polishing followed by a kid-friendly flavored organic varnish to strengthen enamel." },
      { stepNumber: 4, title: "Reward & Celebration", description: "Celebrating a successful appointment with clinical badges, simple rewards, and positive reinforcement." }
    ],
    faq: [
      { question: "At what age should a child have their very first dental visit?", answer: "The American Academy of Pediatric Dentistry recommends scheduling their first dental visit when their first tooth appears, or no later than their first birthday." },
      { question: "What is a dental sealant, and are they safe?", answer: "Yes, they are highly safe and effective. Sealants are ultra-thin protective coatings bonded to the chewing grooves of the back molars. They block plaque and bacteria, reducing cavities in kids by up to 80%." },
      { question: "How can I prepare my child for their first visit at your office?", answer: "Talk about the visit positively. Avoid using scary words like 'needle', 'drill', or 'hurt'. Read a fun book about visiting the dentist, and assure them that Dr. Rostova is very friendly and gentle." }
    ],
    relatedSlugs: ["general", "orthodontics", "cosmetic"]
  }
];

// -------------------------------------------------------------
// TEAM MEMBERS MOCK DATA
// -------------------------------------------------------------
export const teamData: TeamMember[] = [
  {
    id: "t1",
    name: "Dr. Elena Rostova",
    role: "Lead Dentist & Founder",
    type: "doctor",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
    shortBio: "Combining top-tier clinical training with a passionate eye for artistic smile design, Dr. Rostova has spent over 15 years crafting luxury dental transformations.",
    fullBio: [
      "Dr. Elena Rostova is the clinical visionary and lead artisan behind Aventura Dental Arts. Over her distinguished 15-year career, she has earned a international reputation for cosmetic dental transformations and complex restorative dentistry.",
      "Dr. Rostova graduated with highest honors from the prestigious University of Miami and went on to complete her Doctor of Dental Surgery (DDS) degree at Columbia University. Believing that dentistry is the ultimate intersection of biological medicine and visual arts, she completed postgraduate clinical residencies focused exclusively on biomimetic ceramic engineering and facial aesthetic design.",
      "At her boutique Aventura studio, she takes a highly patient-centered, slow-dentistry approach. By reserving generous daily appointments, she is able to focus exclusively on each patient, ensuring a calm experience, detailed diagnostic micro-matching, and clinical excellence."
    ],
    credentials: [
      "Doctor of Dental Surgery (DDS) — Columbia University",
      "Mastership in Biomimetic Dentistry — Alleman-Deliperi Institute",
      "Active Member — American Academy of Cosmetic Dentistry (AACD)",
      "Fellow — International Congress of Oral Implantologists (ICOI)",
      "Clinical Director — South Florida Advanced Study Club"
    ],
    specialties: [
      "Porcelain Veneers & Smile Architecture",
      "Full-Mouth Aesthetic Reconstruction",
      "Biomimetic Ceramic Inlays & Restoration",
      "3D Guided Implant Surgery",
      "Airway-Centered Dental Orthodontics"
    ]
  },
  {
    id: "t2",
    name: "Marcus Thorne, RDH",
    role: "Lead Periodontal Specialist",
    type: "hygienist",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop",
    shortBio: "A passionate educator in systemic oral health, Marcus specializes in comfortable, advanced guided biofilm therapy and gum health.",
    fullBio: [
      "Marcus Thorne is our highly regarded Lead Periodontal Hygienist. With over 8 years of specialized clinical experience, Marcus is a dedicated advocate for guided biofilm therapy and non-invasive periodontal rehabilitation.",
      "He holds a Bachelor of Science in Dental Hygiene from NYU. Marcus looks beyond basic dental cleaning to assess the complex relationships between the oral microbiome, salivary pH, and overall systemic health. His ultra-gentle, air-polishing cleaning techniques have helped thousands of patients overcome severe dental anxiety and maintain perfect periodontal health."
    ],
    credentials: [
      "B.S. in Dental Hygiene — New York University",
      "Certified Guided Biofilm Therapy (GBT) Instructor",
      "Laser Periodontal Therapy Certification",
      "Member — American Dental Hygienists Association"
    ],
    specialties: [
      "Swiss-Engineered Biofilm Therapy",
      "Microscopic Periodontal Triage",
      "Microbiome Rebalancing Therapy",
      "Dental Anxiety Reduction"
    ]
  },
  {
    id: "t3",
    name: "Victoria Sterling",
    role: "Patient Experience Director",
    type: "admin",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    shortBio: "Ensuring your complete physical comfort and administrative ease, Victoria coordinates your visits, billing, and scheduling perfectly.",
    fullBio: [
      "Victoria Sterling is the welcoming heart of Aventura Dental Arts. As our Patient Experience Director, she ensures that every moment of your digital and in-office journey is characterized by complete comfort and administrative ease.",
      "Victoria has managed luxury medical and dental facilities for over a decade. She handles all scheduling coordination, insurance pre-authorizations, premium financing options, and HIPAA administration. Her absolute commitment is to eliminate any administrative friction, allowing you to focus entirely on your health and transformation."
    ],
    credentials: [
      "B.A. in Healthcare Administration — Florida International University",
      "Certified HIPAA Compliance Administrator",
      "Advanced Medical Office Management Certification"
    ],
    specialties: [
      "Luxury Client Relations",
      "HIPAA Data Privacy Management",
      "Insurance Pre-Authorization Navigation",
      "Premium Financing Coordination"
    ]
  }
];

// -------------------------------------------------------------
// BEFORE & AFTER GALLERY DATA
// -------------------------------------------------------------
export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: "Complete Smile Metamorphosis",
    treatmentType: "veneers",
    treatmentLabel: "Porcelain Veneers",
    beforeImage: "https://images.unsplash.com/photo-1516201301034-7d52670e30bb?q=80&w=600&auto=format&fit=crop", // before teeth placeholder / closed mouth smiling
    afterImage: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600&auto=format&fit=crop", // after bright teeth placeholder
    description: "Correction of severe enamel wearing, minor crowding, and dark colorations using 10 custom-crafted ultra-thin porcelain veneers.",
    consentId: "RELEASE-2025-V76A"
  },
  {
    id: "g2",
    title: "Deep Stain Laser Whitening",
    treatmentType: "whitening",
    treatmentLabel: "Laser Whitening",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fea5a18a9926?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop",
    description: "Treatment of severe internal tetracycline staining using a multi-step clinical laser whitening protocol, achieving 8 shades of improvement.",
    consentId: "RELEASE-2026-W34B"
  },
  {
    id: "g3",
    title: "Discreet Clear Aligner Correction",
    treatmentType: "invisalign",
    treatmentLabel: "Invisalign Clear Aligners",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
    description: "Alignment of severe anterior lower crowding and an open bite using custom clear aligners over a comfortable 12-month period.",
    consentId: "RELEASE-2025-I89C"
  },
  {
    id: "g4",
    title: "Single Implant Front Smile Restoration",
    treatmentType: "implants",
    treatmentLabel: "Dental Implants",
    beforeImage: "https://images.unsplash.com/photo-1579684389782-64d84b5e905d?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
    description: "Restoration of a broken front incisor. Placement of a biocompatible titanium implant followed by a hand-glazed monolithic zirconia crown.",
    consentId: "RELEASE-2025-D12E"
  },
  {
    id: "g5",
    title: "Amalgam Replacement & Composite Restoration",
    treatmentType: "restorative",
    treatmentLabel: "Biomimetic Restoration",
    beforeImage: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop",
    description: "Safe removal of toxic dark amalgam fillings, replaced with structurally-fused, biomimetic, metal-free composite restorations.",
    consentId: "RELEASE-2024-R45F"
  },
  {
    id: "g6",
    title: "Enamel Recontouring & Gummy Smile Reduction",
    treatmentType: "cosmetic",
    treatmentLabel: "Gum & Enamel Recontouring",
    beforeImage: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600&auto=format&fit=crop",
    description: "Rebalancing a highly gummy smile using comfortable cosmetic laser contouring combined with ultra-thin porcelain veneers on front teeth.",
    consentId: "RELEASE-2025-C18K"
  }
];

// -------------------------------------------------------------
// JOURNAL/BLOG MOCK DATA
// -------------------------------------------------------------
export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Art of Natural Veneers: Beyond the Artificial 'Chicklet' Smile",
    slug: "natural-veneers-design",
    publishedAt: "May 12, 2026",
    category: "cosmetic",
    categoryLabel: "Cosmetic Dentistry",
    excerpt: "Discover why standard ultra-white porcelain veneers look artificial, and how Dr. Rostova designs bespoke transformations based on natural translucency and facial geometry.",
    readingTimeMinutes: 5,
    mainImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200&auto=format&fit=crop",
    authorId: "t1",
    toc: [
      "The Problem of Artificial 'Mega-White' Teeth",
      "The Core Principles of Smile Architecture",
      "Why Edge Translucency Matters",
      "Maintaining Your Custom Porcelain Transformation"
    ],
    body: [
      "In the search for the perfect smile, many patients fall into the trap of ordering veneers that are excessively white, completely flat, and devoid of details. The result is what dental professionals call a 'refrigerator' or 'chicklet' smile—an artificial, unconvincing row of white blocks that looks completely out of place against natural skin tones.",
      "At Aventura Dental Arts, Dr. Elena Rostova approaches cosmetic transformation through a very different lens: restrained luxury. A premium porcelain veneer should never announce itself aggressively. Instead, it should quietly enhance your appearance by blending with your facial structure and organic dental anatomy.",
      "When we design porcelain veneers, we focus intensely on three key structural qualities: surface micro-texture, gradient shade transitions, and incisal translucency. Natural teeth are not flat white; they have micro-grooves that scatter light, and their edges are translucent where enamel wraps over dentin. By layering different porcelain minerals, we create veneers that interact with light in exactly the same way as natural teeth.",
      "Furthermore, every smile must be customized to your specific facial geometry. We analyze the curve of your lower lip, the angle of your pupils, and the vertical proportions of your face to align the margins of each veneer perfectly. This bespoke process ensures your final transformation looks like you were born with a structurally flawless smile."
    ]
  },
  {
    id: "b2",
    title: "Understanding the Oral-Systemic Link: How Gum Health Protects Your Heart",
    slug: "oral-systemic-heart-health",
    publishedAt: "April 28, 2026",
    category: "oral-health",
    categoryLabel: "Oral Health",
    excerpt: "Scientific research has proven that periodontal disease is directly linked to chronic cardiovascular inflammation. Learn how professional biofilm therapy safeguards your whole body.",
    readingTimeMinutes: 6,
    mainImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    authorId: "t2",
    toc: [
      "The Biological Bridge: Mouth to Bloodstream",
      "Inflammation, Arterial Plaque, and Gum Bacteria",
      "Why Standard Scaling is No Longer Enough",
      "The Systemic Oral Health Protocol"
    ],
    body: [
      "For decades, dentistry was treated as isolated from the rest of medicine. A dentist looked at the teeth and gums, while general physicians managed the rest of the body. Today, advanced clinical science has thoroughly shattered this separation, proving that your oral microbiome is a major gateway to your systemic physical health.",
      "Periodontal (gum) disease is a chronic inflammatory infection. When harmful anaerobic bacteria colonize deep below your gum line, they create sticky colonies called biofilm. Left untreated, these bacteria damage delicate blood vessels, gaining direct access to your bloodstream.",
      "Once in your circulation, periodontal pathogens like *Porphyromonas gingivalis* trigger a systemic immune response. This elevates your body's C-Reactive Protein (CRP), a primary marker for cardiovascular inflammation. Studies have confirmed that patients with untreated gum disease have a significantly higher risk of developing arterial plaque blockage, high blood pressure, and stroke.",
      "At Aventura Dental Arts, our periodontal program led by Marcus Thorne focuses on comprehensive biological rebalancing. We use Swiss-engineered Guided Biofilm Therapy (GBT), which painlessly removes bacterial colonies using a warm, soft spray. By disinfecting these areas without damaging your enamel or root structures, we immediately reduce chronic inflammation, protecting both your smile and your heart."
    ]
  },
  {
    id: "b3",
    title: "What to Do in a Dental Emergency: The Golden Hour of Tooth Rescue",
    slug: "dental-emergency-guide",
    publishedAt: "April 05, 2026",
    category: "oral-health",
    categoryLabel: "Clinical Guides",
    excerpt: "If you break a tooth or have a permanent tooth knocked out, acting within 60 minutes can mean the difference between saving or losing the tooth. Read our clinical action steps.",
    readingTimeMinutes: 4,
    mainImage: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1200&auto=format&fit=crop",
    authorId: "t1",
    toc: [
      "Action Steps for a Knocked-Out Tooth",
      "Handling a Severely Fractured Tooth",
      "Managing Extreme Pain and Gum Swelling",
      "How to Contact Our Aventura Clinic"
    ],
    body: [
      "A sudden dental trauma can be a terrifying and highly painful experience. Whether it's an injury from a weekend sports match, a fractured tooth, or a severe, sudden toothache, knowing exactly what to do in the first 60 minutes can completely alter the clinical outcome.",
      "If a permanent tooth is completely knocked out of its socket, you must protect the delicate cells along the root surface. First, locate the tooth and pick it up by the chewing surface (the crown)—never touch the root. Gently rinse it under cool water if dirty, but do not scrub or use soap. If possible, try to slide the tooth back into its socket. If you can't, submerge the tooth in a cup of fresh milk or keep it inside your mouth next to your cheek. Call us immediately; teeth treated within the 'golden hour' have a high success rate of re-integrating.",
      "For a cracked or severely fractured tooth, rinse your mouth with warm water to cleanse the area, and locate any broken fragments of the tooth. Place the fragments in a clean container with milk. Apply a cold compress to your cheek to reduce swelling and call our emergency line immediately.",
      "If you are experiencing severe, throbbing pain, gums that are swollen or hot, or a fever, do not take aspirin directly on the gums, as this can burn the tissue. Take over-the-counter pain relievers and contact us immediately. We keep dedicated emergency appointment slots open every day to provide instant diagnostic assessment and immediate pain relief."
    ]
  }
];

// -------------------------------------------------------------
// HELPER GETTERS
// -------------------------------------------------------------
export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  return servicesData.find(s => s.slug === slug);
};

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(b => b.slug === slug);
};

export const getAuthorById = (id: string): TeamMember | undefined => {
  return teamData.find(t => t.id === id);
};
