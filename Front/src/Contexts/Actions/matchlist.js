

export default {
    fetch: async function () {
        const token = localStorage.getItem("userToken");
      return fetch("http://fauques.freeboxos.fr:3000/matches", {
        headers: {
          //"Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      }).then((res) => res.json());
    },
    delete: async function (match) {
        const token = localStorage.getItem("userToken");
      return fetch("http://fauques.freeboxos.fr:3000/matches/" + match.id, {
        method: "DELETE",
        headers: {
          //"Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      }).then((res) => res.ok);
    },
    add: async function (match) {
        const token = localStorage.getItem("userToken");
        const response = await fetch("http://fauques.freeboxos.fr:3000/matches/", {
          method: "POST",
          headers: {
            //"Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
          body: JSON.stringify(match),
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        return data ? data._id : null;
      },
    edit: async function (oldMatch, newMatch) {
      return fetch("http://fauques.freeboxos.fr:3000/matches/" + oldMatch.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMatch),
      }).then((res) => res.json());
    },
  };