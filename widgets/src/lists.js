import React, {useEffect, useState} from 'react';


// TODO: Replace this endpoint with your REST API endpoint
const LEAD_API = 'http://localhost:8000/email/';

export const EmailList = function (props) {

  const [data, setData] = useState([]);
  useEffect(() => {getEmail()}, [])

  const getEmail = () => {
    fetch(LEAD_API, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
        resp => resp.json()
    ).then(
        (data) => {
            setData(data.data);
        },
        (error) => {
          console.log(error);
        }
    )
  }

  const transformDate = value => {
    if (!value) {
      return value;
    }

    const date = new Date(value);
    if (!date) {
      return null;
    }

    const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
    if (seconds < 60) {
      return 'Just Now';
    }

    if (seconds < 3600) {
      if (Math.round(seconds / 60) === 1) {
        return 'A minute ago';
      }

      return Math.round(seconds / 60) + ' ' + 'minutes ago';
    }

    if (seconds < 86400) {
      if (Math.round(seconds / 3600) === 1) {
        return 'An hour ago';
      }

      return Math.round(seconds / 3600) + ' ' + 'hours ago';
    }

    return new Date(Date.now()).toLocaleString();
  };

  // Get this month by name
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const [thisMonth, setThisMonth] = useState(monthNames[new Date().getMonth()]);

  // Filter data have the same month
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data.filter(item => {
      const itemMonth = new Date(item.sub_date).getMonth();
      return itemMonth === new Date().getMonth();
    }))
  }, [data, thisMonth]);

  return (
      <div>
        <h1>{thisMonth}</h1>
        <h1>Email List: {data.length}</h1> 
        <h1>New this month: {filteredData.length}</h1>
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Email ID</th>
                    <th style={styles.th}>Timestamp</th>
                    <th style={styles.th}>Unsubscribed</th>
                </tr>
            </thead>
            <tbody>
            {
                data && data.map(row => (
                    <tr key={row.id}>
                        <td style={styles.td}>{ row.email }</td>
                        <td style={styles.td}>{transformDate(row.sub_date)}</td>
                        <td style={styles.td}>Subscribed</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
      </div>
  )
}

const styles = {
    table: {
        borderCollapse: 'collapse',
      },
       th: {
        background: '#ccc',
        border: "1px solid #ccc",
        padding: '8px',
      },
      td: {
        border: '1px solid #ccc',
        padding: '8px',
      },
};

