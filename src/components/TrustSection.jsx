import React from 'react';
import { ShieldCheck, Users, MessageCircle, Heart, Star, Lock } from 'lucide-react';

export const TrustSection = () => {
  const testimonials = [
    {
      name: 'Aditya K.',
      university: 'RTU (Computer Science)',
      quote: 'When I arrived in Riga, I had no clue how to open Revolut or Bolt Food. I used RigaStudentPerks referral links, completed 3 purchases, and received €20 directly on Revolut within 24 hours!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Maria S.',
      university: 'RSU (Medicine)',
      quote: 'I signed up as a Wolt Courier through this platform. Completed 80 deliveries around Purvciems and claimed €85 cash bonus. Super transparent and legit!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Daniel B.',
      university: 'LU (Business)',
      quote: 'Shared this link with 5 of my dormitory flatmates at RTU Student Hotel. Everyone got their Revolut & Wise bonuses without any issues.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            100% Trust Guarantee
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Riga International Students Trust Us
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Created by international students in Riga, for international students in Riga.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="glass-card rounded-2xl p-6 border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Transparent Cashback Split</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We state exactly how much Revolut or Bolt pays per referral and share up to 50% directly with you. Zero hidden fees.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Instant Revolut Revtag Payouts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No long bank waiting times. As soon as your step screenshot is verified, funds arrive in your Revolut @tag within 24 hours.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Riga Student Community Group</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have questions? Connect directly with us on WhatsApp & Telegram. We assist with dorms, SIM cards, and courier registration.
            </p>
          </div>

        </div>

        {/* Student Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-950/70 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic mb-4 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <p className="text-[10px] text-emerald-400">{t.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
