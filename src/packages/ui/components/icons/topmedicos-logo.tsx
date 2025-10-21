import * as React from 'react';

const TopMedicosLogo = (props: any) => (
  <svg baseProfile="tiny" height="100%" width="100%" viewBox="0 0 100 100" {...props}>
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:'#023047', stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:'#0d3d56', stopOpacity:1}} />
      </linearGradient>
      <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:'#4CAF50', stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:'#66BB6A', stopOpacity:1}} />
      </linearGradient>
    </defs>
    
    {/* Fondo principal con gradiente azul profundo */}
    <rect fill="url(#bgGradient)" height={100} rx={20} ry={20} width={100} x={0} y={0} />
    
    {/* Estetoscopio estilizado */}
    <path d="M20 25 C20 15, 30 10, 40 15 C50 10, 60 15, 60 25 C60 35, 50 40, 40 35 C30 40, 20 35, 20 25 Z" 
          fill="url(#accentGradient)" stroke="#4CAF50" strokeWidth="2"/>
    
    {/* Tubos del estetoscopio */}
    <path d="M40 35 L40 50 L30 65" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round"/>
    <path d="M40 35 L40 50 L50 65" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round"/>
    
    {/* Auriculares */}
    <circle cx="30" cy="65" r="6" fill="#FFB703"/>
    <circle cx="50" cy="65" r="6" fill="#FFB703"/>
    
    {/* Elementos decorativos */}
    <circle cx="15" cy="15" r="3" fill="#FFB703"/>
    <circle cx="85" cy="15" r="3" fill="#FFB703"/>
    <circle cx="15" cy="85" r="3" fill="#FFB703"/>
    <circle cx="85" cy="85" r="3" fill="#FFB703"/>
    
    {/* Líneas de conexión */}
    <line x1="5" y1="50" x2="15" y2="50" stroke="#EAEAEA" strokeWidth="2" strokeLinecap="round"/>
    <line x1="85" y1="50" x2="95" y2="50" stroke="#EAEAEA" strokeWidth="2" strokeLinecap="round"/>
    <line x1="50" y1="5" x2="50" y2="15" stroke="#EAEAEA" strokeWidth="2" strokeLinecap="round"/>
    <line x1="50" y1="85" x2="50" y2="95" stroke="#EAEAEA" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default TopMedicosLogo;
