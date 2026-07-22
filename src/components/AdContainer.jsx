import React from 'react';
import { Sparkles, ExternalLink, X } from 'lucide-react';

export function TopAdBanner({ isPro, onTogglePro }) {
  if (isPro) return null;

  return (
    <div className="ad-banner-top">
      <div className="ad-content">
        <span className="ad-badge">AdSense</span>
        <Sparkles size={18} style={{ color: '#f59e0b' }} />
        <div>
          <strong>Organic Pantry Delivery 20% OFF!</strong> Get farm-fresh vegetables delivered to your door today.
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button className="ad-cta" onClick={() => window.open('https://google.com', '_blank')}>
          Claim Offer <ExternalLink size={12} style={{ display: 'inline', marginLeft: '2px' }} />
        </button>
        <button 
          onClick={onTogglePro}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-dim)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            textDecoration: 'underline'
          }}
        >
          Remove Ads (Go Pro)
        </button>
      </div>
    </div>
  );
}

export function SponsoredCardAd({ isPro, brand, text, link }) {
  if (isPro || !brand) return null;

  return (
    <div className="ad-card-sponsored">
      <div>
        <span className="ad-badge" style={{ marginRight: '0.4rem' }}>Sponsored</span>
        <strong style={{ color: '#f59e0b' }}>{brand}</strong>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>{text}</p>
      </div>
      <a 
        href={link || '#'} 
        target="_blank" 
        rel="noreferrer"
        style={{
          color: '#f59e0b',
          fontWeight: '700',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          fontSize: '0.75rem'
        }}
      >
        Shop Now →
      </a>
    </div>
  );
}
