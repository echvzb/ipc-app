import { type NextPage } from "next";
import { api } from "~/utils/api";
import SpinnerOverlay from "../components/SpinnerOverlay";
import Title from "../components/Title";
import { useProtectedPage } from "../hooks/useProtectedPage";

const ConfigPage: NextPage = () => {
  const { mutate, isLoading: isMutationLoading } =
    api.users.patchUserCanSeeGraph.useMutation();
  const {
    data,
    refetch,
    isLoading: isUsersLoading,
  } = api.users.getUsers.useQuery(undefined, {
    initialData: [],
  });

  useProtectedPage();
  return (
    <>
      {isUsersLoading || isMutationLoading ? <SpinnerOverlay /> : null}
      <Title>Configuración de usuarios</Title>
      <div className="flex flex-col pt-8">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-1.5 align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    {["nombre", "email", "puede ver gráfica"].map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="py-3 text-left text-xs font-medium uppercase text-gray-500"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-800">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-800">
                        {user.email}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id={`can-see-graph-${user.id}`}
                          checked={user.canSeeGraph} // eslint-disable-line
                          onChange={() => {
                            mutate(
                              {
                                userId: user.id,
                                canSeeGraph: !user.canSeeGraph,
                              },
                              { onSuccess: () => void refetch() }
                            );
                          }}
                          className="relative h-7 w-[3.25rem] cursor-pointer appearance-none rounded-full border border-2 border-transparent border-transparent bg-slate-300 ring-1 ring-transparent ring-offset-white transition-colors duration-200 ease-in-out before:inline-block before:h-6 before:w-6 before:translate-x-0 before:transform

                          before:rounded-full before:bg-slate-600 before:shadow before:ring-0 before:transition before:duration-200 before:ease-in-out checked:bg-slate-600 checked:bg-none checked:before:translate-x-full checked:before:bg-slate-300 focus:border-slate-600 focus:outline-none focus:ring-slate-600"
                        />
                        <label htmlFor="hs-basic-usage" className="sr-only">
                          {user.canSeeGraph ? "Si" : "No"}
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfigPage;
