import { LANG_SELECT } from '../actions/app';
import Language from '../../helpers/storage';

const initialState = {
  lang: Language.getLang(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LANG_SELECT: {
      const { lang } = action.payload;
      Language.setLang(lang);
      return {
        ...state,
        lang,
      };
    }
    default: {
      return state;
    }
  }
}
