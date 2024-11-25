const LogoSimple = (props: any) => (
  <svg baseProfile="tiny" height="100%" width="100%" {...props}>
    <defs />
    <rect fill="#8167EC" height={20} rx={20} ry={20} width={20} x={10} y={10} />
    <line stroke="white" strokeWidth={10} x1={60} x2={60} y1={30} y2={90} />
    <line stroke="white" strokeWidth={10} x1={30} x2={90} y1={60} y2={60} />
  </svg>
);
export default LogoSimple;
