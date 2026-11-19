const cityInput = document.getElementById('cityInput');
const suggestionsList = document.getElementById('suggestionsList');
const weatherCard = document.getElementById('weatherCard');
const fxLayer = document.getElementById('fxLayer');

const cityNameEl = document.getElementById('cityName');
const cityCountryEl = document.getElementById('cityCountry');
const weatherConditionEl = document.getElementById('weatherCondition');
const temperatureEl = document.getElementById('temperature');
const feelsLikeEl = document.getElementById('feelsLike');
const windSpeedEl = document.getElementById('windSpeed');
const soilMoistureEl = document.getElementById('soilMoisture');
const weatherTipEl = document.getElementById('weatherTip');

let debounceTimer;

// 1. AUTOCOMPLETE DE CIDADES (Open-Meteo Geocoding API)
cityInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  const query = cityInput.value.trim();

  if (query.length < 2) {
    suggestionsList.classList.remove('active');
    return;
  }

  debounceTimer = setTimeout(() => fetchCities(query), 300);
});

async function fetchCities(query) {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=pt&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    renderSuggestions(data.results || []);
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
  }
}

function renderSuggestions(cities) {
  suggestionsList.innerHTML = '';

  if (cities.length === 0) {
    suggestionsList.classList.remove('active');
    return;
  }

  cities.forEach(city => {
    const li = document.createElement('li');
    li.className = 'suggestion-item';

    const region = [city.admin1, city.country].filter(Boolean).join(', ');
    li.innerHTML = `
      <span class="suggestion-city">${city.name}</span>
      <span class="suggestion-region">${region}</span>
    `;

    li.addEventListener('click', () => {
      cityInput.value = city.name;
      suggestionsList.classList.remove('active');
      fetchWeather(city.latitude, city.longitude, city.name, region);
    });

    suggestionsList.appendChild(li);
  });

  suggestionsList.classList.add('active');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrapper')) {
    suggestionsList.classList.remove('active');
  }
});

// Descobre se é dia (6h-11h), tarde (12h-17h) ou noite (18h-5h) no fuso da cidade
function getTimeOfDay(timeZone, isDayApi) {
  let hour = new Date().getHours();

  if (timeZone) {
    try {
      const formattedHour = new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: '2-digit',
        hour12: false
      }).format(new Date());
      hour = parseInt(formattedHour, 10);
    } catch (err) {
      // Mantém a hora local caso o timezone seja inválido
    }
  }

  if (isDayApi === 0 || hour >= 18 || hour < 6) {
    return 'night';
  }
  if (hour >= 12 && hour < 18) {
    return 'afternoon';
  }
  return 'day';
}

function applyTimeOfDayTheme(period) {
  weatherCard.classList.remove('period-day', 'period-afternoon', 'period-night');
  weatherCard.classList.add(`period-${period}`);
}

// Gera mensagem adaptada à umidade do solo (m³/m³) e condições atmosféricas
function getSoilDryingMessage(soilMoistureM3, windKmh, tempC, code) {
  if (typeof soilMoistureM3 !== 'number' || Number.isNaN(soilMoistureM3)) {
    return 'Umidade do solo indisponível no momento para estimar a taxa de secagem.';
  }

  const moisturePct = Math.round(soilMoistureM3 * 100);
  const isRaining = (code >= 51 && code <= 67) || (code >= 80 && code <= 99);
  const strongWind = windKmh >= 18;
  const warmAir = tempC >= 26;

  if (isRaining) {
    return `Solo em ${moisturePct}% de umidade superficial: com chuva ativa, a reposição de água supera a secagem no momento.`;
  }

  if (moisturePct < 18) {
    if (warmAir || strongWind) {
      return `Solo seco (${moisturePct}%): calor e vento aceleram a perda de água na superfície, exigindo atenção à secagem.`;
    }
    return `Solo seco (${moisturePct}%): baixa umidade na camada superficial, com secagem rápida mesmo sob ventilação moderada.`;
  }

  if (moisturePct < 35) {
    if (warmAir && strongWind) {
      return `Umidade moderada (${moisturePct}%): temperatura elevada e vento favorecem uma secagem mais rápida da superfície.`;
    }
    return `Umidade moderada (${moisturePct}%): ritmo equilibrado de secagem superficial conforme o calor e a circulação de ar.`;
  }

  if (warmAir || strongWind) {
    return `Solo bastante úmido (${moisturePct}%): há boa reserva de água, mas o vento e o calor já impulsionam a secagem da superfície.`;
  }

  return `Solo bastante úmido (${moisturePct}%): alta retenção na superfície e secagem mais lenta nas condições atuais.`;
}

