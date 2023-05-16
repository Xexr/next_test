import { getTitle, setTitle } from './actions';

export const runtime = 'edge';

export default async function Home() {
  const title = await getTitle(1);

  console.log(title);

  // TODO: remove this helper when NextJS & Clerk fix
  async function setTitleHelper(data: FormData) {
    'use server';
    return await setTitle(data, 1);
  }

  return (
    <div className="flex w-full max-w-xl flex-col font-mono">
      <h1>Hello world</h1>
      <p>{title}</p>

      <form id="addTaskForm" action={setTitleHelper}>
        <div className="flex w-full p-5">
          <input
            type="text"
            name="title"
            placeholder="Set the title"
            className="w-full rounded-md border border-blue-100 bg-blue-200 px-4 py-1"
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
