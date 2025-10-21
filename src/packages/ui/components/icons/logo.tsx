import * as React from 'react';
const LogoSimple = (props: any) => (
  <svg baseProfile="tiny" height="100%" width="100%" {...props}>
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:'#023047', stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:'#0d3d56', stopOpacity:1}} />
      </linearGradient>
    </defs>
    <rect fill="url(#bgGradient)" height={20} rx={20} ry={20} width={20} x={10} y={10} />
    <line stroke="#4CAF50" strokeWidth={10} x1={60} x2={60} y1={30} y2={90} />
    <line stroke="#4CAF50" strokeWidth={10} x1={30} x2={90} y1={60} y2={60} />
  </svg>
);
export default LogoSimple;