// 2. BUSCA DE TEMPERATURA, CLIMA E UMIDADE DO SOLO (Open-Meteo Weather API)
async function fetchWeather(lat, lon, name, region) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,soil_moisture_0_to_1cm&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();
    const current = data.current;

    const period = getTimeOfDay(data.timezone, current.is_day);
    applyTimeOfDayTheme(period);

    const soilMoisture = current.soil_moisture_0_to_1cm;
    const moisturePct = typeof soilMoisture === 'number'
      ? `${Math.round(soilMoisture * 100)}%`
      : '--%';

    cityNameEl.textContent = name;
    cityCountryEl.textContent = region;
    temperatureEl.textContent = `${Math.round(current.temperature_2m)}°`;
    feelsLikeEl.textContent = `Sensação: ${Math.round(current.apparent_temperature)}°`;
    windSpeedEl.textContent = `Vento: ${Math.round(current.wind_speed_10m)} km/h`;
    soilMoistureEl.textContent = `Umidade do solo: ${moisturePct}`;

    applyWeatherInteractivity(current.weather_code, period !== 'night');
    weatherTipEl.textContent = getSoilDryingMessage(
      soilMoisture,
      current.wind_speed_10m,
      current.temperature_2m,
      current.weather_code
    );
  } catch (error) {
    weatherTipEl.textContent = 'Não foi possível carregar o clima ou a umidade do solo no momento.';
  }
}

// 3. INTERATIVIDADE VISUAL BASEADA NO CÓDIGO WMO DO CLIMA
function applyWeatherInteractivity(code, isDay) {
  fxLayer.innerHTML = '';
  weatherCard.classList.remove('thunder-flash');

  // Limpo (0, 1)
  if (code === 0 || code === 1) {
    if (isDay) {
      weatherConditionEl.textContent = 'Céu Limpo';
      weatherCard.style.borderColor = 'var(--verde)';
      fxLayer.innerHTML = '<div class="fx-sun"></div>';
    } else {
      weatherConditionEl.textContent = 'Noite Estrelada';
      weatherCard.style.borderColor = 'var(--verde)';
      createParticles('star', 25);
    }
  }
  // Nublado / Neblina (2, 3, 45, 48)
  else if ([2, 3, 45, 48].includes(code)) {
    weatherConditionEl.textContent = code >= 45 ? 'Neblina' : 'Nublado';
    weatherCard.style.borderColor = 'var(--linha)';
    fxLayer.innerHTML = `
      <div class="cloud-blob" style="width:220px; height:120px; top:-20px; left:-30px;"></div>
      <div class="cloud-blob" style="width:180px; height:100px; bottom:-20px; right:10px; animation-delay: -4s;"></div>
    `;
  }
  // Chuva / Garoa (51-67, 80-82)
  else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    weatherConditionEl.textContent = 'Chuvoso';
    weatherCard.style.borderColor = 'var(--verde)';
    createParticles('raindrop', 35);
  }
  // Neve (71-77, 85-86)
  else if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    weatherConditionEl.textContent = 'Nevando';
    weatherCard.style.borderColor = 'var(--linha)';
    createParticles('snowflake', 30);
  }
  // Tempestade (95, 96, 99)
  else if (code >= 95) {
    weatherConditionEl.textContent = 'Tempestade';
    weatherCard.style.borderColor = 'var(--verde)';
    weatherCard.classList.add('thunder-flash');
    createParticles('raindrop', 45);
  }
}

function createParticles(className, count) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = className;
    el.style.left = `${Math.random() * 100}%`;

    if (className === 'star') {
      el.style.top = `${Math.random() * 100}%`;
      el.style.animationDelay = `${Math.random() * 2.5}s`;
    } else {
      el.style.animationDuration = `${(Math.random() * 0.6 + 0.5).toFixed(2)}s`;
      el.style.animationDelay = `${(Math.random() * 1.5).toFixed(2)}s`;
    }

    fxLayer.appendChild(el);
  }
}

fetchWeather(-23.5505, -46.6333, 'São Paulo', 'São Paulo, Brasil');