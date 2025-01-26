import React, { useEffect, useState } from 'react';
import { Camera, Calendar, Users, Mail, Instagram, Facebook, Twitter, ChevronDown, Menu, X, Check, CreditCard, Lock, Sun, Moon, Star, MessageCircle, HelpCircle } from 'lucide-react';

// Define types
interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}

// Theme context with proper typing
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

// Payment Modal Component
const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan }) => {
  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
      <div className="bg-[#1C242C] dark:bg-[#1C242C] bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-[#e4ccaa]/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-[#e4ccaa]">Payment Details</h3>
          <button onClick={onClose} className="text-gray-900 dark:text-[#e4ccaa] hover:text-gray-600 dark:hover:text-[#d4b48c]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 dark:bg-[#2a3642] p-4 rounded-lg mb-6">
            <h4 className="text-gray-900 dark:text-[#e4ccaa] font-semibold mb-2">{plan.name}</h4>
            <p className="text-2xl font-bold text-gray-900 dark:text-[#e4ccaa]">${plan.price}</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-[#e4ccaa] mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2a3642] border border-gray-200 dark:border-[#e4ccaa]/20 text-gray-900 dark:text-[#e4ccaa] focus:ring-2 focus:ring-gray-900 dark:focus:ring-[#e4ccaa] focus:border-transparent transition-all duration-300"
                />
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#e4ccaa]/60" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-[#e4ccaa] mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2a3642] border border-gray-200 dark:border-[#e4ccaa]/20 text-gray-900 dark:text-[#e4ccaa] focus:ring-2 focus:ring-gray-900 dark:focus:ring-[#e4ccaa] focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-[#e4ccaa] mb-2">
                  CVC
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2a3642] border border-gray-200 dark:border-[#e4ccaa]/20 text-gray-900 dark:text-[#e4ccaa] focus:ring-2 focus:ring-gray-900 dark:focus:ring-[#e4ccaa] focus:border-transparent transition-all duration-300"
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-[#e4ccaa]/60" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 dark:bg-[#e4ccaa] text-white dark:text-[#1C242C] px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-[#d4b48c] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Pay ${plan.price}</span>
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-[#e4ccaa]/60 mt-6">
            Your payment is secured with SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  const testimonials = [
    {
      name: "Emily & James",
      role: "Wedding Couple",
      image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&q=80",
      quote: "EventLens captured our special day perfectly. Every moment, every emotion was beautifully preserved.",
      event: "Wedding Photography"
    },
    {
      name: "David Chen",
      role: "Corporate Event Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      quote: "Professional, punctual, and produced amazing results for our annual conference.",
      event: "Corporate Event"
    },
    {
      name: "Sarah Williams",
      role: "Birthday Celebrant",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
      quote: "The photos from my 30th birthday party exceeded all expectations. Truly memorable!",
      event: "Birthday Party"
    }
  ];

  const faqs = [
    {
      question: "What is your booking process?",
      answer: "Our booking process is simple: choose your package, fill out our booking form, and secure your date with a deposit. We'll then schedule a consultation to discuss your specific needs."
    },
    {
      question: "How long until we receive our photos?",
      answer: "For most events, you'll receive your fully edited photos within 2-3 weeks. Wedding collections may take 4-6 weeks during peak season."
    },
    {
      question: "Do you provide raw files?",
      answer: "We provide high-resolution edited images. Raw files are not included in our packages as they are part of our professional workflow."
    },
    {
      question: "What happens if it rains?",
      answer: "We're experienced in shooting in various weather conditions and always have backup plans for outdoor shoots. We also bring professional lighting equipment."
    },
    {
      question: "Do you have backup equipment?",
      answer: "Yes, we always bring multiple professional cameras, lenses, and lighting equipment to every event as backup."
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic Event Coverage',
      price: 799,
      description: 'Perfect for small gatherings and intimate events',
      features: [
        '4 Hours of Coverage',
        '200+ Digital Photos',
        'Online Gallery',
        'Basic Photo Editing',
        'Download Rights'
      ],
      popular: false
    },
    {
      name: 'Professional Package',
      price: 1499,
      description: 'Ideal for weddings and corporate events',
      features: [
        '8 Hours of Coverage',
        '500+ Digital Photos',
        'Online Gallery',
        'Advanced Photo Editing',
        'Print Rights',
        'Second Photographer',
        'Same-Day Preview'
      ],
      popular: true
    },
    {
      name: 'Premium Experience',
      price: 2499,
      description: 'Complete coverage for luxury events',
      features: [
        'Full Day Coverage',
        '1000+ Digital Photos',
        'Premium Online Gallery',
        'Professional Editing',
        'Full Print Rights',
        'Two Photographers',
        'Same-Day Preview',
        'Photo Book',
        'Engagement Session'
      ],
      popular: false
    }
  ];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-white dark:bg-[#1C242C] transition-colors duration-300">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-[#1C242C]/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-2">
                <Camera className="w-8 h-8 text-gray-900 dark:text-[#e4ccaa]" />
                <span className="text-xl font-bold text-gray-900 dark:text-[#e4ccaa]">EventLens</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a3642] transition-colors duration-300"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-[#e4ccaa]" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-900" />
                  )}
                </button>
                
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6 text-gray-900 dark:text-[#e4ccaa]" />
                  ) : (
                    <Menu className="w-6 h-6 text-gray-900 dark:text-[#e4ccaa]" />
                  )}
                </button>

                <div className="hidden md:flex space-x-8">
                  {['About', 'Portfolio', 'Services', 'Pricing', 'Contact'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-600 dark:text-[#e4ccaa]/80 hover:text-gray-900 dark:hover:text-[#e4ccaa] transition-colors duration-300"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-white/95 dark:bg-[#1C242C]/95 backdrop-blur-md">
              <div className="px-4 py-2 space-y-1">
                {['About', 'Portfolio', 'Services', 'Pricing', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-3 py-2 text-gray-600 dark:text-[#e4ccaa]/80 hover:text-gray-900 dark:hover:text-[#e4ccaa] hover:bg-gray-100 dark:hover:bg-[#2a3642] rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <header className="relative h-screen">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80"
              alt="Event photography hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 dark:from-[#1C242C]/90 via-gray-900/70 dark:via-[#1C242C]/70 to-gray-900/60 dark:to-[#1C242C]/60" />
          </div>
        
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white dark:text-[#e4ccaa] mb-6 animate-fade-in">
              Capturing Your <span className="text-[#e4ccaa]">Special</span> Moments
            </h1>
            <p className="text-xl text-white/80 dark:text-[#e4ccaa]/80 mb-8 max-w-2xl animate-fade-in">
              Professional event photography that tells your story through stunning visuals
            </p>
            <button className="bg-white dark:bg-[#e4ccaa] text-gray-900 dark:text-[#1C242C] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-[#d4b48c] hover:scale-105 transition-all duration-300 animate-fade-in shadow-lg shadow-white/25 dark:shadow-[#e4ccaa]/25">
              Book Your Event
            </button>
            <a href="#pricing" className="absolute bottom-10 animate-bounce">
              <ChevronDown className="w-8 h-8 text-white dark:text-[#e4ccaa]" />
            </a>
          </div>
        </header>

        {/* About Us Section */}
        <section id="about" className="py-24 px-6 bg-gray-50 dark:bg-[#2a3642] transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-[#e4ccaa]">Our Story</h2>
                <p className="text-gray-600 dark:text-[#e4ccaa]/80 text-lg">
                  Founded in 2015, EventLens has been at the forefront of event photography, 
                  capturing precious moments that tell unique stories. Our journey began with 
                  a simple belief: every event deserves to be remembered in its full glory.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-[#e4ccaa] mb-2">500+</h3>
                    <p className="text-gray-600 dark:text-[#e4ccaa]/80">Events Covered</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-[#e4ccaa] mb-2">50k+</h3>
                    <p className="text-gray-600 dark:text-[#e4ccaa]/80">Photos Delivered</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  {['Professional Equipment', 'Experienced Team', 'Quick Turnaround', 'Customer Satisfaction'].map((feature) => (
                    <span key={feature} className="px-4 py-2 bg-white dark:bg-[#1C242C] rounded-full text-sm text-gray-600 dark:text-[#e4ccaa]/80 border border-gray-200 dark:border-[#e4ccaa]/20">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1516357231954-91487b459602?auto=format&fit=crop&q=80" 
                    alt="Team at work" 
                    className="rounded-lg h-48 w-full object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&q=80" 
                    alt="Event photography" 
                    className="rounded-lg h-64 w-full object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80" 
                    alt="Camera equipment" 
                    className="rounded-lg h-64 w-full object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80" 
                    alt="Event moment" 
                    className="rounded-lg h-48 w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="mt-24">
              <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-[#e4ccaa]">Meet Our Team</h2>
              <p className="text-gray-600 dark:text-[#e4ccaa]/80 text-center mb-16 max-w-2xl mx-auto">
                Our talented photographers bring years of experience and passion to every event
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Lead Photographer",
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
                    bio: "Specializing in wedding photography with over 10 years of experience"
                  },
                  {
                    name: "Michael Chen",
                    role: "Event Specialist",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
                    bio: "Expert in corporate events and product launches"
                  },
                  {
                    name: "Emma Rodriguez",
                    role: "Creative Director",
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
                    bio: "Bringing creative vision to life through unique compositions"
                  }
                ].map((member, index) => (
                  <div key={index} className="bg-white dark:bg-[#1C242C] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-[#e4ccaa] mb-2">{member.name}</h3>
                    <p className="text-gray-600 dark:text-[#e4ccaa]/80 text-center mb-2">{member.role}</p>
                    <p className="text-gray-500 dark:text-[#e4ccaa]/60 text-center text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 bg-white dark:bg-[#2a3642] transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-[#e4ccaa]">Our Services</h2>
            <p className="text-gray-600 dark:text-[#e4ccaa]/80 text-center mb-16 max-w-2xl mx-auto">
              We offer a comprehensive range of photography services to capture your special moments
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Calendar,
                  title: 'Corporate Events',
                  description: 'Professional coverage for your business events and conferences',
                },
                {
                  icon: Users,
                  title: 'Social Gatherings',
                  description: 'Capture the joy of weddings, parties, and celebrations',
                },
                {
                  icon: Camera,
                  title: 'Portrait Sessions',
                  description: 'Professional headshots and portrait photography',
                }
              ].map((service, index) => (
                <div key={index} className="service-card bg-gray-50 dark:bg-[#1C242C] backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-[#e4ccaa]/20">
                  <service.icon className="w-12 h-12 text-gray-900 dark:text-[#e4ccaa] mb-6" />
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-[#e4ccaa]">{service.title}</h3>
                  <p className="text-gray-600 dark:text-[#e4ccaa]/80 mb-4">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section id="portfolio" className="py-24 px-6 bg-gray-50 dark:bg-[#1C242C] transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-[#e4ccaa]">Recent Events</h2>
            <p className="text-gray-600 dark:text-[#e4ccaa]/80 text-center mb-16 max-w-2xl mx-auto">
              Browse through our collection of memorable moments we've captured
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80",
                  title: "Corporate Conference",
                  location: "San Francisco, CA"
                },
                {
                  url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80",
                  title: "Wedding Ceremony",
                  location: "Napa Valley, CA"
                },
                {
                  url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80",
                  title: "Fashion Show",
                  location: "New York, NY"
                },
                {
                  url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80",
                  title: "Birthday Party",
                  location: "Los Angeles, CA"
                },
                {
                  url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80",
                  title: "Music Festival",
                  location: "Austin, TX"
                },
                {
                  url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
                  title: "Engagement Session",
                  location: "Chicago, IL"
                }
              ].map((item, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl aspect-square">
                  <img 
                    src={item.url} 
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-white font-semibold text-xl mb-2">{item.title}</h3>
                      <p className="text-white/80">{item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-6 bg-white dark:bg-[#1C242C] transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-[#e4ccaa]">Client Testimonials</h2>
            <p className="text-gray-600 dark:text-[#e4ccaa]/80 text-center mb-16 max-w-2xl mx-auto">
              Don't just take our word for it - hear what our clients have to say
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 dark:bg-[#2a3642] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-[#e4ccaa]">{testimonial.name}</h3>
                      <p className="text-gray-600 dark:text-[#e4ccaa]/80 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Star className="w-5 h-5 text-yellow-400 inline-block" />
                    <Star className="w-5 h-5 text-yellow-400 inline-block" />
                    <Star className="w-5 h-5 text-yellow-400 inline-block" />
                    <Star className="w-5 h-5 text-yellow-400 inline-block" />
                    <Star className="w-5 h-5 text-yellow-400 inline-block" />
                  </div>
                  <p className="text-gray-600 dark:text-[#e4ccaa]/80 mb-4">"{testimonial.quote}"</p>
                  <p className="text-sm text-gray-500 dark:text-[#e4ccaa]/60">{testimonial.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */} {/* FAQ Section */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-[#2a3642] transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-[#e4ccaa]">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-[#e4ccaa]/80 text-center mb-16 max-w-2xl mx-auto">
              Find answers to common questions about our photography services
            </p>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-[#1C242C] rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <HelpCircle className="w-6 h-6 text-gray-900 dark:text-[#e4ccaa] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-[#e4ccaa] mb-2">{faq.question}</h3>
                      <p className="text-gray-600 dark:text-[#e4ccaa]/80">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 bg-white dark:bg-[#1C242C] transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-[#e4ccaa]">Pricing Plans</h2>
            <p className="text-gray-600 dark:text-[#e4ccaa]/80 text-center mb-16 max-w-2xl mx-auto">
              Choose the perfect package for your event. All plans include high-resolution digital photos and professional editing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative bg-gray-50 dark:bg-[#2a3642] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    plan.popular ? 'border-2 border-[#e4ccaa]' : ''
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#e4ccaa] text-[#1C242C] px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-[#e4ccaa] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-[#e4ccaa]">${plan.price}</span>
                    <span className="text-gray-500 dark:text-[#e4ccaa]/60 ml-2">/event</span>
                  </div>
                  <p className="text-gray-600 dark:text-[#e4ccaa]/80 mb-6">{plan.description}</p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600 dark:text-[#e4ccaa]/80">
                        <Check className="w-5 h-5 text-gray-900 dark:text-[#e4ccaa] mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => handleBookNow(plan)}
                    className="w-full bg-gray-900 dark:bg-[#e4ccaa] text-white dark:text-[#1C242C] px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-[#d4b48c] transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Book Now</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-gray-50 dark:bg-[#2a3642] transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-[#e4ccaa]">Get in Touch</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-[#e4ccaa]">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Mail className="w-6 h-6 text-gray-900 dark:text-[#e4ccaa]" />
                        <span className="text-gray-600 dark:text-[#e4ccaa]/80">info@eventlens.com</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <MessageCircle className="w-6 h-6 text-gray-900 dark:text-[#e4ccaa]" />
                        <span className="text-gray-600 dark:text-[#e4ccaa]/80">+1 (555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-[#e4ccaa]">Follow Us</h3>
                    <div className="flex space-x-4">
                      {[
                        { icon: Instagram, label: "Instagram" },
                        { icon: Facebook, label: "Facebook" },
                        { icon: Twitter, label: "Twitter" }
                      ].map((social, index) => (
                        <a
                          key={index}
                          href="#"
                          className="text-gray-900 dark:text-[#e4ccaa] hover:text-gray-700 dark:hover:text-[#d4b48c] transition-colors duration-300"
                          aria-label={social.label}
                        >
                          <social.icon className="w-6 h-6" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-[#e4ccaa] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1C242C] border border-gray-200 dark:border-[#e4ccaa]/20 text-gray-900 dark:text-[#e4ccaa] focus:ring-2 focus:ring-gray-900 dark:focus:ring-[#e4ccaa] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-[#e4ccaa] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1C242C] border border-gray-200 dark:border-[#e4ccaa]/20 text-gray-900 dark:text-[#e4ccaa] focus:ring-2 focus:ring-gray-900 dark:focus:ring-[#e4ccaa] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-[#e4ccaa] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1C242C] border border-gray-200 dark:border-[#e4ccaa]/20 text-gray-900 dark:text-[#e4ccaa] focus:ring-2 focus:ring-gray-900 dark:focus:ring-[#e4ccaa] focus:border-transparent transition-all duration-300"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-900 dark:bg-[#e4ccaa] text-white dark:text-[#1C242C] px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-[#d4b48c] transition-all duration-300 shadow-lg shadow-gray-900/25 dark:shadow-[#e4ccaa]/25"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          plan={selectedPlan}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;