

export const GoBackButton = () => {
  const handleGoBack = () => {
    window.history.back();  // Regresa a la página anterior
  };

  return (
    <button onClick={handleGoBack} className="generalButton  margin1">
      Back to Action
    </button>
  );
};
