import styles from "./index.module.scss";

const AddEditNotes = ({ navigate, location }: any) => {
  const handleRedirection = () => navigate(`/itinerary/detail/${location}`);

  return (
    <section className={`${styles["popup-container"]}`}>
      <div className={`${styles["popup"]}`}>
        <h2 className={`${styles["popup-heading"]}`}>Itinerary Submitted</h2>
        <p className={`${styles["popup-text"]}`}>
          Your Itinerary has been submitted successfully.
        </p>
        <div
          className={`continue-button ${styles["continue-button"]}`}
          onClick={handleRedirection}
        >
          Go to Itinerary Details
        </div>
      </div>
    </section>
  );
};

export default AddEditNotes;
