import { loadFont as loadCinzel } from '@remotion/google-fonts/Cinzel';
import { loadFont as loadJetBrainsMono } from '@remotion/google-fonts/JetBrainsMono';

const cinzel = loadCinzel('normal', {
  ignoreTooManyRequestsWarning: true,
});

const jetBrainsMono = loadJetBrainsMono('normal', {
  ignoreTooManyRequestsWarning: true,
});

export const serifFont = cinzel.fontFamily;
export const monoFont = jetBrainsMono.fontFamily;
