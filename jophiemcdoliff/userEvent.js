function sendPageViewEvent(url, userId) {
  const endpoint = 'https://locksmithlookup-magnus1000team.vercel.app/api/jophiemcdoliffUserEvents';
  
  const data = {
    event: 'Page View',
    url: url,
    userId: userId
  };

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send page view event');
      }
      console.log('Page view event sent successfully');
    })
    .catch(error => {
      console.error('Error sending page view event:', error);
    });
}

// Function to fetch the current page URL and send the page view event
function sendCurrentPageViewEvent() {
  const currentUrl = new URL(window.location.href);
  let userId = currentUrl.searchParams.get('userId');

  if (userId) {
    localStorage.setItem('userId', userId);
  } else {
    userId = localStorage.getItem('userId');
  }

  if (!userId) {
    console.error('No user ID found in URL or local storage');
    return;
  }

  sendPageViewEvent(currentUrl, userId);
}

// Call the sendCurrentPageViewEvent function when the page loads
window.addEventListener('load', sendCurrentPageViewEvent);