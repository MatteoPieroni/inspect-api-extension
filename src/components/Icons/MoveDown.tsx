import React from 'react';

export const MoveDown: React.FC = () => (
  <>
    <svg className="svg-hidden">
      <symbol id="icon-move-down" viewBox="0 0 32 32">
        <path d="M24 22v-12h-2v12h-5l6 6 6-6z"></path>
        <path d="M10 8v6h-6v-6h6zM12 6h-10v10h10v-10z"></path>
        <path d="M2 20h3v2h-3v-2z"></path>
        <path d="M6 20h3v2h-3v-2z"></path>
        <path d="M10 20h2v3h-2v-3z"></path>
        <path d="M2 27h2v3h-2v-3z"></path>
        <path d="M5 28h3v2h-3v-2z"></path>
        <path d="M9 28h3v2h-3v-2z"></path>
        <path d="M2 23h2v3h-2v-3z"></path>
        <path d="M10 24h2v3h-2v-3z"></path>
      </symbol>
    </svg>
    <svg className="icon icon-move-down">
      <use xlinkHref="#icon-move-down" />
    </svg>
  </>
)