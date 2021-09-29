import React from 'react';
import './index.css';
import { htmlCode } from './html'

import SupportEngine from '../SupportEngine';


function Home() {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlCode }} ></div>
      
      <SupportEngine />
    </div>
  );
}

export default Home;
