import React, { useEffect, useState } from 'react';
import Routes from './components/routes/index';
import { UidContext } from './components/AppContext';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getUser } from './redux/actions/User.actions';

function App() {

  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: "/jwtid",
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    }
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
