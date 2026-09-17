import { MouseEvent } from 'react';

/**
 * Moves the `.liquid-glass` specular highlight to the pointer, which is what
 * sells the effect. Attach as `onMouseMove` on any element carrying the class.
 */
export function trackSheen(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--glass-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
  el.style.setProperty('--glass-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
}
