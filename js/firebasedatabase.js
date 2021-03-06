var database = firebase.database();
saveLocation(latitude, longitude);

function saveLocation(lat, long) {
  latitude = lat;
  longitude = long;
  if (uid && database && latitude) {
    console.log("Saving to database:", uid, latitude, longitude);
    let userRef = database.ref("users/" + uid);
    userRef.set({
      fullName: name,
      location: [latitude, longitude],
      active: new Date().getTime()
    });
  }
}
function getUsers() {
  database.ref("users").on("value", function (snapshot) {
    if (!uid) return;
    var users = snapshot.val();
    let keys = Object.keys(users);
    group.forEach((marker) => {
      console.log(marker);
      let currentUID = marker.getData().uid;
      marker.setPosition({lat: users[currentUID].location[0], lng: users[currentUID].location[1]});
      keys = keys.filter(id => id != currentUID);
    });
    for (let i = 0; i < keys.length; i++) {
      let currentUID = keys[i];
      console.log(users, keys, currentUID);
      if (currentUID == uid) {
        you(latitude, longitude, name.split(" ").map(x => x.substr(0,1)).join(""));
        continue;
      }
      let user = users[currentUID];
      others(user.location[0], user.location[1], user.fullName.split(" ").map(x => x.substr(0,1)).join(""), currentUID);
    }
  }, function (err) {
    console.log(err);
  });
}
