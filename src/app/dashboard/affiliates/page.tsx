import { AffiliatesTable } from "@/components/affiliates-table";

export default function Affiliates() {
  return (
    <div>
      <h2 className="text-3xl font-bold w-full flex justify-center items-center mt-7">
        Afiliados
      </h2>
      <div className="m-10 border border-gray-300 dark:border-gray-100/20 rounded-2xl p-5">
        <AffiliatesTable />
      </div>
    </div>
  );
}
