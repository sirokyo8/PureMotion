function updateChart(proteins, fats, carbs) {
  const total = proteins + fats + carbs;
  const proteinPercent = (proteins / total) * 100;
  const fatPercent = (fats / total) * 100;
  const carbPercent = (carbs / total) * 100;

  const chart = document.getElementById('chart');
  chart.style.background = `conic-gradient(
            #e76f51 0% ${proteinPercent}%,
            #f4a261 ${proteinPercent}% ${proteinPercent + fatPercent}%,
            #e9c46a ${proteinPercent + fatPercent}% 100%
        )`;

  const kcal = proteins * 4 + fats * 9 + carbs * 4;
  chart.setAttribute('data-kcal', `${kcal} Kcal`);

  document.getElementById('proteinsInner').innerHTML = `${proteins}g`;
  document.getElementById('fatsInner').innerHTML = `${fats}g`;
  document.getElementById('carbsInner').innerHTML = `${carbs}g`;
}

document.addEventListener("DOMContentLoaded", function () {
  const nutritionSubmit = document.getElementById('nutritionSubmit');
  nutritionSubmit.addEventListener('click', async function (event) {
    const proteinsAdded = parseFloat(document.getElementById('proteinInput').value);
    const fatsAdded = parseFloat(document.getElementById('fatInput').value);
    const carbsAdded = parseFloat(document.getElementById('carbsInput').value);

    if (!isNaN(proteinsAdded) && !isNaN(fatsAdded) && !isNaN(carbsAdded)) {
      try {
        const nutritionData = await loadNutrition(1);
        const { proteins, fats, carbs } = nutritionData || { proteins: 0, fats: 0, carbs: 0 };

        let proteinsNew = proteins + proteinsAdded;
        let fatsNew = fats + fatsAdded;
        let carbsNew = carbs + carbsAdded;

        updateChart(proteinsNew, fatsNew, carbsNew);

        await saveNutrition(1, proteinsNew, fatsNew, carbsNew);
        console.log("Nutrition data saved successfully.");
      } catch (error) {
        console.error("Error saving nutrition data:", error);
      }
    } else {
      console.log("Please enter valid numbers for proteins, fats, and carbs.");
    }
  });
});

document.addEventListener("DOMContentLoaded", async function () {
  const nutritionData = await loadNutrition(1);
  console.log("nutritionData: ", nutritionData)
  if (nutritionData) {
    const { proteins, fats, carbs } = nutritionData;
    console.log(nutritionData)
    updateChart(proteins, fats, carbs);
  } else {
    console.log("No nutrition data found for Monday.");
  }
});






// bmi arrow
function updateArrowRotation(bmiValue) {
  const minValue = 18.5;
  const maxValue = 24.9;
  const minRotation = -65;
  const maxRotation = 65;
  const clampedBMI = Math.min(Math.max(bmiValue, minValue), maxValue);
  const rotation = mapRange(clampedBMI, minValue, maxValue, minRotation, maxRotation);
  const arrow = document.querySelector('.bmiChartInd');
  const bmiText = document.querySelector('#bmi');

  arrow.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
  bmiText.innerHTML = `<span class="orange">${bmiValue}</span>`
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// bmi calc
const bmiSubmit = document.getElementById('bmiSubmit');
bmiSubmit.addEventListener("click", function () {
  let weight = parseFloat(document.getElementById("weightInput").value);
  let height = parseFloat(document.getElementById("heightInput").value);
  if (weight > 0 && height > 0) {
    let bmi = weight / ((height / 100) * (height / 100));
    updateArrowRotation(parseFloat(bmi.toFixed(2)));
  } else {
    alert("Please enter valid values for weight and height.");
  }
})



// SlideShow
const srcIMG = [
  "../../assets/slideshow/food.webp",
  "../../assets/slideshow/food2.webp",
  "../../assets/slideshow/food3.webp",
  "../../assets/slideshow/food4.webp",
  "../../assets/slideshow/food5.webp"
]
const altIMG = [
  "picture1",
  "picutre2",
  "picture3",
  "picture4",
  "picture5"
]
aktualniIndex = 0

function dalsi() {
  aktualniIndex = (aktualniIndex + 1) % 5
  document.getElementById("slideshow").src = srcIMG[aktualniIndex]
  document.getElementById("slideshow").alt = altIMG[aktualniIndex]
}

setInterval(dalsi, 5000)