import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { blogPosts, getAuthorById, clinicSettings } from '../lib/mockData';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Clock, Calendar, ArrowRight, User, X, FileText, ArrowUpRight, Phone, ArrowLeft } from 'lucide-react';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [activePostSlug, setActivePostSlug] = React.useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = React.useState<number>(0);
  
  const articleContainerRef = React.useRef<HTMLDivElement>(null);

  const categories = [
    { label: 'All Journal', value: 'all' },
    { label: 'Oral Health', value: 'oral-health' },
    { label: 'Cosmetic Dentistry', value: 'cosmetic' },
  ];

  // Reset active post scroll progress
  React.useEffect(() => {
    setScrollProgress(0);
  }, [activePostSlug]);

  // Handle scroll progress within the article reading modal
  const handleArticleScroll = () => {
    const el = articleContainerRef.current;
    if (!el) return;
    const totalHeight = el.scrollHeight - el.clientHeight;
    if (totalHeight > 0) {
      setScrollProgress((el.scrollTop / totalHeight) * 100);
    }
  };

  // Resolve featured post (first item) and regular posts
  const featuredPost = blogPosts[0];
  
  const filteredPosts = React.useMemo(() => {
    // Filter posts for the grid
    let posts = blogPosts;
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    return posts;
  }, [selectedCategory]);

  const activePost = React.useMemo(() => {
    if (!activePostSlug) return null;
    return blogPosts.find(p => p.slug === activePostSlug) || null;
  }, [activePostSlug]);

  const activeAuthor = React.useMemo(() => {
    if (!activePost) return null;
    return getAuthorById(activePost.authorId) || null;
  }, [activePost]);

  // Keyboard accessibility
  React.useEffect(() => {
    if (!activePostSlug) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePostSlug(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePostSlug]);

  return (
    <div className="bg-charcoal text-light-beige min-h-[90vh]">
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-44 pb-16 px-6 md:px-12 text-center border-b border-dark-gray/25">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_-15%,rgba(179,140,97,0.12),transparent)] z-0" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-sm font-sans tracking-[0.2em] text-bronze uppercase block mb-6">The Journal</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[83px] leading-tight mb-6">Oral Health & Aesthetics</h1>
          <div className="w-16 h-px bg-bronze mx-auto mb-8" />
          <p className="font-sans text-light-beige/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Clinical education, oral hygiene guidelines, and aesthetic architectural breakdowns written by our local practitioners.
          </p>
        </div>
      </section>

      {/* 2. FEATURED ARTICLE SECTION */}
      {selectedCategory === 'all' && featuredPost && (
        <section className="py-16 px-6 md:px-12 max-w-site mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#20232B] border border-dark-gray/30 p-8 md:p-12 hover:border-bronze transition-colors">
            
            {/* Image Col (lg:col-span-6) */}
            <div className="lg:col-span-6 aspect-video lg:aspect-[4/3] overflow-hidden bg-charcoal">
              <img 
                src={featuredPost.mainImage} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Content Col (lg:col-span-6) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4 text-xs font-sans text-bronze">
                <span className="uppercase tracking-widest font-semibold border border-bronze/30 px-2.5 py-0.5 rounded-full">
                  {featuredPost.categoryLabel}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredPost.readingTimeMinutes} min read
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-light-beige leading-tight">
                {featuredPost.title}
              </h2>
              
              <p className="font-sans text-sm text-[#DAD5D3]/75 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setActivePostSlug(featuredPost.slug)}
                  className="font-serif text-base text-bronze hover:text-light-beige transition-colors flex items-center gap-2 group"
                >
                  Read Featured Article
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="font-sans text-xs text-light-beige/40">
                  {featuredPost.publishedAt}
                </span>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 3. CATEGORY FILTERS */}
      <section className="py-6 px-6 max-w-site mx-auto flex justify-center border-t border-dark-gray/10">
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2 font-serif text-sm border transition-all rounded-full hover:border-bronze ${
                selectedCategory === cat.value 
                  ? 'bg-light-beige text-charcoal border-light-beige' 
                  : 'bg-transparent text-light-beige border-dark-gray/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4. POSTS GRID */}
      <section className="pb-24 px-6 md:px-12 max-w-site mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const author = getAuthorById(post.authorId);
            return (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group bg-near-black border border-dark-gray/30 p-6 flex flex-col justify-between hover:border-bronze transition-colors cursor-pointer"
                onClick={() => setActivePostSlug(post.slug)}
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-charcoal mb-6">
                    <img 
                      src={post.mainImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 text-[10px] font-sans text-bronze uppercase tracking-widest mb-4">
                    <span>{post.categoryLabel}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readingTimeMinutes} min
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-light-beige group-hover:text-bronze transition-colors mb-4 line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-[#DAD5D3]/70 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-dark-gray/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full overflow-hidden bg-charcoal border border-dark-gray/40">
                      <img src={author?.photo} alt={author?.name} className="w-full h-full object-cover grayscale" />
                    </div>
                    <span className="font-sans text-[10px] text-[#DAD5D3]/60">{author?.name}</span>
                  </div>
                  <span className="font-sans text-[10px] text-[#DAD5D3]/50">{post.publishedAt}</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* 5. IMMERSIVE READING MODAL OVERLAY */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/95 backdrop-blur-md">
            
            {/* Scroll Progress Bar at the top of the sidebar sheet */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-charcoal border-b border-dark-gray/20 z-50">
              <div 
                className="h-full bg-bronze transition-all duration-100 ease-out" 
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="w-full lg:max-w-4xl bg-near-black border-l border-dark-gray/40 h-full overflow-y-auto flex flex-col pt-6"
              ref={articleContainerRef}
              onScroll={handleArticleScroll}
            >
              
              {/* Sticky Top Header bar */}
              <div className="sticky top-0 bg-near-black/90 backdrop-blur-md border-b border-dark-gray/10 px-6 md:px-12 py-4 flex items-center justify-between z-40">
                <button 
                  onClick={() => setActivePostSlug(null)}
                  className="inline-flex items-center gap-2 font-sans text-xs text-bronze hover:text-light-beige transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Close Journal
                </button>
                <button 
                  onClick={() => setActivePostSlug(null)}
                  className="text-light-beige hover:text-bronze p-2"
                  aria-label="Close article"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Scrollable Article Content */}
              <article className="flex-1 px-6 md:px-16 py-12 space-y-12">
                
                {/* Hero Header */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-xs font-sans text-bronze uppercase tracking-widest">
                    <span>{activePost.categoryLabel}</span>
                    <span>•</span>
                    <span>{activePost.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold normal-case tracking-normal text-light-beige/50">
                      <Clock className="h-3.5 w-3.5 text-bronze" /> {activePost.readingTimeMinutes} min read
                    </span>
                  </div>

                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-light-beige leading-tight">
                    {activePost.title}
                  </h1>
                  
                  <div className="w-16 h-px bg-bronze" />
                </div>

                {/* Cover Image */}
                <div className="aspect-video w-full overflow-hidden border border-dark-gray/30 bg-charcoal">
                  <img src={activePost.mainImage} alt={activePost.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>

                {/* Grid layout for Article Body & Sidebar Table of Contents */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Table of Contents sidebar (lg:col-span-4) */}
                  <div className="lg:col-span-4 bg-charcoal/40 border border-dark-gray/20 p-6 space-y-4 lg:sticky lg:top-24">
                    <div className="flex items-center gap-2 font-sans font-bold text-xs text-light-beige uppercase tracking-widest border-b border-dark-gray/20 pb-2">
                      <FileText className="h-4 w-4 text-bronze" />
                      <span>Table of Contents</span>
                    </div>
                    <ul className="space-y-2">
                      {activePost.toc.map((heading, idx) => (
                        <li key={idx} className="font-serif text-sm text-[#DAD5D3]/75 hover:text-bronze transition-colors flex items-start gap-2">
                          <span className="text-bronze font-sans text-xs mt-0.5">{idx + 1}.</span>
                          <span>{heading}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Clinical Paragraphs (lg:col-span-8) */}
                  <div className="lg:col-span-8 font-sans text-base text-[#DAD5D3]/85 space-y-6 leading-relaxed">
                    {activePost.body.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}

                    {/* Inline booking callout card */}
                    <div className="bg-[#20232B] border border-bronze/20 p-6 md:p-8 space-y-4 mt-12 hover:border-bronze transition-colors">
                      <span className="text-xs font-sans text-bronze uppercase tracking-widest font-semibold">Diagnostic Consultation</span>
                      <h4 className="font-serif text-2xl text-light-beige leading-tight">Interested in custom cosmetic veneers or clinical wellness?</h4>
                      <p className="font-sans text-xs text-[#DAD5D3]/75 leading-relaxed">
                        Book a detailed visual smile diagnostic with Dr. Vigneshwar today. Complete mapping, 3D intraoral diagnostics, and individual treatment planning.
                      </p>
                      <Button as={Link} to="/contact" onClick={() => setActivePostSlug(null)} className="mt-2 text-xs">
                        Book Smile Consultation
                      </Button>
                    </div>
                  </div>

                </div>

                {/* Author profile card */}
                {activeAuthor && (
                  <div className="border-t border-dark-gray/20 pt-8 mt-12 flex flex-col md:flex-row gap-6 items-center bg-[#20232B]/30 p-6 border border-dark-gray/20">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-charcoal border border-dark-gray/30 shrink-0">
                      <img src={activeAuthor.photo} alt={activeAuthor.name} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-sans text-bronze uppercase tracking-widest block">Written By</span>
                      <h4 className="font-serif text-lg text-light-beige">{activeAuthor.name}</h4>
                      <p className="font-sans text-xs text-[#DAD5D3]/65 leading-relaxed max-w-xl">
                        {activeAuthor.shortBio}
                      </p>
                      <Link to="/about" onClick={() => setActivePostSlug(null)} className="font-serif text-xs text-bronze hover:underline inline-flex items-center gap-1 mt-2">
                        View Complete Bio <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                )}

              </article>

              {/* Bottom bar */}
              <div className="bg-charcoal px-6 md:px-16 py-6 border-t border-dark-gray/10 text-center">
                <p className="font-sans text-xs text-[#DAD5D3]/50">
                  © {new Date().getFullYear()} Aventura Dental Arts. All clinical publications are reviewed by Dr. Vigneshwar.
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. CTA */}
      <section className="bg-bronze/10 border-t border-bronze/25 py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-[64px] text-light-beige mb-6">Stay Clinically Informed</h2>
          <p className="font-sans text-light-beige/70 mb-10">
            We write regular updates mapping cosmetic developments, structural biology, and patient histories. Contact us to learn more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button as={Link} to="/contact" variant="primary">
              Book Appointment
            </Button>
            <span className="text-light-beige/50 font-sans mx-2">or</span>
            <a href={`tel:${clinicSettings.phoneRaw}`} className="font-serif text-xl tracking-wider text-light-beige hover:text-bronze transition-colors flex items-center gap-2">
              <Phone className="h-5 w-5 text-bronze" /> {clinicSettings.phone}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
