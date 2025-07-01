'use client';

import { useActionState } from 'react';
import { RouteForm } from './route-form';
import { RouteDisplay } from './route-display';
import { generatePersonalizedRouteAction, type FormState } from '@/app/actions';

const initialState: FormState = {
  message: '',
};

export function RouteGenerator() {
  const [formState, formAction] = useActionState(generatePersonalizedRouteAction, initialState);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
      <div className="md:col-span-2">
        <RouteForm formAction={formAction} formState={formState}/>
      </div>
      <div className="md:col-span-3">
         <RouteDisplay serverState={formState} />
      </div>
    </div>
  );
}
