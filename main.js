const trackContainer = document.getElementById("container");

const url =
  "https://corsproxy.io/?" +
  encodeURIComponent("https://openwhyd.org/hot?format=json");

//   First check if tracks are stored on localStorage
const defaultHotTracks = localStorage.getItem("container");

if (!defaultHotTracks) {
  // Fetch tracks if they are not in localStorage
  async function getHotTracks() {
    try {
      console.log("Requesting Openwhyd Data Export API.");

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      displayTracks(data.tracks, trackContainer);

      //   Save tracks in localStorage
      localStorage.setItem("hotTracks", JSON.stringify(data.tracks));
      console.log("Saving tracks in localStorage.");
    } catch (error) {
      console.log("!!! Error is:", error);
    }
  }
  getHotTracks();
} else {
  // Parse and display tracks from localStorage
  const tracks = JSON.parse(defaultHotTracks); // parse the stored string assigned to variable defaultHotTracks on line 23
  console.log("Accessing localStorage.");
  displayTracks(tracks, trackContainer); // Use the stored data
}

function displayTracks(tracks, trackContainer) {
  tracks.forEach((track) => {
    const li = document.createElement("li");
    li.innerHTML = track.name;

    const linkIcon = document.createElement("a");

    if (track.eId.startsWith("/yt/")) {
      linkIcon.href = track.eId.replace("/yt/", "https://youtube.com/watch?v=");
    } else {
      linkIcon.href = track.eId;
    }

    linkIcon.target = "_blank";
    linkIcon.innerHTML = '<i class="fa-brands fa-youtube"></i>';

    li.appendChild(linkIcon);
    trackContainer.appendChild(li);
  });

  // Remove the bottom border of the last <li>
  const allLi = trackContainer.querySelectorAll("li");
  if (allLi.length > 0) {
    allLi[allLi.length - 1].style.borderBottom = "none";
  }
}

// Hover effect on icon
document.querySelectorAll("#container a").forEach((link) => {
  link.addEventListener("mouseover", function () {
    this.parentElement.style.backgroundColor = "#b6ffda4d";
  });

  link.addEventListener("mouseout", function () {
    this.parentElement.style.backgroundColor = "transparent";
  });
});
