import * as React from 'react';
const HelsaIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <rect width={60} height={183} x={60.5} y={58.5} stroke={props.color || '#000'} strokeWidth={15} rx={30} />
    <rect width={60} height={183} x={179.5} y={58.5} stroke={props.color || '#000'} strokeWidth={15} rx={30} />
    <rect width={113} height={21} x={93} y={146} stroke={props.color || '#000'} strokeWidth={10} rx={10.5} />
    <circle cx={150} cy={111} r={10} fill={props.color || '#000'} />
    <circle cx={150} cy={208} r={10} fill={props.color || '#000'} />
  </svg>
);
export default HelsaIcon;
