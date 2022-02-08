export const LANG_SELECT = 'LANG_SELECT';

export function langSelect(lang) {
  return {
    type: LANG_SELECT,
    payload: { lang },
  };
}
