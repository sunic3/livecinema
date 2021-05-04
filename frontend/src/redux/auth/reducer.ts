import { AuthFormType } from '../../interfaces';
import { AuthFormActionType, AuthFormTypes } from './actions';

export default function authFormReducer(
  state: AuthFormType = {
    show: false,
    resolvers: [],
  },
  action: AuthFormActionType
) {
  switch (action.type) {
    case AuthFormTypes.OPEN: {
      return { show: true, resolvers: state.resolvers };
    }
    case AuthFormTypes.CLOSE: {
      return { show: false, resolvers: state.resolvers };
    }
    case AuthFormTypes.ADD_RESOLVER: {
      return {
        show: state.show,
        resolvers: [...state.resolvers, action.payload],
      };
    }
    case AuthFormTypes.RESET: {
      state.resolvers.forEach((resolver) => resolver());
      return { show: state.show, resolvers: [] };
    }
    default:
      return state;
  }
}
