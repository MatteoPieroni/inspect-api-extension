import React from 'react';

export const CheckboxUnchecked: React.FC = () => (
  <>
    <svg className="svg-hidden">
      <symbol id="icon-checkbox-unchecked" viewBox="0 0 32 32">
        <path d="M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM28 28h-24v-24h24v24z"></path>
      </symbol>
    </svg>
    <svg className="icon icon-checkbox-unchecked">
      <use xlinkHref="#icon-checkbox-unchecked" />
    </svg>
  </>
)