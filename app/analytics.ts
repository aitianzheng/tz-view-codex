type SiteEvent = 'service_click' | 'contact_click' | 'contact_copy' | 'wechat_qr_download' | 'content_click';
type Destination = 'tz_mall' | 'tz_shop' | 'wechat' | 'email' | 'telegram' | 'x' | 'contact' | 'us_stocks' | 'hk_banking';
type Placement = 'hero' | 'nav' | 'projects' | 'guide' | 'writing' | 'community' | 'contact' | 'footer';

declare global {
  interface Window {
    zaraz?: { track: (name: string, properties: Record<string, string>) => Promise<unknown> | void };
  }
}

// Zaraz must be configured in Cloudflare first. Never fake delivery or block a link.
// Only categorical labels are passed: no emails, account details, URLs or query strings.
export async function trackEvent(event: SiteEvent, destination: Destination, placement: Placement): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const privacy = window.navigator as Navigator & { globalPrivacyControl?: boolean };
  if (privacy.doNotTrack === '1' || privacy.globalPrivacyControl) return false;
  if (typeof window.zaraz?.track !== 'function') return false;
  try {
    await window.zaraz.track(event, { destination, placement });
    return true;
  } catch {
    return false;
  }
}
