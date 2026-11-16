import React from 'react';
export const SimpleTrustBadge = () => <section className="py-10 max-w-4xl mx-auto px-4">
  <h3 className="text-xl font-bold text-center mb-5">Clear Terms, Practical Support</h3>
  <div className="grid md:grid-cols-3 gap-4">
    {[
      ['Check the offer', 'Sample cards demonstrate the interface. Published offers should be checked against the provider’s current eligibility and expiry rules before signing up.'],
      ['Understand the reward', 'Bonus amounts and timing depend on the provider’s terms and completed requirements. This independent student project does not guarantee payouts or represent the listed companies.'],
      ['Ask for assistance', 'Free guidance is provided when available. Save a request through the secure form; do not share bank credentials, passport copies or sensitive documents.']
    ].map(([title, text]) => <article key={title} className="apple-card p-5"><h4 className="text-sm font-bold mb-2">{title}</h4><p className="text-xs text-neutral-600 leading-relaxed">{text}</p></article>)}
  </div>
</section>;
