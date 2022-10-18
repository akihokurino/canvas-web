import { useRouter } from "next/router";

export type ExtractRouteOptionalParam<
  T extends string,
  U = string | number | boolean
> = T extends `${infer Param}?`
  ? { [k in Param]?: U }
  : T extends `${infer Param}*`
  ? { [k in Param]?: U }
  : T extends `${infer Param}+`
  ? { [k in Param]: U }
  : { [k in T]: U };
export type ExtractRouteParams<T extends string, U = string> = string extends T
  ? { [k in string]?: U }
  : T extends `${infer _Start}:${infer ParamWithOptionalRegExp}/${infer Rest}`
  ? ParamWithOptionalRegExp extends `${infer Param}(${infer _RegExp})`
    ? ExtractRouteOptionalParam<Param, U> & ExtractRouteParams<Rest, U>
    : ExtractRouteOptionalParam<ParamWithOptionalRegExp, U> &
        ExtractRouteParams<Rest, U>
  : T extends `${infer _Start}[${infer ParamWithOptionalRegExp}]`
  ? ParamWithOptionalRegExp extends `${infer Param}(${infer _RegExp})`
    ? ExtractRouteOptionalParam<Param, U>
    : ExtractRouteOptionalParam<ParamWithOptionalRegExp, U>
  : {};

type ValueOf<T extends readonly unknown[]> = T[keyof T];
type Strings<T> = T extends string ? T : never;
type StringValueOf<T extends readonly unknown[]> = Strings<ValueOf<T>>;

export default function useMatch<Path>(_path: Path): ParamsOf<Path> {
  const router = useRouter();
  return router.query as ParamsOf<Path>;
}

export type ParamsOf<Path> = Path extends {
  path: infer P;
  searchParams?: infer S;
}
  ? (P extends string ? ExtractRouteParams<P> : never) &
      (S extends readonly unknown[] ? { [K in StringValueOf<S>]: string } : {})
  : never;
