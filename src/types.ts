export interface ChecklistItem {
  id: string;
  text: string;
  required: boolean;
}

export type RsvpOption = 'dino' | 'hundred' | 'boring';

export interface RsvpResponse {
  submitted: boolean;
  choice: RsvpOption;
  name: string;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  type: 'bubble' | 'dino' | 'star';
}
