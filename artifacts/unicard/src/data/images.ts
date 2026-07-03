import type { SyntheticEvent } from 'react';

export type ImageTopic =
  | 'fintech'
  | 'card'
  | 'nfc'
  | 'travel'
  | 'gaming'
  | 'shopping'
  | 'security'
  | 'mobile';

export const stockImages: Record<ImageTopic, string[]> = {
  fintech: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
  ],
  card: [
    'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1200&q=80',
  ],
  nfc: [
    'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&q=80',
  ],
  travel: [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
  ],
  gaming: [
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?auto=format&fit=crop&w=1200&q=80',
  ],
  shopping: [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
  ],
  security: [
    'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  ],
  mobile: [
    'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=1200&q=80',
  ],
};

export function getImage(topic: ImageTopic, index = 0): string {
  const list = stockImages[topic];
  return list[index % list.length];
}

export function getFallbackImage(seed: string, width = 1200, height = 600): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

export function handleImageError(
  e: SyntheticEvent<HTMLImageElement, Event>,
  seed: string,
  width = 1200,
  height = 600,
) {
  const target = e.currentTarget;
  if (target.dataset.fallbackApplied === 'true') return;
  target.dataset.fallbackApplied = 'true';
  target.src = getFallbackImage(seed, width, height);
}
