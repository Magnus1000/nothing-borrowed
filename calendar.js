const Calendar = () => {
  const [slots, setSlots] = React.useState([]);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [bookingInfo, setBookingInfo] = React.useState('');
  const [recordId, setRecordId] = React.useState('');

  React.useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch('https://locksmithlookup-magnus1000team.vercel.app/api/nothingborrowedFetchSlots.js');
        const data = await response.json();
        setSlots(data);
      } catch (error) {
        console.error('Error fetching slots:', error);
        setError('Failed to load slots. Please try again later.');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); // wait for 2 seconds before setting isLoading to false
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
        const date = new Date(slot.date_time);
        const dateString = date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });
        const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }) + ' ET';
        bookingInfo.value = `${dateString}, ${timeString}`;
    }

    // Update the field with id = recordId with the id of the selected slot
    const recordIdField = document.getElementById('recordId');
        if (recordIdField) {
        recordIdField.value = slot.id;
        }
    }
  };

  if (isLoading) {
    return (
      <div className="calendar-loading-div">
        <div className="calendar-loading-text">loading calendar...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="calendar-row">
        <div className="calendar-header-row">
            <h1 className="calendar-header">{new Date().toLocaleString('default', { month: 'long' })}</h1>
            <h2 className="calendar-subheader">New times will be released on the first day of every month</h2>
        </div>
        <div className="calendar-div">
            {slots.map((slot) => (
            <div
                key={slot.id}
                id={slot.id}
                className={`calendar-option ${slot.status === 'unavailable' ? 'unavailable' : ''} ${selectedSlot === slot.id ? 'selected' : ''}`}
                onClick={() => handleSlotClick(slot.id)}
            >
                <div className="calendar-date-time-div">
                <div className="calendar-day-text">{new Date(slot.date_time).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
                <div className="calendar-time-text">
                    {new Date(slot.date_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }) + ' ET'}
                </div>
                </div>
                <div className="calendar-amount-text">30 mins</div>
                {slot.status === 'unavailable' && <div className="unavailable-text">unavailable</div>}
            </div>
            ))}
        </div>
    </div>
  );
};

ReactDOM.render(React.createElement(Calendar), document.getElementById('root'));
