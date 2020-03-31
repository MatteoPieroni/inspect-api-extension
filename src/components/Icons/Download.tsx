import React from 'react';

export const Download: React.FC = () => (
  <>
    <svg className="svg-hidden">
      <symbol id="icon-download2" viewBox="0 0 32 32">
        <path d="M28 16h-5l-7 7-7-7h-5l-4 8v2h32v-2l-4-8zM0 28h32v2h-32v-2zM18 10v-8h-4v8h-7l9 9 9-9h-7z"></path>
      </symbol>
    </svg>
    <svg className="icon icon-download2">
      <use xlinkHref="#icon-download2" />
    </svg>
  </>
)