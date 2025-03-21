import React from 'react';
import { Disco } from '../types/DiscogsTypes';

interface DiscogsListProps {
  discos: Disco[];
}

const DiscogsList: React.FC<DiscogsListProps> = ({ discos }) => {
  return (
    <div>
      {discos.map((disco) => (
        <div key={disco.id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
          <img src={disco.cover_image} alt={disco.title} style={{ width: '100px', height: '100px' }} />
          <h3>{disco.title}</h3>
          <p>Formato: {disco.format.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default DiscogsList;