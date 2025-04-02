import { useNavigate } from 'react-router';

export const GoBackButton = () => {
  const handleGoBack = () => {
    window.history.back();  // Regresa a la página anterior
  };

  return (
    <button onClick={handleGoBack} className="generalButton">
      Go Back
    </button>
  );
};
