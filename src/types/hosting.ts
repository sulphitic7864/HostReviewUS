export type HostingType = 'shared' | 'vps' | 'cloud' | 'managed-wordpress' | 'dedicated' | 'enterprise';

export type BestForCategory = 'ecommerce' | 'blog' | 'wordpress' | 'budget' | 'high-traffic' | 'agencies' | 'enterprise';

export interface HostProvider {
  id: string;
  name: string;
  slug: string;
  logoText: string;
  logoBg: string;
  brandColor: string;
  starRating: number; // 1 to 5, e.g. 4.9
  startingPrice: number; // e.g. 2.95
  renewalPrice: number; // e.g. 9.99
  billingCycle: string; // e.g. "Billed 12 mo"
  verdict: string; // 2-3 sentences
  hostingTypes: HostingType[];
  bestFor: BestForCategory;
  affiliateLink: string;
  lastUpdated: string; // e.g. "October 2026"
  pros: string[];
  cons: string[];
  
  // Technical Specifications
  storage: string; // e.g. "10 GB NVMe SSD"
  bandwidth: string; // e.g. "Unmetered"
  supportType: string; // e.g. "24/7 Phone, Chat, Ticket"
  uptimeSla: string; // e.g. "99.98%"
  serverSpeedMs: number; // average TTFB in ms e.g. 280
  moneyBackDays: number; // e.g. 30
  freeDomain: boolean;
  freeSsl: boolean;
  freeEmail: boolean;
  stagingEnvironment: boolean;
  cpanelIncluded: boolean;
  dataCenters: string[]; // e.g. ["US East", "US West", "Europe"]
  
  // Categorical Rating Breakdown (1 - 10)
  scores: {
    performance: number;
    value: number;
    support: number;
    easeOfUse: number;
    features: number;
  };
  
  staffPick?: boolean;
  rank?: number;
}

export interface ComparisonPair {
  id: string;
  title: string;
  hostIds: [string, string];
  description: string;
}
