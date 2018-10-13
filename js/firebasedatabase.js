var database = firebase.database();
saveLocation(latitude, longitude);

function saveLocation(lat, long) {
  latitude = lat;
  longitude = long;

  if (uid && database && latitude) {
    console.log("Saving to database:", uid, latitude, longitude);
    let userRef = database.ref("users/" + uid);
    console.log(userRef);
    userRef.set({
      fullName: name,
      profilePic: photoURL,
      location: [latitude, longitude]
    });
    console.log(userRef);
  } else {
    console.log("No");
  }
}

function getLocations() {
  console.log(database);
  if (database) {
    let usersRef = database.ref("users");
    console.log(usersRef);
    usersRef.on("value", function (snap) {
      console.log(snap);
      snap.forEach(function (childNodes) {
        console.log(childNodes.key, childNodes.val());
      })
    });
  }
}
