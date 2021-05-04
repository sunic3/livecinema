export enum AuthFormTypes {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  ADD_RESOLVER = 'ADD_RESOLVER',
  RESET = 'RESET',
}

export type AuthFormActionType =
  | OpenAuthFormActionType
  | CloseAuthFormActionType
  | AddResolverAuthFormActionType
  | ResetAuthFormActionType;

type OpenAuthFormActionType = {
  type: typeof AuthFormTypes.OPEN;
};

type CloseAuthFormActionType = {
  type: typeof AuthFormTypes.CLOSE;
};

type AddResolverAuthFormActionType = {
  type: typeof AuthFormTypes.ADD_RESOLVER;
  payload: (value: unknown) => void;
};

type ResetAuthFormActionType = {
  type: typeof AuthFormTypes.RESET;
};

const OpenAuthFormAction: OpenAuthFormActionType = {
  type: AuthFormTypes.OPEN,
};

const closeAuthFormAction: CloseAuthFormActionType = {
  type: AuthFormTypes.CLOSE,
};

const AddResolverAuthFormAction: (
  payload: (value: unknown) => void
) => AddResolverAuthFormActionType = (payload) => ({
  type: AuthFormTypes.ADD_RESOLVER,
  payload,
});

const ResetAuthFormAction: ResetAuthFormActionType = {
  type: AuthFormTypes.RESET,
};

export const openAuthForm = (resolver?: (value: unknown) => void) => (
  dispatch: (arg0: {
    type: AuthFormTypes.OPEN | AuthFormTypes.ADD_RESOLVER;
    payload?: (value: unknown) => void;
  }) => void
) => {
  dispatch(OpenAuthFormAction);
  resolver && dispatch(AddResolverAuthFormAction(resolver));
};

export const closeAuthForm = () => (
  dispatch: (arg0: { type: AuthFormTypes.CLOSE | AuthFormTypes.RESET }) => void
) => {
  dispatch(closeAuthFormAction);
  dispatch(ResetAuthFormAction);
};
