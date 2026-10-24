import React, { useState } from 'react';
import { CheckCircle2, Video, Building2, MapPin, ArrowRight, X, ZoomIn } from 'lucide-react';

interface TrainingProofSectionProps {
  onOpenAdvisorModal: (type?: string, domain?: string) => void;
}

export const TrainingProofSection: React.FC<TrainingProofSectionProps> = ({ onOpenAdvisorModal }) => {
  const [activeTab, setActiveTab] = useState<'live' | 'onsite'>('live');
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; subtitle: string; description: string; region: string } | null>(null);

  const liveProofs = [
    {
      id: 'live-1',
      title: 'Advanced Cybersecurity Fundamentals Live Session',
      subtitle: 'Live Interactive Virtual Training & Threat Analysis Cohort',
      description: 'Instructor-led live virtual training session focusing on core cybersecurity principles, threat analysis protocols, and secure network defense with international participants via secure video conference and interactive lab pods.',
      image: '/images/DeliveredTraningOnline1.jpeg',
      badge: 'Live Virtual Classroom',
      metrics: 'Interactive Virtual Cohort',
      region: 'GCC & International Virtual Cohort',
    },
    {
      id: 'live-2',
      title: 'Enterprise Cloud & Network Infrastructure Masterclass',
      subtitle: 'Live Remote Technical Workshop & Hands-On Labs',
      description: 'Live interactive screen-sharing and cloud network architecture demonstration conducted by senior technical experts. Participants engaged in real-time virtual lab deployment and infrastructure configuration.',
      image: '/images/delivered_traning_online_2.png',
      badge: 'Remote Training Room',
      metrics: 'Global Virtual Training Room',
      region: 'Global Virtual Training Cohort',
    }
  ];

  const onsiteProofs = [
    {
      id: 'onsite-1',
      title: 'Enterprise Onsite IT Training - Dubai HQ',
      subtitle: 'Dedicated Corporate Training Workshop at Client Facility',
      description: 'Onsite technical upskilling workshop conducted directly at enterprise client facilities in Dubai, UAE. Focused on advanced networking, system administration, and infrastructure resilience.',
      image: '/images/delivered_traning_1.png',
      badge: 'Onsite Delivery UAE',
      metrics: 'Customized Corporate Curriculum',
      region: 'Dubai, United Arab Emirates',
    },
    {
      id: 'onsite-2',
      title: 'Executive Technical Upskilling - Muscat',
      subtitle: 'On-Premise Corporate Tech Training Session',
      description: 'Delivered an intensive on-premise training bootcamp for corporate engineering teams in Muscat, Oman, featuring dedicated physical lab setups and personalized instructor guidance.',
      image: '/images/delivered_traning_2.png',
      badge: 'Onsite Delivery Oman',
      metrics: 'Private Enterprise Batch',
      region: 'Muscat, Sultanate of Oman',
    }
  ];

  const currentItems = activeTab === 'live' ? liveProofs : onsiteProofs;

  return (
    <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#d97706] text-xs font-semibold mb-3 tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706]" />
            VERIFIED TRAINING DELIVERY PROOFS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See Our Live Online & Onsite Training Sessions in Action
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Explore authentic photographic proof of our live interactive virtual training sessions and dedicated onsite corporate bootcamps delivered by our expert instructors.
          </p>

          {/* Interactive Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setActiveTab('live')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'live'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video className="w-4 h-4 text-blue-600" />
              Live Online Training
            </button>
            <button
              onClick={() => setActiveTab('onsite')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'onsite'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-orange-600" />
              Onsite & Corporate Bootcamps
            </button>
          </div>
        </div>

        {/* Proof Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview Container */}
              <div 
                className="relative h-64 sm:h-72 overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setSelectedImage({
                  url: item.image,
                  title: item.title,
                  subtitle: item.subtitle,
                  description: item.description,
                  region: item.region
                })}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-md flex items-center gap-1.5">
                  {activeTab === 'live' ? <Video className="w-3.5 h-3.5 text-blue-600" /> : <Building2 className="w-3.5 h-3.5 text-orange-600" />}
                  {item.badge}
                </div>

                {/* Zoom Indicator */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Click to Expand
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold text-orange-300 tracking-wide uppercase">
                    {item.metrics}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight mt-0.5">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                    {item.subtitle}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{item.region}</span>
                  </div>
                  <button
                    onClick={() => onOpenAdvisorModal('corporate_quote', item.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors group/btn"
                  >
                    <span>Enquire for Batch</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner inside section */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold tracking-tight">Need Custom Corporate Training or Live Batches?</h3>
            <p className="text-slate-300 text-sm mt-1">
              We provide tailored technical training with dedicated lab pods for your engineering teams worldwide.
            </p>
          </div>
          <button
            onClick={() => onOpenAdvisorModal('corporate_quote', 'General Corporate Training')}
            className="px-6 py-3 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-700 transition-colors shadow-lg whitespace-nowrap"
          >
            Request Corporate Proposal
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
              <div>
                <h4 className="text-white font-bold text-base">{selectedImage.title}</h4>
                <p className="text-slate-400 text-xs">{selectedImage.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-black flex items-center justify-center max-h-[70vh]">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[65vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-slate-300 text-sm max-w-2xl">{selectedImage.description}</p>
                <p className="text-orange-400 text-xs font-semibold mt-1">Delivery Location: {selectedImage.region}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedImage(null);
                  onOpenAdvisorModal('corporate_quote', selectedImage.title);
                }}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors whitespace-nowrap"
              >
                Enquire For Similar Training
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
