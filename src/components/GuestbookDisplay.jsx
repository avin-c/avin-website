import { useEffect, useState } from "react";
import { supabase } from "../supabase.js";

export default function GuestbookList() {
  const [entries, setEntries] = useState([]);

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
        }).format(dateObj);
        return (
        <div key={entry.id} className = "guestbookEntry">
          <h4 className="guestname">{entry.name}</h4>
          <h4 className = "guestdate">{formattedDate}</h4>
          <div className = "guestsig">Placeholder</div>
          <p className = "guestmessage">{entry.message}</p>
          
        </div>
      )})}
    </div>
  );
}