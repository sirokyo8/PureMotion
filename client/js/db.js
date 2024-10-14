if (!window.indexedDB) {
  alert("Sorry, your browser does not support IndexedDB. Try using Chrome or other :)");
  console.log("Browser does not support IndexedDB!");
} else {
  console.log("Browser does support IndexedDB");
}

let db;
let dbReady = new Promise((resolve, reject) => {
  const request = indexedDB.open("PureMotionDB", 1);

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("Planner")) {
      const tagsStore = db.createObjectStore("Planner", { keyPath: "day" });
      tagsStore.add({
        day: "Monday",
        tags: []
      });

      tagsStore.add({
        day: "Tuesday",
        tags: []
      });

      tagsStore.add({
        day: "Wednesday",
        tags: []
      });

      tagsStore.add({
        day: "Thursday",
        tags: []
      });

      tagsStore.add({
        day: "Friday",
        tags: []
      });

      tagsStore.add({
        day: "Saturday",
        tags: []
      });

      tagsStore.add({
        day: "Sunday",
        tags: []
      });

      console.log("Planner object store created successfully!");
    }

    if (!db.objectStoreNames.contains("Nutrition")) {
      const nutritionStore = db.createObjectStore("Nutrition", { keyPath: "id" });
      nutritionStore.add({ id: 1, proteins: 0, fats: 0, carbs: 0 });
    }

    if (!db.objectStoreNames.contains("Settings")) {
      const settingsStore = db.createObjectStore("Settings", { keyPath: "id" });
      settingsStore.add({
        id: 1,
        darkTheme: true,
        colorpalette: "rgb(237, 86, 59)",
        language: "en"
      });
      console.log("Settings object store created successfully!");
    }
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    resolve();
  };

  request.onerror = function (event) {
    console.error("Database error:", event.target.errorCode);
    reject(event.target.errorCode);
  };
});

// Create or Update settings
async function saveSettings(settingsData) {
  await dbReady;
  const transaction = db.transaction(["Settings"], "readwrite");
  const settingsStore = transaction.objectStore("Settings");
  const request = settingsStore.put(settingsData);
  request.onsuccess = function (event) {
    console.log("Settings saved successfully:", event.target.result);
  };
  request.onerror = function (event_1) {
    console.error("Error saving settings:", event_1.target.errorCode);
  };
}

// Read settings
async function getSettings() {
  await dbReady;
  const transaction = db.transaction(["Settings"], "readonly");
  const settingsStore = transaction.objectStore("Settings");
  const request = settingsStore.get(1);
  return await new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      console.log("Settings retrieved successfully:", event.target.result);
      resolve(event.target.result);
    };

    request.onerror = function (event_1) {
      console.error("Error retrieving settings:", event_1.target.errorCode);
      reject(event_1.target.errorCode);
    };
  });
}

async function saveTags(day, tags) {
  await dbReady;
  const uniqueTags = [...new Set(tags)];
  const transaction = db.transaction(["Planner"], "readwrite");
  const tagsStore = transaction.objectStore("Planner");
  const request = tagsStore.put({ day: day, tags: uniqueTags });
  request.onsuccess = function () {
    console.log("Tags saved successfully for " + day + ": " + uniqueTags);
  };
  request.onerror = function (event) {
    console.error("Error saving tags:", event.target.errorCode);
  };
}

async function deleteTags(day) {
  await dbReady;
  const transaction = db.transaction(["Planner"], "readwrite");
  const tagsStore = transaction.objectStore("Planner");
  const request = tagsStore.delete(day);
  request.onsuccess = function () {
    console.log("Tags deleted successfully for " + day);
  };
  request.onerror = function (event) {
    console.error("Error deleting tags:", event.target.errorCode);
  };
}

async function loadTags(day) {
  await dbReady;
  const transaction = db.transaction(["Planner"], "readonly");
  const tagsStore = transaction.objectStore("Planner");
  const request = tagsStore.get(day);
  return await new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      if (event.target.result) {
        resolve(event.target.result.tags);
      } else {
        resolve([]);
      }
    };

    request.onerror = function (event) {
      console.error("Error loading tags:", event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
}






// Create or Update nutrition
async function saveNutrition(id, proteins, fats, carbs) {
  await dbReady;
  const transaction = db.transaction(["Nutrition"], "readwrite");
  const nutritionStore = transaction.objectStore("Nutrition");
  const request = nutritionStore.put({ id: id, proteins: proteins, fats: fats, carbs: carbs });
  return new Promise((resolve, reject) => {
    request.onsuccess = function () {
      resolve();
    };
    request.onerror = function (event) {
      reject(event.target.errorCode);
    };
  });
}

async function deleteNutrition(day) {
  await dbReady;
  const transaction = db.transaction(["Nutrition"], "readwrite");
  const nutritionStore = transaction.objectStore("Nutrition");
  const request = nutritionStore.delete(day);
  request.onsuccess = function () {
    console.log("Nutrition deleted successfully for " + day);
  };
  request.onerror = function (event) {
    console.error("Error deleting nutrition:", event.target.errorCode);
  };
}

async function loadNutrition(id) {
  await dbReady;
  const transaction = db.transaction(["Nutrition"], "readonly");
  const nutritionStore = transaction.objectStore("Nutrition");
  const request = nutritionStore.get(id);
  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
    request.onerror = function (event) {
      reject(event.target.errorCode);
    };
  });
}

async function resetNutritionTable() {
  const today = new Date();
  const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const id = midnight.getTime();

  await saveNutrition(id, 0, 0, 0);
}

function scheduleDailyReset() {
  const now = new Date();
  const msTillMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0, 0) - now;

  if (msTillMidnight < 0) {
    msTillMidnight += 86400000;
  }

  setTimeout(function () {
    resetNutritionTable();
    scheduleDailyReset();
  }, msTillMidnight);
}

scheduleDailyReset();
