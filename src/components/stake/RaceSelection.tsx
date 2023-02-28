import { useState } from "react";
import { motion } from "framer-motion";
import { CarSelection } from "./CarSelection";
import australiaTrack from "../../assets/racetracks/australia.svg";
import azerbaijanTrack from "../../assets/racetracks/azerbaijan.svg";
import saudiTrack from "../../assets/racetracks/saudi-arabia.svg";

export default function RaceSelection(props: {
  race_id: string;
  country: string;
  name: string;
  month_date: string;
  day_date: string;
  status: string;
  staked: number;
  track: number;
  isModalOpen: boolean;
  controlModal: Function;
  setRaceID: Function;
}) {
  return (
    <motion.div
      className={"race-selection " + props.country}
      whileInView={{ opacity: 1 }}
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        props.setRaceID(props.race_id);
        props.controlModal();
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="race-selection-detail race-date">
        <div className="race-selection-content">
          <div className="race-selection-date">
            <div className="race-selection-monthspan">{props.month_date}</div>
            <div className="race-selection-dayspan">{props.day_date}</div>
          </div>
          <div className="race-selection-trackmap">
            {props.track == 0 && <img src={australiaTrack} alt="" />}
            {props.track == 1 && <img src={saudiTrack} alt="" />}
            {props.track == 2 && <img src={azerbaijanTrack} alt="" />}
          </div>
        </div>
      </div>
      <div className="race-selection-detail race-info">
        <div className="race-selection-content">
          <div className="race-selection-info">
            <div className="race-selection-name">{props.country}</div>
            <div className="race-selection-description">{props.name}</div>
          </div>
        </div>
      </div>
      <div className="race-selection-detail-3 race-status">
        <div className="race-selection-buttons">
          <button className={"race-live-status " + props.status}>
            {props.status}
          </button>
          <button className="race-staked-amount">{props.staked} staked</button>
        </div>
      </div>
    </motion.div>
  );
}