'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type HourlyForecast = {
  time: string;
  temperature: number;
  icon: string;
};

type WeatherData = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
  hourlyForecast: HourlyForecast[];
  isFallback: boolean;
};

const API_URL = 'https://api.open-meteo.com/v1/forecast';
const COORDINATES = { lat: 9.3839, lon: 122.7892 };

const WEATHER_CODE_MAP: Record<number, string> = {
  0: 'bi-sun-fill',
  1: 'bi-cloud-sun-fill',
  2: 'bi-cloud-sun-fill',
  3: 'bi-clouds-fill',
  45: 'bi-cloud-fog-fill',
  48: 'bi-cloud-fog-fill',
  51: 'bi-cloud-drizzle-fill',
  53: 'bi-cloud-drizzle-fill',
  55: 'bi-cloud-drizzle-fill',
  61: 'bi-cloud-rain-fill',
  63: 'bi-cloud-rain-fill',
  65: 'bi-cloud-rain-heavy-fill',
  80: 'bi-cloud-rain-fill',
  95: 'bi-cloud-lightning-rain-fill',
};

function weatherIcon(code: number): string {
  return WEATHER_CODE_MAP[code] || 'bi-cloud-sun-fill';
}

function mockWeather(): WeatherData {
  const hour = new Date().getHours();
  const hourlyForecast: HourlyForecast[] = [];
  for (let i = 0; i < 6; i++) {
    const h = (hour + i) % 24;
    hourlyForecast.push({
      time: new Date().toLocaleTimeString('en-PH', {
        hour: 'numeric',
        hour12: true,
        timeZone: 'Asia/Manila',
      }),
      temperature: 29 + ((h + i) % 3),
      icon: 'bi-cloud-sun-fill',
    });
  }
  return {
    temperature: 29,
    humidity: 65,
    windSpeed: 12,
    condition: 'cloud-sun',
    icon: 'bi-cloud-sun-fill',
    hourlyForecast,
    isFallback: true,
  };
}

export default function WeatherWidget() {
  const { t } = useLanguage();
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    (async () => {
      try {
        const params = new URLSearchParams({
          latitude: String(COORDINATES.lat),
          longitude: String(COORDINATES.lon),
          current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
          hourly: 'temperature_2m,weather_code',
          timezone: 'Asia/Manila',
          forecast_days: '1',
        });

        const response = await fetch(`${API_URL}?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const apiData = await response.json();

        if (cancelled) return;
        const current = apiData?.current;
        if (!current) throw new Error('Invalid API response');

        const hourIndex = new Date().getHours();
        const hourlyForecast: HourlyForecast[] = [];
        for (let i = 0; i < 6 && hourIndex + i < (apiData?.hourly?.time?.length ?? 0); i++) {
          const idx = hourIndex + i;
          hourlyForecast.push({
            time: new Date(apiData.hourly.time[idx]).toLocaleTimeString('en-PH', {
              hour: 'numeric',
              hour12: true,
            }),
            temperature: Math.round(apiData.hourly.temperature_2m[idx]),
            icon: weatherIcon(apiData.hourly.weather_code[idx]),
          });
        }

        setData({
          temperature: Math.round(current.temperature_2m),
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          condition: t(`weather-code-${current.weather_code}`) || t('weather-mainly-clear'),
          icon: weatherIcon(current.weather_code),
          hourlyForecast,
          isFallback: false,
        });
      } catch (error) {
        console.warn('Weather: API fetch failed, using fallback data -', error);
        if (!cancelled) {
          const fallback = mockWeather();
          setData({ ...fallback, condition: t('weather-mainly-clear') });
        }
      } finally {
        clearTimeout(timeoutId);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [t]);

  if (!data) {
    return (
      <div className="weather-loading" data-loading="true" aria-busy="true" aria-label="Loading weather data">
        <div className="weather-current">
          <div className="skeleton-circle"></div>
          <div className="weather-current-info">
            <div className="skeleton-text skeleton-lg"></div>
            <div className="skeleton-text skeleton-md" style={{ marginTop: 8 }}></div>
            <div className="skeleton-text skeleton-sm" style={{ marginTop: 8 }}></div>
          </div>
        </div>
        <div className="weather-stats">
          <div className="skeleton-text skeleton-stat"></div>
          <div className="skeleton-text skeleton-stat"></div>
        </div>
        <div className="weather-hourly">
          <div className="skeleton-hour"></div>
          <div className="skeleton-hour"></div>
          <div className="skeleton-hour"></div>
          <div className="skeleton-hour"></div>
        </div>
      </div>
    );
  }

  const dataSourceBadge = data.isFallback ? (
    <span
      style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', marginLeft: 4 }}
      title="Using fallback data"
    >
      (Demo)
    </span>
  ) : (
    <span style={{ fontSize: '0.65rem', color: '#06a77d', marginLeft: 4 }} title="Live data from Open-Meteo API">
      ●
    </span>
  );

  return (
    <div className="weather-widget" role="region" aria-label="Current weather in Bayawan City">
      <div className="weather-current">
        <div className="weather-current-icon" aria-hidden="true">
          <i className={`bi ${data.icon}`}></i>
        </div>
        <div className="weather-current-info">
          <div className="weather-current-temp" aria-label={`Temperature ${data.temperature} degrees Celsius`}>
            {data.temperature}°C
          </div>
          <div className="weather-current-condition" aria-label={`Condition: ${data.condition}`}>
            {data.condition}
            {dataSourceBadge}
          </div>
          <div className="weather-current-location">
            <i className="bi bi-geo-alt" aria-hidden="true"></i> {t('weather-location')}
          </div>
        </div>
      </div>
      <div className="weather-stats" role="list" aria-label="Weather details">
        <div className="weather-stat" role="listitem" aria-label={`Humidity ${data.humidity} percent`}>
          <i className="bi bi-droplet" aria-hidden="true"></i>
          <span>{data.humidity}%</span>
        </div>
        <div className="weather-stat" role="listitem" aria-label={`Wind speed ${data.windSpeed} kilometers per hour`}>
          <i className="bi bi-wind" aria-hidden="true"></i>
          <span>{data.windSpeed} km/h</span>
        </div>
      </div>
      <div className="weather-hourly" role="list" aria-label="Hourly forecast">
        {data.hourlyForecast.slice(0, 4).map((h, i) => (
          <div key={i} className="weather-hour" role="listitem">
            <span className="weather-hour-time">{h.time}</span>
            <i className={`bi ${h.icon}`} aria-hidden="true"></i>
            <span className="weather-hour-temp">{h.temperature}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}