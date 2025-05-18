import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import {
  ArrowRight,
  Play,
  Edit3,
  ImageIcon,
  Palette,
  BarChart3,
  Lock,
  CheckCircle2,
  XCircle,
  Menu,
  X,
  Link as LinkIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('minimalist');
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const { user, profile } = useAuth();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Floating shapes animation in hero section
  const shapes = [
    { id: 1, delay: 0 },
    { id: 2, delay: 0.5 },
    { id: 3, delay: 1 },
    { id: 4, delay: 1.5 },
    { id: 5, delay: 2 },
  ];

  // FAQ items
  const faqItems = [
    {
      question: 'Can I use my own domain?',
      answer:
        'Yes! You can connect your custom domain to your ProjectShelf portfolio. We provide easy setup instructions and SSL certificates for all custom domains.',
    },
    {
      question: 'Is there a free plan?',
      answer:
        'Absolutely. Our free plan includes all the essential features to build and share your portfolio. Premium plans offer additional themes, analytics, and custom branding options.',
    },
    {
      question: 'Can I embed videos?',
      answer:
        'Yes, you can embed videos from YouTube, Vimeo, and other platforms directly into your case studies. You can also upload your own video files.',
    },
    {
      question: 'Do I need to code anything?',
      answer:
        'Not at all! ProjectShelf is designed to be completely no-code. Our intuitive editor and theme engine handle all the technical aspects for you.',
    },
  ];

  // Comparison data
  const comparisonData = [
    {
      feature: 'Custom Themes',
      projectShelf: true,
      behance: false,
      notion: false
    },
    {
      feature: 'Analytics',
      projectShelf: true,
      behance: 'Limited',
      notion: false
    },
    {
      feature: 'Custom Domain',
      projectShelf: true,
      behance: false,
      notion: false
    },
    {
      feature: 'Project Organization',
      projectShelf: true,
      behance: 'Limited',
      notion: true
    },
    {
      feature: 'Collaboration',
      projectShelf: true,
      behance: true,
      notion: true
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: 'I landed 3 freelance clients in a week after using ProjectShelf!',
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      avatar: '/placeholder.svg?height=80&width=80',
    },
    {
      quote: 'I finally organized my 10 years of design into something I\'m proud to share.',
      name: 'Michael Chen',
      role: 'Product Designer',
      avatar: '/placeholder.svg?height=80&width=80',
    },
    {
      quote: 'The analytics feature helped me understand which projects attract the most attention.',
      name: 'Priya Sharma',
      role: 'Frontend Developer',
      avatar: '/placeholder.svg?height=80&width=80',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"
            />
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-bold text-xl"
            >
              ProjectShelf
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Always show Create Free Portfolio */}
            <Link to="/signup">
              <Button className="bg-indigo-600 hover:bg-indigo-700">Create Free Portfolio</Button>
            </Link>

            {/* Show View My Portfolio button when logged in with a username */}
            {user && profile?.username && (
              <Link to={`/${profile.username}`}>
                <Button variant="outline">View My Portfolio</Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-200"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg" />
                  <span className="font-bold text-xl">ProjectShelf</span>
                </div>
                <Link
                  to="#themes"
                  className="text-sm font-medium py-2 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Themes
                </Link>
                <Link
                  to="#features"
                  className="text-sm font-medium py-2 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Case Studies
                </Link>
                <Link
                  to="#analytics"
                  className="text-sm font-medium py-2 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Analytics
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-medium py-2 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signg In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium py-2 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Free ggggggPortfolio
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Animated Background Shapes */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {shapes.map((shape) => (
              <motion.div
                key={shape.id}
                className="absolute rounded-full bg-gradient-to-r from-indigo-300/20 to-purple-300/20"
                initial={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                  y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 15 + Math.random() * 10,
                  delay: shape.delay,
                  ease: 'easeInOut',
                }}
                style={{
                  width: `${100 + Math.random() * 200}px`,
                  height: `${100 + Math.random() * 200}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
            </div>

          <div className="container mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-6"
              >
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Transform Your Creative Journey into a Living Portfolio.
                </motion.h1>

                <motion.p
                  className="text-lg text-slate-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  A dynamic case study builder crafted for designers, developers, and writers. Real-time previews,
                  analytics, and custom themes — all under one roof.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link to="/signup">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Start Creating Free <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="group">
                    <Play className="mr-2 h-4 w-4 group-hover:text-indigo-600" /> Watch 60s Demo
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="ProjectShelf Demo"
                    className="w-full h-auto"
                  />

                  {/* Animated overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse' }}
                />
              </div>
              </motion.div>
          </div>
        </div>
      </section>

        {/* Feature Deep Dive */}
        <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Feature Deep Dive</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Powerful tools designed to showcase your work in the best possible light.
              </p>
            </motion.div>

            {/* Feature rows with alternating layout */}
            {[
              {
                title: 'Modular Case Studies',
                description:
                  'Break your work into process-based stories that highlight your thinking and execution. Drag and drop modules to create the perfect narrative flow.',
                icon: <Edit3 className="h-6 w-6" />,
                image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
              },
              {
                title: 'Theme Engine',
                description:
                  'Beautiful templates with live edit mode. Customize colors, typography, and layout to match your personal brand without writing a single line of code.',
                icon: <Palette className="h-6 w-6" />,
                image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
              },
              {
                title: '/username URLs',
                description:
                  'Clean, professional routing with your own personalized URL. Share your portfolio with a simple, memorable link that puts your name front and center.',
                icon: <LinkIcon className="h-6 w-6" />,
                image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
              },
              {
                title: 'Analytics Dashboard',
                description:
                  'Real data on clicks, visitors, and interest per project. Understand which work resonates most with your audience and optimize your portfolio accordingly.',
                icon: <BarChart3 className="h-6 w-6" />,
                image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
              },
              {
                title: 'Public/Private Toggle',
                description:
                  'Share selectively and keep drafts safe. Control exactly who sees what with granular privacy settings for each project in your portfolio.',
                icon: <Lock className="h-6 w-6" />,
                image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className={`grid md:grid-cols-2 gap-8 items-center mb-20 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">{feature.description}</p>
                  <Button variant="outline" className="group">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <motion.div
                  className={`rounded-xl overflow-hidden shadow-lg ${index % 2 === 1 ? 'md:order-1' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Creator Spotlights */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Creator Spotlights</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                See how creative professionals are using ProjectShelf to showcase their work.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-slate-100"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-6 flex-grow">
                      <p className="text-lg italic text-slate-700">"{testimonial.quote}"</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="mt-4 text-indigo-600 hover:text-indigo-800">
                      View Their Portfolio <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
              </div>
        </section>

        {/* Analytics Teaser */}
        <section id="analytics" className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Know what works. Optimize your portfolio like a pro.
                </h2>
                <p className="text-lg text-slate-300 mb-8">
                  Our built-in analytics give you real insights into how people interact with your work. Track views,
                  time spent, and engagement to understand what resonates with your audience.
                </p>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Explore Analytics Features</Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold mb-4">Portfolio Performance</h3>

                  {/* Animated chart bars */}
                  <div className="flex items-end h-64 gap-4 mb-4">
                    {[65, 40, 85, 35, 70, 50, 90].map((height, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-md w-full"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: index * 0.1,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                      <p className="text-sm text-slate-300">Total Views</p>
                      <p className="text-2xl font-bold">1,248</p>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                      <p className="text-sm text-slate-300">Avg. Time</p>
                      <p className="text-2xl font-bold">3:42</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why ProjectShelf?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                See how we compare to other portfolio platforms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-center font-semibold">ProjectShelf</th>
                    <th className="p-4 text-center font-semibold">Behance</th>
                    <th className="p-4 text-center font-semibold">Notion</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4">{item.feature}</td>
                      <td className="py-3 px-4 text-center">
                        {typeof item.projectShelf === 'boolean' ? (
                          item.projectShelf ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />
                        ) : (
                          <span className="text-amber-500">{item.projectShelf}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {typeof item.behance === 'boolean' ? (
                          item.behance ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />
                        ) : (
                          <span className="text-amber-500">{item.behance}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {typeof item.notion === 'boolean' ? (
                          item.notion ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />
                        ) : (
                          <span className="text-amber-500">{item.notion}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
              </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Everything you need to know about ProjectShelf.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="border border-slate-200 rounded-lg mb-4 overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-slate-100/50 transition-colors">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2">
                        <p className="text-slate-600">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
          </div>
        </div>
      </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your work deserves more than a link. Tell the story behind it.
            </h2>
              <p className="text-xl mb-8 text-indigo-100">
                Join thousands of creative professionals who are showcasing their best work with ProjectShelf.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Link to="/signup">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg">
                    Start My Portfolio – It's Free
                  </Button>
                </Link>
              </motion.div>
              <p className="mt-4 text-sm text-indigo-200">No credit card required</p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg" />
                <span className="font-bold text-white text-xl">ProjectShelf</span>
              </div>
              <p className="text-sm text-slate-400">The portfolio platform for creative professionals.</p>
              </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    Themes
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    Examples
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
                </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm hover:text-white transition-colors">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} ProjectShelf. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link to="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link to="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link to="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
