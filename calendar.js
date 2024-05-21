const Calendar = () => {
    const [slots, setSlots] = React.useState([]);
    const [selectedSlot, setSelectedSlot] = React.useState(null);
  
    React.useEffect(() => {
      const fetchSlots = async () => {
        try {
          const response = await fetch('/api/getCalendarSlots');
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