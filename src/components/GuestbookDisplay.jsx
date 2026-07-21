import { useEffect, useState } from "react";
import { supabase } from "../supabase.js";
import { getStroke } from 'perfect-freehand';
import { motion } from "motion/react";
export default function GuestbookDisplay(props) {
  const [entries, setEntries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function getSvgPathFromStroke (stroke){
    return props.getSvgPathFromStroke(stroke);
  }
  function strokeToPath(stroke){
    return props.strokeToPath(stroke);
  }

  async function fetchEntries() {
      setLoading(true);
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Supabase guestbook input error.");
        setErrorMessage("An error occured while loading the guestbook entries.");
        setLoading(false);
        return;
      }

      setEntries(data);
      setLoading(false);
    }

  useEffect(() => {

    fetchEntries();

  }, [props.refreshKey]);
  return (
    <>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <div className = "guestbookdisplay">
        {entries.map((entry) => {
          let timestamp = entry.created_at;
          let dateObj = new Date(timestamp);
          const formattedDate = new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
          }).format(dateObj);
          return (
          <motion.div 
            key={entry.id} 
            initial={{
                opacity: 0,
                x: 300
            }}
            animate={{
                opacity: 1,
                x: 0
            }}
            transition={{
                duration: 0.4
            }}
            >
              <div className = "guestbookEntry">
            <h4 className="guestname">{entry.name}</h4>
            <h4 className = "guestdate">{formattedDate}</h4>
            <div className = "guestsig">
              <svg 
                viewBox="0 0 300 150"
                width="100"
                height="50"
                >
                {
                  entry.signature.map((item, index) => {
                    return (
                      <path
                        d = {getSvgPathFromStroke(strokeToPath(item))}
                        key = {index}
                        fill = "white"
                        stroke = "none"
                      ></path>
                    )
                  })}
              </svg>
            </div>
            <p className = "guestmessage">{entry.message}</p>
            </div>
            
          </motion.div>
        )})}
      </div>
    </>
  );
}