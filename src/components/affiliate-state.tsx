import { Badge } from "./ui/badge";

export function AffiliateState({ state }: { state: boolean }) {
  return (
    <>
      {state ? (
        <Badge className="bg-transparent text-black dark:text-white border border-green-400 text-cente">
          Activo
        </Badge>
      ) : (
        <Badge className="bg-transparent text-black dark:text-white border border-red-400 text-center">
          Inactivo
        </Badge>
      )}
    </>
  );
}
