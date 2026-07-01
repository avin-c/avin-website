import { useEffect, useState } from "react";
import { supabase } from "../supabase.js";
import { getStroke } from 'perfect-freehand'

export default function GuestbookDisplay(props) {
  const [entries, setEntries] = useState([]);

  function getSvgPathFromStroke (stroke){
    return props.getSvgPathFromStroke(stroke);
  }
  function strokeToPath(stroke){
    return props.strokeToPath(stroke);
  }
  useEffect(() => {
    async function fetchEntries() {
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      setEntries(data);
    }

    fetchEntries();
  }, []);
  console.log(entries);

  return (
    <div className = "guestbookdisplay">
      {entries.map((entry) => {
        let timestamp = entry.created_at;
        let dateObj = new Date(timestamp);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
        }).format(dateObj);
        return (
        <div key={entry.id} className = "guestbookEntry">
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
      )})}
    </div>
  );
}