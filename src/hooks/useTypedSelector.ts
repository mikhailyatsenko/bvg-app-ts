import { TypedUseSelectorHook } from "react-redux";
import { RootStateType } from "../store/reducers";
import { useSelector } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector;
