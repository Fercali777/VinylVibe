export const GoBackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <button onClick={handleGoBack} className="generalButton  margin1">
      Back to Action
    </button>
  );
};
