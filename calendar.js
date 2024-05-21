const Calendar = () => {
    const [slots, setSlots] = React.useState([]);
    const [selectedSlot, setSelectedSlot] = React.useState(null);
  
    React.useEffect(() => {
      const fetchSlots = async () => {
        try {
          const response = await fetch('https://locksmithlookup-magnus1000team.vercel.app/api/nothingborrowedFetchSlots.js');
          const data = await response.json();
          setSlots(data);
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      };
  
      fetchSlots();
    }, []);
  
    const handleSlotClick = (id) => {
        setSelectedSlot(id);
        
        // Find the slot with the matching id
        const slot = slots.find(slot => slot.id === id);
        
        // Update the textarea field with the selected slot's date_time
        if (slot) {
            const bookingInfo = document.getElementById('bookingInfo');
            if (bookingInfo) {
            bookingInfo.value = new Date(slot.date_time).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });
            }

            // Update the field with id = recordId with the id of the selected slot
            const recordIdField = document.getElementById('recordId');
            if (recordIdField) {
            recordIdField.value = slot.id;
            }
        }
    };
  
    return (
      <div className="calendar-row">
        <div className="calendar-div">
          {slots.map((slot) => (
            <div
              key={slot.id}
              id={slot.id}
              className={`calendar-option ${slot.status === 'unavailable' ? 'not-available' : ''} ${selectedSlot === slot.id ? 'selected' : ''}`}
              onClick={() => handleSlotClick(slot.id)}
            >
              <div className="calendar-day-text">{new Date(slot.date_time).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
              <div className="calendar-amount-text">30 mins</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  ReactDOM.render(React.createElement(Calendar), document.getElementById('root'));