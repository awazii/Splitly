import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Indicator = () => {
  return (
    <div style={{
        width: '150px',
        height: '150px',
        margin: '0 auto',
    }}>
        <DotLottieReact
          src="https://lottie.host/558b5567-4779-44ea-996f-dfe41994cda2/nVuOb1RPXJ.lottie"
          autoplay
          loop
          style={{ width: '100%', height: '100%' }}
        />
    </div>
  );
};
export default Indicator;