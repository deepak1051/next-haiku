'use client';

import { createHaiku, editHaiku } from '../actions/haikuController';
import { useFormState } from 'react-dom';

export default function HaikuForm({ action, haiku }) {
  let actualAction;
  if (action === 'create') actualAction = createHaiku;
  if (action === 'edit') actualAction = editHaiku;

  const [formState, formAction] = useFormState(actualAction, {});

  return (
    <form action={formAction} className="max-w-sm mx-auto">
      <div className="mb-3">
        <input
          defaultValue={haiku?.line1}
          name="line1"
          autoComplete="false"
          type="text"
          placeholder="line #1"
          className="input input-bordered w-full max-w-xs"
        />

        {formState?.errors?.line1 && (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Warning: {formState?.errors?.line1}</span>
          </div>
        )}
      </div>

      <div className="mb-3">
        <input
          defaultValue={haiku?.line2}
          name="line2"
          autoComplete="false"
          type="text"
          placeholder="line #1"
          className="input input-bordered w-full max-w-xs"
        />

        {formState?.errors?.line2 && (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Warning: {formState?.errors?.line2}</span>
          </div>
        )}
      </div>

      <div className="mb-3">
        <input
          defaultValue={haiku?.line3}
          name="line3"
          autoComplete="false"
          type="text"
          placeholder="line #3"
          className="input input-bordered w-full max-w-xs"
        />

        {formState?.errors?.line3 && (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Warning: {formState?.errors?.line3}</span>
          </div>
        )}
      </div>

      <input
        type="hidden"
        name="haikuId"
        defaultValue={haiku?._id.toString()}
      />

      <button className="btn btn-primary">Login</button>
    </form>
  );
}
