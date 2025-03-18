// import React from 'react';

// interface GenreSelectorProps {
//   onSelectGenre: (genre: string) => void;
// }

// // Lista de géneros basada en los géneros oficiales de Discogs
// const genresList: string[] = [
//   'Blues', 'Brass & Military', 'Children’s', 'Classical', 'Electronic',
//   'Folk, World, & Country', 'Funk / Soul', 'Hip Hop', 'Jazz', 'Latin',
//   'Non-Music', 'Pop', 'Reggae', 'Rock', 'Stage & Screen'
// ];

// const GenreSelector: React.FC<GenreSelectorProps> = ({ onSelectGenre }) => {
//   return (
//     <div>
//       <label>Selecciona un género: </label>
//       <select onChange={(e) => onSelectGenre(e.target.value)}>
//         <option value="">Todos los géneros</option>
//         {genresList.map((genero, index) => (
//           <option key={index} value={genero}>
//             {genero}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default GenreSelector;