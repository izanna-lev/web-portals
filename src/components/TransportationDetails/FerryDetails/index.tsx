/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { API, FERRY_CLASS, TRANSPORTATION_TYPE } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFormattedDate, getFormattedTime } from "../../../util";
import NewFerry from "../../TransportationAdd/AddFerry";
import { Modal } from "../../../components/Portal";
import { DeleteEntity } from "../../../api/Delete";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import styles from "./index.module.scss";
import { useState } from "react";
import EditFerry from "../../TransportationEdit/EditFerry";

const FerryDetails = ({ nextTab }: any) => {
  const ferryList = useAppSelector((state: any) => state.transportation.ferry);
  const [addMore, setAddMore] = useState(false);
  const [edit, setEdit] = useState(undefined);

  const { _id } = useAppSelector(
    (state) => state.itineraryData.itineraryDetails
  );
  const dispatch = useAppDispatch();

  const deleteTransportation = (transportationRef: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (confirmDelete)
      dispatch(
        DeleteEntity(
          API.TRANSPORTATION_DELETE,
          { transportationRef },
          API.TRANSPORTATION_DATA,
          { transportationType: TRANSPORTATION_TYPE.FERRY, itineraryRef: _id },
          1,
          10
        )
      );
  };

  return (
    <>
      <section className={styles["AddTrainsPage"]}>
        <div className={styles["flightDetails-table"]}>
          <div>Day</div>
          <div>Arrival Station</div>
          <div>Ferry Class</div>
          <div>Arrival Date</div>
          <div>Arrival Time</div>
          <div>Depart Station</div>
          <div>Depart Time</div>
          <div>Specialist Note</div>
          <div>Actions</div>
        </div>

        <div className={styles["forms"]}>
          {ferryList.list?.length ? (
            ferryList.list.map((element: any, index: number) => (
              <div
                className={`${styles["flightDetails-table"]} ${styles["table-item"]}`}
                key={index}
              >
                <div>{element.day || "NA"}</div>
                <div>{element.arrival || "NA"}</div>
                <div>{FERRY_CLASS[element.trainClass - 1 || 0].name}</div>
                <div>{getFormattedDate(element.arrivalDateTime)}</div>
                <div>{getFormattedDate(element.arrivalDateTime)}</div>
                <div>{element.depart || "NA"}</div>
                <div>{getFormattedTime(element.departDateTime)}</div>
                <div>{element.specialistNote || "NA"}</div>
                <div
                  className="add-activity-buttons"
                  onClick={() => setEdit(element)}
                >
                  <button className="btn edit-button">
                    <FaRegEdit />
                    &nbsp;<span>Edit</span>
                  </button>
                  <button
                    className="btn delete-button"
                    onClick={() => deleteTransportation(element._id)}
                  >
                    <MdDeleteOutline />
                    &nbsp;<span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={`${styles["empty-table"]} ${styles["table-item"]}`}>
              Nothing Added
            </div>
          )}
        </div>

        <div
          className={styles["add-more"]}
          onClick={() => {
            setAddMore(true);
          }}
        >
          + Add Ferry Details
        </div>
      </section>

      <div onClick={() => nextTab(4)} className={styles["continue-button"]}>
        Continue
      </div>
      {addMore ? (
        <Modal
          modal={<NewFerry handleAddPopup={setAddMore} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
      {edit ? (
        <Modal
          modal={<EditFerry handleEditPopup={setEdit} data={edit} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
    </>
  );
};

export default FerryDetails;
