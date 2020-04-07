import React from 'react'
import { Icons } from './Icons'

import "./Button.scss"

interface DownloadButtonProps {
  data: any;
  name?: string;
  text?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ data, name, text }) => {
  return (
    <a className="button" href={data} download={`${name || 'data'}.json`}>
      <Icons.Download />{text || 'Download'}
    </a>
  )
}