import React from 'react';

export const MoveUp: React.FC = () => (
  <>
    <svg className="svg-hidden">
      <symbol id="icon-move-up" viewBox="0 0 32 32">
        <path d="M22 16v12h2v-12h5l-6-6-6 6z"></path>
        <path d="M2 6h3v2h-3v-2z"></path>
        <path d="M6 6h3v2h-3v-2z"></path>
        <path d="M10 6h2v3h-2v-3z"></path>
        <path d="M2 13h2v3h-2v-3z"></path>
        <path d="M5 14h3v2h-3v-2z"></path>
        <path d="M9 14h3v2h-3v-2z"></path>
        <path d="M2 9h2v3h-2v-3z"></path>
        <path d="M10 10h2v3h-2v-3z"></path>
        <path d="M10 22v6h-6v-6h6zM12 20h-10v10h10v-10z"></path>
      </symbol>
    </svg>
    <svg className="icon icon-move-up">
      <use xlinkHref="#icon-move-up" />
    </svg>
  </>
)