import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { toDate } from "../utils";
import { MintButton } from "../components/MintButton";
import { useCandyMachine } from "../hooks/useCandyMachine";
import { Loading } from "../components/Loading";

import nft_unrevealed from "../assets/nft-unrevealed.png";
import icon from "../assets/icon.png";

import { isButtonElement } from "react-router-dom/dist/dom";
import axios from "axios";

export default function Mint() {
  const [reload, setReload] = useState(0);
  const { cm, loading, error } = useCandyMachine(reload);
  const [isActive, setIsActive] = useState(false);
  const [popup, setPopup] = useState(false);
  const [mintRes, setMintRes] = useState<any>();
  const [metadata, setMetadata] = useState<any>();
  
  useEffect(() => {
    const fetchMetadata = async() => {
      const { data } = await axios.get(mintRes.uri)

      setMetadata(data)
      
    }
    if (mintRes) {
      fetchMetadata()
    }
  }, [mintRes])
  
  const [minted, setMinted] = useState(false);
  const showPopUp = () => {
    setPopup(true);
  };
  const showResult = () => {
    setMinted(true);
  };
  const closeResult = () => {
    setPopup(false);
    setMinted(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <AnimatePresence>
        <div className="mint">
          <div className="mint-preview">
            <div className="mint-preview-content">
              <motion.div
                className="mint-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0 }}
              >
                Become a racer
              </motion.div>
              <motion.div
                className="mint-cover"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <img src={nft_unrevealed} />
              </motion.div>
            </div>
          </div>
          <div className="mint-action">
            {cm && cm.candyGuard && (
              <>
                {!isActive ? (
                  <div className="text-center mt-4 ">
                    {/* @ts-ignore */}
                    <Countdown
                      date={toDate(
                        cm.candyGuard.groups[0].guards.startDate?.date
                      )}
                      onComplete={() => {
                        setIsActive(true);
                      }}
                      renderer={renderGoLiveDateCounter}
                      onMount={() => {
                        if (
                          // @ts-ignore
                          toDate(
                            // @ts-ignore
                            cm?.candyGuard.groups[0].guards.startDate?.date
                          ) > new Date()
                        ) {
                          setIsActive(false);
                        } else {
                          setIsActive(true);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <motion.div
                      className="mint-status"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.4 }}
                    >
                      <div>
                        Total Minted:{" "}
                        <span className="text-lg font-bold">
                          {cm.itemsMinted?.toNumber()} / {cm.itemsLoaded}
                        </span>
                      </div>
                    </motion.div>
                    <MintButton showPopup={showPopUp} closePopup={showResult} reload={() => setReload(p => p + 1)} setRes={(r: any) => setMintRes(r) } />
                    {/* {wallet && (
                      <p>SOL Balance: {(balance || 0).toLocaleString()}</p>
                    )} */}
                  </>
                )}
              </>
            )}
          </div>
          {popup && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0 }}
              className="mint-process"
            >
              {!minted && (
                <div>
                  <img src={icon} />
                </div>
              )}
              {minted && (
                <motion.div
                  className="mint-result"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0 }}
                >
                  <div>

                  </div>
                  <div className="mint-result-text">
                    {mintRes ? `${mintRes.name} minted successfully!` : "Minting failed"}
                  </div>
                  <div>
                    <img src={metadata && metadata.image} />
                  </div>
                  <div className="mint-result-button">
                    <button
                      onClick={() => {
                        closeResult();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              )}
              )
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </>
  );
}

const renderGoLiveDateCounter = ({ days, hours, minutes, seconds }: any) => {
  return (
    <motion.div
      className="mint-countdown"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      <div className="">
        {days}d {hours}h {minutes}m {seconds}s
      </div>
    </motion.div>
  );
};
